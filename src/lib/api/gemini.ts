/**
 * Server-Side Gemini API Client
 * All AI calls go through this module - API key is never exposed to client
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { RateLimitError } from '@/lib/errors/RateLimitError';

// Initialize Gemini client with server-side API key or custom key
// Note: No NEXT_PUBLIC_ prefix - this key stays on the server
function getGeminiClient(customApiKey?: string) {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'No API key provided. Please add your Gemini API key in Settings or configure GEMINI_API_KEY in .env.local'
    );
  }

  return new GoogleGenerativeAI(apiKey);
}

// Store for custom API key (passed via request)
let currentCustomApiKey: string | undefined;

/**
 * Set a custom API key for the current request
 */
export function setCustomApiKey(apiKey: string | undefined) {
  currentCustomApiKey = apiKey;
}

/**
 * Get the current custom API key
 */
export function getCustomApiKey() {
  return currentCustomApiKey;
}

// Model configuration
const MODEL_NAME = 'gemini-2.5-flash';

// Gemini API rate limit tracking
interface GeminiRateLimitInfo {
  limit: number;
  remaining: number;
  resetAt: number;
  lastUpdated: number;
}

const geminiRateLimitCache = new Map<string, GeminiRateLimitInfo>();

/**
 * Generation config for different use cases
 */
const GENERATION_CONFIGS = {
  conversion: {
    temperature: 0.3,
    topP: 0.8,
    maxOutputTokens: 4096,
  },
  extraction: {
    temperature: 0.2,
    topP: 0.9,
    maxOutputTokens: 2048,
  },
  feedback: {
    temperature: 0.4,
    topP: 0.9,
    maxOutputTokens: 1024,
  },
  explanation: {
    temperature: 0.4,
    topP: 0.9,
    maxOutputTokens: 1024,
  },
  summary: {
    temperature: 0.2,
    maxOutputTokens: 200,
  },
  tip: {
    temperature: 0.7,
    maxOutputTokens: 512,
  },
};

/**
 * Detect language from text (English or French)
 */
export function detectLanguage(text: string): 'en' | 'fr' {
  const frenchChars = /[àâäéèêëïîôöùûüÿñç]/i;
  const frenchWords =
    /\b(le|la|les|et|ou|mais|avec|pour|dans|sur|par|comme|si|alors|donc|or|ni|car)\b/i;

  if (frenchChars.test(text) || frenchWords.test(text)) {
    return 'fr';
  }
  return 'en';
}

/**
 * Get translated field names based on language
 */
export function getTranslatedKeys(language: 'en' | 'fr') {
  const translations = {
    en: {
      task: 'task',
      input: 'input',
      output_format: 'output_format',
      requirements: 'requirements',
      context: 'context',
      constraints: 'constraints',
      examples: 'examples',
    },
    fr: {
      task: 'tâche',
      input: 'entrée',
      output_format: 'format_de_sortie',
      requirements: 'exigences',
      context: 'contexte',
      constraints: 'contraintes',
      examples: 'exemples',
    },
  };

  return translations[language];
}

/**
 * Extract JSON from text response with multiple fallback strategies
 */
function extractJSON(text: string): unknown {
  console.log('[extractJSON] Processing response (length:', text.length, ')');
  
  // Strategy 1: Remove markdown code blocks
  let cleanedText = text.replace(/```(?:json)?\s*([\s\S]*?)```/g, '$1').trim();
  
  // Strategy 2: Try to parse the entire cleaned text
  try {
    const parsed = JSON.parse(cleanedText);
    console.log('[extractJSON] Success: Direct parse');
    return parsed;
  } catch (e1) {
    // Strategy 3: Find JSON object with balanced braces
    const jsonMatches = cleanedText.matchAll(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
    const matches = Array.from(jsonMatches);
    
    for (const match of matches) {
      try {
        const parsed = JSON.parse(match[0]);
        console.log('[extractJSON] Success: Pattern match');
        return parsed;
      } catch (e2) {
        continue;
      }
    }
    
    // Strategy 4: Try to find any object-like structure and fix common issues
    const simpleMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (simpleMatch) {
      let jsonStr = simpleMatch[0]
        .replace(/([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":') // Add quotes to keys
        .replace(/:\s*'([^']*)'/g, ':"$1"') // Replace single quotes with double
        .replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas
      
      try {
        const parsed = JSON.parse(jsonStr);
        console.log('[extractJSON] Success: Fixed JSON');
        return parsed;
      } catch (e3) {
        console.error('[extractJSON] All strategies failed');
        console.error('Original text:', text.substring(0, 300));
        console.error('Last parse error:', e3);
      }
    }
  }
  
  throw new Error('No valid JSON structure found in response');
}

/**
 * Convert a natural language prompt to structured JSON
 */
export async function convertPromptToJSON(
  prompt: string,
  complexity: number,
  contextInjection?: string,
  customApiKey?: string
): Promise<{
  json: Record<string, unknown>;
  explanation: string;
}> {
  console.log('[Gemini] Starting conversion with:', {
    promptLength: prompt.length,
    complexity,
    hasCustomApiKey: Boolean(customApiKey),
    hasEnvApiKey: Boolean(process.env.GEMINI_API_KEY),
    model: MODEL_NAME,
  });
  
  const genAI = getGeminiClient(customApiKey || currentCustomApiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const language = detectLanguage(prompt);
  const keys = getTranslatedKeys(language);

  // Build optimized system prompt (shorter = fewer tokens = lower cost)
  const fields = [keys.task, keys.input, keys.output_format, keys.requirements];
  if (complexity >= 3) fields.push(keys.context, keys.constraints);
  if (complexity >= 4) fields.push(keys.examples);
  
  // Extremely concise prompt to minimize tokens
  const systemPrompt = `Convert to JSON (level ${complexity}/7)${contextInjection ? `. Ctx: ${contextInjection.slice(0, 80)}` : ''}. Fields: ${fields.join(', ')}. Input: "${prompt}". Return ONLY valid JSON, no text.`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
      generationConfig: GENERATION_CONFIGS.conversion,
    });

    // Track rate limit info if available
    trackGeminiRateLimit(result, customApiKey);

    const responseText = result.response.text();
    console.log('[Gemini] Response received (length:', responseText.length, ')');
    console.log('[Gemini] First 200 chars:', responseText.substring(0, 200));
    
    const json = extractJSON(responseText) as Record<string, unknown>;
    console.log('[Gemini] JSON extracted successfully, keys:', Object.keys(json).join(', '));

    // Generate simple explanation (no API call to save quota!)
    const fieldCount = Object.keys(json).length;
    const explanation = `Structured prompt with ${fieldCount} field${fieldCount === 1 ? '' : 's'}: ${Object.keys(json).join(', ')}. This format provides clear structure and reduces ambiguity for better AI responses.`;

    return { json, explanation };
  } catch (error) {
    console.error('Gemini API error:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    if (error instanceof Error) {
      const errorMsg = error.message.toLowerCase();
      
      console.error('[Gemini] Error details:', {
        message: error.message,
        type: error.constructor.name,
        isRateLimit: errorMsg.includes('429') || errorMsg.includes('rate') || errorMsg.includes('quota'),
      });
      
      // Handle rate limiting (429 errors)
      if (errorMsg.includes('429') || errorMsg.includes('rate') || errorMsg.includes('quota')) {
        const retryAfter = extractRetryAfter(error) || 60;
        
        // Detect if this is a daily quota or per-minute rate limit
        const isDaily = errorMsg.includes('per day') || errorMsg.includes('daily') || errorMsg.includes('_free_tier_requests');
        const limitType = isDaily ? 'daily' : 'minute';
        
        console.log('[Gemini] Rate limit detected:', {
          retryAfter,
          type: limitType,
          isDaily,
          errorSnippet: errorMsg.substring(0, 200)
        });
        
        throw new RateLimitError({
          retryAfter,
          source: 'gemini',
          type: limitType,
          resetAt: Date.now() + (retryAfter * 1000),
        }, isDaily ? 'Gemini API daily quota exceeded' : 'Gemini API rate limit reached');
      }
      
      // Other error types
      if (errorMsg.includes('api key') || errorMsg.includes('api_key_invalid')) {
        console.error('[Gemini] API Key error:', error.message);
        throw new Error('Invalid API key. Please check your Gemini API key in Settings.');
      }
      if (errorMsg.includes('resource_exhausted')) {
        console.error('[Gemini] Quota exhausted:', error.message);
        throw new Error('API quota exceeded. Please try again later or check your API key limits.');
      }
      if (errorMsg.includes('not found') || errorMsg.includes('model')) {
        console.error('[Gemini] Model error:', error.message);
        throw new Error(`Model error: ${error.message}. The model may not be available.`);
      }
      if (errorMsg.includes('invalid') || errorMsg.includes('malformed')) {
        console.error('[Gemini] Request format error:', error.message);
        throw new Error('Request format error. Please try a simpler prompt.');
      }
      console.error('[Gemini] Unknown error:', error);
      throw error;
    }
    throw new Error('Failed to convert prompt');
  }
}

/**
 * Generate explanation for the conversion
 */
async function generateExplanation(
  originalPrompt: string,
  jsonPrompt: Record<string, unknown>,
  language: 'en' | 'fr'
): Promise<string> {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const prompt = `Compare this original prompt with its JSON structure and explain why the JSON version is better for AI interactions.

Original: "${originalPrompt}"

JSON Structure: ${JSON.stringify(jsonPrompt, null, 2)}

Provide 3-4 bullet points explaining:
- How the structure improves clarity
- What ambiguities were resolved
- How this helps AI understand the task better

Keep it concise and helpful. Use ${language === 'fr' ? 'French' : 'English'}.`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: GENERATION_CONFIGS.explanation,
    });

    return result.response.text();
  } catch {
    return 'The JSON structure provides clearer task definition and requirements for the AI.';
  }
}

/**
 * Extract concepts from JSON prompt for visualization
 */
export async function extractConcepts(
  jsonPrompt: Record<string, unknown>,
  complexity: number
): Promise<{
  nodes: Array<{
    id: string;
    label: string;
    category: string;
    weight: number;
    depth: number;
    confidence: number;
  }>;
  relationships: Array<{
    source: string;
    target: string;
    type: string;
    strength: number;
  }>;
  bifurcated: boolean;
}> {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const prompt = `Analyze this JSON prompt structure and extract a concept graph for visualization.

JSON Prompt: ${JSON.stringify(jsonPrompt, null, 2)}
Complexity Level: ${complexity}/7

Return a JSON object with:
1. "nodes": Array of concept nodes with:
   - id: unique string
   - label: short display name (max 20 chars)
   - category: one of "persona", "task", "constraints", "context", "output", "examples", "metadata"
   - weight: importance 0-1 (higher = larger node)
   - depth: hierarchy level (0 = root, 1 = primary, 2+ = secondary)

2. "relationships": Array of connections with:
   - source: node id
   - target: node id
   - type: "influences" (solid), "requires" (dashed), or "conflicts" (dotted)
   - strength: 0-1 (affects line thickness)

3. "bifurcated": ${complexity >= 5 ? 'true (show alternative paths)' : 'false'}

Guidelines:
- Extract 5-15 nodes depending on complexity
- Always include a central "task" node with weight 1.0
- Connect related concepts with appropriate relationship types
- For complexity 5+, create branching structures showing alternatives
- Ensure all node IDs are unique

Return ONLY valid JSON.`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: GENERATION_CONFIGS.extraction,
    });

    const responseText = result.response.text();
    const data = extractJSON(responseText) as {
      nodes: Array<{
        id: string;
        label: string;
        category: string;
        weight: number;
        depth: number;
      }>;
      relationships: Array<{
        source: string;
        target: string;
        type: string;
        strength: number;
      }>;
      bifurcated: boolean;
    };

    // Validate and normalize
    return {
      nodes: (data.nodes || []).map((node, i) => ({
        id: node.id || `node-${i}`,
        label: String(node.label || 'Unknown').slice(0, 20),
        category: node.category || 'metadata',
        weight: Math.max(0, Math.min(1, Number(node.weight) || 0.5)),
        depth: Math.max(0, Number(node.depth) || 0),
        confidence: 0.8, // Default confidence
      })),
      relationships: (data.relationships || []).map((rel) => ({
        source: String(rel.source),
        target: String(rel.target),
        type: rel.type || 'influences',
        strength: Math.max(0, Math.min(1, Number(rel.strength) || 0.5)),
      })),
      bifurcated: complexity >= 5,
    };
  } catch {
    // Return a minimal default graph centered
    return {
      nodes: [
        { id: 'task', label: 'Task', category: 'task', weight: 1, depth: 0, confidence: 1 },
      ],
      relationships: [],
      bifurcated: false,
    };
  }
}

/**
 * Generate feedback for a prompt structure
 */
export async function generateFeedback(
  originalPrompt: string,
  jsonPrompt: Record<string, unknown>
): Promise<{
  axes: {
    clarity: number;
    specificity: number;
    structure: number;
    actionability: number;
    creativity: number;
  };
  overallScore: number;
  suggestions: string[];
  skillsImproved: string[];
}> {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const prompt = `Analyze this prompt conversion and provide structured feedback.

Original Prompt: "${originalPrompt}"

JSON Structure: ${JSON.stringify(jsonPrompt, null, 2)}

Return a JSON object with:
{
  "axes": {
    "clarity": 0-100 (how clear is the intent?),
    "specificity": 0-100 (how precise are the requirements?),
    "structure": 0-100 (how well-organized is the JSON?),
    "actionability": 0-100 (how executable is the prompt?),
    "creativity": 0-100 (how much room for AI interpretation?)
  },
  "overallScore": 0-100 (weighted average),
  "suggestions": ["array of 2-4 improvement suggestions"],
  "skillsImproved": ["array of categories where user shows mastery"]
}

Be constructive and specific. Return ONLY valid JSON.`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: GENERATION_CONFIGS.feedback,
    });

    const responseText = result.response.text();
    const data = extractJSON(responseText) as {
      axes: {
        clarity: number;
        specificity: number;
        structure: number;
        actionability: number;
        creativity: number;
      };
      overallScore: number;
      suggestions: string[];
      skillsImproved: string[];
    };

    // Normalize scores to 0-100
    const normalizeScore = (score: number) =>
      Math.max(0, Math.min(100, Math.round(Number(score) || 50)));

    return {
      axes: {
        clarity: normalizeScore(data.axes?.clarity),
        specificity: normalizeScore(data.axes?.specificity),
        structure: normalizeScore(data.axes?.structure),
        actionability: normalizeScore(data.axes?.actionability),
        creativity: normalizeScore(data.axes?.creativity),
      },
      overallScore: normalizeScore(data.overallScore),
      suggestions: Array.isArray(data.suggestions)
        ? data.suggestions.slice(0, 5)
        : [],
      skillsImproved: Array.isArray(data.skillsImproved)
        ? data.skillsImproved.slice(0, 5)
        : [],
    };
  } catch {
    return {
      axes: {
        clarity: 50,
        specificity: 50,
        structure: 50,
        actionability: 50,
        creativity: 50,
      },
      overallScore: 50,
      suggestions: ['Try adding more specific requirements'],
      skillsImproved: [],
    };
  }
}

/**
 * Generate a daily tip about prompt engineering
 */
export async function generateDailyTip(): Promise<{
  id: string;
  tip: string;
  category: string;
  relatedConcepts: string[];
}> {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const categories = [
    'structure',
    'clarity',
    'constraints',
    'examples',
    'context',
    'output_format',
  ];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];

  const prompt = `Generate a helpful tip about prompt engineering, specifically about "${randomCategory}".

Return a JSON object:
{
  "tip": "A concise, actionable tip (max 200 chars)",
  "category": "${randomCategory}",
  "relatedConcepts": ["2-3 related prompt engineering concepts"]
}

Make it practical and immediately useful. Return ONLY valid JSON.`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: GENERATION_CONFIGS.tip,
    });

    const responseText = result.response.text();
    const data = extractJSON(responseText) as {
      tip: string;
      category: string;
      relatedConcepts: string[];
    };

    return {
      id: `tip-${Date.now()}`,
      tip: String(data.tip || 'Structure your prompts for clarity.').slice(0, 300),
      category: data.category || randomCategory,
      relatedConcepts: Array.isArray(data.relatedConcepts)
        ? data.relatedConcepts.slice(0, 3)
        : [],
    };
  } catch {
    return {
      id: `tip-${Date.now()}`,
      tip: 'Break complex prompts into smaller, focused sections for better results.',
      category: 'structure',
      relatedConcepts: ['clarity', 'organization'],
    };
  }
}

/**
 * Summarize a long prompt
 */
export async function summarizePrompt(prompt: string): Promise<string> {
  if (prompt.length <= 1500) {
    return prompt;
  }

  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Summarize this prompt in 200 words or less, keeping all key requirements:\n\n${prompt}`,
          },
        ],
      },
    ],
    generationConfig: GENERATION_CONFIGS.summary,
  });

  return result.response.text();
}

/**
 * Track rate limit information from Gemini API response
 */
function trackGeminiRateLimit(result: { response?: { usageMetadata?: unknown } }, customApiKey?: string): void {
  try {
    // Try to extract rate limit info from response metadata
    // Note: Gemini SDK may not expose headers directly, but we can track usage
    const usage = result.response?.usageMetadata;
    if (usage) {
      // Store usage data for monitoring
      const key = customApiKey || 'default';
      const existing = geminiRateLimitCache.get(key) || {
        limit: 60, // Default: 60 requests per minute
        remaining: 60,
        resetAt: Date.now() + 60000,
        lastUpdated: Date.now(),
      };

      // Decrement remaining
      existing.remaining = Math.max(0, existing.remaining - 1);
      existing.lastUpdated = Date.now();

      // Reset if window has passed
      if (Date.now() > existing.resetAt) {
        existing.remaining = existing.limit;
        existing.resetAt = Date.now() + 60000;
      }

      geminiRateLimitCache.set(key, existing);
    }
  } catch (error) {
    // Silently fail - rate limit tracking is best effort
    console.warn('Failed to track rate limit:', error);
  }
}

/**
 * Extract retry-after value from error
 */
function extractRetryAfter(error: Error): number | null {
  try {
    const errorMsg = error.message;
    
    // Gemini format: "Please retry in 54.497228384s"
    const secondsMatch = errorMsg.match(/retry in ([0-9.]+)s/i);
    if (secondsMatch) {
      return Math.ceil(parseFloat(secondsMatch[1]));
    }
    
    // Generic format: "retry after: 60"
    const genericMatch = errorMsg.match(/retry[_ ]?after[:\s]+([0-9]+)/i);
    if (genericMatch) {
      return parseInt(genericMatch[1], 10);
    }

    // Check if error has response property with headers
    const errorWithResponse = error as { 
      response?: { 
        status?: number; 
        headers?: Record<string, string> | Map<string, string> | { get?: (key: string) => string | null } 
      } 
    };
    if (errorWithResponse.response?.headers) {
      const headers = errorWithResponse.response.headers;
      let retryAfter: string | null = null;
      
      if (typeof headers === 'object' && 'get' in headers && typeof headers.get === 'function') {
        retryAfter = headers.get('retry-after') ?? null;
      } else if (headers instanceof Map) {
        retryAfter = headers.get('retry-after') || null;
      } else {
        retryAfter = (headers as Record<string, string>)['retry-after'] || null;
      }
      
      if (retryAfter) {
        return parseInt(retryAfter, 10);
      }
    }
  } catch {
    // Silently fail
  }
  return null;
}

/**
 * Get current rate limit info for monitoring
 */
export function getGeminiRateLimitInfo(customApiKey?: string): GeminiRateLimitInfo | null {
  const key = customApiKey || 'default';
  return geminiRateLimitCache.get(key) || null;
}

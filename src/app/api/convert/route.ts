/**
 * POST /api/convert
 * Securely converts natural language prompts to structured JSON
 */

import { NextRequest, NextResponse } from 'next/server';
import { ConvertRequestSchema } from '@/lib/schemas/prompt';
import { rateLimit, rateLimitHeaders, RateLimitResult } from '@/lib/api/rateLimit';
import { RateLimitError, isRateLimitError } from '@/lib/errors/RateLimitError';
import { convertPromptToJSON } from '@/lib/api/gemini';

/**
 * Extract concepts from JSON locally without API call (saves quota!)
 */
function extractConceptsFromJSON(json: Record<string, unknown>, complexity: number) {
  const nodes: Array<{ 
    id: string; 
    label: string; 
    category: string;
    weight: number;
    depth: number;
    confidence: number;
  }> = [];
  const relationships: Array<{ 
    source: string; 
    target: string; 
    type: string;
    strength: number;
  }> = [];
  
  // Extract nodes from JSON keys (no duplicate root task)
  const entries = Object.entries(json);
  let hasTaskNode = false;
  
  entries.forEach(([key, value], index) => {
    const nodeId = key.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Determine category based on key name
    let category = 'context';
    if (key.includes('task') || key.includes('tâche') || key.includes('action')) {
      category = 'task';
      hasTaskNode = true;
    }
    else if (key.includes('input') || key.includes('entrée') || key.includes('data')) category = 'context';
    else if (key.includes('output') || key.includes('sortie') || key.includes('format')) category = 'output';
    else if (key.includes('requirement') || key.includes('exigence') || key.includes('spec')) category = 'constraints';
    else if (key.includes('constraint') || key.includes('contrainte') || key.includes('limit')) category = 'constraints';
    else if (key.includes('example') || key.includes('exemple') || key.includes('sample')) category = 'examples';
    else if (key.includes('context') || key.includes('contexte') || key.includes('background')) category = 'context';
    
    // Weight based on category importance
    let weight = 0.5;
    if (category === 'task') weight = 1.0;
    else if (category === 'output') weight = 0.8;
    else if (category === 'constraints') weight = 0.7;
    else if (category === 'context') weight = 0.6;
    else if (category === 'examples') weight = 0.5;
    
    nodes.push({ 
      id: nodeId,
      label: key.length > 20 ? key.substring(0, 17) + '...' : key,
      category,
      weight,
      depth: category === 'task' ? 0 : 1,
      confidence: 0.9
    });
    
    // Create relationships - connect to task node if it exists
    if (category !== 'task' && hasTaskNode) {
      const taskNodeId = entries.find(([k]) => 
        k.includes('task') || k.includes('tâche') || k.includes('action')
      )?.[0].toLowerCase().replace(/[^a-z0-9]/g, '_');
      
      if (taskNodeId) {
        const relType = category === 'constraints' ? 'requires' : 'influences';
        relationships.push({
          source: taskNodeId,
          target: nodeId,
          type: relType,
          strength: category === 'output' ? 0.9 : 0.7
        });
      }
    }
    
    // Create child nodes for arrays with actual content
    if (Array.isArray(value) && value.length > 0) {
      value.slice(0, complexity >= 5 ? 3 : 2).forEach((item, idx) => {
        if (item && (typeof item === 'string' || typeof item === 'object')) {
          const childId = `${nodeId}_${idx}`;
          const label = typeof item === 'string' 
            ? (item.length > 15 ? item.substring(0, 12) + '...' : item)
            : typeof item === 'object' && item !== null
            ? Object.keys(item)[0] || `Item ${idx + 1}`
            : `Item ${idx + 1}`;
            
          nodes.push({
            id: childId,
            label,
            category: 'examples',
            weight: 0.3,
            depth: 2,
            confidence: 0.8
          });
          relationships.push({
            source: nodeId,
            target: childId,
            type: 'requires',
            strength: 0.5
          });
        }
      });
    }
    // Handle object values
    else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.entries(value).slice(0, 2).forEach(([subKey, subValue]) => {
        const childId = `${nodeId}_${subKey.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        nodes.push({
          id: childId,
          label: subKey.length > 15 ? subKey.substring(0, 12) + '...' : subKey,
          category: 'context',
          weight: 0.4,
          depth: 2,
          confidence: 0.85
        });
        relationships.push({
          source: nodeId,
          target: childId,
          type: 'influences',
          strength: 0.6
        });
      });
    }
  });
  
  // For complexity 5+, add some interconnections between nodes
  if (complexity >= 5 && nodes.length > 3) {
    const outputNode = nodes.find(n => n.category === 'output');
    const constraintNode = nodes.find(n => n.category === 'constraints');
    if (outputNode && constraintNode) {
      relationships.push({
        source: constraintNode.id,
        target: outputNode.id,
        type: 'requires',
        strength: 0.6
      });
    }
  }
  
  return { 
    nodes, 
    relationships,
    bifurcated: complexity >= 5
  };
}

export async function POST(request: NextRequest) {
  let rateLimitResult: RateLimitResult | null = null;

  try {
    // Parse request body first to check for custom API key
    const body = await request.json();
    const validationResult = ConvertRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request',
          details: validationResult.error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    const { prompt, complexity, contextInjection, apiKey } = validationResult.data;
    const hasCustomApiKey = Boolean(apiKey && apiKey.length > 0);

    // Check rate limit (users with custom API keys get higher limits)
    try {
      rateLimitResult = await rateLimit(request, hasCustomApiKey);
    } catch (error) {
      // Handle rate limit error
      if (isRateLimitError(error)) {
        return NextResponse.json(
          error.toJSON(),
          {
            status: 429,
            headers: {
              'Retry-After': String(error.retryAfter),
              'X-RateLimit-Limit': String(error.limit || 0),
              'X-RateLimit-Remaining': String(error.remaining || 0),
              'X-RateLimit-Reset': String(error.resetAt || 0),
            },
          }
        );
      }
      throw error;
    }

    // Truncate very long prompts (don't waste API call on summarization)
    let processedPrompt = prompt;
    if (prompt.length > 2000) {
      processedPrompt = prompt.substring(0, 2000) + '...';
      console.log('[API] Truncated long prompt from', prompt.length, 'to', processedPrompt.length);
    }

    // Convert prompt to JSON (pass custom API key if provided)
    const { json, explanation } = await convertPromptToJSON(
      processedPrompt,
      complexity,
      contextInjection,
      apiKey
    );

    // Extract concepts from JSON locally (no API call needed)
    const conceptGraph = extractConceptsFromJSON(json, complexity);

    // Format the JSON for display
    const formatted = JSON.stringify(json, null, 2);

    return NextResponse.json(
      {
        json,
        formatted,
        explanation,
        conceptGraph: {
          ...conceptGraph,
          complexity,
        },
      },
      { headers: rateLimitResult ? rateLimitHeaders(rateLimitResult) : {} }
    );
  } catch (error) {
    console.error('Conversion error:', error);

    // Handle rate limit errors from Gemini API
    if (isRateLimitError(error)) {
      return NextResponse.json(
        error.toJSON(),
        {
          status: 429,
          headers: {
            'Retry-After': String(error.retryAfter),
            'X-RateLimit-Limit': String(error.limit || 0),
            'X-RateLimit-Remaining': String(error.remaining || 0),
            'X-RateLimit-Reset': String(error.resetAt || 0),
          },
        }
      );
    }

    const message =
      error instanceof Error ? error.message : 'Conversion failed';

    return NextResponse.json(
      { error: message },
      { status: 500, headers: rateLimitResult ? rateLimitHeaders(rateLimitResult) : {} }
    );
  }
}

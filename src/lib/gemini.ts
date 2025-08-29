import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable');
}

function getGenAI() {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable');
  }
  return new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
}


export async function convertToJSONPrompt(regularPrompt: string, complexity: number) {
  try {
    if (!regularPrompt.trim()) {
      throw new Error('Prompt cannot be empty');
    }
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const systemPrompt = `You are a JSON prompt engineering expert. Convert this regular prompt into a structured JSON format optimized for LLM interactions.
 
 The complexity level for the JSON structure is ${complexity} out of 7, where 1 is the simplest and 7 is the most complex.
 
 REQUIREMENTS:
 1. Analyze the prompt and identify key components
 2. Create a JSON structure with relevant fields: task, input, output_format, requirements, context, constraints
 3. Adjust the level of detail and structure based on the complexity score.
 4. Make it specific, actionable, and well-structured
 5. Include validation rules where appropriate
 6. Return ONLY valid JSON, no additional text or formatting
 
 Regular prompt to convert: "${regularPrompt}"
 
 Return a complete JSON prompt structure:`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
      generationConfig: {
        temperature: 0.3,
        topP: 0.8,
        maxOutputTokens: 2048,
      },
    });

    const response = result.response.text();
    
    // Clean up the response to extract JSON
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON structure found in response');
    }
    
    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      throw new Error('Generated JSON is malformed');
    }
  } catch (error: unknown) {
    console.error('Gemini API Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    if (errorMessage?.includes('API_KEY')) {
      throw new Error('Invalid API key. Please check your Gemini API key.');
    }
    
    if (errorMessage?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    }
    
    throw new Error(errorMessage || 'Failed to convert prompt. Please try again.');
  }
}

export async function explainConversion(originalPrompt: string, jsonPrompt: object): Promise<string> {
  try {

    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `Explain why this JSON prompt structure is more effective than the original natural language prompt.

Original Prompt: "${originalPrompt}"

JSON Structure: ${JSON.stringify(jsonPrompt, null, 2)}

Provide 3-4 specific improvements in clear bullet points, focusing on:
- Clarity and specificity
- Structure and organization  
- Consistency and repeatability
- AI comprehension benefits

Format as clean bullet points:`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        topP: 0.9,
        maxOutputTokens: 1024,
      },
    });

    return result.response.text().trim();
  } catch (error) {
    console.error('Explanation Error:', error);
    return 'Unable to generate explanation at this time. The JSON structure provides better organization and specificity than the original prompt.';
  }
}
export async function summarizePrompt(prompt: string): Promise<string> {
  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const systemPrompt = `Summarize the following text, retaining the key instructions and context. The summary should be concise and under 150 words.

Text to summarize: "${prompt}"

Return only the summarized text.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 200,
      },
    });

    return result.response.text().trim();
  } catch (error) {
    console.error('Summarization Error:', error);
    // Fallback to simple truncation if summarization fails
    return prompt.substring(0, 1000) + '...';
  }
}

// Utility function to validate JSON structure
export function validateJSONPrompt(jsonPrompt: unknown): boolean {
  try {
    return typeof jsonPrompt === 'object' &&
           jsonPrompt !== null &&
           'task' in jsonPrompt;
  } catch {
    return false;
  }
}
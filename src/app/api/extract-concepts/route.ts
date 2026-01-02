/**
 * POST /api/extract-concepts
 * Extracts concept graph from JSON prompt for D3 visualization
 */

import { NextRequest, NextResponse } from 'next/server';
import { ExtractConceptsRequestSchema } from '@/lib/schemas/prompt';
import { rateLimit, rateLimitHeaders } from '@/lib/api/rateLimit';
import { extractConcepts } from '@/lib/api/gemini';

export async function POST(request: NextRequest) {
  // Check rate limit
  const rateLimitResult = await rateLimit(request);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: rateLimitResult.resetIn,
      },
      {
        status: 429,
        headers: rateLimitHeaders(rateLimitResult),
      }
    );
  }

  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = ExtractConceptsRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request',
          details: validationResult.error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400, headers: rateLimitHeaders(rateLimitResult) }
      );
    }

    const { jsonPrompt, complexity } = validationResult.data;

    // Extract concepts
    const conceptGraph = await extractConcepts(
      jsonPrompt as Record<string, unknown>,
      complexity
    );

    return NextResponse.json(
      {
        ...conceptGraph,
        complexity,
      },
      { headers: rateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error('Concept extraction error:', error);

    const message =
      error instanceof Error ? error.message : 'Extraction failed';

    return NextResponse.json(
      { error: message },
      { status: 500, headers: rateLimitHeaders(rateLimitResult) }
    );
  }
}

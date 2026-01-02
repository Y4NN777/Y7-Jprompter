/**
 * POST /api/feedback
 * Generates AI feedback for prompt structures (radar chart data)
 */

import { NextRequest, NextResponse } from 'next/server';
import { FeedbackRequestSchema } from '@/lib/schemas/prompt';
import { rateLimit, rateLimitHeaders } from '@/lib/api/rateLimit';
import { generateFeedback } from '@/lib/api/gemini';

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
    const validationResult = FeedbackRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request',
          details: validationResult.error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400, headers: rateLimitHeaders(rateLimitResult) }
      );
    }

    const { originalPrompt, jsonPrompt } = validationResult.data;

    // Generate feedback
    const feedback = await generateFeedback(
      originalPrompt,
      jsonPrompt as Record<string, unknown>
    );

    return NextResponse.json(feedback, {
      headers: rateLimitHeaders(rateLimitResult),
    });
  } catch (error) {
    console.error('Feedback generation error:', error);

    const message =
      error instanceof Error ? error.message : 'Feedback generation failed';

    return NextResponse.json(
      { error: message },
      { status: 500, headers: rateLimitHeaders(rateLimitResult) }
    );
  }
}

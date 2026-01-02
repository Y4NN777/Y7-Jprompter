/**
 * GET /api/daily-tip
 * Returns a daily prompt engineering tip
 */

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, rateLimitHeaders } from '@/lib/api/rateLimit';
import { generateDailyTip } from '@/lib/api/gemini';

// Simple in-memory cache for daily tip
// In production, use Redis or similar
let cachedTip: {
  tip: { id: string; tip: string; category: string; relatedConcepts: string[] };
  cachedAt: number;
} | null = null;

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET(request: NextRequest) {
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
    // Check cache
    const now = Date.now();
    if (cachedTip && now - cachedTip.cachedAt < CACHE_DURATION) {
      return NextResponse.json(cachedTip.tip, {
        headers: {
          ...rateLimitHeaders(rateLimitResult),
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // Generate new tip
    const tip = await generateDailyTip();

    // Cache it
    cachedTip = {
      tip,
      cachedAt: now,
    };

    return NextResponse.json(tip, {
      headers: {
        ...rateLimitHeaders(rateLimitResult),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Daily tip error:', error);

    // Return a fallback tip
    return NextResponse.json(
      {
        id: `tip-fallback-${Date.now()}`,
        tip: 'Break complex prompts into smaller, focused sections for better results.',
        category: 'structure',
        relatedConcepts: ['clarity', 'organization'],
      },
      {
        headers: rateLimitHeaders(rateLimitResult),
      }
    );
  }
}

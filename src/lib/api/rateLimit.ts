/**
 * Rate Limiting Middleware
 * Prevents API abuse by limiting requests per IP with multiple tiers
 * Integrates with Gemini API rate limits
 */

import { NextRequest } from 'next/server';
import { RateLimitError } from '@/lib/errors/RateLimitError';

interface RateLimitRecord {
  count: number;
  resetTime: number;
  burstCount: number;
  burstResetTime: number;
  dailyCount: number;
  dailyResetTime: number;
  fingerprint?: string;
}

// In-memory store for rate limiting
// In production, use Redis or similar for distributed systems
const rateLimitMap = new Map<string, RateLimitRecord>();

// Global rate limit tracker (protects shared API key)
const globalRateLimit = {
  requestsPerMinute: 0,
  lastReset: Date.now(),
  maxGlobalRPM: 100, // Total requests per minute across all users
};

// Configuration - Multiple tiers for stronger protection
const BURST_WINDOW_MS = 10 * 1000; // 10 second burst window
const BURST_MAX_REQUESTS = 3; // 3 requests per 10 seconds

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 10; // 10 requests per minute

const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hour window
const DAILY_MAX_REQUESTS = 100; // 100 requests per day (without custom API key)

// Custom API key users get higher limits
const CUSTOM_KEY_MULTIPLIER = 5;

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.dailyResetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60 * 1000); // Cleanup every minute

/**
 * Get client IP from request
 */
function getClientIP(request: NextRequest): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback
  return 'anonymous';
}

/**
 * Rate limit result
 */
export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number; // seconds until reset
  limit: number;
  message?: string; // Custom message for specific limit types
}

/**
 * Check rate limit for a request
 * Uses tiered rate limiting: global, burst (10s), minute, and daily limits
 */
export async function rateLimit(
  request: NextRequest,
  hasCustomApiKey = false
): Promise<RateLimitResult> {
  const ip = getClientIP(request);
  const fingerprint = request.headers.get('x-client-fingerprint');
  const identifier = fingerprint ? `${ip}:${fingerprint}` : ip;
  const now = Date.now();

  // Check global rate limit first (protects shared API key)
  if (!hasCustomApiKey) {
    checkGlobalRateLimit();
  }

  // Adjust limits for custom API key users
  const limits = hasCustomApiKey ? {
    burst: BURST_MAX_REQUESTS * CUSTOM_KEY_MULTIPLIER,
    minute: MAX_REQUESTS * CUSTOM_KEY_MULTIPLIER,
    daily: DAILY_MAX_REQUESTS * CUSTOM_KEY_MULTIPLIER,
  } : {
    burst: BURST_MAX_REQUESTS,
    minute: MAX_REQUESTS,
    daily: DAILY_MAX_REQUESTS,
  };

  // Get or create record
  let record = rateLimitMap.get(identifier);

  if (!record) {
    // Create new record
    record = {
      count: 1,
      resetTime: now + WINDOW_MS,
      burstCount: 1,
      burstResetTime: now + BURST_WINDOW_MS,
      dailyCount: 1,
      dailyResetTime: now + DAILY_WINDOW_MS,
      fingerprint: fingerprint ?? undefined,
    };
    rateLimitMap.set(identifier, record);

    return {
      success: true,
      remaining: limits.minute - 1,
      resetIn: Math.ceil(WINDOW_MS / 1000),
      limit: limits.minute,
    };
  }

  // Reset burst window if expired
  if (now > record.burstResetTime) {
    record.burstCount = 0;
    record.burstResetTime = now + BURST_WINDOW_MS;
  }

  // Reset minute window if expired
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + WINDOW_MS;
  }

  // Reset daily window if expired
  if (now > record.dailyResetTime) {
    record.dailyCount = 0;
    record.dailyResetTime = now + DAILY_WINDOW_MS;
  }

  // Check burst limit first (strictest)
  if (record.burstCount >= limits.burst) {
    const resetIn = Math.ceil((record.burstResetTime - now) / 1000);
    throw new RateLimitError({
      retryAfter: resetIn,
      source: 'app',
      type: 'burst',
      limit: limits.burst,
      remaining: 0,
      resetAt: record.burstResetTime,
    });
  }

  // Check minute limit
  if (record.count >= limits.minute) {
    const resetIn = Math.ceil((record.resetTime - now) / 1000);
    throw new RateLimitError({
      retryAfter: resetIn,
      source: 'app',
      type: 'minute',
      limit: limits.minute,
      remaining: 0,
      resetAt: record.resetTime,
    });
  }

  // Check daily limit (only for non-custom API key users)
  if (!hasCustomApiKey && record.dailyCount >= limits.daily) {
    const resetIn = Math.ceil((record.dailyResetTime - now) / 1000);
    throw new RateLimitError({
      retryAfter: resetIn,
      source: 'app',
      type: 'daily',
      limit: limits.daily,
      remaining: 0,
      resetAt: record.dailyResetTime,
    });
  }

  // All checks passed - increment counters
  record.count++;
  record.burstCount++;
  record.dailyCount++;

  return {
    success: true,
    remaining: limits.minute - record.count,
    resetIn: Math.ceil((record.resetTime - now) / 1000),
    limit: limits.minute,
  };
}

/**
 * Check global rate limit (protects shared API key across all users)
 */
function checkGlobalRateLimit(): void {
  const now = Date.now();

  // Reset if window has passed
  if (now - globalRateLimit.lastReset > 60000) {
    globalRateLimit.requestsPerMinute = 0;
    globalRateLimit.lastReset = now;
  }

  // Check if limit exceeded
  if (globalRateLimit.requestsPerMinute >= globalRateLimit.maxGlobalRPM) {
    const resetIn = Math.ceil((globalRateLimit.lastReset + 60000 - now) / 1000);
    throw new RateLimitError({
      retryAfter: resetIn,
      source: 'global',
      type: 'global',
      limit: globalRateLimit.maxGlobalRPM,
      remaining: 0,
      resetAt: globalRateLimit.lastReset + 60000,
    });
  }

  globalRateLimit.requestsPerMinute++;
}

/**
 * Create rate limit headers for response
 */
export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.resetIn.toString(),
  };
}

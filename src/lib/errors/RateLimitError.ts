/**
 * Custom Rate Limit Error
 * Provides structured information about rate limiting
 */

export interface RateLimitErrorInfo {
  retryAfter: number; // Seconds to wait
  limit?: number; // Total requests allowed
  remaining?: number; // Requests remaining
  resetAt?: number; // Unix timestamp when limit resets
  source: 'gemini' | 'app' | 'global'; // Which system imposed the limit
  type: 'burst' | 'minute' | 'daily' | 'global'; // Type of rate limit
}

export class RateLimitError extends Error {
  public readonly retryAfter: number;
  public readonly limit?: number;
  public readonly remaining?: number;
  public readonly resetAt?: number;
  public readonly source: 'gemini' | 'app' | 'global';
  public readonly type: 'burst' | 'minute' | 'daily' | 'global';

  constructor(info: RateLimitErrorInfo, message?: string) {
    const defaultMessage = message || `Rate limit exceeded. Please retry in ${info.retryAfter} seconds.`;
    super(defaultMessage);
    
    this.name = 'RateLimitError';
    this.retryAfter = info.retryAfter;
    this.limit = info.limit;
    this.remaining = info.remaining;
    this.resetAt = info.resetAt;
    this.source = info.source;
    this.type = info.type;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RateLimitError);
    }
  }

  /**
   * Format wait time in human-readable format
   */
  getFormattedWaitTime(): string {
    return formatWaitTime(this.retryAfter);
  }

  /**
   * Get user-friendly error message based on rate limit type
   */
  getUserMessage(): string {
    const waitTime = this.getFormattedWaitTime();
    
    // Gemini API limits are stricter than our app limits
    if (this.source === 'gemini') {
      return `Gemini API limit reached (free tier: 15/min). Wait ${waitTime}${this.type === 'daily' ? '. Get your own API key for higher limits!' : ''}.`;
    }
    
    switch (this.type) {
      case 'burst':
        return `Slow down! Please wait ${waitTime} before trying again.`;
      case 'minute':
        return `Rate limit reached. You can try again in ${waitTime}.`;
      case 'daily':
        return `Daily limit reached. Resets in ${waitTime}. Add your own API key for unlimited usage.`;
      case 'global':
        return `System is experiencing high traffic. Please retry in ${waitTime}.`;
      default:
        return `Rate limit exceeded. Please retry in ${waitTime}.`;
    }
  }

  /**
   * Check if this is a Gemini API rate limit
   */
  isGeminiLimit(): boolean {
    return this.source === 'gemini';
  }

  /**
   * Convert to JSON for API responses
   */
  toJSON() {
    return {
      error: 'RateLimitError',
      message: this.getUserMessage(),
      retryAfter: this.retryAfter,
      limit: this.limit,
      remaining: this.remaining,
      resetAt: this.resetAt,
      source: this.source,
      type: this.type,
    };
  }
}

/**
 * Format wait time in human-readable format
 */
export function formatWaitTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'}`;
  }
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  }
  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours === 1 ? '' : 's'}`;
}

/**
 * Check if an error is a RateLimitError
 */
export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof RateLimitError;
}

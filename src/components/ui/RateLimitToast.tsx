'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Zap, Timer, BarChart3, Globe } from 'lucide-react';
import { formatWaitTime } from '@/lib/errors/RateLimitError';

interface RateLimitToastProps {
  message: string;
  retryAfter: number; // seconds
  type: 'burst' | 'minute' | 'daily' | 'global';
  onClose?: () => void;
  onRetry?: () => void;
}

export function RateLimitToast({ 
  message, 
  retryAfter, 
  type,
  onClose,
  onRetry 
}: RateLimitToastProps) {
  const [timeRemaining, setTimeRemaining] = useState(retryAfter);
  const [canRetry, setCanRetry] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setCanRetry(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          setCanRetry(true);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const getIcon = () => {
    switch (type) {
      case 'burst':
        return Zap;
      case 'minute':
        return Timer;
      case 'daily':
        return BarChart3;
      case 'global':
        return Globe;
      default:
        return Zap;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'burst':
        return 'from-orange-500 to-red-500';
      case 'minute':
        return 'from-blue-500 to-indigo-500';
      case 'daily':
        return 'from-purple-500 to-pink-500';
      case 'global':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-blue-500 to-indigo-500';
    }
  };

  const progressPercentage = ((retryAfter - timeRemaining) / retryAfter) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-full max-w-md"
      >
        <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl shadow-2xl overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-[var(--bg-secondary)] relative overflow-hidden">
            <motion.div
              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getColor()}`}
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0">
                {(() => {
                  const Icon = getIcon();
                  return <Icon className="w-6 h-6" />;
                })()}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    Rate Limit Reached
                  </h3>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {message}
                </p>

                {/* Countdown */}
                {!canRetry && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      Retry in <span className="font-mono font-semibold text-[var(--accent-primary)]">
                        {formatWaitTime(timeRemaining)}
                      </span>
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2">
                  {canRetry ? (
                    <motion.button
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onRetry}
                      className={`px-4 py-2 rounded-lg bg-gradient-to-r ${getColor()} text-white text-sm font-medium shadow-lg`}
                    >
                      Retry Now
                    </motion.button>
                  ) : (
                    <div className="px-4 py-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-disabled)] text-sm font-medium">
                      Please Wait...
                    </div>
                  )}

                  {type === 'daily' && (
                    <button
                      onClick={() => {
                        // Navigate to settings
                        window.location.hash = 'settings';
                        onClose?.();
                      }}
                      className="px-4 py-2 rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] text-sm font-medium transition-colors"
                    >
                      Add API Key
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional info for daily limit */}
          {type === 'daily' && (
            <div className="px-4 pb-4">
              <div className="p-3 bg-[var(--accent-primary-subtle)] rounded-lg border border-[var(--accent-primary)]/20">
                <p className="text-xs text-[var(--text-secondary)]">
                  <strong>Tip:</strong> Add your own Gemini API key in Settings for unlimited usage and higher rate limits.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

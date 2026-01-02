'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import { useConverterStore } from '@/stores/converterStore';
import { ContextInjection } from './ContextInjection';
import { QuickActionsBar } from './QuickActionsBar';
import { ExamplePrompts } from './ExamplePrompts';
import { RateLimitToast } from '@/components/ui/RateLimitToast';
import { toast } from 'sonner';

interface InputPanelProps {
  className?: string;
}

const COMPLEXITY_LABELS = ['Basic', 'Simple', 'Standard', 'Detailed', 'Complex', 'Advanced', 'Expert'];

// Premium animation variants
const springConfig = { type: 'spring' as const, stiffness: 400, damping: 30 };
const smoothSpring = { type: 'spring' as const, stiffness: 300, damping: 25 };

export function InputPanel({ className = '' }: InputPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasCustomApiKey, setHasCustomApiKey] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    message: string;
    retryAfter: number;
    type: 'burst' | 'minute' | 'daily' | 'global';
  } | null>(null);

  const {
    inputText,
    complexity,
    contextInjection,
    isLoading,
    error,
    setInputText,
    setComplexity,
    setContextInjection,
    convert,
    clearAll,
    jsonOutput,
    setError,
  } = useConverterStore();

  // Check for custom API key
  useEffect(() => {
    const checkApiKey = () => {
      const apiKey = localStorage.getItem('gemini-api-key');
      setHasCustomApiKey(!!apiKey);
    };
    checkApiKey();
    // Re-check when window gains focus (in case user added key in another tab)
    window.addEventListener('focus', checkApiKey);
    return () => window.removeEventListener('focus', checkApiKey);
  }, []);

  // Check for rate limit errors
  useEffect(() => {
    if (error) {
      try {
        const errorData = JSON.parse(error);
        if (errorData.isRateLimit) {
          setRateLimitInfo({
            message: errorData.message,
            retryAfter: errorData.retryAfter,
            type: errorData.type,
          });
        }
      } catch {
        // Not a rate limit error
      }
    }
  }, [error]);

  const handleConvert = async () => {
    if (!inputText.trim()) {
      setHasError(true);
      setTimeout(() => setHasError(false), 500);
      return;
    }
    
    const promise = convert();
    toast.promise(promise, {
      loading: 'Converting prompt...',
      success: 'Prompt converted successfully!',
      error: (err: unknown) => {
        // Don't show toast for rate limit errors (handled by RateLimitToast)
        try {
          const errorData = JSON.parse(error || '{}');
          if (errorData.isRateLimit) {
            return null; // Suppress toast
          }
        } catch {}
        const errorMsg = err && typeof err === 'object' && 'message' in err ? (err as Error).message : 'Conversion failed';
        return errorMsg;
      },
    });
    await promise.catch(() => {}); // Prevent unhandled rejection
  };

  const handleCopy = useCallback(async () => {
    if (!inputText) return;
    await navigator.clipboard.writeText(inputText);
    toast.success('Prompt copied to clipboard');
  }, [inputText]);

  // Adjust height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      // textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 400)}px`;
    }
  }, [inputText]);

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Scrollable content area */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-h-0">
        {/* Input Card with subtle focus state */}
        <motion.div
          className="flex flex-col bg-[var(--bg-card)] border rounded-xl p-5 transition-all duration-200"
          style={{
            borderColor: isFocused ? 'var(--accent-primary)' : 'var(--border-subtle)',
          }}
        >
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-[var(--text-primary)]">
            Your Prompt
          </label>
          <QuickActionsBar
            jsonOutput={jsonOutput}
            onCopy={handleCopy}
            onDownload={() => { }}
            onClear={clearAll}
            copied={false}
          />
        </div>

        {/* Example prompts - show when input is empty */}
        {!inputText && (
          <ExamplePrompts onSelect={setInputText} />
        )}

        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your prompt here..."
          className="w-full h-full min-h-[200px] p-4 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm resize-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]/20 focus:outline-none transition-all"
        />

        {/* Character count */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-[var(--text-muted)]">
            {inputText.length} characters
          </span>
        </div>
      </motion.div>

      <ContextInjection
        value={contextInjection}
        onChange={setContextInjection}
        complexity={complexity}
      />

      {/* Complexity Slider */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5" data-tour="complexity">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-[var(--text-primary)]">
            Complexity Level
          </label>
          <span className="text-sm font-semibold text-[var(--accent-primary)]">
            {COMPLEXITY_LABELS[complexity - 1]}
          </span>
        </div>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((level) => (
            <motion.button
              key={level}
              onClick={() => setComplexity(level)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative flex-1 h-10 rounded-lg text-sm font-medium transition-all overflow-hidden
                ${complexity === level
                  ? 'bg-[var(--accent-primary)] text-white shadow-md'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                }
              `}
            >
              {complexity === level && (
                <motion.div
                  layoutId="complexityIndicator"
                  className="absolute inset-0 bg-[var(--accent-primary)] rounded-lg"
                  transition={springConfig}
                />
              )}
              <span className="relative z-10">{level}</span>
            </motion.button>
          ))}
        </div>

        {/* Complexity bar indicator */}
        <div className="mt-3 h-1 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--accent-primary)] rounded-full"
            initial={{ width: '14.28%' }}
            animate={{ width: `${(complexity / 7) * 100}%` }}
            transition={smoothSpring}
          />
        </div>
      </div>
      </div>

      {/* Convert Button - always visible at bottom */}
      <div className="pt-4 flex-shrink-0">
        <motion.button
        onClick={handleConvert}
        disabled={!inputText.trim() || isLoading}
        whileHover={!inputText.trim() || isLoading ? {} : { scale: 1.02 }}
        whileTap={!inputText.trim() || isLoading ? {} : { scale: 0.98 }}
        animate={hasError ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={hasError ? { duration: 0.4 } : smoothSpring}
        data-tour="convert-btn"
        className="relative h-12 flex items-center justify-center gap-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl overflow-hidden w-full shadow-lg transition-all"
      >
        {/* Hover shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />

        {/* Button content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 relative z-10"
            >
              {/* Mini JSON brackets animation */}
              <span className="relative flex items-center gap-1">
                <motion.span
                  animate={{ x: [-2, 0], opacity: [0.5, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                  className="text-lg font-mono"
                >
                  {'{'}
                </motion.span>
                <motion.span
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-current rounded-full"
                />
                <motion.span
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-1.5 h-1.5 bg-current rounded-full"
                />
                <motion.span
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="w-1.5 h-1.5 bg-current rounded-full"
                />
                <motion.span
                  animate={{ x: [0, 2], opacity: [1, 0.5] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                  className="text-lg font-mono"
                >
                  {'}'}
                </motion.span>
              </span>
              Converting to JSON...
            </motion.span>
          ) : (
            <motion.span
              key="convert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 relative z-10"
            >
              <Wand2 className="w-5 h-5" />
              Convert Prompt
              {hasCustomApiKey && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                >
                  Custom Key
                </motion.span>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      </div>

      {/* Rate Limit Toast */}
      {rateLimitInfo && (
        <RateLimitToast
          message={rateLimitInfo.message}
          retryAfter={rateLimitInfo.retryAfter}
          type={rateLimitInfo.type}
          onClose={() => {
            setRateLimitInfo(null);
            setError(null);
          }}
          onRetry={handleConvert}
        />
      )}
    </div>
  );
}

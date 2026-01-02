'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Plus, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ContextInjectionProps {
  value: string;
  onChange: (value: string) => void;
  complexity: number;
}

export function ContextInjection({ value, onChange, complexity }: ContextInjectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Only available at complexity 3+
  if (complexity < 3) return null;

  // If there's already content, keep it expanded
  const showPanel = isExpanded || value.length > 0;

  return (
    <div className="mt-4">
      <AnimatePresence mode="wait">
        {!showPanel ? (
          <motion.button
            key="add-context-btn"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            onClick={() => setIsExpanded(true)}
            data-tour="context-injection"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-[var(--border-default)] hover:border-[var(--accent-primary)] text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-all group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span className="text-sm font-medium">Add Context</span>
            <span className="text-xs px-2 py-0.5 bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] rounded-full">
              Advanced
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="context-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <motion.div
              className="bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary)]/20 rounded-xl p-4"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
                  </motion.div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    Context Injection
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] rounded-full">
                    Advanced
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    onChange('');
                    setIsExpanded(false);
                  }}
                  className="p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  title="Remove context"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <p className="text-xs text-[var(--text-muted)] mb-3">
                Add project context, code snippets, or background information to make your prompts more specific.
              </p>

              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="e.g., 'This is for a React TypeScript project using Next.js 14...'"
                className="w-full h-24 p-3 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm resize-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:outline-none transition-all"
              />

              {value && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-1.5 text-xs text-[var(--accent-primary)]"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{value.length} characters of context added</span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

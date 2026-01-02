'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Lightbulb, RefreshCw, X, TrendingUp } from 'lucide-react';
import { RadarChart } from './RadarChart';
import { useConverterStore } from '@/stores/converterStore';
import { useLearningStore } from '@/stores/learningStore';

interface FeedbackPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FeedbackData {
  axes: {
    clarity: number;
    specificity: number;
    structure: number;
    actionability: number;
    creativity: number;
  };
  overallScore: number;
  suggestions: string[];
}

export function FeedbackPanel({ isOpen, onClose }: FeedbackPanelProps) {
  const { inputText, jsonOutput } = useConverterStore();
  const { skills } = useLearningStore();
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeedback = async () => {
    if (!inputText || !jsonOutput) return;
    setIsLoading(true);

    // Generate feedback (placeholder until API is ready)
    setTimeout(() => {
      setFeedback({
        axes: {
          clarity: Math.round(75 + Math.random() * 20),
          specificity: Math.round(70 + Math.random() * 25),
          structure: Math.round(80 + Math.random() * 15),
          actionability: Math.round(65 + Math.random() * 30),
          creativity: Math.round(70 + Math.random() * 25),
        },
        overallScore: Math.round(75 + Math.random() * 20),
        suggestions: [
          'Consider adding more specific constraints to your prompt',
          'The structure is good, but could benefit from examples',
          'Try breaking down complex requirements into sub-tasks',
        ],
      });
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (isOpen && jsonOutput && !feedback) {
      fetchFeedback();
    }
  }, [isOpen, jsonOutput]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[var(--accent-primary)]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Prompt Feedback</h2>
                <p className="text-xs text-[var(--text-muted)]">AI-powered analysis of your prompt</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchFeedback}
                disabled={isLoading}
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors disabled:opacity-50"
                title="Refresh feedback"
              >
                <RefreshCw className={isLoading ? 'w-5 h-5 animate-spin' : 'w-5 h-5'} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-[var(--accent-primary)] animate-spin mb-4" />
                <p className="text-sm text-[var(--text-muted)]">Analyzing your prompt...</p>
              </div>
            ) : feedback ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                  <RadarChart data={feedback.axes} size={220} />
                  <div className="mt-4 text-center">
                    <div className="text-3xl font-bold text-[var(--accent-primary)]">
                      {Math.round(feedback.overallScore)}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">Overall Score</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-[var(--color-warning)]" />
                    Suggestions
                  </h3>
                  <div className="space-y-3">
                    {feedback.suggestions.map((suggestion, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-3 bg-[var(--bg-secondary)] rounded-lg text-sm text-[var(--text-secondary)]"
                      >
                        {suggestion}
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)]">
                    <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-3 flex items-center gap-2">
                      <TrendingUp className="w-3 h-3" />
                      Your Progress
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-[var(--text-primary)]">{skills.totalConversions}</div>
                        <div className="text-xs text-[var(--text-muted)]">Total Prompts</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-[var(--accent-success)]">{skills.bestScore || '-'}</div>
                        <div className="text-xs text-[var(--text-muted)]">Best Score</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                <p className="text-sm text-[var(--text-muted)]">Convert a prompt first to get feedback</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

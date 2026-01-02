'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

const EXAMPLE_PROMPTS = [
  {
    label: 'Code Review',
    prompt: 'You are a senior software engineer reviewing code. Analyze the provided code for bugs, security issues, performance problems, and suggest improvements following best practices.',
  },
  {
    label: 'Blog Writer',
    prompt: 'Write a comprehensive blog post about the given topic. Include an engaging introduction, well-structured sections with headers, practical examples, and a compelling conclusion with a call to action.',
  },
  {
    label: 'Data Analyst',
    prompt: 'Analyze the provided dataset and generate insights. Identify trends, patterns, anomalies, and provide actionable recommendations based on the data. Present findings in a clear, structured format.',
  },
  {
    label: 'API Designer',
    prompt: 'Design a RESTful API for the described system. Include endpoints, HTTP methods, request/response schemas, authentication requirements, and error handling strategies.',
  },
  {
    label: 'Email Composer',
    prompt: 'Write a professional email for the given context. Maintain appropriate tone, be concise yet thorough, include clear action items, and ensure proper formatting.',
  },
  {
    label: 'SQL Expert',
    prompt: 'Generate optimized SQL queries for the described database operations. Consider indexing, query performance, and best practices for the specific database system.',
  },
];

export function ExamplePrompts({ onSelect }: ExamplePromptsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollDirection = 1;
    const scrollSpeed = 0.5;

    const autoScroll = () => {
      if (!container) return;

      container.scrollLeft += scrollDirection * scrollSpeed;

      // Reverse direction at edges
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
        scrollDirection = -1;
      } else if (container.scrollLeft <= 0) {
        scrollDirection = 1;
      }
    };

    const interval = setInterval(autoScroll, 30);

    // Continuous scrolling - no pause on hover
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mb-4 relative z-10" data-tour="examples">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
        <span className="text-xs font-medium text-[var(--text-muted)]">
          Try an example
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-2 -my-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {EXAMPLE_PROMPTS.map((example, index) => (
          <motion.button
            key={example.label}
            onClick={() => onSelect(example.prompt)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary-subtle)] transition-all shadow-sm hover:shadow-md"
          >
            {example.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

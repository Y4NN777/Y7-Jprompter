'use client';

import { motion } from 'framer-motion';
import { Info, Github, ExternalLink, Heart, Zap, FileJson, Eye } from 'lucide-react';
import Image from 'next/image';

const FEATURES = [
  {
    icon: FileJson,
    title: 'JSON Structured Output',
    description: 'Convert natural language prompts into well-organized, reusable JSON structures.',
  },
  {
    icon: Zap,
    title: 'AI-Powered Analysis',
    description: 'Leverages Gemini AI for intelligent prompt parsing and structure generation.',
  },
  {
    icon: Eye,
    title: 'Visual Graph View',
    description: 'See your prompt concepts as an interactive D3 force-directed visualization.',
  },
];

const TECH_STACK = [
  { name: 'Next.js 14', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'Zustand', category: 'State' },
  { name: 'D3.js', category: 'Visualization' },
  { name: 'Gemini AI', category: 'AI' },
];

export function AboutView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[var(--accent-primary-subtle)] flex items-center justify-center"
        >
          <Image
            src="/favicon.svg"
            alt="Y7-Jprompter Logo"
            width={48}
            height={48}
            className="w-12 h-12"
          />
        </motion.div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Y7-Jprompter</h1>
        <p className="text-[var(--text-secondary)]">Transform prompts into structured JSON</p>
        <p className="text-sm text-[var(--text-muted)] mt-1">Version 1.0.0</p>
      </div>

      {/* Features */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Features</h2>
        <div className="space-y-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary-subtle)] flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-[var(--accent-primary)]" />
              </div>
              <div>
                <h3 className="font-medium text-[var(--text-primary)] mb-1">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech, index) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full text-sm"
            >
              <span className="text-[var(--text-primary)]">{tech.name}</span>
              <span className="text-[var(--text-muted)] ml-1.5 text-xs">({tech.category})</span>
            </motion.span>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Links</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <a
            href="https://github.com/y7-labs/y7-jprompter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--accent-primary-subtle)] transition-colors"
          >
            <Github className="w-5 h-5 text-[var(--text-primary)]" />
            <div className="flex-1">
              <p className="font-medium text-[var(--text-primary)]">GitHub</p>
              <p className="text-xs text-[var(--text-muted)]">View source code</p>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
          </a>
          <a
            href="https://y7labs.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--accent-primary-subtle)] transition-colors"
          >
            <Info className="w-5 h-5 text-[var(--text-primary)]" />
            <div className="flex-1">
              <p className="font-medium text-[var(--text-primary)]">Y7 Labs</p>
              <p className="text-xs text-[var(--text-muted)]">Visit website</p>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
          </a>
        </div>
      </section>

      {/* Credits */}
      <section className="text-center py-6 border-t border-[var(--border-subtle)]">
        <p className="text-sm text-[var(--text-secondary)] flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-red-500" /> by Y7 Labs
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-2">
          © 2026 Y7 Labs. All rights reserved.
        </p>
      </section>
    </motion.div>
  );
}

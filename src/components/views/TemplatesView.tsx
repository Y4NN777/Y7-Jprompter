'use client';

import { motion } from 'framer-motion';
import { FileText, Search, Copy, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useConverterStore } from '@/stores/converterStore';
import { useNavigationStore } from '@/stores/navigationStore';
import { toast } from 'sonner';

const TEMPLATES = [
  {
    id: 'code-review',
    name: 'Code Review',
    category: 'Development',
    description: 'Analyze code for bugs, security issues, and best practices',
    prompt: 'You are a senior software engineer reviewing code. Analyze the provided code for bugs, security issues, performance problems, and suggest improvements following best practices.',
  },
  {
    id: 'blog-writer',
    name: 'Blog Writer',
    category: 'Content',
    description: 'Create engaging blog posts with structure and CTAs',
    prompt: 'Write a comprehensive blog post about the given topic. Include an engaging introduction, well-structured sections with headers, practical examples, and a compelling conclusion with a call to action.',
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'Analysis',
    description: 'Analyze datasets and generate actionable insights',
    prompt: 'Analyze the provided dataset and generate insights. Identify trends, patterns, anomalies, and provide actionable recommendations based on the data. Present findings in a clear, structured format.',
  },
  {
    id: 'api-designer',
    name: 'API Designer',
    category: 'Development',
    description: 'Design RESTful APIs with best practices',
    prompt: 'Design a RESTful API for the described system. Include endpoints, HTTP methods, request/response schemas, authentication requirements, and error handling strategies.',
  },
  {
    id: 'email-composer',
    name: 'Email Composer',
    category: 'Communication',
    description: 'Write professional emails with clear action items',
    prompt: 'Write a professional email for the given context. Maintain appropriate tone, be concise yet thorough, include clear action items, and ensure proper formatting.',
  },
  {
    id: 'sql-expert',
    name: 'SQL Expert',
    category: 'Development',
    description: 'Generate optimized SQL queries',
    prompt: 'Generate optimized SQL queries for the described database operations. Consider indexing, query performance, and best practices for the specific database system.',
  },
  {
    id: 'ux-reviewer',
    name: 'UX Reviewer',
    category: 'Design',
    description: 'Review UI/UX designs for usability',
    prompt: 'Review the provided UI/UX design for usability issues. Analyze user flow, accessibility, visual hierarchy, and provide specific recommendations for improvement.',
  },
  {
    id: 'documentation',
    name: 'Tech Writer',
    category: 'Documentation',
    description: 'Write clear technical documentation',
    prompt: 'Write clear and comprehensive technical documentation for the given feature or system. Include overview, setup instructions, usage examples, and troubleshooting tips.',
  },
];

const CATEGORIES = ['All', 'Development', 'Content', 'Analysis', 'Communication', 'Design', 'Documentation'];

export function TemplatesView() {
  const { setInputText } = useConverterStore();
  const { setCurrentView } = useNavigationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: typeof TEMPLATES[0]) => {
    setInputText(template.prompt);
    setCurrentView('converter');
    toast.success(`Template "${template.name}" loaded`);
  };

  const handleCopyTemplate = (template: typeof TEMPLATES[0]) => {
    navigator.clipboard.writeText(template.prompt);
    setCopiedId(template.id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center">
          <FileText className="w-5 h-5 text-[var(--accent-primary)]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Prompt Templates</h1>
          <p className="text-sm text-[var(--text-muted)]">Ready-to-use templates for common tasks</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-[var(--accent-primary)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 hover:border-[var(--accent-primary-subtle)] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="px-2 py-0.5 text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-muted)] rounded-full">
                {template.category}
              </span>
              <button
                onClick={() => handleCopyTemplate(template)}
                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary-subtle)] rounded-lg transition-colors"
              >
                {copiedId === template.id ? (
                  <Check className="w-4 h-4 text-[var(--accent-success)]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">{template.name}</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">{template.description}</p>
            <button
              onClick={() => handleUseTemplate(template)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] rounded-lg text-sm font-medium hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
            >
              Use Template
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
            <FileText className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No templates found</h3>
          <p className="text-sm text-[var(--text-muted)]">Try a different search or category</p>
        </div>
      )}
    </motion.div>
  );
}

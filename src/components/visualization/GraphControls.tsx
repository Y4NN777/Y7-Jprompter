'use client';

import { motion } from 'framer-motion';
import { Network, Circle, GitBranch, Boxes, Filter, Search, X } from 'lucide-react';
import { useState } from 'react';
import type { ConceptCategory } from '@/types';

export type LayoutType = 'force' | 'radial' | 'hierarchy' | 'cluster';

interface GraphControlsProps {
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  categoryFilters: Set<ConceptCategory>;
  onCategoryFilterToggle: (category: ConceptCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  nodeCount: number;
}

const LAYOUTS: { id: LayoutType; icon: React.ReactNode; label: string; description: string }[] = [
  { id: 'force', icon: <Network className="w-4 h-4" />, label: 'Force', description: 'Organic clustering' },
  { id: 'radial', icon: <Circle className="w-4 h-4" />, label: 'Radial', description: 'Concentric layers' },
  { id: 'hierarchy', icon: <GitBranch className="w-4 h-4" />, label: 'Tree', description: 'Top-down flow' },
  { id: 'cluster', icon: <Boxes className="w-4 h-4" />, label: 'Cluster', description: 'By category' },
];

const CATEGORIES: { id: ConceptCategory; color: string; label: string }[] = [
  { id: 'persona', color: 'var(--node-persona)', label: 'Persona' },
  { id: 'task', color: 'var(--node-task)', label: 'Task' },
  { id: 'constraints', color: 'var(--node-constraints)', label: 'Constraints' },
  { id: 'context', color: 'var(--node-context)', label: 'Context' },
  { id: 'output', color: 'var(--node-output)', label: 'Output' },
  { id: 'examples', color: 'var(--node-examples)', label: 'Examples' },
  { id: 'metadata', color: 'var(--node-metadata)', label: 'Metadata' },
];

export function GraphControls({
  currentLayout,
  onLayoutChange,
  categoryFilters,
  onCategoryFilterToggle,
  searchQuery,
  onSearchChange,
  nodeCount,
}: GraphControlsProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
      {/* Layout Switcher */}
      <div className="flex gap-1 p-1 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] shadow-lg">
        {LAYOUTS.map((layout) => (
          <motion.button
            key={layout.id}
            onClick={() => onLayoutChange(layout.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative p-2.5 rounded-lg transition-colors
              ${currentLayout === layout.id
                ? 'text-white'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
              }
            `}
            title={`${layout.label}: ${layout.description}`}
          >
            {currentLayout === layout.id && (
              <motion.div
                layoutId="activeLayout"
                className="absolute inset-0 bg-[var(--accent-primary)] rounded-lg"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{layout.icon}</span>
          </motion.button>
        ))}
      </div>

      {/* Filter Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors
            ${showFilters
              ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
              : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)]'
            }
          `}
        >
          <Filter className="w-4 h-4" />
          <span className="text-xs font-medium">Filter</span>
          {categoryFilters.size > 0 && categoryFilters.size < 7 && (
            <span className="px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
              {7 - categoryFilters.size}
            </span>
          )}
        </button>

        {/* Node count badge */}
        <div className="px-3 py-2 bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
          {nodeCount} nodes
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-3 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] shadow-lg"
        >
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search nodes..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <p className="text-xs font-medium text-[var(--text-muted)] mb-2">Categories</p>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const isHidden = categoryFilters.has(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryFilterToggle(cat.id)}
                  className={`
                    flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-all
                    ${isHidden
                      ? 'bg-[var(--bg-secondary)] text-[var(--text-muted)] opacity-50'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                    }
                  `}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: isHidden ? 'var(--text-muted)' : cat.color }}
                  />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => CATEGORIES.forEach(c => categoryFilters.has(c.id) && onCategoryFilterToggle(c.id))}
              className="flex-1 px-2 py-1.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] rounded-md transition-colors"
            >
              Show All
            </button>
            <button
              onClick={() => CATEGORIES.forEach(c => !categoryFilters.has(c.id) && onCategoryFilterToggle(c.id))}
              className="flex-1 px-2 py-1.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] rounded-md transition-colors"
            >
              Hide All
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

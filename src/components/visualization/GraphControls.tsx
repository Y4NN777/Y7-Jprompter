'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Network,
  Circle,
  GitBranch,
  Boxes,
  Filter,
  Search,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  ChevronUp
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
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
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitToView?: () => void;
  onReset?: () => void;
}

const LAYOUTS: { id: LayoutType; icon: React.ReactNode; label: string }[] = [
  { id: 'force', icon: <Network className="w-4 h-4" />, label: 'Force' },
  { id: 'radial', icon: <Circle className="w-4 h-4" />, label: 'Radial' },
  { id: 'hierarchy', icon: <GitBranch className="w-4 h-4" />, label: 'Tree' },
  { id: 'cluster', icon: <Boxes className="w-4 h-4" />, label: 'Cluster' },
];

const CATEGORIES: { id: ConceptCategory; color: string; label: string }[] = [
  { id: 'task', color: 'var(--node-task)', label: 'Task' },
  { id: 'context', color: 'var(--node-context)', label: 'Context' },
  { id: 'output', color: 'var(--node-output)', label: 'Output' },
  { id: 'constraints', color: 'var(--node-constraints)', label: 'Constraints' },
  { id: 'examples', color: 'var(--node-examples)', label: 'Examples' },
];

export function GraphControls({
  currentLayout,
  onLayoutChange,
  categoryFilters,
  onCategoryFilterToggle,
  searchQuery,
  onSearchChange,
  nodeCount,
  onZoomIn,
  onZoomOut,
  onFitToView,
  onReset,
}: GraphControlsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-hide controls after 4 seconds of inactivity
  useEffect(() => {
    if (isHovered || showFilters || showSearch) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isHovered, showFilters, showSearch, currentLayout]);

  // Show controls on any interaction
  const handleMouseMove = useCallback(() => {
    setIsVisible(true);
  }, []);

  const activeFiltersCount = categoryFilters.size;

  // Get current layout index for cycling
  const currentLayoutIndex = LAYOUTS.findIndex(l => l.id === currentLayout);

  // Cycle to next layout (for mobile)
  const cycleLayout = () => {
    const nextIndex = (currentLayoutIndex + 1) % LAYOUTS.length;
    onLayoutChange(LAYOUTS[nextIndex].id);
  };

  return (
    <>
      {/* Mouse move detector for the entire graph area */}
      <div
        className="absolute inset-0 z-0"
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseMove}
      />

      {/* Collapsed state indicator - shows when toolbar is hidden */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setIsVisible(true)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-[var(--bg-card)]/80 backdrop-blur-sm rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
          >
            <ChevronUp className="w-4 h-4" />
            <span className="text-xs font-medium">Show Controls</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Floating Toolbar - Simplified */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 md:hidden"
          >
            <div className="flex items-center gap-2 p-2 bg-[var(--bg-card)]/95 backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] shadow-2xl">
              {/* Layout Cycle Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={cycleLayout}
                className="relative p-3 rounded-xl bg-[var(--accent-primary)] text-white"
                title={`Layout: ${LAYOUTS[currentLayoutIndex].label}`}
              >
                {LAYOUTS[currentLayoutIndex].icon}
              </motion.button>

              {/* Zoom Out */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onZoomOut}
                className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] active:bg-[var(--bg-tertiary)]"
                title="Zoom out"
              >
                <ZoomOut className="w-5 h-5" />
              </motion.button>

              {/* Zoom In */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onZoomIn}
                className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] active:bg-[var(--bg-tertiary)]"
                title="Zoom in"
              >
                <ZoomIn className="w-5 h-5" />
              </motion.button>

              {/* Fit to View */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onFitToView}
                className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] active:bg-[var(--bg-tertiary)]"
                title="Fit to view"
              >
                <Maximize2 className="w-5 h-5" />
              </motion.button>

              {/* Reset */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onReset}
                className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] active:bg-[var(--bg-tertiary)]"
                title="Reset view"
              >
                <RotateCcw className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Floating Toolbar - Full controls */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:block"
          >
            <div className="flex items-center gap-1 p-1.5 bg-[var(--bg-card)]/95 backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] shadow-2xl">

              {/* Search Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowSearch(!showSearch);
                  setShowFilters(false);
                }}
                className={`p-2.5 rounded-xl transition-colors ${
                  showSearch
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
                title="Search nodes"
              >
                <Search className="w-4 h-4" />
              </motion.button>

              {/* Divider */}
              <div className="w-px h-6 bg-[var(--border-subtle)] mx-1" />

              {/* Layout Buttons */}
              {LAYOUTS.map((layout) => (
                <motion.button
                  key={layout.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onLayoutChange(layout.id)}
                  className={`relative p-2.5 rounded-xl transition-colors ${
                    currentLayout === layout.id
                      ? 'text-white'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                  title={layout.label}
                >
                  {currentLayout === layout.id && (
                    <motion.div
                      layoutId="activeLayout"
                      className="absolute inset-0 bg-[var(--accent-primary)] rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{layout.icon}</span>
                </motion.button>
              ))}

              {/* Divider */}
              <div className="w-px h-6 bg-[var(--border-subtle)] mx-1" />

              {/* Filter Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowFilters(!showFilters);
                  setShowSearch(false);
                }}
                className={`relative p-2.5 rounded-xl transition-colors ${
                  showFilters
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
                title="Filter categories"
              >
                <Filter className="w-4 h-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-secondary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </motion.button>

              {/* Divider */}
              <div className="w-px h-6 bg-[var(--border-subtle)] mx-1" />

              {/* Zoom Controls */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onZoomOut}
                className="p-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onZoomIn}
                className="p-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onFitToView}
                className="p-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                title="Fit to view"
              >
                <Maximize2 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReset}
                className="p-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                title="Reset view"
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>

              {/* Node Count Badge */}
              <div className="px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-secondary)] rounded-lg ml-1">
                {nodeCount}
              </div>
            </div>

            {/* Search Panel - Expands above toolbar */}
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64"
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="Search nodes..."
                      autoFocus
                      className="w-full pl-10 pr-8 py-3 text-sm bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none shadow-lg"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => onSearchChange('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Filter Panel - Expands above toolbar */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2"
                >
                  <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 flex-wrap">
                      {CATEGORIES.map((cat) => {
                        const isHidden = categoryFilters.has(cat.id);
                        return (
                          <motion.button
                            key={cat.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onCategoryFilterToggle(cat.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isHidden
                                ? 'bg-[var(--bg-secondary)] text-[var(--text-muted)] opacity-50'
                                : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                            }`}
                          >
                            <div
                              className="w-2.5 h-2.5 rounded-full transition-colors"
                              style={{ backgroundColor: isHidden ? 'var(--text-muted)' : cat.color }}
                            />
                            {cat.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

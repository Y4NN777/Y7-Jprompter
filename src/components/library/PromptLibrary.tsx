'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Folder,
  Tag,
  Clock,
  Star,
  Trash2,
  Download,
  Upload,
  Plus,
  X,
  ChevronRight,
  FileJson,
} from 'lucide-react';
import { useConverterStore } from '@/stores/converterStore';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import type { ConversionHistory } from '@/types';

interface PromptLibraryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromptLibrary({ isOpen, onClose }: PromptLibraryProps) {
  const { history, loadFromHistory, removeFromHistory, clearHistory, exportHistory, importHistory } = useConverterStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'complexity'>('recent');

  // Extract unique tags from history (based on complexity levels)
  const tags = useMemo(() => {
    const complexityTags = [...new Set(history.map(h => `Level ${h.input.complexity}`))];
    return complexityTags.sort();
  }, [history]);

  // Filter and sort history
  const filteredHistory = useMemo(() => {
    let filtered = history;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        h =>
          h.input.text.toLowerCase().includes(query) ||
          JSON.stringify(h.output.json).toLowerCase().includes(query)
      );
    }

    // Tag filter
    if (selectedTag) {
      const level = parseInt(selectedTag.replace('Level ', ''));
      filtered = filtered.filter(h => h.input.complexity === level);
    }

    // Sort
    if (sortBy === 'recent') {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } else {
      filtered = [...filtered].sort((a, b) => b.input.complexity - a.input.complexity);
    }

    return filtered;
  }, [history, searchQuery, selectedTag, sortBy]);

  // Handle import
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        importHistory(text);
      }
    };
    input.click();
  };

  // Handle export
  const handleExport = () => {
    const data = exportHistory();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `y7-jprompter-library-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Format date
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="prompt-library-modal"
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
          className="w-full max-w-4xl max-h-[80vh] bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center">
                <Folder className="w-5 h-5 text-[var(--accent-primary)]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Prompt Library</h2>
                <p className="text-xs text-[var(--text-muted)]">{history.length} saved prompts</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleImport}
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                title="Import library"
              >
                <Upload className="w-5 h-5" />
              </button>
              <button
                onClick={handleExport}
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                title="Export library"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-4 border-b border-[var(--border-subtle)] space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                className="w-full pl-10 pr-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:border-[var(--accent-primary)] focus:outline-none"
              />
            </div>

            {/* Tags and Sort */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-[var(--text-muted)]">Filter:</span>
                {tags.map((tag, index) => (
                  <button
                    key={`${tag}-${index}`}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-2 py-1 text-xs rounded-full transition-colors ${
                      selectedTag === tag
                        ? 'bg-[var(--accent-primary)] text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'complexity')}
                  className="px-2 py-1 text-xs bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] focus:outline-none"
                >
                  <option value="recent">Most Recent</option>
                  <option value="complexity">Complexity</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <FileJson className="w-12 h-12 text-[var(--text-muted)] mb-4" />
                <h3 className="text-lg font-medium text-[var(--text-secondary)] mb-2">
                  {history.length === 0 ? 'No Saved Prompts' : 'No Results Found'}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {history.length === 0
                    ? 'Convert some prompts and they will appear here'
                    : 'Try adjusting your search or filters'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredHistory.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--accent-primary-subtle)] transition-all cursor-pointer"
                    onClick={() => {
                      loadFromHistory(item);
                      onClose();
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--text-primary)] line-clamp-2 mb-2">
                          {item.input.text}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(item.timestamp)}
                          </span>
                          <span className="px-2 py-0.5 bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] rounded-full">
                            Level {item.input.complexity}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromHistory(item.id);
                          }}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-subtle)] transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {history.length > 0 && (
            <div className="p-4 border-t border-[var(--border-subtle)] flex justify-between items-center">
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-xs text-[var(--color-error)] hover:underline"
              >
                Clear All History
              </button>
              <p className="text-xs text-[var(--text-muted)]">
                Click a prompt to load it
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
      </AnimatePresence>

      {/* Confirm Clear Modal */}
      <ConfirmModal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={clearHistory}
        title="Clear All History?"
        message="This will permanently delete all your saved prompts and conversion history. This action cannot be undone."
        confirmText="Clear All"
        variant="danger"
      />
    </>
  );
}

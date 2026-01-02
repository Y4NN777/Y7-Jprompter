'use client';

import { motion } from 'framer-motion';
import { History, Trash2, Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useConverterStore } from '@/stores/converterStore';
import { useNavigationStore } from '@/stores/navigationStore';

export function HistoryView() {
  const { history, removeFromHistory, clearHistory, loadFromHistory } = useConverterStore();
  const { setCurrentView } = useNavigationStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = history.filter(item =>
    item.input.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLoadEntry = (entry: typeof history[0]) => {
    loadFromHistory(entry);
    setCurrentView('converter');
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center">
            <History className="w-5 h-5 text-[var(--accent-primary)]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Conversion History</h1>
            <p className="text-sm text-[var(--text-muted)]">{history.length} conversions saved</p>
          </div>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--accent-error)] hover:bg-[var(--accent-error)]/10 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      {history.length > 0 && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history..."
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
          />
        </div>
      )}

      {/* History List */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-3">
          {filteredHistory.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 hover:border-[var(--accent-primary-subtle)] transition-all cursor-pointer"
              onClick={() => handleLoadEntry(entry)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-primary)] line-clamp-2 mb-2">
                    {entry.input.text}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(entry.timestamp)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(entry.timestamp)}
                    </span>
                    <span className="px-2 py-0.5 bg-[var(--bg-secondary)] rounded-full">
                      Level {entry.input.complexity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromHistory(entry.id);
                    }}
                    className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-error)] hover:bg-[var(--accent-error)]/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ArrowRight className="w-4 h-4 text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
            <History className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
            {searchQuery ? 'No results found' : 'No history yet'}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            {searchQuery ? 'Try a different search term' : 'Your conversion history will appear here'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setCurrentView('converter')}
              className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start Converting
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

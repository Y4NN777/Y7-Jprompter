'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Download,
  Check,
  Code,
  FileText,
  GitCompare,
  HelpCircle,
  Edit3,
  Save,
  X,
  Wand2,
  Maximize2,
  Eye,
  EyeOff,
  Share2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useConverterStore } from '@/stores/converterStore';
import { D3ForceGraph } from '@/components/visualization/D3ForceGraph';
import { JSONConstructionLoader } from './JSONConstructionLoader';
import type { ConceptNode } from '@/types';

interface OutputPanelProps {
  className?: string;
  showGraph?: boolean;
}

type TabType = 'json' | 'formatted' | 'diff';

// Animation variants
const springConfig = { type: 'spring' as const, stiffness: 400, damping: 30 };

export function OutputPanel({ className = '', showGraph = true }: OutputPanelProps) {
  const {
    jsonOutput,
    previousOutput,
    explanation,
    conceptGraph,
    activeOutputView,
    setActiveOutputView,
    setIsModalOpen,
    isLoading,
  } = useConverterStore();

  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJson, setEditedJson] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showFullscreenGraph, setShowFullscreenGraph] = useState(false);
  const [hideGraphControls, setHideGraphControls] = useState(false);

  // Copy to clipboard
  const copyToClipboard = useCallback(async () => {
    if (!jsonOutput) return;

    try {
      await navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [jsonOutput]);

  // Download JSON
  const downloadJSON = useCallback(() => {
    if (!jsonOutput) return;

    const blob = new Blob([JSON.stringify(jsonOutput, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `y7-jprompter-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 2000);
  }, [jsonOutput]);

  // Start editing
  const startEditing = () => {
    if (jsonOutput) {
      setEditedJson(JSON.stringify(jsonOutput, null, 2));
      setIsEditing(true);
    }
  };

  // Save edited JSON
  const saveEdit = () => {
    try {
      const parsed = JSON.parse(editedJson);
      useConverterStore.getState().setJsonOutput(parsed);
      setIsEditing(false);
    } catch (err) {
      // Invalid JSON - keep editing
      console.error('Invalid JSON:', err);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setEditedJson('');
  };

  // Refine the current JSON (resubmit for improvement)
  const refineJson = async () => {
    if (!jsonOutput) return;

    const currentJson = isEditing ? editedJson : JSON.stringify(jsonOutput, null, 2);

    // Save edits first if editing
    if (isEditing) {
      try {
        const parsed = JSON.parse(editedJson);
        useConverterStore.getState().setJsonOutput(parsed);
        setIsEditing(false);
      } catch {
        toast.error('Invalid JSON - please fix before refining');
        return;
      }
    }

    // Set the JSON as the new input and convert
    const store = useConverterStore.getState();
    store.setInputText(`Refine and improve this JSON prompt structure:\n\n${currentJson}`);

    toast.promise(store.convert(), {
      loading: 'Refining JSON structure...',
      success: 'Refined successfully!',
      error: 'Refinement failed',
    });
  };

  // Handle node click from graph
  const handleNodeClick = (node: ConceptNode) => {
    setSelectedNodeId(node.id === selectedNodeId ? null : node.id);
  };

  // Tabs configuration
  const tabs: { id: TabType; label: string; icon: React.ReactNode; disabled?: boolean }[] = [
    { id: 'json', label: 'JSON', icon: <Code className="h-4 w-4" /> },
    { id: 'formatted', label: 'Formatted', icon: <FileText className="h-4 w-4" /> },
    {
      id: 'diff',
      label: 'Diff',
      icon: <GitCompare className="h-4 w-4" />,
      disabled: !previousOutput,
    },
  ];

  // Loading state with JSON construction animation
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`h-full flex items-center justify-center p-3 md:p-6 card ${className} overflow-y-auto`}
      >
        <JSONConstructionLoader />
      </motion.div>
    );
  }

  // Empty state
  if (!jsonOutput) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`h-full flex flex-col items-center justify-center p-6 card ${className}`}
      >
        <div className="text-center">
          <Code className="h-10 w-10 text-[var(--text-muted)] mx-auto mb-4 opacity-50" />
          <h3 className="text-base font-medium text-[var(--text-secondary)] mb-2">
            No Output Yet
          </h3>
          <p className="text-sm text-[var(--text-muted)] max-w-[250px]">
            Enter a prompt and click <span className="text-[var(--accent-primary)] font-medium">Convert</span> to see the JSON structure
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      className={`h-full md:h-full flex flex-col card overflow-hidden ${className}`}
      data-tour="output-panel"
    >
      {/* Header with enhanced animated tabs */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
        {/* Animated Tabs with sliding indicator */}
        <div className="relative flex gap-1 p-1 bg-[var(--bg-tertiary)] rounded-lg" data-tour="output-tabs">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveOutputView(tab.id)}
              disabled={tab.disabled}
              whileHover={!tab.disabled ? { scale: 1.05 } : {}}
              whileTap={!tab.disabled ? { scale: 0.95 } : {}}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                transition-colors duration-200 z-10
                ${
                  activeOutputView === tab.id
                    ? 'text-white'
                    : tab.disabled
                    ? 'text-[var(--text-disabled)] cursor-not-allowed'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              {/* Animated background for active tab */}
              {activeOutputView === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-md shadow-lg"
                  transition={springConfig}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </motion.button>
          ))}
        </div>

        {/* Action Buttons - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex items-center gap-2">
          {/* Explain button */}
          {explanation && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-ghost p-2 rounded-lg"
              title="Why this structure?"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          )}

          {/* Edit/Save buttons */}
          {isEditing ? (
            <>
              <button
                onClick={saveEdit}
                className="btn-ghost p-2 rounded-lg text-[var(--accent-success)]"
                title="Save changes"
              >
                <Save className="h-5 w-5" />
              </button>
              <button
                onClick={cancelEdit}
                className="btn-ghost p-2 rounded-lg text-[var(--color-error)]"
                title="Cancel"
              >
                <X className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button
              onClick={startEditing}
              className="btn-ghost p-2 rounded-lg"
              title="Edit JSON"
            >
              <Edit3 className="h-5 w-5" />
            </button>
          )}

          {/* Refine button */}
          <button
            onClick={refineJson}
            className="btn-ghost p-2 rounded-lg hover:text-[var(--accent-primary)]"
            title="Refine & improve this JSON"
          >
            <Wand2 className="h-5 w-5" />
          </button>

          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            className="btn-ghost p-2 rounded-lg"
            title="Copy to clipboard"
          >
            {copySuccess ? (
              <Check className="h-5 w-5 text-[var(--accent-success)]" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>

          {/* Download button */}
          <button
            onClick={downloadJSON}
            className="btn-ghost p-2 rounded-lg"
            title="Download JSON"
          >
            {downloadSuccess ? (
              <Check className="h-5 w-5 text-[var(--accent-success)]" />
            ) : (
              <Download className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-auto md:overflow-hidden">
        {/* Left: Output views */}
        <div className="min-h-[500px] md:min-h-0 md:flex-1 overflow-auto p-4 md:border-r border-b md:border-b-0 border-[var(--border-subtle)]">
          <AnimatePresence mode="wait">
            {/* JSON View */}
            {activeOutputView === 'json' && (
              <motion.div
                key="json"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {isEditing ? (
                  <textarea
                    value={editedJson}
                    onChange={(e) => setEditedJson(e.target.value)}
                    className="w-full h-full p-4 font-mono text-sm
                      bg-[var(--code-bg)] text-[var(--code-text)]
                      rounded-lg border border-[var(--border-default)]
                      focus:border-[var(--accent-primary)] focus:outline-none
                      resize-none"
                    spellCheck={false}
                  />
                ) : (
                  <pre className="code-block h-full overflow-auto whitespace-pre-wrap">
                    {JSON.stringify(jsonOutput, null, 2)}
                  </pre>
                )}
              </motion.div>
            )}

            {/* Formatted View */}
            {activeOutputView === 'formatted' && (
              <motion.div
                key="formatted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full overflow-auto"
              >
                <FormattedView data={jsonOutput} />
              </motion.div>
            )}

            {/* Diff View */}
            {activeOutputView === 'diff' && previousOutput && (
              <motion.div
                key="diff"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full overflow-auto"
              >
                <DiffView previous={previousOutput} current={jsonOutput} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: D3 Graph */}
        {showGraph && conceptGraph && (
          <div className="w-full h-[700px] md:w-1/2 md:h-auto bg-[var(--bg-tertiary)] relative">
            {/* Graph control buttons */}
            <div className="absolute top-2 right-2 z-20 flex gap-2">
              <button
                onClick={() => setHideGraphControls(!hideGraphControls)}
                className="p-2 bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] rounded-lg shadow-lg border border-[var(--border-default)] transition-colors"
                title={hideGraphControls ? 'Show controls' : 'Hide controls'}
              >
                {hideGraphControls ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setShowFullscreenGraph(true)}
                className="p-2 bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] rounded-lg shadow-lg border border-[var(--border-default)] transition-colors"
                title="Open fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
            <D3ForceGraph
              graph={conceptGraph}
              onNodeClick={handleNodeClick}
              selectedNodeId={selectedNodeId}
              className="h-full"
              hideControls={hideGraphControls}
            />
          </div>
        )}
      </div>

      {/* Mobile Action Bar - Sticky bottom bar for touch-friendly controls */}
      <div className="md:hidden flex-shrink-0 border-t border-[var(--border-subtle)] bg-[var(--bg-card)] p-3">
        <div className="flex items-center justify-around gap-2">
          {/* Copy - Primary action */}
          <button
            onClick={copyToClipboard}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl bg-[var(--accent-primary)] text-white active:scale-95 transition-transform"
          >
            {copySuccess ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
            <span className="text-xs font-medium">{copySuccess ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Download */}
          <button
            onClick={downloadJSON}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] active:scale-95 transition-transform"
          >
            {downloadSuccess ? (
              <Check className="h-5 w-5 text-[var(--accent-success)]" />
            ) : (
              <Download className="h-5 w-5" />
            )}
            <span className="text-xs font-medium">{downloadSuccess ? 'Saved!' : 'Download'}</span>
          </button>

          {/* Edit */}
          <button
            onClick={isEditing ? saveEdit : startEditing}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] active:scale-95 transition-transform"
          >
            {isEditing ? (
              <Save className="h-5 w-5 text-[var(--accent-success)]" />
            ) : (
              <Edit3 className="h-5 w-5" />
            )}
            <span className="text-xs font-medium">{isEditing ? 'Save' : 'Edit'}</span>
          </button>

          {/* Refine */}
          <button
            onClick={refineJson}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] active:scale-95 transition-transform"
          >
            <Wand2 className="h-5 w-5" />
            <span className="text-xs font-medium">Refine</span>
          </button>

          {/* Graph - Only if graph is available */}
          {conceptGraph && (
            <button
              onClick={() => setShowFullscreenGraph(true)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] active:scale-95 transition-transform"
            >
              <Maximize2 className="h-5 w-5" />
              <span className="text-xs font-medium">Graph</span>
            </button>
          )}
        </div>
      </div>

      {/* Copy success toast - Desktop only */}
      <AnimatePresence>
        {copySuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2
              bg-[var(--accent-success)] text-[var(--text-inverse)]
              rounded-lg shadow-lg items-center gap-2"
          >
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">Copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Graph Modal */}
      <AnimatePresence>
        {showFullscreenGraph && conceptGraph && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-primary)] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Concept Graph - Fullscreen View
              </h2>
              <button
                onClick={() => setShowFullscreenGraph(false)}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                title="Close fullscreen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="flex-1 relative bg-[var(--bg-tertiary)]">
              <D3ForceGraph
                graph={conceptGraph}
                onNodeClick={handleNodeClick}
                selectedNodeId={selectedNodeId}
                className="h-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Formatted view component - renders JSON as structured cards with animations
 */
function FormattedView({ data }: { data: Record<string, unknown> }) {
  const renderValue = (value: unknown, depth = 0, key = ''): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-[var(--text-muted)]">null</span>;
    }

    if (typeof value === 'string') {
      return <span className="text-[var(--code-string)]">&quot;{value}&quot;</span>;
    }

    if (typeof value === 'number') {
      return <span className="text-[var(--code-number)]">{value}</span>;
    }

    if (typeof value === 'boolean') {
      return (
        <span className="text-[var(--code-keyword)]">
          {value ? 'true' : 'false'}
        </span>
      );
    }

    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside ml-4 space-y-1">
          {value.map((item, i) => (
            <li key={i}>{renderValue(item, depth + 1, `${key}-${i}`)}</li>
          ))}
        </ul>
      );
    }

    if (typeof value === 'object') {
      return (
        <div className={`${depth > 0 ? 'ml-4 mt-2' : ''} space-y-2`}>
          {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
            <div
              key={k}
              className="p-3 bg-[var(--bg-tertiary)] rounded-lg"
            >
              <span className="text-sm font-medium text-[var(--accent-primary)]">
                {k}:
              </span>
              <div className="mt-1">{renderValue(v, depth + 1, k)}</div>
            </div>
          ))}
        </div>
      );
    }

    return String(value);
  };

  return (
    <div className="space-y-3">
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)]"
        >
          <h4 className="text-sm font-semibold text-[var(--accent-primary)] mb-2 capitalize">
            {key.replace(/_/g, ' ')}
          </h4>
          <div className="text-sm text-[var(--text-primary)]">
            {renderValue(value, 0, key)}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Diff view component - shows changes between previous and current output
 */
function DiffView({
  previous,
  current,
}: {
  previous: Record<string, unknown>;
  current: Record<string, unknown>;
}) {
  const prevStr = JSON.stringify(previous, null, 2).split('\n');
  const currStr = JSON.stringify(current, null, 2).split('\n');

  // Simple line-by-line diff
  const maxLines = Math.max(prevStr.length, currStr.length);
  const diffLines: { type: 'same' | 'removed' | 'added'; content: string }[] = [];

  for (let i = 0; i < maxLines; i++) {
    const prevLine = prevStr[i] || '';
    const currLine = currStr[i] || '';

    if (prevLine === currLine) {
      diffLines.push({ type: 'same', content: currLine });
    } else {
      if (prevLine) {
        diffLines.push({ type: 'removed', content: prevLine });
      }
      if (currLine) {
        diffLines.push({ type: 'added', content: currLine });
      }
    }
  }

  return (
    <div className="font-mono text-sm">
      {diffLines.map((line, i) => (
        <div
          key={i}
          className={`px-4 py-0.5 ${
            line.type === 'removed'
              ? 'bg-[var(--color-error-subtle)] text-[var(--color-error)]'
              : line.type === 'added'
              ? 'bg-[var(--accent-success-subtle)] text-[var(--accent-success)]'
              : 'text-[var(--text-secondary)]'
          }`}
        >
          <span className="inline-block w-6 text-[var(--text-muted)]">
            {line.type === 'removed' ? '-' : line.type === 'added' ? '+' : ' '}
          </span>
          {line.content}
        </div>
      ))}
    </div>
  );
}

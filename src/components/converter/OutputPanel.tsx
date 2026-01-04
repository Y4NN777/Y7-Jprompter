'use client';

import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  Network,
  Circle,
  GitBranch,
  Boxes,
} from 'lucide-react';
import { toast } from 'sonner';
import { useConverterStore } from '@/stores/converterStore';
import { D3ForceGraph } from '@/components/visualization/D3ForceGraph';
import { JSONConstructionLoader } from './JSONConstructionLoader';
import type { ConceptNode, ConceptGraph } from '@/types';

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
      <div className="flex-1 flex flex-col md:flex-row overflow-auto md:overflow-hidden min-h-0">
        {/* Left: Output views */}
        <div className="flex-1 min-h-0 overflow-auto p-4 md:border-r border-[var(--border-subtle)]">
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

        {/* Right: D3 Graph - Hidden on mobile, use fullscreen button instead */}
        {showGraph && conceptGraph && (
          <div className="hidden md:block md:w-1/2 md:h-auto bg-[var(--bg-tertiary)] relative">
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

      {/* Mobile Radial Action Menu - Rendered via portal to escape overflow clipping */}
      <MobileRadialMenuPortal
        copyToClipboard={copyToClipboard}
        copySuccess={copySuccess}
        downloadJSON={downloadJSON}
        downloadSuccess={downloadSuccess}
        isEditing={isEditing}
        saveEdit={saveEdit}
        startEditing={startEditing}
        refineJson={refineJson}
        openGraph={() => setShowFullscreenGraph(true)}
      />

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

      {/* Fullscreen Modal - Graph + Views switcher for mobile */}
      <AnimatePresence>
        {showFullscreenGraph && (
          <FullscreenModal
            conceptGraph={conceptGraph}
            jsonOutput={jsonOutput}
            previousOutput={previousOutput}
            selectedNodeId={selectedNodeId}
            onNodeClick={handleNodeClick}
            onClose={() => setShowFullscreenGraph(false)}
          />
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

/**
 * Fullscreen Modal with view switcher for mobile
 */
type FullscreenViewType = 'graph' | 'json' | 'formatted' | 'diff';
type GraphLayoutType = 'force' | 'radial' | 'hierarchy' | 'cluster';

const GRAPH_LAYOUTS: { id: GraphLayoutType; icon: React.ReactNode; label: string }[] = [
  { id: 'force', icon: <Network className="w-4 h-4" />, label: 'Force' },
  { id: 'radial', icon: <Circle className="w-4 h-4" />, label: 'Radial' },
  { id: 'hierarchy', icon: <GitBranch className="w-4 h-4" />, label: 'Tree' },
  { id: 'cluster', icon: <Boxes className="w-4 h-4" />, label: 'Cluster' },
];

interface FullscreenModalProps {
  conceptGraph: ConceptGraph | null;
  jsonOutput: Record<string, unknown> | null;
  previousOutput: Record<string, unknown> | null;
  selectedNodeId: string | null;
  onNodeClick: (node: ConceptNode) => void;
  onClose: () => void;
}

function FullscreenModal({
  conceptGraph,
  jsonOutput,
  previousOutput,
  selectedNodeId,
  onNodeClick,
  onClose,
}: FullscreenModalProps) {
  const [activeView, setActiveView] = useState<FullscreenViewType>('graph');
  const [graphLayout, setGraphLayout] = useState<GraphLayoutType>('force');

  const viewTabs: { id: FullscreenViewType; label: string; icon: React.ReactNode; disabled?: boolean }[] = [
    { id: 'graph', label: 'Graph', icon: <Share2 className="h-4 w-4" />, disabled: !conceptGraph },
    { id: 'json', label: 'JSON', icon: <Code className="h-4 w-4" /> },
    { id: 'formatted', label: 'Format', icon: <FileText className="h-4 w-4" /> },
    { id: 'diff', label: 'Diff', icon: <GitCompare className="h-4 w-4" />, disabled: !previousOutput },
  ];

  // Cycle through graph layouts
  const cycleLayout = () => {
    const currentIndex = GRAPH_LAYOUTS.findIndex(l => l.id === graphLayout);
    const nextIndex = (currentIndex + 1) % GRAPH_LAYOUTS.length;
    setGraphLayout(GRAPH_LAYOUTS[nextIndex].id);
  };

  const currentLayoutInfo = GRAPH_LAYOUTS.find(l => l.id === graphLayout);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[var(--bg-primary)] flex flex-col"
    >
      {/* Modal Header with Close button */}
      <div className="flex items-center justify-between p-3 border-b border-[var(--border-subtle)]">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">
          Output View
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* View Tabs */}
      <div className="flex gap-1 p-2 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
        {viewTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveView(tab.id)}
            disabled={tab.disabled}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-medium transition-all ${
              activeView === tab.id
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : tab.disabled
                ? 'text-[var(--text-disabled)] cursor-not-allowed'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Graph Layout Selector - Only show when graph tab is active */}
      {activeView === 'graph' && conceptGraph && (
        <div className="flex items-center justify-between px-3 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)]">
          <span className="text-xs text-[var(--text-muted)]">
            {conceptGraph.nodes.length} nodes
          </span>
          <div className="flex gap-1">
            {GRAPH_LAYOUTS.map((layout) => (
              <button
                key={layout.id}
                onClick={() => setGraphLayout(layout.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  graphLayout === layout.id
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
                title={layout.label}
              >
                {layout.icon}
                <span className="hidden sm:inline">{layout.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeView === 'graph' && conceptGraph && (
            <motion.div
              key={`graph-${graphLayout}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full bg-[var(--bg-tertiary)]"
            >
              <D3ForceGraph
                graph={conceptGraph}
                onNodeClick={onNodeClick}
                selectedNodeId={selectedNodeId}
                className="h-full"
                hideControls={true}
                initialLayout={graphLayout}
              />
            </motion.div>
          )}

          {activeView === 'json' && jsonOutput && (
            <motion.div
              key="json"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-auto p-4"
            >
              <pre className="code-block h-full overflow-auto whitespace-pre-wrap text-sm">
                {JSON.stringify(jsonOutput, null, 2)}
              </pre>
            </motion.div>
          )}

          {activeView === 'formatted' && jsonOutput && (
            <motion.div
              key="formatted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-auto p-4"
            >
              <FormattedView data={jsonOutput} />
            </motion.div>
          )}

          {activeView === 'diff' && previousOutput && jsonOutput && (
            <motion.div
              key="diff"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-auto p-4"
            >
              <DiffView previous={previousOutput} current={jsonOutput} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/**
 * Portal wrapper for MobileRadialMenu to escape overflow clipping
 */
function MobileRadialMenuPortal(props: MobileRadialMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <MobileRadialMenu {...props} />,
    document.body
  );
}

/**
 * Mobile Radial Action Menu - Floating FAB with radial expansion
 */
interface MobileRadialMenuProps {
  copyToClipboard: () => void;
  copySuccess: boolean;
  downloadJSON: () => void;
  downloadSuccess: boolean;
  isEditing: boolean;
  saveEdit: () => void;
  startEditing: () => void;
  refineJson: () => void;
  openGraph: () => void;
}

function MobileRadialMenu({
  copyToClipboard,
  copySuccess,
  downloadJSON,
  downloadSuccess,
  isEditing,
  saveEdit,
  startEditing,
  refineJson,
  openGraph,
}: MobileRadialMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: copySuccess ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />,
      label: copySuccess ? 'Copied!' : 'Copy',
      onClick: copyToClipboard,
      primary: true,
    },
    {
      icon: downloadSuccess ? <Check className="h-5 w-5" /> : <Download className="h-5 w-5" />,
      label: downloadSuccess ? 'Saved!' : 'Download',
      onClick: downloadJSON,
    },
    {
      icon: isEditing ? <Save className="h-5 w-5" /> : <Edit3 className="h-5 w-5" />,
      label: isEditing ? 'Save' : 'Edit',
      onClick: isEditing ? saveEdit : startEditing,
    },
    {
      icon: <Wand2 className="h-5 w-5" />,
      label: 'Refine',
      onClick: refineJson,
    },
    {
      icon: <Maximize2 className="h-5 w-5" />,
      label: 'Expand',
      onClick: openGraph,
    },
  ];

  // Radial positions - arc going UP and LEFT from bottom-right FAB
  const getRadialPosition = (index: number, total: number) => {
    // Arc from 180° (left) to 90° (up) - all positions stay on screen
    const startAngle = 180; // Left
    const endAngle = 90; // Up
    const angleRange = startAngle - endAngle;
    const angle = startAngle - (angleRange / (total - 1)) * index;
    const radians = (angle * Math.PI) / 180;
    const radius = 150; // Distance from center - increased for better spacing
    return {
      x: Math.cos(radians) * radius,
      y: -Math.sin(radians) * radius, // Negative because CSS Y is inverted
    };
  };

  return (
    <div className="md:hidden fixed bottom-6 right-6 z-[9999]">
      {/* Radial Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              style={{ zIndex: -1 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Action Buttons */}
            {actions.map((action, index) => {
              const pos = getRadialPosition(index, actions.length);
              // Tooltip position based on button position in arc
              // First buttons (left side) -> tooltip on top
              // Last buttons (top side) -> tooltip on left
              const isTopHalf = index >= actions.length / 2;
              const tooltipClass = isTopHalf
                ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' // Above button
                : 'right-full mr-2 top-1/2 -translate-y-1/2'; // Left of button

              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: pos.x,
                    y: pos.y,
                    transition: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                      delay: index * 0.04
                    }
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.3,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.15, delay: (actions.length - index) * 0.02 }
                  }}
                  onClick={() => {
                    action.onClick();
                    if (!action.label.includes('Copy') && !action.label.includes('Download')) {
                      setIsOpen(false);
                    }
                  }}
                  className={`absolute w-11 h-11 rounded-full flex items-center justify-center shadow-lg active:scale-95 ${
                    action.primary
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {action.icon}
                  {/* Tooltip - positioned dynamically based on button position */}
                  <span className={`absolute px-2 py-1 text-xs font-medium bg-[var(--bg-card)] text-[var(--text-primary)] rounded-md whitespace-nowrap shadow-md border border-[var(--border-subtle)] ${tooltipClass}`}>
                    {action.label}
                  </span>
                </motion.button>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-[var(--accent-primary)] text-white"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Code className="h-6 w-6" />}
        </motion.div>
      </motion.button>
    </div>
  );
}

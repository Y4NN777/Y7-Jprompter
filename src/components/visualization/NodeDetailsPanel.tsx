'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Link2, ArrowRight, ArrowLeft, Copy, Maximize2, Layers, Activity,
  User, Target, Lock, FileText, Send, Lightbulb, Tag, type LucideIcon
} from 'lucide-react';
import { toast } from 'sonner';
import type { ConceptNode, ConceptGraph, ConceptCategory } from '@/types';

interface NodeDetailsPanelProps {
  node: ConceptNode | null;
  graph: ConceptGraph | null;
  onClose: () => void;
  onNodeSelect: (nodeId: string) => void;
}

// Category icons and colors
const CATEGORY_CONFIG: Record<ConceptCategory, { icon: LucideIcon; color: string; label: string }> = {
  persona: { icon: User, color: 'var(--node-persona)', label: 'Persona' },
  task: { icon: Target, color: 'var(--node-task)', label: 'Task' },
  constraints: { icon: Lock, color: 'var(--node-constraints)', label: 'Constraints' },
  context: { icon: FileText, color: 'var(--node-context)', label: 'Context' },
  output: { icon: Send, color: 'var(--node-output)', label: 'Output' },
  examples: { icon: Lightbulb, color: 'var(--node-examples)', label: 'Examples' },
  metadata: { icon: Tag, color: 'var(--node-metadata)', label: 'Metadata' },
};

export function NodeDetailsPanel({ node, graph, onClose, onNodeSelect }: NodeDetailsPanelProps) {
  if (!node || !graph) return null;

  const config = CATEGORY_CONFIG[node.category];

  // Find connected nodes
  const connections = graph.relationships.filter(r => {
    const sourceId = typeof r.source === 'string' ? r.source : r.source.id;
    const targetId = typeof r.target === 'string' ? r.target : r.target.id;
    return sourceId === node.id || targetId === node.id;
  });

  const incomingConnections = connections.filter(r => {
    const targetId = typeof r.target === 'string' ? r.target : r.target.id;
    return targetId === node.id;
  });

  const outgoingConnections = connections.filter(r => {
    const sourceId = typeof r.source === 'string' ? r.source : r.source.id;
    return sourceId === node.id;
  });

  const getNodeById = (id: string) => graph.nodes.find(n => n.id === id);

  const copyNodeInfo = () => {
    const info = `${node.label}\nCategory: ${config.label}\nWeight: ${Math.round(node.weight * 100)}%\n${node.description || ''}`;
    navigator.clipboard.writeText(info);
    toast.success('Node info copied');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute top-0 right-0 w-80 h-full bg-[var(--bg-card)] border-l border-[var(--border-subtle)] shadow-xl overflow-hidden flex flex-col z-20"
      >
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${config.color}20`, color: config.color }}
              >
                <config.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-[var(--text-primary)] truncate">
                  {node.label}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">{config.label}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 space-y-5">
          {/* Description */}
          {node.description && (
            <section>
              <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Description
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {node.description}
              </p>
            </section>
          )}

          {/* Stats with confidence */}
          <section>
            <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Properties
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                <div className="flex items-center gap-2 text-[var(--text-muted)] mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span className="text-xs">Weight</span>
                </div>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  {Math.round(node.weight * 100)}%
                </p>
                <div className="mt-1.5 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${node.weight * 100}%` }}
                  />
                </div>
              </div>
              <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                <div className="flex items-center gap-2 text-[var(--text-muted)] mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-xs">Depth</span>
                </div>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  Level {node.depth}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {node.depth === 0 ? 'Root' : node.depth === 1 ? 'Primary' : 'Secondary'}
                </p>
              </div>
              <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                <div className="flex items-center gap-2 text-[var(--text-muted)] mb-1">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="text-xs">Incoming</span>
                </div>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  {incomingConnections.length}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {incomingConnections.length === 0 ? 'Independent' : 'Dependencies'}
                </p>
              </div>
              <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                <div className="flex items-center gap-2 text-[var(--text-muted)] mb-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span className="text-xs">Outgoing</span>
                </div>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  {outgoingConnections.length}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {outgoingConnections.length === 0 ? 'Terminal' : 'Influences'}
                </p>
              </div>
            </div>
            
            {/* Confidence meter */}
            {node.confidence !== undefined && (
              <div className="mt-3 p-3 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-lg border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[var(--text-muted)]">Confidence</span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {Math.round(node.confidence * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                    style={{ width: `${node.confidence * 100}%` }}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Incoming Connections */}
          {incomingConnections.length > 0 && (
            <section>
              <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5" />
                Incoming ({incomingConnections.length})
              </h4>
              <div className="space-y-1.5">
                {incomingConnections.map((conn, i) => {
                  const sourceId = typeof conn.source === 'string' ? conn.source : conn.source.id;
                  const sourceNode = getNodeById(sourceId);
                  if (!sourceNode) return null;
                  const sourceConfig = CATEGORY_CONFIG[sourceNode.category];

                  return (
                    <button
                      key={i}
                      onClick={() => onNodeSelect(sourceId)}
                      className="w-full flex items-center gap-2 p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors text-left"
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: `${sourceConfig.color}20`, color: sourceConfig.color }}
                      >
                        <sourceConfig.icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--text-primary)] truncate font-medium">
                          {sourceNode.label}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            conn.type === 'requires' ? 'bg-blue-500/20 text-blue-400' :
                            conn.type === 'conflicts' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {conn.type}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">
                            {Math.round(conn.strength * 100)}% strength
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Outgoing Connections */}
          {outgoingConnections.length > 0 && (
            <section>
              <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5" />
                Outgoing ({outgoingConnections.length})
              </h4>
              <div className="space-y-1.5">
                {outgoingConnections.map((conn, i) => {
                  const targetId = typeof conn.target === 'string' ? conn.target : conn.target.id;
                  const targetNode = getNodeById(targetId);
                  if (!targetNode) return null;
                  const targetConfig = CATEGORY_CONFIG[targetNode.category];

                  return (
                    <button
                      key={i}
                      onClick={() => onNodeSelect(targetId)}
                      className="w-full flex items-center gap-2 p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors text-left"
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: `${targetConfig.color}20`, color: targetConfig.color }}
                      >
                        <targetConfig.icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--text-primary)] truncate font-medium">
                          {targetNode.label}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            conn.type === 'requires' ? 'bg-blue-500/20 text-blue-400' :
                            conn.type === 'conflicts' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {conn.type}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">
                            {Math.round(conn.strength * 100)}% strength
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* No connections */}
          {connections.length === 0 && (
            <section className="text-center py-4">
              <Link2 className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2 opacity-50" />
              <p className="text-sm text-[var(--text-muted)]">
                No connections to other nodes
              </p>
            </section>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-[var(--border-subtle)] flex gap-2">
          <button
            onClick={copyNodeInfo}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy Info
          </button>
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            Focus
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

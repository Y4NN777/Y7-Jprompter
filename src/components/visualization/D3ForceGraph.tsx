'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelRightOpen } from 'lucide-react';
import { NodeDetailsPanel } from './NodeDetailsPanel';
import { GraphControls, type LayoutType } from './GraphControls';
import {
  calculateRadialLayout,
  calculateHierarchyLayout,
  calculateClusterLayout,
} from './layouts';
import type { ConceptNode, ConceptGraph, ConceptCategory } from '@/types';

interface D3ForceGraphProps {
  graph: ConceptGraph | null;
  onNodeClick?: (node: ConceptNode) => void;
  onNodeHover?: (node: ConceptNode | null) => void;
  className?: string;
  selectedNodeId?: string | null;
  hideControls?: boolean;
}

// Category colors from theme
const CATEGORY_COLORS: Record<ConceptCategory, string> = {
  persona: 'var(--node-persona)',
  task: 'var(--node-task)',
  constraints: 'var(--node-constraints)',
  context: 'var(--node-context)',
  output: 'var(--node-output)',
  examples: 'var(--node-examples)',
  metadata: 'var(--node-metadata)',
};

// Edge styles for relationship types
const EDGE_STYLES = {
  influences: { dasharray: 'none', opacity: 0.6 },
  requires: { dasharray: '8,4', opacity: 0.5 },
  conflicts: { dasharray: '3,3', opacity: 0.4 },
};

// Extend D3 node type with simulation properties
interface SimulationNode extends ConceptNode {
  x: number;
  y: number;
  fx: number | null;
  fy: number | null;
  vx: number;
  vy: number;
}

interface SimulationLink {
  source: SimulationNode | string;
  target: SimulationNode | string;
  type: string;
  strength: number;
}

export function D3ForceGraph({
  graph,
  onNodeClick,
  onNodeHover,
  className = '',
  selectedNodeId,
  hideControls = false,
}: D3ForceGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [hoveredNode, setHoveredNode] = useState<ConceptNode | null>(null);
  const [transform, setTransform] = useState<d3.ZoomTransform | null>(null);
  const simulationRef = useRef<d3.Simulation<SimulationNode, SimulationLink> | null>(null);
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  
  // Layout and filter state
  const [currentLayout, setCurrentLayout] = useState<LayoutType>('force');
  const [categoryFilters, setCategoryFilters] = useState<Set<ConceptCategory>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Use prop or internal state for selection
  const activeSelectedId = selectedNodeId ?? internalSelectedId;
  const selectedNode = graph?.nodes.find(n => n.id === activeSelectedId) || null;

  // Filter nodes based on category and search
  const filteredGraph = useMemo(() => {
    if (!graph) return null;
    
    let filteredNodes = graph.nodes;
    
    // Apply category filter
    if (categoryFilters.size > 0) {
      filteredNodes = filteredNodes.filter(n => !categoryFilters.has(n.category));
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredNodes = filteredNodes.filter(n => 
        n.label.toLowerCase().includes(query) ||
        n.description?.toLowerCase().includes(query)
      );
    }
    
    // Filter relationships to only include those between visible nodes
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredRelationships = graph.relationships.filter(r => {
      const sourceId = typeof r.source === 'string' ? r.source : r.source.id;
      const targetId = typeof r.target === 'string' ? r.target : r.target.id;
      return nodeIds.has(sourceId) && nodeIds.has(targetId);
    });
    
    return {
      ...graph,
      nodes: filteredNodes,
      relationships: filteredRelationships,
    };
  }, [graph, categoryFilters, searchQuery]);

  // Toggle category filter
  const handleCategoryFilterToggle = useCallback((category: ConceptCategory) => {
    setCategoryFilters(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  // Handle resize
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setDimensions({ width, height });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Main D3 rendering effect
  useEffect(() => {
    if (!svgRef.current || !filteredGraph || !filteredGraph.nodes.length) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    // Clear previous content
    svg.selectAll('*').remove();

    // Create defs for filters and gradients
    const defs = svg.append('defs');

    // Glow filter
    const glowFilter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');

    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Create main group for zoom/pan
    const g = svg.append('g').attr('class', 'graph-container');

    // Setup zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setTransform(event.transform);
      });

    svg.call(zoom);

    // Prepare data based on layout type
    let nodes: SimulationNode[];
    const config = { width, height, padding: 50 };

    if (currentLayout === 'radial') {
      const layoutNodes = calculateRadialLayout(filteredGraph.nodes, config);
      nodes = layoutNodes.map(n => ({ ...n, vx: 0, vy: 0 })) as SimulationNode[];
    } else if (currentLayout === 'hierarchy') {
      const layoutNodes = calculateHierarchyLayout(filteredGraph.nodes, filteredGraph.relationships, config);
      nodes = layoutNodes.map(n => ({ ...n, vx: 0, vy: 0 })) as SimulationNode[];
    } else if (currentLayout === 'cluster') {
      const layoutNodes = calculateClusterLayout(filteredGraph.nodes, config);
      nodes = layoutNodes.map(n => ({ ...n, vx: 0, vy: 0 })) as SimulationNode[];
    } else {
      // Force layout - random initial positions
      nodes = filteredGraph.nodes.map((n) => ({
        ...n,
        x: width / 2 + (Math.random() - 0.5) * 100,
        y: height / 2 + (Math.random() - 0.5) * 100,
        fx: null,
        fy: null,
        vx: 0,
        vy: 0,
      }));
    }

    const links: SimulationLink[] = filteredGraph.relationships.map((r) => ({
      source: typeof r.source === 'string' ? r.source : r.source.id,
      target: typeof r.target === 'string' ? r.target : r.target.id,
      type: r.type,
      strength: r.strength,
    }));

    // Create force simulation (only active for force layout)
    const simulation = d3.forceSimulation<SimulationNode>(nodes);
    
    // Setup link force to resolve source/target references
    const linkForce = d3.forceLink<SimulationNode, SimulationLink>(links)
      .id((d) => d.id);
    
    if (currentLayout === 'force') {
      simulation
        .force('link', linkForce.distance(120).strength((d) => d.strength * 0.5))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide<SimulationNode>()
          .radius((d) => getNodeRadius(d) + 10));
    } else {
      // For static layouts, just resolve links then stop
      simulation
        .force('link', linkForce.distance(0).strength(0))
        .alpha(0)
        .stop();
      
      // Manually tick once to resolve link references
      simulation.tick();
    }

    simulationRef.current = simulation;


    // Draw edges with enhanced styling
    const linkGroup = g.append('g').attr('class', 'links');

    const linkElements = linkGroup.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (d) => {
        // Different colors for different relationship types
        if (d.type === 'requires') return 'var(--accent-primary)';
        if (d.type === 'conflicts') return 'var(--error)';
        return 'var(--text-muted)';
      })
      .attr('stroke-width', (d) => Math.max(1.5, d.strength * 3))
      .attr('stroke-dasharray', (d) => EDGE_STYLES[d.type as keyof typeof EDGE_STYLES]?.dasharray || 'none')
      .attr('opacity', (d) => EDGE_STYLES[d.type as keyof typeof EDGE_STYLES]?.opacity || 0.5)
      .attr('stroke-linecap', 'round')
      .style('transition', 'all 0.3s ease');

    // Draw nodes
    const nodeGroup = g.append('g').attr('class', 'nodes');

    const nodeElements = nodeGroup.selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('cursor', 'pointer')
      .call(d3.drag<SVGGElement, SimulationNode>()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded));

    // Node circles with enhanced styling
    nodeElements.append('circle')
      .attr('r', (d) => getNodeRadius(d))
      .attr('fill', (d) => CATEGORY_COLORS[d.category] || CATEGORY_COLORS.metadata)
      .attr('stroke', 'var(--bg-primary)')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#glow)')
      .style('transition', 'all 0.3s ease');

    // Node labels
    nodeElements.append('text')
      .text((d) => truncateLabel(d.label))
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'var(--text-inverse)')
      .attr('font-size', (d) => Math.max(10, 8 + d.weight * 4))
      .attr('font-weight', '500')
      .attr('pointer-events', 'none')
      .style('text-shadow', '0 1px 2px rgba(0,0,0,0.5)');

    // Interaction handlers
    nodeElements
      .on('mouseenter', function(event, d) {
        setHoveredNode(d);
        onNodeHover?.(d);

        // Highlight node
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', getNodeRadius(d) * 1.2);

        // Highlight connected edges
        linkElements
          .transition()
          .duration(200)
          .attr('opacity', (l) => {
            const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
            const targetId = typeof l.target === 'object' ? l.target.id : l.target;
            return sourceId === d.id || targetId === d.id ? 1 : 0.1;
          })
          .attr('stroke-width', (l) => {
            const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
            const targetId = typeof l.target === 'object' ? l.target.id : l.target;
            return sourceId === d.id || targetId === d.id ? l.strength * 4 : l.strength * 2;
          });
      })
      .on('mouseleave', function(event, d) {
        setHoveredNode(null);
        onNodeHover?.(null);

        // Reset node
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', getNodeRadius(d));

        // Reset edges
        linkElements
          .transition()
          .duration(200)
          .attr('opacity', (l) => EDGE_STYLES[l.type as keyof typeof EDGE_STYLES]?.opacity || 0.5)
          .attr('stroke-width', (l) => Math.max(1, l.strength * 3));
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        // Toggle selection
        if (internalSelectedId === d.id) {
          setInternalSelectedId(null);
          setShowDetailsPanel(false);
        } else {
          setInternalSelectedId(d.id);
          setShowDetailsPanel(true);
        }
        onNodeClick?.(d);
      });

    // Update positions on tick
    simulation.on('tick', () => {
      linkElements
        .attr('x1', (d) => (d.source as SimulationNode).x)
        .attr('y1', (d) => (d.source as SimulationNode).y)
        .attr('x2', (d) => (d.target as SimulationNode).x)
        .attr('y2', (d) => (d.target as SimulationNode).y);

      nodeElements.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });
    
    // For static layouts, set initial positions immediately
    if (currentLayout !== 'force') {
      // Set node positions
      nodeElements.attr('transform', (d) => `translate(${d.x},${d.y})`);
      
      // Set link positions - links now have resolved source/target objects
      linkElements
        .attr('x1', (d) => (d.source as SimulationNode).x)
        .attr('y1', (d) => (d.source as SimulationNode).y)
        .attr('x2', (d) => (d.target as SimulationNode).x)
        .attr('y2', (d) => (d.target as SimulationNode).y);
    }

    // Drag handlers
    function dragStarted(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [filteredGraph, dimensions, selectedNodeId, onNodeClick, onNodeHover, internalSelectedId, currentLayout]);

  // Handle node selection from details panel
  const handleNodeSelectFromPanel = useCallback((nodeId: string) => {
    setInternalSelectedId(nodeId);
  }, []);

  // Zoom controls
  const handleZoom = useCallback((scale: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(
      d3.zoom<SVGSVGElement, unknown>().scaleTo,
      scale
    );
  }, []);

  const handleReset = useCallback(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(500).call(
      d3.zoom<SVGSVGElement, unknown>().transform,
      d3.zoomIdentity
    );

    // Restart simulation
    if (simulationRef.current) {
      simulationRef.current.alpha(0.3).restart();
    }
  }, []);

  const handleFitToView = useCallback(() => {
    if (!svgRef.current || !graph?.nodes.length) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    // Calculate bounds
    const nodes = svg.selectAll<SVGGElement, SimulationNode>('.node').data();
    if (!nodes.length) return;

    const xs = nodes.map((n) => n.x);
    const ys = nodes.map((n) => n.y);
    const minX = Math.min(...xs) - 50;
    const maxX = Math.max(...xs) + 50;
    const minY = Math.min(...ys) - 50;
    const maxY = Math.max(...ys) + 50;

    const graphWidth = maxX - minX;
    const graphHeight = maxY - minY;
    const scale = Math.min(width / graphWidth, height / graphHeight, 2) * 0.9;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    svg.transition().duration(500).call(
      d3.zoom<SVGSVGElement, unknown>().transform,
      d3.zoomIdentity
        .translate(width / 2 - centerX * scale, height / 2 - centerY * scale)
        .scale(scale)
    );
  }, [dimensions, filteredGraph]);

  // Empty state
  if (!graph || !graph.nodes.length) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center h-full bg-[var(--bg-secondary)] rounded-lg ${className}`}
      >
        <p className="text-[var(--text-muted)]">
          Convert a prompt to see the concept graph
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full bg-[var(--bg-secondary)] rounded-lg"
      />

      {/* Graph Controls - Unified floating toolbar */}
      {!hideControls && (
        <GraphControls
          currentLayout={currentLayout}
          onLayoutChange={setCurrentLayout}
          categoryFilters={categoryFilters}
          onCategoryFilterToggle={handleCategoryFilterToggle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          nodeCount={filteredGraph?.nodes.length || 0}
          onZoomIn={() => handleZoom((transform?.k || 1) * 1.3)}
          onZoomOut={() => handleZoom((transform?.k || 1) / 1.3)}
          onFitToView={handleFitToView}
          onReset={handleReset}
        />
      )}

      {/* Tooltip - repositioned to avoid controls */}
      <AnimatePresence>
        {hoveredNode && !showDetailsPanel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 p-4 bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] shadow-lg max-w-xs"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[hoveredNode.category] }}
              />
              <h4 className="font-semibold text-[var(--text-primary)]">
                {hoveredNode.label}
              </h4>
            </div>
            <p className="text-sm text-[var(--text-secondary)] capitalize mb-1">
              {hoveredNode.category}
            </p>
            <div className="flex gap-4 text-xs text-[var(--text-muted)]">
              <span>Weight: {Math.round(hoveredNode.weight * 100)}%</span>
              <span>Depth: {hoveredNode.depth}</span>
            </div>
            {hoveredNode.description && (
              <p className="text-xs text-[var(--text-muted)] mt-2 border-t border-[var(--border-subtle)] pt-2">
                {hoveredNode.description}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bifurcation indicator */}
      {graph.bifurcated && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--accent-secondary)] text-[var(--text-inverse)] text-xs font-medium rounded-full">
          Bifurcated View
        </div>
      )}

      {/* Details Panel Toggle */}
      {selectedNode && !showDetailsPanel && (
        <button
          onClick={() => setShowDetailsPanel(true)}
          className="absolute top-4 right-16 btn-ghost p-2 rounded-lg bg-[var(--accent-primary)] text-white border border-[var(--accent-primary)]"
          title="Show node details"
        >
          <PanelRightOpen className="h-4 w-4" />
        </button>
      )}

      {/* Node Details Panel */}
      {showDetailsPanel && (
        <NodeDetailsPanel
          node={selectedNode}
          graph={graph}
          onClose={() => setShowDetailsPanel(false)}
          onNodeSelect={handleNodeSelectFromPanel}
        />
      )}
    </div>
  );
}

// Helper functions
function getNodeRadius(node: ConceptNode): number {
  const baseRadius = 20;
  const weightBonus = node.weight * 15;
  const depthPenalty = node.depth * 3;
  return Math.max(15, baseRadius + weightBonus - depthPenalty);
}

function truncateLabel(label: string, maxLength = 12): string {
  if (label.length <= maxLength) return label;
  return label.slice(0, maxLength - 1) + '…';
}

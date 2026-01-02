/**
 * Graph Layout Algorithms
 * Different layout strategies for the concept graph
 */

import type { ConceptNode, ConceptRelationship, ConceptCategory } from '@/types';

export interface LayoutNode extends ConceptNode {
  x: number;
  y: number;
  fx: number | null;
  fy: number | null;
}

export interface LayoutConfig {
  width: number;
  height: number;
  padding?: number;
}

interface TreeNode {
  id: string;
  data: ConceptNode | null;
  children?: TreeNode[];
  x?: number;
  y?: number;
}

/**
 * Radial layout - nodes arranged in concentric circles by depth
 */
export function calculateRadialLayout(
  nodes: ConceptNode[],
  config: LayoutConfig
): LayoutNode[] {
  const { width, height, padding = 50 } = config;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2 - padding;

  // Group nodes by depth
  const depthGroups = new Map<number, ConceptNode[]>();
  let maxDepth = 0;

  nodes.forEach((node) => {
    const depth = node.depth;
    maxDepth = Math.max(maxDepth, depth);
    if (!depthGroups.has(depth)) {
      depthGroups.set(depth, []);
    }
    depthGroups.get(depth)!.push(node);
  });

  // Calculate positions
  const layoutNodes: LayoutNode[] = [];

  depthGroups.forEach((groupNodes, depth) => {
    const radius = maxDepth === 0 ? 0 : (depth / maxDepth) * maxRadius;
    const angleStep = (2 * Math.PI) / groupNodes.length;
    const startAngle = -Math.PI / 2; // Start from top

    groupNodes.forEach((node, i) => {
      const angle = startAngle + i * angleStep;
      layoutNodes.push({
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        fx: null,
        fy: null,
      });
    });
  });

  return layoutNodes;
}

/**
 * Hierarchical/Tree layout - top-down or left-right tree structure
 */
export function calculateHierarchyLayout(
  nodes: ConceptNode[],
  relationships: ConceptRelationship[],
  config: LayoutConfig
): LayoutNode[] {
  const { width, height, padding = 50 } = config;

  // Find root nodes (depth 0 or nodes with no incoming edges)
  const incomingCount = new Map<string, number>();
  nodes.forEach((n) => incomingCount.set(n.id, 0));

  relationships.forEach((r) => {
    const targetId = typeof r.target === 'string' ? r.target : r.target.id;
    incomingCount.set(targetId, (incomingCount.get(targetId) || 0) + 1);
  });

  // Build hierarchy data
  const rootNodes = nodes.filter((n) => n.depth === 0 || incomingCount.get(n.id) === 0);
  
  if (rootNodes.length === 0) {
    // Fallback: use node with highest weight as root
    const sorted = [...nodes].sort((a, b) => b.weight - a.weight);
    rootNodes.push(sorted[0]);
  }

  // Create adjacency list
  const children = new Map<string, string[]>();
  nodes.forEach((n) => children.set(n.id, []));

  relationships.forEach((r) => {
    const sourceId = typeof r.source === 'string' ? r.source : r.source.id;
    const targetId = typeof r.target === 'string' ? r.target : r.target.id;
    if (children.has(sourceId)) {
      children.get(sourceId)!.push(targetId);
    }
  });

  // Build tree structure
  const buildTree = (nodeId: string, visited: Set<string>): TreeNode | null => {
    if (visited.has(nodeId)) return null;
    visited.add(nodeId);

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return null;

    const childNodes = (children.get(nodeId) || [])
      .map((childId) => buildTree(childId, visited))
      .filter((child): child is TreeNode => child !== null);

    return {
      id: nodeId,
      data: node,
      children: childNodes.length > 0 ? childNodes : undefined,
    };
  };

  // Create a virtual root if multiple roots
  const visited = new Set<string>();
  const treeData: TreeNode | null = rootNodes.length === 1
    ? buildTree(rootNodes[0].id, visited)
    : {
        id: '__root__',
        data: null,
        children: rootNodes
          .map((r) => buildTree(r.id, visited))
          .filter((child): child is TreeNode => child !== null),
      };

  if (!treeData) {
    // Fallback to simple grid if tree fails
    return calculateGridLayout(nodes, config);
  }

  // Calculate tree layout manually (without d3.hierarchy)
  const treeWidth = width - padding * 2;
  const treeHeight = height - padding * 2;

  // Calculate max depth
  const getMaxDepth = (node: TreeNode, depth: number): number => {
    if (!node.children || node.children.length === 0) return depth;
    return Math.max(...node.children.map((c) => getMaxDepth(c, depth + 1)));
  };
  const maxDepth = getMaxDepth(treeData, 0);

  // Calculate positions using a simple tree layout algorithm
  const positions = new Map<string, { x: number; y: number }>();
  let leafIndex = 0;

  // Count leaves first
  const countLeaves = (node: TreeNode): number => {
    if (!node.children || node.children.length === 0) return 1;
    return node.children.reduce((sum, c) => sum + countLeaves(c), 0);
  };
  const totalLeaves = countLeaves(treeData);

  // Position nodes
  const positionNode = (node: TreeNode, depth: number): { min: number; max: number } => {
    const y = maxDepth === 0 ? treeHeight / 2 : (depth / maxDepth) * treeHeight;

    if (!node.children || node.children.length === 0) {
      const x = totalLeaves === 1 
        ? treeWidth / 2 
        : (leafIndex / (totalLeaves - 1)) * treeWidth;
      leafIndex++;
      if (node.id !== '__root__') {
        positions.set(node.id, { x: x + padding, y: y + padding });
      }
      return { min: x, max: x };
    }

    const ranges = node.children.map((c) => positionNode(c, depth + 1));
    const minX = Math.min(...ranges.map((r) => r.min));
    const maxX = Math.max(...ranges.map((r) => r.max));
    const x = (minX + maxX) / 2;

    if (node.id !== '__root__') {
      positions.set(node.id, { x: x + padding, y: y + padding });
    }
    return { min: minX, max: maxX };
  };

  positionNode(treeData, 0);

  // Create layout nodes
  return nodes.map((node) => {
    const pos = positions.get(node.id) || { x: width / 2, y: height / 2 };
    return {
      ...node,
      x: pos.x,
      y: pos.y,
      fx: null,
      fy: null,
    };
  });
}

/**
 * Cluster layout - group nodes by category
 */
export function calculateClusterLayout(
  nodes: ConceptNode[],
  config: LayoutConfig
): LayoutNode[] {
  const { width, height } = config;

  // Group by category
  const categoryGroups = new Map<ConceptCategory, ConceptNode[]>();
  const categories: ConceptCategory[] = ['task', 'persona', 'context', 'constraints', 'output', 'examples', 'metadata'];

  categories.forEach((cat) => categoryGroups.set(cat, []));
  nodes.forEach((node) => {
    if (!categoryGroups.has(node.category)) {
      categoryGroups.set(node.category, []);
    }
    categoryGroups.get(node.category)!.push(node);
  });

  // Calculate cluster positions (arrange categories in a circle)
  const activeCategories = categories.filter((cat) => (categoryGroups.get(cat)?.length || 0) > 0);
  const clusterRadius = Math.min(width, height) / 3;
  const centerX = width / 2;
  const centerY = height / 2;

  const clusterCenters = new Map<ConceptCategory, { x: number; y: number }>();
  activeCategories.forEach((cat, i) => {
    const angle = (2 * Math.PI * i) / activeCategories.length - Math.PI / 2;
    clusterCenters.set(cat, {
      x: centerX + clusterRadius * Math.cos(angle),
      y: centerY + clusterRadius * Math.sin(angle),
    });
  });

  // Position nodes within each cluster
  const layoutNodes: LayoutNode[] = [];
  const nodeRadius = 60;

  categoryGroups.forEach((groupNodes, category) => {
    const center = clusterCenters.get(category) || { x: centerX, y: centerY };
    const nodesInCluster = groupNodes.length;

    if (nodesInCluster === 1) {
      layoutNodes.push({
        ...groupNodes[0],
        x: center.x,
        y: center.y,
        fx: null,
        fy: null,
      });
    } else {
      // Arrange in a small circle within cluster
      const innerRadius = Math.min(nodeRadius, 20 + nodesInCluster * 8);
      groupNodes.forEach((node, i) => {
        const angle = (2 * Math.PI * i) / nodesInCluster;
        layoutNodes.push({
          ...node,
          x: center.x + innerRadius * Math.cos(angle),
          y: center.y + innerRadius * Math.sin(angle),
          fx: null,
          fy: null,
        });
      });
    }
  });

  return layoutNodes;
}

/**
 * Simple grid layout - fallback
 */
function calculateGridLayout(
  nodes: ConceptNode[],
  config: LayoutConfig
): LayoutNode[] {
  const { width, height, padding = 50 } = config;
  const cols = Math.ceil(Math.sqrt(nodes.length));
  const rows = Math.ceil(nodes.length / cols);
  const cellWidth = (width - padding * 2) / cols;
  const cellHeight = (height - padding * 2) / rows;

  return nodes.map((node, i) => ({
    ...node,
    x: padding + (i % cols) * cellWidth + cellWidth / 2,
    y: padding + Math.floor(i / cols) * cellHeight + cellHeight / 2,
    fx: null,
    fy: null,
  }));
}

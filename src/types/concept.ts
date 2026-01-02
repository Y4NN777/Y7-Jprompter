/**
 * Concept Types for D3 Visualization
 * Used to represent prompt structure as a force-directed graph
 */

export type ConceptCategory =
  | 'persona'
  | 'task'
  | 'constraints'
  | 'context'
  | 'output'
  | 'examples'
  | 'metadata';

export type RelationshipType = 'influences' | 'requires' | 'conflicts';

/**
 * Represents a single concept node in the visualization
 */
export interface ConceptNode {
  id: string;
  label: string;
  category: ConceptCategory;
  weight: number; // 0-1, determines node size
  depth: number; // Hierarchy level (0 = root)
  confidence: number; // 0-1, how certain the extraction is
  description?: string;
  extractedText?: string; // Original text this concept was extracted from
  children?: ConceptNode[]; // Sub-concepts for complexity >= 5
  metadata?: Record<string, unknown>;

  // D3 simulation properties (added at runtime)
  x?: number;
  y?: number;
  fx?: number | null; // Fixed x position (for dragging)
  fy?: number | null; // Fixed y position (for dragging)
  vx?: number;
  vy?: number;
}

/**
 * Represents a relationship between two concepts
 */
export interface ConceptRelationship {
  source: string | ConceptNode; // Node ID or node reference
  target: string | ConceptNode; // Node ID or node reference
  type: RelationshipType;
  strength: number; // 0-1, affects edge width and force strength
  description?: string;
}

/**
 * Complete concept graph for visualization
 */
export interface ConceptGraph {
  nodes: ConceptNode[];
  relationships: ConceptRelationship[];
  complexity: number; // 1-7
  bifurcated: boolean; // true when complexity >= 5
  rootNodeId?: string; // ID of the main task node
}

/**
 * Category colors for visualization
 */
export const CATEGORY_COLORS: Record<ConceptCategory, string> = {
  persona: '#00d9ff', // Electric Blue
  task: '#b24bf3', // Cyber Purple
  constraints: '#ff6b6b', // Coral Red
  context: '#00ff88', // Neon Green
  output: '#ffd93d', // Gold
  examples: '#6bcb77', // Mint
  metadata: '#9ca3af', // Gray
};

/**
 * Edge styles for different relationship types
 */
export const EDGE_STYLES: Record<
  RelationshipType,
  { dasharray: string; label: string }
> = {
  influences: { dasharray: 'none', label: 'influences' },
  requires: { dasharray: '5,5', label: 'requires' },
  conflicts: { dasharray: '2,2', label: 'conflicts with' },
};

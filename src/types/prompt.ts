/**
 * Prompt Types for Converter System
 */

import type { ConceptGraph } from './concept';

/**
 * Flexible JSON structure for converted prompts
 */
export type JSONPromptStructure = Record<string, unknown>;

/**
 * User input for conversion
 */
export interface PromptInput {
  text: string;
  complexity: number; // 1-7
  contextInjection?: string; // Optional background context
}

/**
 * Output from conversion API
 */
export interface PromptOutput {
  json: JSONPromptStructure;
  formatted: string; // Human-readable formatted version
  explanation: string; // Why this structure is better
  conceptGraph: ConceptGraph;
}

/**
 * A single conversion in history
 */
export interface ConversionHistory {
  id: string;
  input: PromptInput;
  output: PromptOutput;
  timestamp: Date;
  feedback?: import('./feedback').PromptFeedback;
}

/**
 * Output view modes
 */
export type OutputViewMode = 'json' | 'formatted' | 'diff';

/**
 * Complexity level metadata
 */
export interface ComplexityLevel {
  level: number;
  name: string;
  description: string;
  bifurcated: boolean;
}

/**
 * All complexity levels with descriptions
 */
export const COMPLEXITY_LEVELS: ComplexityLevel[] = [
  {
    level: 1,
    name: 'Basic',
    description: 'Simple task definition',
    bifurcated: false,
  },
  {
    level: 2,
    name: 'Simple',
    description: 'Task with basic requirements',
    bifurcated: false,
  },
  {
    level: 3,
    name: 'Standard',
    description: 'Structured with context',
    bifurcated: false,
  },
  {
    level: 4,
    name: 'Detailed',
    description: 'Full structure with constraints',
    bifurcated: false,
  },
  {
    level: 5,
    name: 'Complex',
    description: 'Bifurcated with alternatives',
    bifurcated: true,
  },
  {
    level: 6,
    name: 'Advanced',
    description: 'Multi-path with validation',
    bifurcated: true,
  },
  {
    level: 7,
    name: 'Expert',
    description: 'Full hierarchy with metadata',
    bifurcated: true,
  },
];

/**
 * Get complexity level info by number
 */
export function getComplexityLevel(level: number): ComplexityLevel {
  return (
    COMPLEXITY_LEVELS.find((c) => c.level === level) || COMPLEXITY_LEVELS[3]
  );
}

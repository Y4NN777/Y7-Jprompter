/**
 * Zod Schemas for Concept Graph Validation
 * Used to validate AI-generated concept graphs
 */

import { z } from 'zod';

/**
 * Valid concept categories
 */
export const ConceptCategorySchema = z.enum([
  'persona',
  'task',
  'constraints',
  'context',
  'output',
  'examples',
  'metadata',
]);

/**
 * Valid relationship types
 */
export const RelationshipTypeSchema = z.enum([
  'influences',
  'requires',
  'conflicts',
]);

/**
 * Schema for a concept node
 */
export const ConceptNodeSchema: z.ZodType<unknown> = z.lazy(() =>
  z.object({
    id: z.string().min(1),
    label: z.string().min(1).max(100),
    category: ConceptCategorySchema,
    weight: z.number().min(0).max(1),
    depth: z.number().int().min(0).max(10),
    confidence: z.number().min(0).max(1).optional().default(1),
    description: z.string().max(500).optional(),
    extractedText: z.string().max(1000).optional(),
    children: z.array(ConceptNodeSchema).optional(),
    metadata: z.record(z.unknown()).optional(),
  })
);

/**
 * Schema for a relationship between concepts
 */
export const ConceptRelationshipSchema = z.object({
  source: z.string().min(1),
  target: z.string().min(1),
  type: RelationshipTypeSchema,
  strength: z.number().min(0).max(1),
  description: z.string().max(200).optional(),
});

/**
 * Schema for a complete concept graph
 */
export const ConceptGraphSchema = z.object({
  nodes: z.array(ConceptNodeSchema as z.ZodType<Record<string, unknown>>).min(1).max(50),
  relationships: z.array(ConceptRelationshipSchema).max(100),
  complexity: z.number().int().min(1).max(7),
  bifurcated: z.boolean(),
  rootNodeId: z.string().optional(),
});

/**
 * Type inference from schema
 */
export type ValidatedConceptNode = z.infer<typeof ConceptNodeSchema>;
export type ValidatedConceptRelationship = z.infer<typeof ConceptRelationshipSchema>;
export type ValidatedConceptGraph = z.infer<typeof ConceptGraphSchema>;

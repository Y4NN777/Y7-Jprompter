/**
 * Zod Schemas for Prompt API Validation
 * Used to validate API request/response data
 */

import { z } from 'zod';
import { ConceptGraphSchema } from './concept';

/**
 * Schema for conversion request
 */
export const ConvertRequestSchema = z.object({
  prompt: z
    .string()
    .min(1, 'Prompt cannot be empty')
    .max(10000, 'Prompt is too long (max 10,000 characters)'),
  complexity: z
    .number()
    .int()
    .min(1, 'Complexity must be at least 1')
    .max(7, 'Complexity cannot exceed 7'),
  contextInjection: z
    .string()
    .max(2000, 'Context is too long (max 2,000 characters)')
    .optional(),
  apiKey: z
    .string()
    .optional(),
});

/**
 * Schema for conversion response
 */
export const ConvertResponseSchema = z.object({
  json: z.record(z.unknown()),
  formatted: z.string(),
  explanation: z.string(),
  conceptGraph: ConceptGraphSchema,
});

/**
 * Schema for concept extraction request
 */
export const ExtractConceptsRequestSchema = z.object({
  jsonPrompt: z.record(z.unknown()),
  complexity: z.number().int().min(1).max(7),
});

/**
 * Schema for feedback request
 */
export const FeedbackRequestSchema = z.object({
  originalPrompt: z.string().min(1).max(10000),
  jsonPrompt: z.record(z.unknown()),
});

/**
 * Schema for feedback response
 */
export const FeedbackResponseSchema = z.object({
  axes: z.object({
    clarity: z.number().min(0).max(100),
    specificity: z.number().min(0).max(100),
    structure: z.number().min(0).max(100),
    actionability: z.number().min(0).max(100),
    creativity: z.number().min(0).max(100),
  }),
  overallScore: z.number().min(0).max(100),
  suggestions: z.array(z.string()).max(10),
  skillsImproved: z.array(z.string()).max(10),
});

/**
 * Schema for daily tip response
 */
export const DailyTipResponseSchema = z.object({
  id: z.string(),
  tip: z.string().max(500),
  category: z.string(),
  relatedConcepts: z.array(z.string()).max(5),
});

/**
 * Type inference from schemas
 */
export type ConvertRequest = z.infer<typeof ConvertRequestSchema>;
export type ConvertResponse = z.infer<typeof ConvertResponseSchema>;
export type ExtractConceptsRequest = z.infer<typeof ExtractConceptsRequestSchema>;
export type FeedbackRequest = z.infer<typeof FeedbackRequestSchema>;
export type FeedbackResponse = z.infer<typeof FeedbackResponseSchema>;
export type DailyTipResponse = z.infer<typeof DailyTipResponseSchema>;

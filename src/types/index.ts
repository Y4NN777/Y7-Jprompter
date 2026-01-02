// Re-export from specialized type files
export * from './concept';
export * from './prompt';
export * from './feedback';

// Template types (existing)
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  structure: object;
  example: string;
}

export interface ConversionResult {
  jsonPrompt: string;
  explanation: string;
  improvements: string[];
}

export interface TemplateCategory {
  [key: string]: Template[];
}

export interface ConversionError {
  message: string;
  code: string;
  details?: unknown;
}
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

// Enhanced types for better type safety
// Note: Keys are now multilingual, so using Record for flexibility
export type JSONPromptStructure = Record<string, unknown>;

export interface ConversionError {
  message: string;
  code: string;
  details?: unknown;
}
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
export interface JSONPromptStructure {
  task: string;
  input?: string | object;
  output_format?: object;
  requirements?: object;
  context?: string;
  constraints?: object;
  examples?: unknown[];
}

export interface ConversionError {
  message: string;
  code: string;
  details?: unknown;
}
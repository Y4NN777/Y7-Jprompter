/**
 * Converter Store - Zustand State Management
 * Manages all converter-related state with IndexedDB persistence
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getBestStorage } from './middleware/persistMiddleware';
import type {
  ConceptGraph,
  JSONPromptStructure,
  ConversionHistory,
  OutputViewMode,
  Template,
} from '@/types';
import { useLearningStore } from './learningStore';

/**
 * Converter state interface
 */
interface ConverterState {
  // Input state
  inputText: string;
  complexity: number;
  contextInjection: string;

  // Output state
  jsonOutput: JSONPromptStructure | null;
  formattedOutput: string;
  explanation: string;
  previousOutput: JSONPromptStructure | null;
  conceptGraph: ConceptGraph | null;

  // UI state
  activeOutputView: OutputViewMode;
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;

  // History (persisted)
  history: ConversionHistory[];

  // Actions - Input
  setInputText: (text: string) => void;
  setComplexity: (level: number) => void;
  setContextInjection: (context: string) => void;

  // Actions - Output
  setJsonOutput: (output: JSONPromptStructure | null) => void;
  setFormattedOutput: (output: string) => void;
  setExplanation: (explanation: string) => void;
  setConceptGraph: (graph: ConceptGraph | null) => void;
  setActiveOutputView: (view: OutputViewMode) => void;

  // Actions - UI
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsModalOpen: (open: boolean) => void;

  // Actions - Conversion
  convert: () => Promise<void>;
  clearAll: () => void;
  applyTemplate: (template: Template) => void;

  // Actions - History
  addToHistory: (entry: ConversionHistory) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
  loadFromHistory: (entry: ConversionHistory) => void;

  // Actions - Export/Import
  exportHistory: () => string;
  importHistory: (data: string) => void;
}

/**
 * Generate a simple browser fingerprint for rate limiting
 * This helps identify users across sessions without cookies
 */
function generateFingerprint(): string {
  if (typeof window === 'undefined') return 'server';
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const txt = 'y7-jprompter-fp';
  
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText(txt, 2, 2);
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create the converter store
 */
export const useConverterStore = create<ConverterState>()(
  persist(
    (set, get) => ({
      // Initial state
      inputText: '',
      complexity: 4,
      contextInjection: '',
      jsonOutput: null,
      formattedOutput: '',
      explanation: '',
      previousOutput: null,
      conceptGraph: null,
      activeOutputView: 'json',
      isLoading: false,
      error: null,
      isModalOpen: false,
      history: [],

      // Input actions
      setInputText: (text) => set({ inputText: text }),
      setComplexity: (level) => set({ complexity: level }),
      setContextInjection: (context) => set({ contextInjection: context }),

      // Output actions
      setJsonOutput: (output) =>
        set((state) => ({
          previousOutput: state.jsonOutput,
          jsonOutput: output,
        })),
      setFormattedOutput: (output) => set({ formattedOutput: output }),
      setExplanation: (explanation) => set({ explanation }),
      setConceptGraph: (graph) => set({ conceptGraph: graph }),
      setActiveOutputView: (view) => set({ activeOutputView: view }),

      // UI actions
      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setIsModalOpen: (open) => set({ isModalOpen: open }),

      // Conversion action
      convert: async () => {
        const { inputText, complexity, contextInjection } = get();

        if (!inputText.trim()) {
          set({ error: 'Please enter a prompt to convert' });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          // Get API key from localStorage if available
          const customApiKey = typeof window !== 'undefined'
            ? localStorage.getItem('gemini-api-key') || undefined
            : undefined;

          // Generate fingerprint for rate limiting
          const fingerprint = typeof window !== 'undefined'
            ? localStorage.getItem('client-fingerprint') || generateFingerprint()
            : undefined;

          // Store fingerprint for future requests
          if (fingerprint && typeof window !== 'undefined') {
            localStorage.setItem('client-fingerprint', fingerprint);
          }

          // Call the secure API route
          const response = await fetch('/api/convert', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              ...(fingerprint && { 'X-Client-Fingerprint': fingerprint }),
            },
            body: JSON.stringify({
              prompt: inputText,
              complexity,
              contextInjection: contextInjection || undefined,
              apiKey: customApiKey,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            
            console.log('[Store] Error response:', {
              status: response.status,
              errorData,
            });
            
            // Handle rate limit errors specially
            if (response.status === 429) {
              const rateLimitError = {
                isRateLimit: true,
                message: errorData.message || 'Rate limit exceeded',
                retryAfter: errorData.retryAfter || 60,
                type: errorData.type || 'minute',
                source: errorData.source || 'app',
              };
              console.log('[Store] Rate limit error formatted:', rateLimitError);
              set({ error: JSON.stringify(rateLimitError), isLoading: false });
              throw new Error(errorData.message || 'Rate limit exceeded');
            }
            
            throw new Error(errorData.error || 'Conversion failed');
          }

          const data = await response.json();

          // Update state with results
          set((state) => ({
            previousOutput: state.jsonOutput,
            jsonOutput: data.json,
            formattedOutput: data.formatted,
            explanation: data.explanation,
            conceptGraph: data.conceptGraph,
            isLoading: false,
          }));

          // Add to history
          const historyEntry: ConversionHistory = {
            id: generateId(),
            input: {
              text: inputText,
              complexity,
              contextInjection,
            },
            output: {
              json: data.json,
              formatted: data.formatted,
              explanation: data.explanation,
              conceptGraph: data.conceptGraph,
            },
            timestamp: new Date(),
          };

          get().addToHistory(historyEntry);

          // Update skill tracking
          useLearningStore.getState().updateSkillsFromFeedback({
            overallScore: 75 + Math.floor(Math.random() * 25), // Placeholder score until feedback API
            axes: { clarity: 80, specificity: 75, structure: 85, actionability: 70, creativity: 80 },
            suggestions: [],
            skillsImproved: [],
            timestamp: new Date(),
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'An error occurred';
          set({ error: message, isLoading: false });
          // Re-throw so toast.promise can catch it
          throw error;
        }
      },

      // Clear all state
      clearAll: () =>
        set({
          inputText: '',
          contextInjection: '',
          jsonOutput: null,
          formattedOutput: '',
          explanation: '',
          previousOutput: null,
          conceptGraph: null,
          error: null,
        }),

      // Apply template
      applyTemplate: (template) =>
        set({
          jsonOutput: template.structure as JSONPromptStructure,
          formattedOutput: JSON.stringify(template.structure, null, 2),
          explanation: `Template: ${template.name}\n\n${template.description}`,
          activeOutputView: 'json',
        }),

      // History actions
      addToHistory: (entry) =>
        set((state) => ({
          history: [entry, ...state.history].slice(0, 50), // Keep last 50
        })),

      clearHistory: () => set({ history: [] }),

      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((h) => h.id !== id),
        })),

      loadFromHistory: (entry) =>
        set({
          inputText: entry.input.text,
          complexity: entry.input.complexity,
          contextInjection: entry.input.contextInjection || '',
          jsonOutput: entry.output.json,
          formattedOutput: entry.output.formatted,
          explanation: entry.output.explanation,
          conceptGraph: entry.output.conceptGraph,
        }),

      // Export/Import
      exportHistory: () => {
        const { history } = get();
        return JSON.stringify(history, null, 2);
      },

      importHistory: (data) => {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) {
            set({ history: parsed });
          }
        } catch (error) {
          console.error('Failed to import history:', error);
        }
      },
    }),
    {
      name: 'y7-jprompter-converter',
      storage: createJSONStorage(() => getBestStorage('converter')),
      partialize: (state) => ({
        // Only persist these fields
        history: state.history,
        complexity: state.complexity,
        contextInjection: state.contextInjection, // Persist project context
      }),
    }
  )
);

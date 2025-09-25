'use client';

import { useRef, useEffect } from 'react';
import { Wand2, AlertCircle } from 'lucide-react';

interface InputPanelProps {
  inputPrompt: string;
  setInputPrompt: (prompt: string) => void;
  examplePrompts: string[];
  isLoading: boolean;
  handleConvert: () => void;
  clearAll: () => void;
  error: string;
  complexity: number;
  setComplexity: (complexity: number) => void;
}

export default function InputPanel({
  inputPrompt,
  setInputPrompt,
  examplePrompts,
  isLoading,
  handleConvert,
  clearAll,
  error,
  complexity,
  setComplexity,
}: InputPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputPrompt(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputPrompt]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Regular Prompt</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Try an example:</p>
        <div className="overflow-hidden">
          <div className="flex gap-2 animate-scroll">
            {[...examplePrompts, ...examplePrompts].map((example, index) => (
              <button
                key={index}
                onClick={() => setInputPrompt(example)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
                title={example}
              >
                {example.length > 80 ? `${example.substring(0, 80)}...` : example}
              </button>
            ))}
          </div>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={inputPrompt}
        onChange={handleInputChange}
        placeholder="Enter your regular prompt here...

Example: 'Analyze this sales data and give me insights about customer behavior patterns'"
        className="w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] scrollbar-hide"
        style={{ height: 'auto' }}
      />

      <div className="flex justify-between items-center mt-2 mb-4">
        <span className="text-sm text-gray-500">
          {inputPrompt.length} characters
        </span>
        {inputPrompt.length > 1500 && (
          <span className="text-sm text-orange-500 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            Prompt is very long and will be summarized.
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <label htmlFor="complexity" className="text-sm font-medium text-gray-700">
          Complexity: <span className="font-bold text-blue-600">{complexity}</span>
        </label>
        <input
          id="complexity"
          type="range"
          min="1"
          max="7"
          value={complexity}
          onChange={(e) => setComplexity(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{ '--slider-progress': `${((complexity - 1) / 6) * 100}%` } as React.CSSProperties}
        />
      </div>

      <style jsx>{`
        .slider-thumb {
          --slider-progress: 0%;
        }
        .slider-thumb::-webkit-slider-runnable-track {
          background: linear-gradient(to right, #3b82f6 var(--slider-progress), #e5e7eb var(--slider-progress));
          border-radius: 9999px;
        }
        .slider-thumb::-moz-range-track {
          background: linear-gradient(to right, #3b82f6 var(--slider-progress), #e5e7eb var(--slider-progress));
          border-radius: 9999px;
        }
        .slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 9999px;
          background-color: #3b82f6;
          cursor: pointer;
          margin-top: -6px;
          border: 2px solid white;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        }
        .slider-thumb::-moz-range-thumb {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 9999px;
          background-color: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleConvert}
          disabled={isLoading || !inputPrompt.trim()}
          className="btn-primary flex items-center gap-2"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Wand2 className="h-5 w-5" />
          )}
          {isLoading ? 'Converting...' : 'Convert to JSON'}
        </button>

        <button
          onClick={clearAll}
          className="btn-secondary"
          disabled={isLoading}
        >
          Clear All
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}
    </>
  );
}
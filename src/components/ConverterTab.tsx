'use client';

import { useState } from 'react';
import { Wand2, AlertCircle, Copy, Download, CheckCircle, Code2, HelpCircle, Pencil } from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { JSONPromptStructure } from '@/types';
import Card from './ui/Card';

interface ConverterTabProps {
  jsonOutput: JSONPromptStructure | null;
  explanation: string;
  isLoading: boolean;
  error: string;
  handleConvert: () => void;
  clearAll: () => void;
  inputPrompt: string;
  setInputPrompt: (prompt: string) => void;
  examplePrompts: string[];
  setIsModalOpen: (isOpen: boolean) => void;
  complexity: number;
  setComplexity: (complexity: number) => void;
}

export default function ConverterTab({
  jsonOutput,
  explanation,
  isLoading,
  error,
  handleConvert,
  clearAll,
  inputPrompt,
  setInputPrompt,
  examplePrompts,
  setIsModalOpen,
  complexity,
  setComplexity,
}: ConverterTabProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJson, setEditedJson] = useState('');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const downloadJSON = () => {
    if (!jsonOutput) return;
    
    try {
      const blob = new Blob([JSON.stringify(jsonOutput, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'json-prompt.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  return (
    <PanelGroup direction="horizontal" className="h-[70vh]">
      <Panel defaultSize={50} minSize={30}>
        <Card>
          <h2 className="text-2xl font-bold mb-4">Regular Prompt</h2>
          
          {/* Example prompts */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setInputPrompt(example)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                >
                  {example.length > 50 ? `${example.substring(0, 50)}...` : example}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Enter your regular prompt here...

Example: 'Analyze this sales data and give me insights about customer behavior patterns'"
            className="w-full flex-grow p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
        </Card>
      </Panel>
      <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-blue-100 transition-colors" />
      <Panel defaultSize={50} minSize={30}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">JSON Prompt</h2>
            {jsonOutput && (
              <div className="flex gap-2">
                 {explanation && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    title="Why this works better"
                  >
                    <HelpCircle className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`p-2 transition-colors ${
                    isEditing ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                  }`}
                  title="Edit JSON"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => copyToClipboard(editedJson || JSON.stringify(jsonOutput, null, 2))}
                  className={`p-2 transition-colors ${
                    copySuccess
                      ? 'text-green-600'
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                  title="Copy to clipboard"
                >
                  {copySuccess ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={downloadJSON}
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  title="Download JSON"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {jsonOutput ? (
            <div className="space-y-6 flex-grow flex flex-col">
              <textarea
                value={editedJson || JSON.stringify(jsonOutput, null, 2)}
                readOnly={!isEditing}
                onChange={(e) => setEditedJson(e.target.value)}
                className={`w-full flex-grow p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-900 text-green-400 custom-scrollbar ${
                  isEditing ? 'bg-gray-800' : ''
                }`}
              />
              {copySuccess && (
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Copied to clipboard!
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <Code2 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p>Your JSON prompt will appear here</p>
                <p className="text-sm mt-1">Enter a prompt and click convert to get started</p>
              </div>
            </div>
          )}
        </Card>
      </Panel>
    </PanelGroup>
  );
}
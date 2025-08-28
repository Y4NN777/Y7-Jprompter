'use client';

import { useState } from 'react';
import { Zap, AlertCircle, Copy, Download, CheckCircle } from 'lucide-react';
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
}: ConverterTabProps) {
  const [copySuccess, setCopySuccess] = useState(false);

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
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Section */}
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
          className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        
        <div className="flex justify-between items-center mt-2 mb-4">
          <span className="text-sm text-gray-500">
            {inputPrompt.length} characters
          </span>
          {inputPrompt.length > 1000 && (
            <span className="text-sm text-orange-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Very long prompt
            </span>
          )}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleConvert}
            disabled={isLoading || !inputPrompt.trim()}
            className="btn-primary flex items-center gap-2"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Zap className="h-5 w-5" />
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

      {/* Output Section */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">JSON Prompt</h2>
          {jsonOutput && (
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(JSON.stringify(jsonOutput, null, 2))}
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
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
              <pre className="text-green-400 text-sm">
                <code>{JSON.stringify(jsonOutput, null, 2)}</code>
              </pre>
            </div>

            {explanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Why This Structure Works Better:
                </h3>
                <div className="text-blue-800 whitespace-pre-line text-sm leading-relaxed">
                  {explanation}
                </div>
              </div>
            )}

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
          <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>Your JSON prompt will appear here</p>
              <p className="text-sm mt-1">Enter a prompt and click convert to get started</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
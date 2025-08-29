'use client';

import { useState } from 'react';
import { Copy, Download, CheckCircle, Code2, HelpCircle, Pencil } from 'lucide-react';
import { JSONPromptStructure } from '@/types';

interface OutputPanelProps {
  jsonOutput: JSONPromptStructure | null;
  explanation: string;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function OutputPanel({
  jsonOutput,
  explanation,
  setIsModalOpen,
}: OutputPanelProps) {
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
    <>
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
    </>
  );
}
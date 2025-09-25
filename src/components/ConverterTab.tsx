'use client';

import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { JSONPromptStructure } from '@/types';
import Card from './ui/Card';
import InputPanel from './InputPanel';
import OutputPanel from './OutputPanel';

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
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (isMobile) {
    return (
      <div className="space-y-4">
        <Card>
          <InputPanel
            inputPrompt={inputPrompt}
            setInputPrompt={setInputPrompt}
            examplePrompts={examplePrompts}
            isLoading={isLoading}
            handleConvert={handleConvert}
            clearAll={clearAll}
            error={error}
            complexity={complexity}
            setComplexity={setComplexity}
          />
        </Card>
        <Card>
          <OutputPanel
            jsonOutput={jsonOutput}
            explanation={explanation}
            setIsModalOpen={setIsModalOpen}
          />
        </Card>
      </div>
    );
  }

  return (
    <PanelGroup direction="horizontal" className="h-[70vh]">
      <Panel defaultSize={50} minSize={30}>
        <Card>
          <InputPanel
            inputPrompt={inputPrompt}
            setInputPrompt={setInputPrompt}
            examplePrompts={examplePrompts}
            isLoading={isLoading}
            handleConvert={handleConvert}
            clearAll={clearAll}
            error={error}
            complexity={complexity}
            setComplexity={setComplexity}
          />
        </Card>
      </Panel>

      <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-blue-100 transition-colors" />

      <Panel defaultSize={50} minSize={30}>
        <Card>
          <OutputPanel
            jsonOutput={jsonOutput}
            explanation={explanation}
            setIsModalOpen={setIsModalOpen}
          />
        </Card>
      </Panel>
    </PanelGroup>
  );
}
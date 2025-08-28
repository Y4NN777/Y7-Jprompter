'use client';

import { useState } from 'react';
import { convertToJSONPrompt, explainConversion } from '@/lib/gemini';
import { JSONPromptStructure, Template } from '@/types';
import Header from '@/components/ui/Header';
import Navigation from '@/components/ui/Navigation';
import ConverterTab from '@/components/ConverterTab';
import TemplatesTab from '@/components/TemplatesTab';
import LearnTab from '@/components/LearnTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState('converter');
  const [inputPrompt, setInputPrompt] = useState('');
  const [jsonOutput, setJsonOutput] = useState<JSONPromptStructure | null>(null);
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!inputPrompt.trim()) {
      setError('Please enter a prompt to convert');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await convertToJSONPrompt(inputPrompt);
      setJsonOutput(result);
      
      const exp = await explainConversion(inputPrompt, result);
      setExplanation(exp);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error('Conversion error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setInputPrompt('');
    setJsonOutput(null);
    setExplanation('');
    setError('');
  };

  const applyTemplate = (template: Template) => {
    setJsonOutput(template.structure as JSONPromptStructure);
    setActiveTab('converter');
  };

  const examplePrompts = [
    "Analyze this quarterly sales report and provide key insights",
    "Write a professional email to decline a meeting request",
    "Create a workout plan for a beginner who wants to build muscle",
    "Summarize this research paper and highlight the main findings"
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <Header />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'converter' && (
          <ConverterTab
            jsonOutput={jsonOutput}
            explanation={explanation}
            isLoading={isLoading}
            error={error}
            handleConvert={handleConvert}
            clearAll={clearAll}
            inputPrompt={inputPrompt}
            setInputPrompt={setInputPrompt}
            examplePrompts={examplePrompts}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesTab applyTemplate={applyTemplate} />
        )}

        {activeTab === 'learn' && <LearnTab />}
      </div>
    </div>
  );
}

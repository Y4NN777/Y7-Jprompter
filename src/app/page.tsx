'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { convertToJSONPrompt, explainConversion, summarizePrompt } from '@/lib/gemini';
import { JSONPromptStructure, Template } from '@/types';
import Header from '@/components/ui/Header';
import Navigation from '@/components/ui/Navigation';
import MobileNavigation from '@/components/ui/MobileNavigation';
import ConverterTab from '@/components/ConverterTab';
import Modal from '@/components/ui/Modal';
import TemplatesTab from '@/components/TemplatesTab';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  const [activeTab, setActiveTab] = useState('converter');
  const [inputPrompt, setInputPrompt] = useState('');
  const [jsonOutput, setJsonOutput] = useState<JSONPromptStructure | null>(null);
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [complexity, setComplexity] = useState(4);

  const handleConvert = async () => {
    if (!inputPrompt.trim()) {
      setError('Please enter a prompt to convert');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      let promptToConvert = inputPrompt;
      if (inputPrompt.length > 1500) {
        promptToConvert = await summarizePrompt(inputPrompt);
      }

      const result = await convertToJSONPrompt(promptToConvert, complexity);
      setJsonOutput(result);
      
      const exp = await explainConversion(promptToConvert, result);
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
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 pb-20 md:pb-8">
        <Header />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="animate-fadeIn">
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
              setIsModalOpen={setIsModalOpen}
              complexity={complexity}
              setComplexity={setComplexity}
            />
          )}

          {activeTab === 'templates' && (
            <TemplatesTab applyTemplate={applyTemplate} />
          )}

          {activeTab === 'learning' && <Chatbot />}
        </div>
      </div>
      {explanation && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Why This Structure Works Better"
        >
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{explanation}</ReactMarkdown>
          </div>
        </Modal>
      )}
    </div>
  );
}

import { FileJson } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <FileJson className="h-10 w-10 text-blue-600" />
        <h1 className="text-4xl font-bold text-gray-900">PromptForge7</h1>
      </div>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Transform your regular prompts into powerful structured JSON prompts that get better AI results
      </p>
    </div>
  );
}
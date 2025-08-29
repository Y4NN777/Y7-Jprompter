import { FileJson } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
        <FileJson className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Y7-Jprompter</h1>
      </div>
      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
        Transform your regular prompts into powerful structured JSON prompts that get better AI results
      </p>
    </div>
  );
}
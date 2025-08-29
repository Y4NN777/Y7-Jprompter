'use client';

import { Wand2, Code, BookOpen } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'converter', label: 'Converter', icon: Wand2 },
  { id: 'templates', label: 'Templates', icon: Code },
  { id: 'learning', label: 'Learning', icon: BookOpen }
];

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  return (
    <div className="flex justify-center mb-8 px-4">
      <div className="glass-nav flex flex-wrap justify-center gap-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-colors text-sm sm:text-base ${
              activeTab === id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
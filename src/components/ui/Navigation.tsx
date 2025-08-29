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
    <div className="flex justify-center mb-8">
      <div className="glass-nav">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === id 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
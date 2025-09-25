'use client';

import { Wand2, Code, BookOpen } from 'lucide-react';

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'converter', label: 'Converter', icon: Wand2 },
  { id: 'templates', label: 'Templates', icon: Code },
  { id: 'learning', label: 'Learning', icon: BookOpen }
];

export default function MobileNavigation({ activeTab, setActiveTab }: MobileNavigationProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-lg border-t border-gray-200 flex justify-around p-2 z-50">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex flex-col items-center gap-1 text-sm py-2 px-3 rounded-lg transition-colors ${
            activeTab === id ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <Icon className="h-6 w-6" />
          {label}
        </button>
      ))}
    </div>
  );
}
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Zap,
    History,
    FileText,
    Settings,
    Info,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useNavigationStore, ViewType } from '@/stores/navigationStore';

interface NavItem {
    id: ViewType;
    label: string;
    icon: typeof Home;
    description: string;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'converter', label: 'Converter', icon: Zap, description: 'Convert prompts' },
    { id: 'history', label: 'History', icon: History, description: 'Past conversions' },
    { id: 'templates', label: 'Templates', icon: FileText, description: 'Prompt templates' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Preferences' },
    { id: 'about', label: 'About', icon: Info, description: 'Information' },
];

export function Sidebar() {
    const { currentView, setCurrentView, sidebarCollapsed, setSidebarCollapsed } =
        useNavigationStore();

    return (
        <motion.aside
            initial={false}
            animate={{
                width: sidebarCollapsed ? '80px' : '240px',
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] z-40 hidden lg:block"
            data-tour="sidebar"
        >
            <div className="flex flex-col h-full">
                {/* Collapse Toggle */}
                <div className="flex items-center justify-end p-3 border-b border-[var(--border-subtle)]">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {sidebarCollapsed ? (
                            <ChevronRight className="w-5 h-5" />
                        ) : (
                            <ChevronLeft className="w-5 h-5" />
                        )}
                    </motion.button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentView === item.id;

                            return (
                                <li key={item.id}>
                                    <motion.button
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setCurrentView(item.id)}
                                        data-tour={`nav-${item.id}`}
                                        className={`
                      relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-colors duration-200
                      ${isActive
                                                ? 'bg-[var(--accent-primary)] text-white'
                                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                                            }
                    `}
                                        title={sidebarCollapsed ? item.label : ''}
                                    >
                                        {/* Active Indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute inset-0 bg-[var(--accent-primary)] rounded-lg"
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                        )}

                                        {/* Icon */}
                                        <Icon className="w-5 h-5 flex-shrink-0 relative z-10" />

                                        {/* Label */}
                                        <AnimatePresence mode="wait">
                                            {!sidebarCollapsed && (
                                                <motion.span
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: 'auto' }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="font-medium text-sm relative z-10 whitespace-nowrap overflow-hidden"
                                                >
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer Info */}
                <AnimatePresence mode="wait">
                    {!sidebarCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 border-t border-[var(--border-subtle)]"
                        >
                            <p className="text-xs text-[var(--text-muted)] text-center">
                                Y7-Jprompter v1.0
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.aside>
    );
}

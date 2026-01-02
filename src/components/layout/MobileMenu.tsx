'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Zap,
    History,
    FileText,
    Settings,
    Info,
    Menu,
    X,
} from 'lucide-react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useNavigationStore, ViewType } from '@/stores/navigationStore';
import { useEffect, useState } from 'react';

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

function MobileDrawer() {
    const { currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen } =
        useNavigationStore();

    if (!mobileMenuOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] lg:hidden"
            />

            {/* Drawer */}
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed left-0 top-0 h-full w-[280px] bg-[var(--bg-primary)] border-r border-[var(--border-subtle)] z-[9999] lg:hidden overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/favicon.svg"
                            alt="Y7-Jprompter"
                            width={28}
                            height={28}
                            className="w-7 h-7"
                        />
                        <span className="font-semibold text-[var(--text-primary)]">
                            Y7-Jprompter
                        </span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </motion.button>
                </div>

                {/* Navigation */}
                <nav className="py-4">
                    <ul className="space-y-1 px-3">
                        {NAV_ITEMS.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = currentView === item.id;

                            return (
                                <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <motion.button
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setCurrentView(item.id)}
                                        className={`
                                            relative w-full flex items-center gap-3 px-4 py-3 rounded-lg
                                            transition-colors duration-200
                                            ${isActive
                                                ? 'bg-[var(--accent-primary)] text-white'
                                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                                            }
                                        `}
                                    >
                                        {/* Active Indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="mobileActiveIndicator"
                                                className="absolute inset-0 bg-[var(--accent-primary)] rounded-lg"
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                        )}

                                        {/* Icon */}
                                        <Icon className="w-5 h-5 flex-shrink-0 relative z-10" />

                                        {/* Label & Description */}
                                        <div className="flex-1 text-left relative z-10">
                                            <div className="font-medium text-sm">{item.label}</div>
                                            <div
                                                className={`text-xs ${isActive
                                                    ? 'text-white/80'
                                                    : 'text-[var(--text-muted)]'
                                                }`}
                                            >
                                                {item.description}
                                            </div>
                                        </div>
                                    </motion.button>
                                </motion.li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                    <p className="text-xs text-[var(--text-muted)] text-center">
                        Y7-Jprompter v1.0
                    </p>
                </div>
            </motion.div>
        </>
    );
}

export function MobileMenu() {
    const { mobileMenuOpen, setMobileMenuOpen } = useNavigationStore();
    const [mounted, setMounted] = useState(false);

    // Wait for client-side mount to use portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [mobileMenuOpen, setMobileMenuOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <>
            {/* Hamburger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-colors"
                aria-label="Toggle menu"
            >
                <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-5 h-5 text-[var(--text-primary)]" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu className="w-5 h-5 text-[var(--text-primary)]" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Portal the drawer to body to escape stacking context */}
            {mounted && createPortal(
                <AnimatePresence>
                    {mobileMenuOpen && <MobileDrawer />}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}

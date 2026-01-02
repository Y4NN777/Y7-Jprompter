'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export function ThemeToggle({ showLabel = false, className = '' }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-lg bg-[var(--bg-secondary)] ${className}`} />
    );
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      data-tour="theme-toggle"
      className={`
        relative flex items-center gap-2 p-2 rounded-lg
        bg-[var(--bg-secondary)] border border-[var(--border-subtle)]
        hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-glow)]
        transition-all duration-200
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-[var(--accent-primary)]" />
          ) : (
            <Moon className="h-5 w-5 text-[var(--accent-primary)]" />
          )}
        </motion.div>
      </AnimatePresence>

      {showLabel && (
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </motion.button>
  );
}

/**
 * Theme toggle with all three options (light, dark, system)
 */
export function ThemeToggleExpanded({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const options = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const;

  return (
    <div
      className={`
        flex items-center gap-1 p-1 rounded-lg
        bg-[var(--bg-secondary)] border border-[var(--border-subtle)]
        ${className}
      `}
    >
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md
            text-sm font-medium transition-all duration-200
            ${theme === value
              ? 'bg-[var(--accent-primary)] text-[var(--text-inverse)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
            }
          `}
          aria-label={`Use ${label} theme`}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useEffect, useCallback } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

const variantStyles = {
  danger: {
    icon: 'bg-[var(--color-error)]/10 text-[var(--color-error)]',
    button: 'bg-[var(--color-error)] hover:bg-[var(--color-error)]/90',
  },
  warning: {
    icon: 'bg-[var(--accent-warning)]/10 text-[var(--accent-warning)]',
    button: 'bg-[var(--accent-warning)] hover:bg-[var(--accent-warning)]/90',
  },
  info: {
    icon: 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]',
    button: 'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)]',
  },
};

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}: ConfirmModalProps) {
  const styles = variantStyles[variant];

  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-md bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-6">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${styles.icon} flex items-center justify-center mb-4`}>
                <AlertTriangle className="w-6 h-6" />
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                {title}
              </h2>

              {/* Message */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-4 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-colors ${styles.button}`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Save, Copy, Download, Share2, RotateCcw, Check } from 'lucide-react';
import { useState } from 'react';

interface QuickActionsBarProps {
    jsonOutput: any;
    onCopy: () => void;
    onDownload: () => void;
    onClear: () => void;
    copied?: boolean;
}

export function QuickActionsBar({
    jsonOutput,
    onCopy,
    onDownload,
    onClear,
    copied = false,
}: QuickActionsBarProps) {
    const [saved, setSaved] = useState(false);
    const [shared, setShared] = useState(false);

    const handleSave = () => {
        // TODO: Implement save to history
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleShare = async () => {
        if (!jsonOutput) return;
        const shareData = btoa(JSON.stringify(jsonOutput));
        const shareUrl = `${window.location.origin}?shared=${shareData}`;
        await navigator.clipboard.writeText(shareUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
    };

    const actions = [
        {
            icon: saved ? Check : Save,
            label: 'Save to History',
            onClick: handleSave,
            disabled: !jsonOutput,
            variant: saved ? 'success' : 'default',
        },
        {
            icon: copied ? Check : Copy,
            label: 'Copy to Clipboard',
            onClick: onCopy,
            disabled: !jsonOutput,
            variant: copied ? 'success' : 'default',
        },
        {
            icon: Download,
            label: 'Download JSON',
            onClick: onDownload,
            disabled: !jsonOutput,
            variant: 'default' as const,
        },
        {
            icon: shared ? Check : Share2,
            label: 'Share Link',
            onClick: handleShare,
            disabled: !jsonOutput,
            variant: shared ? 'success' : 'default',
        },
        {
            icon: RotateCcw,
            label: 'Clear All',
            onClick: onClear,
            disabled: false,
            variant: 'danger' as const,
        },
    ];

    return (
        <div className="flex items-center gap-1">
            {actions.map((action) => {
                const Icon = action.icon;
                return (
                    <motion.button
                        key={action.label}
                        onClick={action.onClick}
                        disabled={action.disabled}
                        whileHover={!action.disabled ? { scale: 1.1 } : {}}
                        whileTap={!action.disabled ? { scale: 0.9 } : {}}
                        title={action.label}
                        className={`
                            p-2 rounded-lg transition-all duration-200
                            ${action.disabled
                                ? 'opacity-30 cursor-not-allowed text-[var(--text-muted)]'
                                : action.variant === 'success'
                                    ? 'text-[var(--accent-success)] bg-[var(--accent-success-subtle)]'
                                    : action.variant === 'danger'
                                        ? 'text-[var(--color-error)] hover:bg-[var(--color-error-subtle)]'
                                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                            }
                        `}
                    >
                        <Icon className="w-4 h-4" />
                    </motion.button>
                );
            })}
        </div>
    );
}

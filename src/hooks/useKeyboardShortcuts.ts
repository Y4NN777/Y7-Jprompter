import { useEffect } from 'react';

type KeyCombo = {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
};

type ShortcutHandler = (e: KeyboardEvent) => void;

interface ShortcutConfig {
    combo: KeyCombo;
    handler: ShortcutHandler;
    description: string;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if input/textarea is focused, unless it's a Ctrl/Cmd shortcut
            const target = e.target as HTMLElement;
            const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

            shortcuts.forEach(({ combo, handler }) => {
                const matchesKey = e.key.toLowerCase() === combo.key.toLowerCase();
                const matchesCtrl = !!combo.ctrl === (e.ctrlKey || e.metaKey); // Allow Cmd on Mac
                const matchesShift = !!combo.shift === e.shiftKey;
                const matchesAlt = !!combo.alt === e.altKey;

                if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
                    // If it's a modifier key shortcut, allow it even in inputs
                    if (isInput && !combo.ctrl && !combo.alt && !combo.meta) {
                        return;
                    }

                    e.preventDefault();
                    handler(e);
                }
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
}

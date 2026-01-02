'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function JSONConstructionLoader() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const stages = [
    { lines: ['{'], label: 'Initializing structure' },
    { 
      lines: ['{', '  "role": "system",'], 
      label: 'Defining roles' 
    },
    { 
      lines: ['{', '  "role": "system",', '  "context": ['], 
      label: 'Building context' 
    },
    { 
      lines: ['{', '  "role": "system",', '  "context": [...]', '  "constraints": {...}'], 
      label: 'Adding constraints' 
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 md:space-y-6 px-2">
      {/* Animated JSON Code Block */}
      <div className="relative bg-[var(--bg-tertiary)] rounded-lg md:rounded-xl p-3 md:p-6 border-2 border-[var(--accent-primary)]/30 overflow-hidden min-h-[140px] md:min-h-[180px]">
        {/* Scanning line effect */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent"
          animate={{ y: [0, 140, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* JSON Lines being constructed */}
        <div className="font-mono text-xs md:text-sm space-y-1 md:space-y-2 relative z-10">
          <AnimatePresence mode="wait">
            {stages[stage].lines.map((line, i) => (
              <motion.div
                key={`${stage}-${i}`}
                initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ delay: i * 0.15, duration: 0.3 }}
                className="flex items-center gap-2"
              >
                {/* Line number */}
                <span className="text-[var(--text-muted)] select-none w-4 md:w-6 text-right text-[10px] md:text-xs">
                  {i + 1}
                </span>
                
                {/* Code content with syntax highlighting */}
                <span className="flex-1 break-all">
                  {line.includes('"') ? (
                    <>
                      {line.split('"').map((part, idx) => (
                        idx % 2 === 0 ? (
                          <span key={idx} className="text-[var(--text-secondary)]">{part}</span>
                        ) : (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[var(--accent-primary)]"
                          >
                            &quot;{part}&quot;
                          </motion.span>
                        )
                      ))}
                    </>
                  ) : (
                    <span className="text-[var(--text-secondary)]">{line}</span>
                  )}
                </span>

                {/* Typing cursor for last line */}
                {i === stages[stage].lines.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-1.5 md:w-2 h-3 md:h-4 bg-[var(--accent-primary)] inline-block"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Closing bracket preview (faded) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 3 ? 1 : 0.2 }}
            className="text-[var(--text-muted)] flex items-center gap-2"
          >
            <span className="w-4 md:w-6 text-right text-[10px] md:text-xs">{stages[stage].lines.length + 1}</span>
            <span>{'}'}</span>
          </motion.div>
        </div>

        {/* Floating JSON syntax particles - hidden on mobile for performance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
          {['{', '}', '[', ']', ':', '"'].map((char, i) => (
            <motion.div
              key={i}
              className="absolute text-xl md:text-2xl font-mono text-[var(--accent-primary)]/20"
              animate={{
                x: [Math.random() * 300, Math.random() * 300],
                y: [Math.random() * 200, Math.random() * 200],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
            >
              {char}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="text-center space-y-2 md:space-y-3">
        <motion.p
          key={stages[stage].label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs md:text-sm text-[var(--text-secondary)] font-medium"
        >
          {stages[stage].label}
        </motion.p>

        {/* Progress dots */}
        <div className="flex gap-1.5 md:gap-2 justify-center">
          {stages.map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 md:h-2 rounded-full bg-[var(--accent-primary)]"
              animate={{
                width: i === stage ? 20 : 6,
                opacity: i === stage ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Token counter animation */}
        <motion.div
          className="flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm text-[var(--text-muted)]"
        >
          <span>Tokens processed:</span>
          <motion.span
            key={stage}
            initial={{ scale: 1.5, color: 'var(--accent-primary)' }}
            animate={{ scale: 1, color: 'var(--text-secondary)' }}
            className="font-mono font-bold"
          >
            {(stage + 1) * 128}
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

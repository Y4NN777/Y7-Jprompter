'use client';

import { driver } from 'driver.js';
import { 
  HelpCircle, 
  Sparkles, 
  Zap, 
  Rocket, 
  BookOpen,
  ChevronRight 
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function OnboardingTour() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(false); // Default false to show tour

  // Check if user has seen the tour
  useEffect(() => {
    const seen = localStorage.getItem('y7-onboarding-complete');
    setHasSeenTour(!!seen);
    // Auto-show tooltip after 2 seconds if tour not seen
    if (!seen) {
      const timer = setTimeout(() => setShowTooltip(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Inject custom styles for driver.js
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'y7-driver-styles';
    style.textContent = `
      /* Base driver.js overrides */
      .driver-popover {
        background: var(--bg-card) !important;
        border: 1px solid var(--border-subtle) !important;
        border-radius: 16px !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 
                    0 0 0 1px var(--accent-primary-subtle),
                    0 0 30px var(--accent-primary-glow) !important;
        padding: 0 !important;
        max-width: 340px !important;
        overflow: hidden !important;
      }

      .driver-popover * {
        font-family: inherit !important;
      }

      .driver-popover-title {
        font-size: 1.1rem !important;
        font-weight: 700 !important;
        color: var(--text-primary) !important;
        padding: 20px 20px 8px 20px !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
      }

      .driver-popover-title::before {
        content: '◆';
        font-size: 0.8rem;
        color: var(--accent-primary);
      }

      .driver-popover-description {
        font-size: 0.9rem !important;
        color: var(--text-secondary) !important;
        line-height: 1.6 !important;
        padding: 0 20px 16px 20px !important;
        margin: 0 !important;
      }

      .driver-popover-progress-text {
        font-size: 0.75rem !important;
        color: var(--text-muted) !important;
        padding: 0 20px !important;
      }

      /* Footer with buttons */
      .driver-popover-footer {
        padding: 12px 20px 20px 20px !important;
        display: flex !important;
        gap: 8px !important;
        justify-content: flex-end !important;
        background: transparent !important;
        border-top: none !important;
      }

      .driver-popover-footer button {
        padding: 10px 18px !important;
        border-radius: 10px !important;
        font-size: 0.85rem !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }

      .driver-popover-prev-btn {
        background: var(--bg-secondary) !important;
        color: var(--text-secondary) !important;
        border: 1px solid var(--border-default) !important;
      }

      .driver-popover-prev-btn:hover {
        background: var(--bg-tertiary) !important;
        color: var(--text-primary) !important;
      }

      .driver-popover-next-btn,
      .driver-popover-close-btn {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)) !important;
        color: white !important;
        border: none !important;
        box-shadow: 0 4px 14px var(--accent-primary-glow) !important;
      }

      .driver-popover-next-btn:hover,
      .driver-popover-close-btn:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 6px 20px var(--accent-primary-glow) !important;
      }

      /* Arrow styling */
      .driver-popover-arrow {
        border: none !important;
      }

      .driver-popover-arrow-side-left,
      .driver-popover-arrow-side-right,
      .driver-popover-arrow-side-top,
      .driver-popover-arrow-side-bottom {
        border-color: var(--bg-card) !important;
      }

      /* Highlight overlay */
      .driver-overlay {
        background: rgba(0, 0, 0, 0.7) !important;
        backdrop-filter: blur(2px) !important;
      }

      /* Highlighted element */
      .driver-active-element {
        box-shadow: 0 0 0 4px var(--accent-primary),
                    0 0 0 8px var(--accent-primary-subtle),
                    0 0 30px var(--accent-primary-glow) !important;
        border-radius: 12px !important;
      }
    `;
    document.head.appendChild(style);

    // Also load base driver.js CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/driver.js@1.4.0/dist/driver.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(link);
    };
  }, []);

  const startTour = useCallback(() => {
    setShowTooltip(false);

    const driverObj = driver({
      showProgress: true,
      animate: true,
      smoothScroll: true,
      allowClose: true,
      stagePadding: 8,
      stageRadius: 12,
      popoverOffset: 15,
      progressText: '{{current}} of {{total}}',
      nextBtnText: 'Next →',
      prevBtnText: '← Back',
      doneBtnText: '🚀 Start Converting!',
      onDestroyStarted: () => {
        localStorage.setItem('y7-onboarding-complete', 'true');
        setHasSeenTour(true);
        driverObj.destroy();
      },
      steps: [
        // Welcome
        {
          popover: {
            title: '✨ Welcome to Y7 JSON Prompter!',
            description: 'Transform natural language into structured JSON prompts using AI. Let\'s take a quick tour of everything you can do! This will only take 2 minutes.',
            side: 'over',
          },
        },
        
        // Input Panel
        {
          element: '[data-tour="input-panel"]',
          popover: {
            title: '📝 Write Your Prompt',
            description: 'Start by entering any natural language prompt here. Describe what you want to achieve - the more details, the better! Example: "Create a chatbot that helps users book appointments"',
            side: 'right',
            align: 'start',
          },
        },
        
        // Complexity Slider
        {
          element: '[data-tour="complexity"]',
          popover: {
            title: '🎚️ Set Complexity Level',
            description: 'Choose how detailed your JSON output should be:\n• Level 1-2: Simple tasks\n• Level 3-4: Standard use cases\n• Level 5-7: Complex workflows with validation',
            side: 'top',
            align: 'center',
          },
        },
        
        // Context Injection (if visible)
        {
          element: '[data-tour="context-injection"]',
          popover: {
            title: '🎯 Context Injection',
            description: 'Optionally add specific context about your domain, technical requirements, or constraints. This helps generate more accurate, tailored prompts.',
            side: 'top',
            align: 'center',
          },
        },
        
        // Example Prompts
        {
          element: '[data-tour="examples"]',
          popover: {
            title: '💡 Quick Start Examples',
            description: 'Not sure where to start? Click any example prompt to instantly load it into the input field. Great for learning and inspiration!',
            side: 'bottom',
            align: 'center',
          },
        },
        
        // Convert Button
        {
          element: '[data-tour="convert-btn"]',
          popover: {
            title: '⚡ Transform Your Prompt',
            description: 'Click this button or press Ctrl+Enter (Cmd+Enter on Mac) to convert your natural language into a powerful structured JSON prompt. The magic happens here!',
            side: 'top',
            align: 'center',
          },
        },
        
        // Output Panel
        {
          element: '[data-tour="output-panel"]',
          popover: {
            title: '📊 View Your Results',
            description: 'Your structured JSON appears here! Switch between multiple viewing modes to analyze your prompt from different perspectives.',
            side: 'left',
            align: 'start',
          },
        },
        
        // Output Tabs
        {
          element: '[data-tour="output-tabs"]',
          popover: {
            title: '🔄 Multiple View Modes',
            description: '• JSON: Raw JSON code (copy/edit)\n• Formatted: Beautiful card view\n• Diff: Compare with previous version\n• Graph: Interactive concept visualization',
            side: 'bottom',
            align: 'center',
          },
        },
        
        // Graph Visualization
        {
          element: '[data-tour="graph-view"]',
          popover: {
            title: '🌐 Interactive Concept Graph',
            description: 'Visualize relationships between prompt concepts! Drag nodes, zoom in/out, apply filters, and explore different layouts (force, radial, hierarchy, cluster).',
            side: 'left',
            align: 'center',
          },
        },
        
        // Graph Controls
        {
          element: '[data-tour="graph-controls"]',
          popover: {
            title: '🎛️ Graph Controls',
            description: 'Switch layouts, filter by concept type, and search for specific nodes. Try different layouts to find the best view for your prompt structure!',
            side: 'bottom',
            align: 'start',
          },
        },
        
        // Sidebar Navigation
        {
          element: '[data-tour="sidebar"]',
          popover: {
            title: '📚 Navigation Sidebar',
            description: 'Access all major features:\n• Converter: Main tool\n• History: Past conversions\n• Templates: Pre-made prompts\n• Library: Saved favorites\n• Settings: Customize experience',
            side: 'right',
            align: 'center',
          },
        },
        
        // History
        {
          element: '[data-tour="nav-history"]',
          popover: {
            title: '⏱️ Conversion History',
            description: 'Every conversion is automatically saved! Review past prompts, compare versions, and quickly restore previous work.',
            side: 'right',
            align: 'start',
          },
        },
        
        // Templates
        {
          element: '[data-tour="nav-templates"]',
          popover: {
            title: '📋 Prompt Templates',
            description: 'Browse professional templates for common use cases: customer service bots, code assistants, creative writing, data analysis, and more!',
            side: 'right',
            align: 'start',
          },
        },
        
        // Library
        {
          element: '[data-tour="nav-library"]',
          popover: {
            title: '💾 Prompt Library',
            description: 'Save your best prompts for reuse! Star, organize, and quickly access your favorites. Export/import collections for team collaboration.',
            side: 'right',
            align: 'start',
          },
        },
        
        // Settings
        {
          element: '[data-tour="nav-settings"]',
          popover: {
            title: '⚙️ Settings & Preferences',
            description: 'Customize your experience:\n• Theme (light/dark)\n• API configuration\n• Default complexity\n• Keyboard shortcuts\n• Export settings',
            side: 'right',
            align: 'start',
          },
        },
        
        // Theme Toggle
        {
          element: '[data-tour="theme-toggle"]',
          popover: {
            title: '🌓 Theme Switcher',
            description: 'Toggle between light and dark modes. Your preference is saved automatically and syncs across devices.',
            side: 'left',
            align: 'center',
          },
        },
        
        // Quick Actions
        {
          element: '[data-tour="quick-actions"]',
          popover: {
            title: '⚡ Quick Actions',
            description: 'Fast shortcuts for common tasks:\n• Copy JSON\n• Download file\n• Clear all\n• Regenerate\n• Share prompt',
            side: 'top',
            align: 'center',
          },
        },
        
        // Keyboard Shortcuts
        {
          popover: {
            title: '⌨️ Keyboard Shortcuts',
            description: 'Pro tip! Use these shortcuts:\n• Ctrl/Cmd + Enter: Convert\n• Ctrl/Cmd + K: Clear all\n• Ctrl/Cmd + /: Toggle this help\n• Ctrl/Cmd + S: Save to library\n• Tab/Shift+Tab: Navigate',
            side: 'over',
          },
        },
        
        // Feedback Panel
        {
          element: '[data-tour="feedback"]',
          popover: {
            title: '📈 AI Feedback & Insights',
            description: 'Get intelligent analysis of your prompts: clarity scores, improvement suggestions, concept relationships, and optimization tips powered by AI.',
            side: 'left',
            align: 'center',
          },
        },
        
        // Daily Tip
        {
          element: '[data-tour="daily-tip"]',
          popover: {
            title: '💡 Daily Tips',
            description: 'Learn something new every day! Get expert tips on prompt engineering, JSON structure, and best practices.',
            side: 'bottom',
            align: 'center',
          },
        },
        
        // Final Step
        {
          popover: {
            title: '🎉 You\'re All Set!',
            description: 'You now know everything about Y7 JSON Prompter! Start by entering a prompt, or explore templates for inspiration. Happy prompting! 🚀\n\nTip: You can restart this tour anytime by clicking the help icon.',
            side: 'over',
          },
        },
      ],
    });

    driverObj.drive();
  }, []);

  return (
    <div className="relative">
      <motion.button
        onClick={startTour}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative p-2 rounded-lg transition-all ${
          !hasSeenTour
            ? 'bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-lg shadow-[var(--accent-primary-glow)]'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
        }`}
        title="Start Interactive Tour"
      >
        {!hasSeenTour && (
          <>
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-[var(--accent-primary)]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Notification dot */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--accent-secondary)] rounded-full shadow-lg"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </>
        )}
        <motion.div
          animate={!hasSeenTour ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <HelpCircle className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Enhanced Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 px-4 py-3 bg-[var(--bg-card)] border-2 border-[var(--accent-primary)]/30 rounded-xl shadow-2xl whitespace-nowrap z-50 overflow-hidden"
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/5 via-[var(--accent-secondary)]/5 to-[var(--accent-primary)]/5"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
                </motion.div>
                <span className="text-[var(--text-primary)] font-bold">
                  {!hasSeenTour ? 'New to Y7 Prompter?' : 'Take the Tour Again'}
                </span>
              </div>
              
              {!hasSeenTour && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"
                >
                  <Rocket className="w-3 h-3" />
                  <span>2 min interactive tour</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="font-semibold text-[var(--accent-primary)]">25 features</span>
                </motion.div>
              )}
            </div>
            
            {/* Arrow */}
            <div className="absolute -top-2 right-4 w-4 h-4 bg-[var(--bg-card)] border-l-2 border-t-2 border-[var(--accent-primary)]/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

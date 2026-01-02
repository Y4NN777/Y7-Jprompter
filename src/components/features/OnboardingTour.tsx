'use client';

import { driver } from 'driver.js';
import {
  HelpCircle,
  Sparkles,
  Rocket,
  ChevronRight,
  Play
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function OnboardingTour() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(true); // Default true to prevent flash

  // Check if user has seen the tour
  useEffect(() => {
    const seen = localStorage.getItem('y7-onboarding-complete');
    setHasSeenTour(!!seen);

    // Auto-show welcome card after 1.5s if tour not seen
    if (!seen) {
      const timer = setTimeout(() => setShowWelcome(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Inject custom styles for driver.js
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'y7-driver-styles';
    style.textContent = `
      /* Modern driver.js overrides */
      .driver-popover {
        background: var(--bg-card) !important;
        border: 1px solid var(--border-subtle) !important;
        border-radius: 16px !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4),
                    0 0 0 1px var(--accent-primary-subtle),
                    0 0 40px var(--accent-primary-glow) !important;
        padding: 0 !important;
        max-width: min(360px, calc(100vw - 32px)) !important;
        overflow: hidden !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
      }
      
      /* Mobile optimizations */
      @media (max-width: 640px) {
        .driver-popover {
          max-width: calc(100vw - 24px) !important;
          border-radius: 12px !important;
        }
      }

      .driver-popover * {
        font-family: inherit !important;
      }

      .driver-popover-title {
        font-size: 1.25rem !important;
        font-weight: 700 !important;
        color: var(--text-primary) !important;
        padding: 24px 24px 12px 24px !important;
        margin: 0 !important;
        line-height: 1.3 !important;
      }
      
      @media (max-width: 640px) {
        .driver-popover-title {
          font-size: 1.1rem !important;
          padding: 20px 20px 10px 20px !important;
        }
      }

      .driver-popover-description {
        font-size: 0.95rem !important;
        color: var(--text-secondary) !important;
        line-height: 1.7 !important;
        padding: 0 24px 20px 24px !important;
        margin: 0 !important;
      }
      
      @media (max-width: 640px) {
        .driver-popover-description {
          font-size: 0.875rem !important;
          padding: 0 20px 16px 20px !important;
          line-height: 1.6 !important;
        }
      }

      .driver-popover-progress-text {
        font-size: 0.8rem !important;
        color: var(--text-muted) !important;
        padding: 0 24px 8px 24px !important;
        font-weight: 500 !important;
      }
      
      @media (max-width: 640px) {
        .driver-popover-progress-text {
          font-size: 0.75rem !important;
          padding: 0 20px 6px 20px !important;
        }
      }

      /* Footer with buttons */
      .driver-popover-footer {
        padding: 16px 24px 24px 24px !important;
        display: flex !important;
        gap: 10px !important;
        justify-content: flex-end !important;
        background: var(--bg-secondary) !important;
        border-top: 1px solid var(--border-subtle) !important;
      }
      
      @media (max-width: 640px) {
        .driver-popover-footer {
          padding: 12px 16px 16px 16px !important;
          gap: 8px !important;
        }
      }

      .driver-popover-footer button {
        padding: 12px 20px !important;
        border-radius: 12px !important;
        font-size: 0.9rem !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }
      
      @media (max-width: 640px) {
        .driver-popover-footer button {
          padding: 10px 16px !important;
          font-size: 0.85rem !important;
          border-radius: 10px !important;
        }
      }

      .driver-popover-prev-btn {
        background: var(--bg-tertiary) !important;
        color: var(--text-secondary) !important;
        border: 1px solid var(--border-default) !important;
      }

      .driver-popover-prev-btn:hover {
        background: var(--bg-card) !important;
        color: var(--text-primary) !important;
        transform: translateY(-1px) !important;
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
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 25px var(--accent-primary-glow) !important;
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
        background: rgba(0, 0, 0, 0.75) !important;
        backdrop-filter: none !important;
      }

      /* Highlighted element - ensure sharp rendering */
      .driver-active-element {
        box-shadow: 0 0 0 4px var(--accent-primary),
                    0 0 0 8px var(--accent-primary-subtle),
                    0 0 40px var(--accent-primary-glow) !important;
        border-radius: 16px !important;
        backdrop-filter: none !important;
        filter: none !important;
        transform: translateZ(0) !important;
        will-change: auto !important;
      }
      
      @media (max-width: 640px) {
        .driver-active-element {
          box-shadow: 0 0 0 3px var(--accent-primary),
                      0 0 0 6px var(--accent-primary-subtle) !important;
          border-radius: 12px !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Load driver.js CSS
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
    setShowWelcome(false);

    // Detect mobile
    const isMobile = window.innerWidth < 640;

    const driverObj = driver({
      showProgress: true,
      animate: true,
      smoothScroll: true,
      allowClose: true,
      stagePadding: isMobile ? 8 : 12,
      stageRadius: isMobile ? 12 : 16,
      popoverOffset: isMobile ? 12 : 20,
      progressText: '{{current}} / {{total}}',
      nextBtnText: 'Next',
      prevBtnText: 'Back',
      doneBtnText: 'Start Creating!',
      onDestroyStarted: () => {
        localStorage.setItem('y7-onboarding-complete', 'true');
        setHasSeenTour(true);
        driverObj.destroy();
      },
      steps: [
        // Step 1: Welcome (no element)
        {
          popover: {
            title: 'Welcome to Y7-Jprompter!',
            description: isMobile 
              ? 'Transform ideas into JSON prompts. Quick tour!'
              : 'Transform your ideas into structured JSON prompts in seconds. This quick tour will show you the essentials.',
            side: 'over',
          },
        },

        // Step 2: Input Panel
        {
          element: '[data-tour="input-panel"]',
          popover: {
            title: 'Write Your Prompt',
            description: isMobile
              ? 'Type your prompt here. Be descriptive!'
              : 'Type any natural language prompt here. Be descriptive! Example: "Create a chatbot that helps users book appointments"',
            side: isMobile ? 'bottom' : 'right',
            align: 'start',
          },
        },

        // Step 3: Complexity Slider
        {
          element: '[data-tour="complexity"]',
          popover: {
            title: 'Choose Detail Level',
            description: isMobile
              ? 'Control complexity: Low (1-2) for simple tasks, High (5-7) for advanced.'
              : 'Slide to control output complexity. Low (1-2) for simple tasks, High (5-7) for comprehensive workflows with validation.',
            side: isMobile ? 'bottom' : 'top',
            align: 'center',
          },
        },

        // Step 4: Convert Button
        {
          element: '[data-tour="convert-btn"]',
          popover: {
            title: 'Transform Your Prompt',
            description: isMobile
              ? 'Tap here to convert to JSON!'
              : 'Click here or press Ctrl+Enter to convert your text into structured JSON. The AI does the magic!',
            side: isMobile ? 'bottom' : 'top',
            align: 'center',
          },
        },

        // Step 5: Output Panel
        {
          element: '[data-tour="output-panel"]',
          popover: {
            title: 'View Your Results',
            description: isMobile
              ? 'Your structured JSON appears here. Copy or switch tabs!'
              : 'Your structured JSON appears here. Copy it, download it, or switch tabs to see the visual concept graph!',
            side: isMobile ? 'bottom' : 'left',
            align: 'start',
          },
        },

        // Step 6: Finish
        {
          popover: {
            title: 'You\'re Ready!',
            description: isMobile
              ? 'Explore more in the menu. Happy prompting!'
              : 'That\'s all you need to know! Explore more features like History, Templates, and Settings in the sidebar. Happy prompting!',
            side: 'over',
          },
        },
      ],
    });

    driverObj.drive();
  }, []);

  const dismissWelcome = useCallback(() => {
    setShowWelcome(false);
    localStorage.setItem('y7-onboarding-complete', 'true');
    setHasSeenTour(true);
  }, []);

  return (
    <>
      {/* Help Button */}
      <motion.button
        onClick={startTour}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative p-2 rounded-lg transition-all ${
          !hasSeenTour
            ? 'bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-lg shadow-[var(--accent-primary-glow)]'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
        }`}
        title="Start Tour"
      >
        {!hasSeenTour && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--accent-secondary)] rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        <HelpCircle className="w-5 h-5" />
      </motion.button>

      {/* Welcome Card - Appears for new users */}
      <AnimatePresence>
        {showWelcome && !hasSeenTour && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 sm:w-80 max-w-sm overflow-hidden"
          >
            {/* Card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl overflow-hidden">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-base sm:text-lg">New here?</h3>
                    <p className="text-white/80 text-xs sm:text-sm">Quick 30-second tour</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed">
                  Learn how to transform natural language into powerful structured JSON prompts.
                </p>

                {/* Features preview */}
                <div className="flex gap-2 flex-wrap">
                  {['AI-Powered', 'Visual Graph', 'Templates'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={dismissWelcome}
                    className="flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Skip
                  </button>
                  <motion.button
                    onClick={startTour}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-xl shadow-lg shadow-[var(--accent-primary-glow)] flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Start Tour
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

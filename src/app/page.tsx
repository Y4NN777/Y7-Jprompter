'use client';

import { toast } from 'sonner';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useState, useEffect } from 'react';
import { useNavigationStore } from '@/stores/navigationStore';
import { useConverterStore } from '@/stores/converterStore';
import { useLearningStore } from '@/stores/learningStore';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { InputPanel } from '@/components/converter/InputPanel';
import { OutputPanel } from '@/components/converter/OutputPanel';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Eye, FolderOpen, BarChart3, FileJson, Key, HelpCircle, ChevronDown, Settings, Check, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { OnboardingTour } from '@/components/features/OnboardingTour';
import { PromptLibrary } from '@/components/library/PromptLibrary';
import { FeedbackPanel } from '@/components/feedback/FeedbackPanel';
import { HistoryView, TemplatesView, SettingsView, AboutView } from '@/components/views';

// Animation variants for the CTA button
const arrowVariants = {
  rest: { x: -12, opacity: 0 },
  hover: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 500, damping: 25 } },
};

export default function Home() {
  const { currentView, setCurrentView, sidebarCollapsed } = useNavigationStore();
  const { convert, clearAll, jsonOutput } = useConverterStore();
  const { skills } = useLearningStore();
  const [layoutPreset] = useState<'50-50' | '70-30' | 'focus'>('50-50');
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Handle responsive sidebar margin (fixes hydration issue)
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Keyboard Shortcuts
  useKeyboardShortcuts([
    {
      combo: { key: 'Enter', ctrl: true },
      handler: async () => {
        const promise = convert();
        toast.promise(promise, {
          loading: 'Converting prompt...',
          success: 'Converted!',
          error: 'Failed',
        });
        await promise;
      },
      description: 'Convert Prompt',
    },
    {
      combo: { key: 'Delete', ctrl: true },
      handler: clearAll,
      description: 'Clear All',
    }
  ]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header - Always full width at top */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/95 backdrop-blur-sm">
        <div className="w-full px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Menu - First on mobile */}
            <MobileMenu />

            {/* Logo & Name */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentView('home')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="w-9 h-9 flex items-center justify-center"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Image
                  src="/favicon.svg"
                  alt="Y7-Jprompter Logo"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
              </motion.div>
              {/* Hide name on mobile */}
              <span className="hidden sm:inline font-semibold text-[var(--text-primary)]">Y7-Jprompter</span>
            </motion.div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Library Button - Always visible */}
            <button
              onClick={() => setIsLibraryOpen(true)}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              title="Prompt Library"
            >
              <FolderOpen className="w-5 h-5" />
            </button>

            {/* Feedback Button - Always visible */}
            <button
              onClick={() => setIsFeedbackOpen(true)}
              disabled={!jsonOutput}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Get Feedback"
            >
              <BarChart3 className="w-5 h-5" />
            </button>

            {/* Onboarding Tour - Converter only */}
            {currentView === 'converter' && <OnboardingTour />}

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Sidebar - Hidden on Home */}
      {currentView !== 'home' && <Sidebar />}

      {/* Main Content - Below fixed header */}
      <div
        className="min-h-screen pt-16 transition-all duration-300 flex flex-col"
        style={{
          marginLeft: currentView !== 'home' && isDesktop
            ? (sidebarCollapsed ? '80px' : '240px')
            : '0',
          height: currentView === 'converter' ? '100vh' : 'auto',
        }}
      >
        {currentView === 'home' && (
            /* ========== HOME VIEW ========== */
            <motion.main
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8"
            >
              {/* Hero Section */}
              <section className="py-16 sm:py-24 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-[var(--accent-primary)] bg-[var(--accent-primary-subtle)] rounded-full">
                    Free & Open Source
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight"
                >
                  Transform Your Prompts
                  <br />
                  <span className="text-[var(--accent-primary)]">Into Structured JSON</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10"
                >
                  Convert natural language prompts into well-organized JSON structures.
                  Visualize concepts and relationships with interactive graphs.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <motion.button
                    onClick={() => setCurrentView('converter')}
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent-primary)] text-white font-semibold rounded-xl shadow-lg shadow-[var(--accent-primary-glow)] overflow-hidden"
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)] opacity-0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%', opacity: 0.3 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                    <span className="relative z-10">Use for Free</span>
                    <motion.span
                      variants={arrowVariants}
                      className="relative z-10"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </motion.button>
                </motion.div>
              </section>

              {/* Features Section */}
              <section className="py-16 sm:py-20 border-t border-[var(--border-subtle)]">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-[var(--text-primary)] text-center mb-10 sm:mb-12"
                >
                  How It Works
                </motion.h2>

                <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mx-1 sm:mx-0">
                  {[
                    { icon: FileJson, title: 'JSON Structured', description: 'Convert natural prompts into well-organized JSON format' },
                    { icon: Zap, title: 'AI Powered', description: 'Leverages Gemini AI for intelligent prompt analysis' },
                    { icon: Eye, title: 'Visual Graph', description: 'See your prompt structure as an interactive D3 visualization' },
                  ].map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="group text-center p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary-subtle)] hover:shadow-lg transition-all cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-14 h-14 mx-auto mb-5 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center"
                      >
                        <feature.icon className="w-7 h-7 text-[var(--accent-primary)]" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Steps Section */}
              <section className="py-16 sm:py-20 border-t border-[var(--border-subtle)]">
                <div className="max-w-3xl mx-auto px-1 sm:px-0">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-[var(--text-primary)] text-center mb-10 sm:mb-12"
                  >
                    Three Simple Steps
                  </motion.h2>

                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { step: 1, icon: FileJson, title: 'Enter Your Prompt', desc: 'Type or paste any natural language prompt you want to structure' },
                      { step: 2, icon: Zap, title: 'Choose Complexity', desc: 'Select how detailed you want the JSON structure to be (1-7)' },
                      { step: 3, icon: Eye, title: 'Get Results', desc: 'View, copy, or download your structured JSON prompt' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, type: 'spring', stiffness: 100 }}
                        className="group relative"
                      >
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="flex items-start gap-5 p-5 rounded-xl hover:bg-[var(--bg-secondary)] transition-all cursor-pointer"
                        >
                          {/* Step number - Fixed alignment */}
                          <motion.div
                            className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent-primary)] text-white font-bold flex items-center justify-center text-lg shadow-lg shadow-[var(--accent-primary-glow)]"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          >
                            {item.step}
                          </motion.div>

                          {/* Content - Properly aligned */}
                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-center gap-2.5 mb-2">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                              >
                                <item.icon className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" />
                              </motion.div>
                              <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                              {item.desc}
                            </p>
                          </div>

                          {/* Arrow on hover - Aligned with title */}
                          <motion.div
                            className="flex-shrink-0 self-start pt-1"
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          >
                            <ArrowRight className="w-5 h-5 text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* API Key Info Section */}
              <section className="py-16 sm:py-20 border-t border-[var(--border-subtle)]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center">
                      <Key className="w-6 h-6 text-[var(--accent-primary)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                      Bring Your Own API Key
                    </h2>
                  </div>

                  <p className="text-center text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
                    Get unlimited conversions by using your own Gemini API key.
                    It&apos;s free to get and gives you full control.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
                    >
                      <h3 className="font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[var(--accent-primary-subtle)] flex items-center justify-center text-xs font-bold text-[var(--accent-primary)]">1</span>
                        Get Your Free Key
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Visit{' '}
                        <a
                          href="https://aistudio.google.com/apikey"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--accent-primary)] hover:underline"
                        >
                          Google AI Studio
                        </a>
                        {' '}and create a free Gemini API key in seconds.
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -2 }}
                      className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
                    >
                      <h3 className="font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[var(--accent-primary-subtle)] flex items-center justify-center text-xs font-bold text-[var(--accent-primary)]">2</span>
                        Add to Settings
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Go to{' '}
                        <button
                          onClick={() => setCurrentView('settings')}
                          className="text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1"
                        >
                          <Settings className="w-3 h-3" />
                          Settings
                        </button>
                        {' '}and paste your API key. It&apos;s stored locally and never sent to our servers.
                      </p>
                    </motion.div>
                  </div>

                  <div className="text-center p-4 rounded-xl bg-[var(--accent-success)]/10 border border-[var(--accent-success)]/20">
                    <p className="text-sm text-[var(--accent-success)] font-medium flex items-center justify-center gap-4 flex-wrap">
                      <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Your API key stays in your browser</span>
                      <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Unlimited conversions</span>
                      <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> No daily limits</span>
                    </p>
                  </div>
                </motion.div>
              </section>

              {/* Final CTA Section */}
              <section className="py-16 sm:py-20 border-t border-[var(--border-subtle)]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center max-w-2xl mx-auto"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
                    Ready to Transform Your Prompts?
                  </h2>
                  <p className="text-[var(--text-secondary)] mb-8">
                    Start converting your natural language prompts into structured JSON today.
                  </p>
                  <motion.button
                    onClick={() => setCurrentView('converter')}
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent-primary)] text-white font-semibold rounded-xl shadow-lg shadow-[var(--accent-primary-glow)] overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)] opacity-0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%', opacity: 0.3 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                    <span className="relative z-10">Get Started</span>
                    <motion.span
                      variants={arrowVariants}
                      className="relative z-10"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </motion.button>
                </motion.div>
              </section>



              {/* FAQ Section */}
              <section className="py-16 sm:py-20 border-t border-[var(--border-subtle)]">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <HelpCircle className="w-6 h-6 text-[var(--accent-primary)]" />
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        q: 'What is Y7-Jprompter?',
                        a: 'Y7-Jprompter is a free tool that converts natural language prompts into structured JSON format. This helps you create more effective prompts for AI systems by organizing your instructions clearly.',
                      },
                      {
                        q: 'Is it really free to use?',
                        a: 'Yes! You get 100 free conversions per day. For unlimited usage, you can add your own free Gemini API key from Google AI Studio.',
                      },
                      {
                        q: 'Is my API key safe?',
                        a: 'Absolutely. Your API key is stored only in your browser\'s local storage and is sent directly to Google\'s API. We never store or have access to your key on our servers.',
                      },
                      {
                        q: 'What are complexity levels?',
                        a: 'Complexity levels (1-7) control how detailed the JSON output will be. Level 1 gives you a simple structure, while level 7 provides the most comprehensive breakdown with all available fields.',
                      },
                      {
                        q: 'What is Context Injection?',
                        a: 'Context Injection (available at complexity 3+) lets you add project-specific context like your tech stack, coding style, or domain knowledge. This helps generate more tailored prompt structures.',
                      },
                      {
                        q: 'Can I save my converted prompts?',
                        a: 'Yes! All your conversions are automatically saved to History. You can also save favorites to your Prompt Library for quick access later.',
                      },
                    ].map((faq, i) => (
                      <motion.details
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] cursor-pointer"
                      >
                        <summary className="flex items-center justify-between font-medium text-[var(--text-primary)] list-none">
                          <span>{faq.q}</span>
                          <ChevronDown className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-180 transition-transform" />
                        </summary>
                        <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.details>
                    ))}
                  </div>
                </motion.div>
              </section>

              {/* Footer */}
              <footer className="py-8 border-t border-[var(--border-subtle)] text-center">
                <p className="text-sm text-[var(--text-muted)]">
                  © 2026 Y7 Labs. All rights reserved.
                </p>
              </footer>
            </motion.main>
          )}

          {currentView === 'converter' && (
            <motion.main
              key="converter"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full flex flex-col"
            >
              <div className="flex-1 px-5 sm:px-6 lg:px-8 py-4 flex flex-col gap-4 overflow-hidden min-h-0">

                {/* Main Converter Section - Resizable on Desktop */}
                <section className="hidden lg:flex flex-1 min-h-0">
                  <PanelGroup
                    direction="horizontal"
                    className="h-full gap-2"
                  >
                    {/* Input Panel */}
                    <Panel
                      defaultSize={layoutPreset === '70-30' ? 70 : layoutPreset === 'focus' ? 100 : 50}
                      minSize={30}
                      className="flex"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex-1 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden backdrop-blur-xl"
                        data-tour="input-panel"
                      >
                        <div className="p-6 h-full">
                          <InputPanel />
                        </div>
                      </motion.div>
                    </Panel>

                    {/* Resize Handle */}
                    {layoutPreset !== 'focus' && (
                      <>
                        <PanelResizeHandle className="w-2 flex items-center justify-center group hover:bg-[var(--accent-primary-subtle)] rounded-full transition-colors mx-1">
                          <div className="w-1 h-12 bg-[var(--border-default)] group-hover:bg-[var(--accent-primary)] rounded-full transition-colors" />
                        </PanelResizeHandle>

                        {/* Output Panel */}
                        <Panel
                          defaultSize={layoutPreset === '70-30' ? 30 : 50}
                          minSize={25}
                          className="flex"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex-1 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden backdrop-blur-xl"
                            data-tour="output-panel"
                          >
                            <OutputPanel />
                          </motion.div>
                        </Panel>
                      </>
                    )}
                  </PanelGroup>
                </section>

                {/* Mobile: Stacked Layout */}
                <section className="lg:hidden flex flex-col gap-3 flex-1 min-h-0">
                  {/* Input Panel - Takes most space */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden backdrop-blur-xl flex-1 min-h-0"
                    data-tour="input-panel"
                  >
                    <div className="p-4 h-full overflow-auto">
                      <InputPanel />
                    </div>
                  </motion.div>

                  {/* Output Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden backdrop-blur-xl ${
                      jsonOutput ? 'flex-1 min-h-[250px]' : 'h-[150px] flex-shrink-0'
                    }`}
                    data-tour="output-panel"
                  >
                    <OutputPanel />
                  </motion.div>

                  {/* Compact Stats Strip - Only when no output */}
                  {!jsonOutput && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2 p-2 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] flex-shrink-0"
                    >
                      <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[var(--bg-secondary)] rounded-lg">
                        <Zap className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                        <span className="text-xs text-[var(--text-muted)]">{skills.totalConversions} converts</span>
                      </div>
                      <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[var(--bg-secondary)] rounded-lg">
                        <Lightbulb className="w-3.5 h-3.5 text-[var(--accent-warning)]" />
                        <span className="text-xs text-[var(--text-muted)] truncate">Tip: Ctrl+Enter</span>
                      </div>
                    </motion.div>
                  )}
                </section>

                {/* Additional Features Section - Desktop only, hidden when output shown */}
                <section className={`hidden lg:grid lg:grid-cols-3 gap-4 flex-shrink-0 transition-all duration-300 ${jsonOutput ? 'lg:hidden' : ''}`}>
                  {/* Quick Stats Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-5"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[var(--accent-primary)]" />
                      Quick Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <p className="text-2xl font-bold text-[var(--accent-primary)]">{skills.totalConversions}</p>
                        <p className="text-xs text-[var(--text-muted)]">Conversions</p>
                      </div>
                      <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <p className="text-2xl font-bold text-[var(--accent-primary)]">
                          {skills.averageScore > 0 ? skills.averageScore : '-'}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">Avg Score</p>
                      </div>
                    </div>
                    {skills.bestScore > 0 && (
                      <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] flex justify-between text-xs">
                        <span className="text-[var(--text-muted)]">Best Score</span>
                        <span className="font-medium text-[var(--accent-success)]">{skills.bestScore}</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Placeholder: Daily Tip Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-5"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[var(--accent-primary)]" />
                      Daily Tip
                    </h3>
                    <div className="p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)]">
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-[var(--accent-warning)] flex-shrink-0 mt-0.5" />
                        <span>Use complexity level 3+ to unlock Context Injection for more detailed prompt structures.</span>
                      </p>
                    </div>
                  </motion.div>

                  {/* Placeholder: Quick Actions Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-5 md:col-span-2 lg:col-span-1"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <FileJson className="w-4 h-4 text-[var(--accent-primary)]" />
                      Keyboard Shortcuts
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Convert</span>
                        <kbd className="px-2 py-0.5 bg-[var(--bg-secondary)] rounded text-xs font-mono">Ctrl + Enter</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Clear All</span>
                        <kbd className="px-2 py-0.5 bg-[var(--bg-secondary)] rounded text-xs font-mono">Ctrl + Del</kbd>
                      </div>
                    </div>
                  </motion.div>
                </section>
              </div>

              {/* Footer - Only show when no output or on mobile */}
              <footer className={`flex-shrink-0 py-3 text-center border-t border-[var(--border-subtle)] px-5 sm:px-6 lg:px-8 ${jsonOutput ? 'lg:hidden' : ''}`}>
                <p className="text-xs text-[var(--text-muted)]">
                  © 2026 Y7 Labs
                </p>
              </footer>
            </motion.main>
          )}

          {currentView === 'history' && (
            /* ========== HISTORY VIEW ========== */
            <motion.main
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-auto bg-[var(--bg-primary)] min-h-[calc(100vh-4rem)]"
            >
              <HistoryView />
            </motion.main>
          )}

          {currentView === 'templates' && (
            /* ========== TEMPLATES VIEW ========== */
            <motion.main
              key="templates"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-auto bg-[var(--bg-primary)] min-h-[calc(100vh-4rem)]"
            >
              <TemplatesView />
            </motion.main>
          )}

          {currentView === 'settings' && (
            /* ========== SETTINGS VIEW ========== */
            <motion.main
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-auto bg-[var(--bg-primary)] min-h-[calc(100vh-4rem)]"
            >
              <SettingsView />
            </motion.main>
          )}

          {currentView === 'about' && (
            /* ========== ABOUT VIEW ========== */
            <motion.main
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-auto bg-[var(--bg-primary)] min-h-[calc(100vh-4rem)]"
            >
              <AboutView />
            </motion.main>
          )}
      </div>

      {/* Prompt Library Modal */}
      <PromptLibrary isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} />

      {/* Feedback Panel Modal */}
      <FeedbackPanel isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
}

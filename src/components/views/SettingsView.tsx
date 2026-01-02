'use client';

import { motion } from 'framer-motion';
import { Settings, Moon, Sun, Monitor, Trash2, Download, Upload, RotateCcw, Key, Eye, EyeOff, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useConverterStore } from '@/stores/converterStore';
import { useLearningStore } from '@/stores/learningStore';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { toast } from 'sonner';

type ThemeOption = 'light' | 'dark' | 'system';

export function SettingsView() {
  const { history, clearHistory, exportHistory, importHistory, complexity, setComplexity } = useConverterStore();
  const { resetProgress } = useLearningStore();
  const [theme, setTheme] = useState<ThemeOption>('system');
  const [autoSave, setAutoSave] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeOption | null;
    if (savedTheme) setTheme(savedTheme);

    // Load saved API key
    const savedKey = localStorage.getItem('gemini-api-key');
    if (savedKey) {
      setApiKey(savedKey);
      setApiKeySaved(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      // Basic validation: Gemini API keys start with "AIza" and are 39 characters
      if (!apiKey.trim().startsWith('AIza')) {
        toast.error('Invalid API key format. Gemini API keys should start with "AIza"');
        return;
      }
      if (apiKey.trim().length < 30) {
        toast.error('API key seems too short. Please check and try again.');
        return;
      }
      
      localStorage.setItem('gemini-api-key', apiKey.trim());
      setApiKeySaved(true);
      toast.success('API key saved successfully! It will be used for all conversions.');
    } else {
      localStorage.removeItem('gemini-api-key');
      setApiKeySaved(false);
      toast.success('API key removed. Using default shared key.');
    }
  };

  const handleThemeChange = (newTheme: ThemeOption) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    toast.success(`Theme changed to ${newTheme}`);
  };

  const handleExport = () => {
    const data = exportHistory();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jprompter-history-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('History exported');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = e.target?.result as string;
            importHistory(data);
            toast.success('History imported');
          } catch {
            toast.error('Invalid file format');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearAll = () => {
    setShowClearConfirm(true);
  };

  const confirmClearAll = () => {
    clearHistory();
    resetProgress();
    toast.success('All data cleared');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center">
          <Settings className="w-5 h-5 text-[var(--accent-primary)]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Settings</h1>
          <p className="text-sm text-[var(--text-muted)]">Customize your experience</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* API Configuration */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Key className="w-4 h-4 text-[var(--accent-primary)]" />
            API Configuration
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">
                Gemini API Key
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setApiKeySaved(false);
                    }}
                    placeholder="Enter your Gemini API key"
                    className="w-full px-4 py-2.5 pr-10 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={handleSaveApiKey}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    apiKeySaved
                      ? 'bg-[var(--accent-success)]/20 text-[var(--accent-success)]'
                      : 'bg-[var(--accent-primary)] text-white hover:opacity-90'
                  }`}
                >
                  {apiKeySaved ? <Check className="w-4 h-4" /> : 'Save'}
                </button>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Get your API key from{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-primary)] hover:underline"
                >
                  Google AI Studio
                </a>
                {' '}(free tier: 1,500 requests/day)
              </p>
              
              {/* Info box */}
              <div className="mt-3 p-3 bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary)]/20 rounded-lg">
                <div className="flex gap-2 text-xs">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="space-y-1 text-[var(--text-secondary)]">
                    <p className="font-medium text-[var(--text-primary)]">How it works:</p>
                    <ul className="space-y-0.5 list-disc list-inside">
                      <li>Your API key is stored only in your browser</li>
                      <li>Requests go directly from your browser to Google's servers</li>
                      <li>We never see or store your API key on our servers</li>
                      <li>Using your own key bypasses shared rate limits</li>
                      <li>Free tier gives you 1,500 requests per day (vs 100 shared)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Appearance</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">Theme</label>
              <div className="flex gap-2">
                {[
                  { value: 'light' as ThemeOption, icon: Sun, label: 'Light' },
                  { value: 'dark' as ThemeOption, icon: Moon, label: 'Dark' },
                  { value: 'system' as ThemeOption, icon: Monitor, label: 'System' },
                ].map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => handleThemeChange(value)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      theme === value
                        ? 'bg-[var(--accent-primary)] text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Converter Defaults */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Converter Defaults</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">
                Default Complexity Level: {complexity}
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={complexity}
                onChange={(e) => setComplexity(Number(e.target.value))}
                className="w-full accent-[var(--accent-primary)]"
              />
              <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
                <span>Basic</span>
                <span>Expert</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-primary)]">Auto-save to history</p>
                <p className="text-xs text-[var(--text-muted)]">Save conversions automatically</p>
              </div>
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  autoSave ? 'bg-[var(--accent-primary)]' : 'bg-[var(--bg-tertiary)]'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    autoSave ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Data Management</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
              <div>
                <p className="text-sm text-[var(--text-primary)]">History</p>
                <p className="text-xs text-[var(--text-muted)]">{history.length} conversions saved</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  disabled={history.length === 0}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary-subtle)] rounded-lg transition-colors disabled:opacity-40"
                  title="Export"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={handleImport}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary-subtle)] rounded-lg transition-colors"
                  title="Import"
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button
              onClick={handleClearAll}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[var(--accent-error)] bg-[var(--accent-error)]/10 hover:bg-[var(--accent-error)]/20 rounded-lg text-sm font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All Data
            </button>
          </div>
        </section>

        {/* Reset */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Reset</h2>
          <button
            onClick={() => {
              localStorage.removeItem('theme');
              setTheme('system');
              setComplexity(4);
              toast.success('Settings reset to defaults');
            }}
            className="flex items-center gap-2 px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
        </section>
      </div>

      {/* Confirm Clear Modal */}
      <ConfirmModal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={confirmClearAll}
        title="Clear All Data?"
        message="This will permanently delete all your conversion history, saved prompts, and learning progress. This action cannot be undone."
        confirmText="Clear Everything"
        variant="danger"
      />
    </motion.div>
  );
}

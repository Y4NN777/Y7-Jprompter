/**
 * Learning Store - Zustand State Management
 * Manages learning progress, skills, and chatbot state
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getBestStorage } from './middleware/persistMiddleware';
import type {
  UserSkills,
  PromptFeedback,
  DailyTip,
  ChatMessage,
  DEFAULT_USER_SKILLS,
} from '@/types';

/**
 * Learning state interface
 */
interface LearningState {
  // User progress
  skills: UserSkills;

  // Daily tip
  currentTip: DailyTip | null;
  tipLastFetched: Date | null;

  // Chat
  chatMessages: ChatMessage[];
  isChatLoading: boolean;

  // Actions - Skills
  updateSkillsFromFeedback: (feedback: PromptFeedback) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  addAchievement: (achievementId: string, name: string, description: string) => void;

  // Actions - Daily Tip
  fetchDailyTip: () => Promise<void>;
  setCurrentTip: (tip: DailyTip | null) => void;

  // Actions - Chat
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  setIsChatLoading: (loading: boolean) => void;
  sendChatMessage: (content: string) => Promise<void>;

  // Actions - Reset
  resetProgress: () => void;
}

/**
 * Default skills for new users
 */
const defaultSkills: UserSkills = {
  totalConversions: 0,
  averageScore: 0,
  bestScore: 0,
  masteredCategories: [],
  currentStreak: 0,
  longestStreak: 0,
  achievements: [],
  lastActivityAt: new Date(),
};

/**
 * Generate unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create the learning store
 */
export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      // Initial state
      skills: defaultSkills,
      currentTip: null,
      tipLastFetched: null,
      chatMessages: [],
      isChatLoading: false,

      // Skills actions
      updateSkillsFromFeedback: (feedback) =>
        set((state) => {
          const newTotal = state.skills.totalConversions + 1;
          const newAverage =
            (state.skills.averageScore * state.skills.totalConversions +
              feedback.overallScore) /
            newTotal;

          return {
            skills: {
              ...state.skills,
              totalConversions: newTotal,
              averageScore: Math.round(newAverage * 10) / 10,
              bestScore: Math.max(state.skills.bestScore, feedback.overallScore),
              masteredCategories: [
                ...new Set([
                  ...state.skills.masteredCategories,
                  ...feedback.skillsImproved,
                ]),
              ],
              lastActivityAt: new Date(),
            },
          };
        }),

      incrementStreak: () =>
        set((state) => {
          const newStreak = state.skills.currentStreak + 1;
          return {
            skills: {
              ...state.skills,
              currentStreak: newStreak,
              longestStreak: Math.max(state.skills.longestStreak, newStreak),
              lastActivityAt: new Date(),
            },
          };
        }),

      resetStreak: () =>
        set((state) => ({
          skills: {
            ...state.skills,
            currentStreak: 0,
          },
        })),

      addAchievement: (achievementId, name, description) =>
        set((state) => {
          // Don't add if already exists
          if (state.skills.achievements.some((a) => a.id === achievementId)) {
            return state;
          }

          return {
            skills: {
              ...state.skills,
              achievements: [
                ...state.skills.achievements,
                {
                  id: achievementId,
                  name,
                  description,
                  icon: 'trophy',
                  unlockedAt: new Date(),
                },
              ],
            },
          };
        }),

      // Daily tip actions
      fetchDailyTip: async () => {
        const { tipLastFetched } = get();

        // Check if we already fetched today
        if (tipLastFetched) {
          const lastFetch = new Date(tipLastFetched);
          const now = new Date();
          if (
            lastFetch.getDate() === now.getDate() &&
            lastFetch.getMonth() === now.getMonth() &&
            lastFetch.getFullYear() === now.getFullYear()
          ) {
            return; // Already fetched today
          }
        }

        try {
          const response = await fetch('/api/daily-tip');
          if (response.ok) {
            const tip = await response.json();
            set({
              currentTip: { ...tip, fetchedAt: new Date() },
              tipLastFetched: new Date(),
            });
          }
        } catch (error) {
          console.error('Failed to fetch daily tip:', error);
        }
      },

      setCurrentTip: (tip) => set({ currentTip: tip }),

      // Chat actions
      addChatMessage: (message) =>
        set((state) => ({
          chatMessages: [
            ...state.chatMessages,
            {
              ...message,
              id: generateId(),
              timestamp: new Date(),
            },
          ],
        })),

      clearChat: () => set({ chatMessages: [] }),

      setIsChatLoading: (loading) => set({ isChatLoading: loading }),

      sendChatMessage: async (content) => {
        const { addChatMessage, setIsChatLoading } = get();

        // Add user message
        addChatMessage({ role: 'user', content });
        setIsChatLoading(true);

        try {
          // For now, use a simple endpoint or the explain conversion
          // In a full implementation, this would call a dedicated chat API
          const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              originalPrompt: content,
              jsonPrompt: { question: content },
            }),
          });

          if (response.ok) {
            const data = await response.json();
            addChatMessage({
              role: 'assistant',
              content:
                data.suggestions?.join('\n\n') ||
                'I can help you learn about prompt engineering. Try asking about JSON structures, complexity levels, or best practices!',
            });
          } else {
            addChatMessage({
              role: 'assistant',
              content:
                'I apologize, but I encountered an error. Please try again.',
            });
          }
        } catch (error) {
          addChatMessage({
            role: 'assistant',
            content:
              'I apologize, but I encountered an error. Please try again.',
          });
        } finally {
          setIsChatLoading(false);
        }
      },

      // Reset
      resetProgress: () =>
        set({
          skills: defaultSkills,
          chatMessages: [],
          currentTip: null,
          tipLastFetched: null,
        }),
    }),
    {
      name: 'y7-jprompter-learning',
      storage: createJSONStorage(() => getBestStorage('learning')),
      partialize: (state) => ({
        // Only persist these fields
        skills: state.skills,
        currentTip: state.currentTip,
        tipLastFetched: state.tipLastFetched,
      }),
    }
  )
);

/**
 * Feedback Types for AI Evaluation and Skill Tracking
 */

/**
 * 5-axis feedback from AI evaluation
 */
export interface FeedbackAxes {
  clarity: number; // 0-100 - How clear is the intent?
  specificity: number; // 0-100 - How precise are the requirements?
  structure: number; // 0-100 - How well-organized is the JSON?
  actionability: number; // 0-100 - How executable is the prompt?
  creativity: number; // 0-100 - How much room for AI interpretation?
}

/**
 * Complete feedback from AI evaluation
 */
export interface PromptFeedback {
  axes: FeedbackAxes;
  overallScore: number; // 0-100, weighted average
  suggestions: string[]; // Improvement suggestions
  skillsImproved: string[]; // Categories that show mastery
  timestamp: Date;
}

/**
 * Axis metadata for radar chart
 */
export interface FeedbackAxisInfo {
  key: keyof FeedbackAxes;
  label: string;
  description: string;
}

/**
 * All feedback axes with metadata
 */
export const FEEDBACK_AXES: FeedbackAxisInfo[] = [
  {
    key: 'clarity',
    label: 'Clarity',
    description: 'How clear is the intent?',
  },
  {
    key: 'specificity',
    label: 'Specificity',
    description: 'How precise are the requirements?',
  },
  {
    key: 'structure',
    label: 'Structure',
    description: 'How well-organized is the JSON?',
  },
  {
    key: 'actionability',
    label: 'Actionability',
    description: 'How executable is the prompt?',
  },
  {
    key: 'creativity',
    label: 'Creativity',
    description: 'How much room for AI interpretation?',
  },
];

/**
 * Achievement for gamification
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number; // 0-100 for progressive achievements
}

/**
 * User skill tracking
 */
export interface UserSkills {
  totalConversions: number;
  averageScore: number;
  bestScore: number;
  masteredCategories: string[];
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
  lastActivityAt: Date;
}

/**
 * Daily tip from AI
 */
export interface DailyTip {
  id: string;
  tip: string;
  category: string;
  relatedConcepts: string[];
  fetchedAt: Date;
}

/**
 * Chat message for learning center
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Default user skills for new users
 */
export const DEFAULT_USER_SKILLS: UserSkills = {
  totalConversions: 0,
  averageScore: 0,
  bestScore: 0,
  masteredCategories: [],
  currentStreak: 0,
  longestStreak: 0,
  achievements: [],
  lastActivityAt: new Date(),
};

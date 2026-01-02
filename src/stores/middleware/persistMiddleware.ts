/**
 * Zustand Persistence Middleware for IndexedDB
 * Provides state persistence across page reloads
 */

import { StateStorage } from 'zustand/middleware';
import { getValue, setValue, deleteValue } from '@/lib/db/indexedDB';

type StoreName = 'converter' | 'learning';

/**
 * Create an IndexedDB storage adapter for Zustand persist middleware
 */
export function createIndexedDBStorage(storeName: StoreName): StateStorage {
  return {
    getItem: async (name: string): Promise<string | null> => {
      // Only run in browser
      if (typeof window === 'undefined') return null;

      try {
        const value = await getValue<string>(storeName, name);
        return value;
      } catch (error) {
        console.error(`Error loading ${name} from IndexedDB:`, error);
        return null;
      }
    },

    setItem: async (name: string, value: string): Promise<void> => {
      // Only run in browser
      if (typeof window === 'undefined') return;

      try {
        await setValue(storeName, name, value);
      } catch (error) {
        console.error(`Error saving ${name} to IndexedDB:`, error);
      }
    },

    removeItem: async (name: string): Promise<void> => {
      // Only run in browser
      if (typeof window === 'undefined') return;

      try {
        await deleteValue(storeName, name);
      } catch (error) {
        console.error(`Error removing ${name} from IndexedDB:`, error);
      }
    },
  };
}

/**
 * Create a localStorage fallback storage adapter
 * Used when IndexedDB is not available
 */
export function createLocalStorageFallback(): StateStorage {
  return {
    getItem: (name: string): string | null => {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(name);
    },

    setItem: (name: string, value: string): void => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(name, value);
    },

    removeItem: (name: string): void => {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(name);
    },
  };
}

/**
 * Check if IndexedDB is available
 */
export function isIndexedDBAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    return 'indexedDB' in window && window.indexedDB !== null;
  } catch {
    return false;
  }
}

/**
 * Get the best available storage adapter
 */
export function getBestStorage(storeName: StoreName): StateStorage {
  if (isIndexedDBAvailable()) {
    return createIndexedDBStorage(storeName);
  }
  return createLocalStorageFallback();
}

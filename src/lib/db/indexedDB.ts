/**
 * IndexedDB Wrapper using idb library
 * Provides typed access to local database storage
 */

import { openDB, DBSchema, IDBPDatabase } from 'idb';

/**
 * Database schema definition
 */
interface Y7JprompterDB extends DBSchema {
  converter: {
    key: string;
    value: string; // JSON stringified state
  };
  learning: {
    key: string;
    value: string; // JSON stringified state
  };
  history: {
    key: string;
    value: {
      id: string;
      input: unknown;
      output: unknown;
      timestamp: string;
      feedback?: unknown;
    };
    indexes: { 'by-timestamp': string };
  };
}

const DB_NAME = 'y7-jprompter-db';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<Y7JprompterDB> | null = null;

/**
 * Initialize and get database instance
 */
export async function getDB(): Promise<IDBPDatabase<Y7JprompterDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<Y7JprompterDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Converter state store
      if (!db.objectStoreNames.contains('converter')) {
        db.createObjectStore('converter');
      }

      // Learning state store
      if (!db.objectStoreNames.contains('learning')) {
        db.createObjectStore('learning');
      }

      // History store with timestamp index
      if (!db.objectStoreNames.contains('history')) {
        const historyStore = db.createObjectStore('history', { keyPath: 'id' });
        historyStore.createIndex('by-timestamp', 'timestamp');
      }
    },
  });

  return dbInstance;
}

/**
 * Get a value from a store
 */
export async function getValue<T>(
  storeName: 'converter' | 'learning',
  key: string
): Promise<T | null> {
  try {
    const db = await getDB();
    const value = await db.get(storeName, key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting value from ${storeName}:`, error);
    return null;
  }
}

/**
 * Set a value in a store
 */
export async function setValue(
  storeName: 'converter' | 'learning',
  key: string,
  value: unknown
): Promise<void> {
  try {
    const db = await getDB();
    await db.put(storeName, JSON.stringify(value), key);
  } catch (error) {
    console.error(`Error setting value in ${storeName}:`, error);
  }
}

/**
 * Delete a value from a store
 */
export async function deleteValue(
  storeName: 'converter' | 'learning',
  key: string
): Promise<void> {
  try {
    const db = await getDB();
    await db.delete(storeName, key);
  } catch (error) {
    console.error(`Error deleting value from ${storeName}:`, error);
  }
}

/**
 * Add an item to history
 */
export async function addHistoryItem(item: {
  id: string;
  input: unknown;
  output: unknown;
  timestamp: string;
  feedback?: unknown;
}): Promise<void> {
  try {
    const db = await getDB();
    await db.put('history', item);
  } catch (error) {
    console.error('Error adding history item:', error);
  }
}

/**
 * Get all history items, sorted by timestamp (newest first)
 */
export async function getHistory(limit = 50): Promise<unknown[]> {
  try {
    const db = await getDB();
    const items = await db.getAllFromIndex('history', 'by-timestamp');
    return items.reverse().slice(0, limit);
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
}

/**
 * Clear all history
 */
export async function clearHistory(): Promise<void> {
  try {
    const db = await getDB();
    await db.clear('history');
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}

/**
 * Delete a history item by ID
 */
export async function deleteHistoryItem(id: string): Promise<void> {
  try {
    const db = await getDB();
    await db.delete('history', id);
  } catch (error) {
    console.error('Error deleting history item:', error);
  }
}

/**
 * Export all data as JSON
 */
export async function exportData(): Promise<string> {
  try {
    const db = await getDB();
    const converter = await db.get('converter', 'state');
    const learning = await db.get('learning', 'state');
    const history = await db.getAll('history');

    return JSON.stringify({
      converter: converter ? JSON.parse(converter) : null,
      learning: learning ? JSON.parse(learning) : null,
      history,
      exportedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error exporting data:', error);
    return '{}';
  }
}

/**
 * Import data from JSON
 */
export async function importData(jsonData: string): Promise<boolean> {
  try {
    const data = JSON.parse(jsonData);
    const db = await getDB();

    if (data.converter) {
      await db.put('converter', JSON.stringify(data.converter), 'state');
    }

    if (data.learning) {
      await db.put('learning', JSON.stringify(data.learning), 'state');
    }

    if (data.history && Array.isArray(data.history)) {
      for (const item of data.history) {
        await db.put('history', item);
      }
    }

    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

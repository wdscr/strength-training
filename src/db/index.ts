import { openDB, type IDBPDatabase } from 'idb';
import type { UserSettings, ProgramState, TrainingLogEntry, Lift } from '../types';
import { DEFAULT_SETTINGS } from '../types';

const DB_NAME = 'strength-training-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // User settings
        if (!db.objectStoreNames.contains('userSettings')) {
          db.createObjectStore('userSettings', { keyPath: 'id' });
        }
        // Program state per lift
        if (!db.objectStoreNames.contains('programState')) {
          db.createObjectStore('programState', { keyPath: 'lift' });
        }
        // Training log
        if (!db.objectStoreNames.contains('trainingLog')) {
          const store = db.createObjectStore('trainingLog', { keyPath: 'id' });
          store.createIndex('lift', 'lift');
          store.createIndex('date', 'date');
        }
        // Weight memory: key = "lift:exerciseName:weightLabel"
        if (!db.objectStoreNames.contains('weightMemory')) {
          db.createObjectStore('weightMemory', { keyPath: 'compoundKey' });
        }
      },
    });
  }
  return dbPromise;
}

// ---- User Settings ----

export async function getSettings(): Promise<UserSettings> {
  const db = await getDB();
  const data = await db.get('userSettings', 'main');
  return data ? { ...DEFAULT_SETTINGS, ...(data as any) } : { ...DEFAULT_SETTINGS };
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  const db = await getDB();
  await db.put('userSettings', { id: 'main', ...settings });
}

// ---- Program State ----

export async function getProgramState(lift: Lift): Promise<ProgramState | undefined> {
  const db = await getDB();
  return db.get('programState', lift);
}

export async function getAllProgramStates(): Promise<ProgramState[]> {
  const db = await getDB();
  return db.getAll('programState');
}

export async function saveProgramState(state: ProgramState): Promise<void> {
  const db = await getDB();
  await db.put('programState', state);
}

// ---- Training Log ----

export async function addTrainingLog(entry: TrainingLogEntry): Promise<void> {
  const db = await getDB();
  await db.add('trainingLog', entry);
}

export async function deleteTrainingLog(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('trainingLog', id);
}

export async function deleteTrainingLogs(ids: string[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('trainingLog', 'readwrite');
  for (const id of ids) {
    await tx.store.delete(id);
  }
  await tx.done;
}

export async function getTrainingLogs(lift?: Lift): Promise<TrainingLogEntry[]> {
  const db = await getDB();
  if (lift) {
    return db.getAllFromIndex('trainingLog', 'lift', lift);
  }
  return db.getAll('trainingLog');
}

// ---- Weight Memory ----

export async function getWeightMemory(compoundKey: string): Promise<number | undefined> {
  const db = await getDB();
  const entry = await db.get('weightMemory', compoundKey);
  return entry?.weight;
}

export async function saveWeightMemory(compoundKey: string, weight: number): Promise<void> {
  const db = await getDB();
  await db.put('weightMemory', { compoundKey, weight });
}

/**
 * Build compound key for weight memory.
 */
export function weightMemoryKey(lift: Lift, exerciseName: string, weightLabel: string): string {
  return `${lift}:${exerciseName}:${weightLabel}`;
}

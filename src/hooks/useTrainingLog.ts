import { useState, useEffect, useCallback } from 'react';
import { getTrainingLogs, addTrainingLog, getWeightMemory, saveWeightMemory, weightMemoryKey } from '../db';
import type { Lift, TrainingLogEntry } from '../types';

export function useTrainingLog(lift?: Lift) {
  const [logs, setLogs] = useState<TrainingLogEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadLogs = useCallback(async () => {
    const data = await getTrainingLogs(lift);
    // Sort newest first
    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setLogs(data);
    setLoaded(true);
  }, [lift]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  const addLog = useCallback(async (entry: TrainingLogEntry) => {
    await addTrainingLog(entry);
    await loadLogs();
  }, [loadLogs]);

  return { logs, loaded, addLog, reload: loadLogs };
}

export function useWeightMemory() {
  const [cache, setCache] = useState<Record<string, number>>({});

  const getMemory = useCallback(async (key: string): Promise<number | undefined> => {
    if (key in cache) return cache[key];
    const val = await getWeightMemory(key);
    if (val !== undefined) {
      setCache((prev) => ({ ...prev, [key]: val }));
    }
    return val;
  }, [cache]);

  const setMemory = useCallback(async (key: string, weight: number) => {
    await saveWeightMemory(key, weight);
    setCache((prev) => ({ ...prev, [key]: weight }));
  }, []);

  const getMemoryForExercise = useCallback(
    (lift: Lift, exerciseName: string, weightLabel: string) =>
      getMemory(weightMemoryKey(lift, exerciseName, weightLabel)),
    [getMemory]
  );

  const setMemoryForExercise = useCallback(
    (lift: Lift, exerciseName: string, weightLabel: string, weight: number) =>
      setMemory(weightMemoryKey(lift, exerciseName, weightLabel), weight),
    [setMemory]
  );

  return { getMemory, setMemory, getMemoryForExercise, setMemoryForExercise };
}

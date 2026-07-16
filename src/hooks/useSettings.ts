import { useState, useEffect, useCallback } from 'react';
import { getSettings, saveSettings } from '../db';
import type { UserSettings } from '../types';
import { DEFAULT_SETTINGS } from '../types';

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getSettings().then((s) => {
      setSettings(s);
      setLoaded(true);
    });
  }, []);

  const updateSettings = useCallback(async (patch: Partial<UserSettings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    await saveSettings(next);
  }, [settings]);

  const update1RM = useCallback(async (lift: 'bench' | 'squat' | 'deadlift', value: number) => {
    const patch: Partial<UserSettings> = {};
    switch (lift) {
      case 'bench': patch.bench1RM = value; break;
      case 'squat': patch.squat1RM = value; break;
      case 'deadlift': patch.deadlift1RM = value; break;
    }
    await updateSettings(patch);
  }, [updateSettings]);

  return { settings, loaded, updateSettings, update1RM };
}

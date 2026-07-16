import { useState, useEffect, useCallback } from 'react';
import { getAllProgramStates, saveProgramState } from '../db';
import type { Lift, Program, ProgramState } from '../types';

export function useProgramState(_lift?: Lift) {
  const [states, setStates] = useState<Record<string, ProgramState | undefined>>({});
  const [loaded, setLoaded] = useState(false);

  const loadAll = useCallback(async () => {
    const all = await getAllProgramStates();
    const map: Record<string, ProgramState | undefined> = {};
    for (const s of all) {
      map[s.lift] = s;
    }
    setStates(map);
    setLoaded(true);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const getProgramForLift = useCallback((l: Lift): ProgramState | undefined => {
    return states[l];
  }, [states]);

  const setProgram = useCallback(async (l: Lift, programId: string) => {
    const state: ProgramState = {
      lift: l,
      programId,
      currentWeek: 1,
      currentDay: 1,
      completed: false,
      visited: [],
    };
    await saveProgramState(state);
    setStates((prev) => ({ ...prev, [l]: state }));
  }, []);

  const advanceProgram = useCallback(async (l: Lift, program: Program) => {
    const current = states[l];
    if (!current) return;

    const week = program.weeks.find((w) => w.weekNumber === current.currentWeek);
    const daysInWeek = week ? week.days.length : 1;

    let nextWeek = current.currentWeek;
    let nextDay = current.currentDay + 1;
    let completed = false;

    if (nextDay > daysInWeek) {
      nextWeek += 1;
      nextDay = 1;
    }

    if (nextWeek > 4) {
      // Program complete
      completed = true;
    }

    const nextState: ProgramState = {
      ...current,
      currentWeek: nextWeek > 4 ? 4 : nextWeek,
      currentDay: completed ? daysInWeek : nextDay,
      completed,
    };

    await saveProgramState(nextState);
    setStates((prev) => ({ ...prev, [l]: nextState }));
  }, [states]);

  const markVisited = useCallback(async (l: Lift) => {
    const current = states[l];
    if (!current) return;
    const key = `${current.currentWeek}-${current.currentDay}`;
    if (current.visited.includes(key)) return;
    const next = { ...current, visited: [...current.visited, key] };
    await saveProgramState(next);
    setStates((prev) => ({ ...prev, [l]: next }));
  }, [states]);

  return {
    states,
    loaded,
    getProgramForLift,
    setProgram,
    advanceProgram,
    markVisited,
    reload: loadAll,
  };
}

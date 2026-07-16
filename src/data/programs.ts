import type { Lift, Program } from '../types';
import { benchPrograms } from './bench-programs';
import { squatPrograms } from './squat-programs';
import { dlPrograms } from './dl-programs';

/** All programs indexed by lift */
const programsByLift: Record<Lift, Program[]> = {
  bench: benchPrograms,
  squat: squatPrograms,
  deadlift: dlPrograms,
};

/** Flat list of all programs */
export const allPrograms: Program[] = [
  ...benchPrograms,
  ...squatPrograms,
  ...dlPrograms,
];

/** Get programs for a specific lift */
export function getProgramsByLift(lift: Lift): Program[] {
  return programsByLift[lift] ?? [];
}

/** Find a program by ID */
export function getProgramById(id: string): Program | undefined {
  return allPrograms.find((p) => p.id === id);
}

/** Total program count */
export const PROGRAM_COUNT = allPrograms.length;

/** Verify all programs have valid structure */
export function validatePrograms(): string[] {
  const errors: string[] = [];
  for (const p of allPrograms) {
    if (p.weeks.length !== 4) {
      errors.push(`${p.name}: expected 4 weeks, got ${p.weeks.length}`);
    }
    for (const w of p.weeks) {
      if (w.days.length !== p.daysPerWeek) {
        errors.push(`${p.name} Week ${w.weekNumber}: expected ${p.daysPerWeek} days, got ${w.days.length}`);
      }
      for (const d of w.days) {
        if (d.exercises.length === 0) {
          errors.push(`${p.name} W${w.weekNumber}D${d.dayNumber}: no exercises`);
        }
        for (const e of d.exercises) {
          if (!e.name) errors.push(`${p.name} W${w.weekNumber}D${d.dayNumber}: exercise with no name`);
          if (e.sets < 0) errors.push(`${p.name} W${w.weekNumber}D${d.dayNumber} ${e.name}: invalid sets ${e.sets}`);
        }
      }
    }
  }
  return errors;
}

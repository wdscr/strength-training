// ---- Lift types ----
export type Lift = 'bench' | 'squat' | 'deadlift';

export const LIFTS: Lift[] = ['bench', 'squat', 'deadlift'];

export const LIFT_LABELS: Record<Lift, string> = {
  bench: '卧推',
  squat: '深蹲',
  deadlift: '硬拉',
};

export const LIFT_EMOJI: Record<Lift, string> = {
  bench: '🏋️',
  squat: '🦵',
  deadlift: '🏗️',
};

// ---- Weight spec ----
export type WeightSpec =
  | { type: 'percentage'; value: number }
  | { type: 'rm'; rm: number }
  | { type: 'placeholder'; label: string }
  | { type: 'bodyweight' }
  | { type: 'new-1rm' }
  | { type: 'rpe'; rpe: number; note?: string };

// ---- Rep spec ----
export type RepsSpec =
  | { type: 'fixed'; value: number }
  | { type: 'amap' }
  | { type: 'amap-minus'; subtract: number }
  | { type: 'range'; min: number; max: number };

// ---- Exercise ----
export interface Exercise {
  name: string;
  weight: WeightSpec;
  sets: number;
  reps: RepsSpec;
  notes: string;
}

// ---- Day ----
export interface Day {
  dayNumber: number;
  exercises: Exercise[];
}

// ---- Week ----
export interface Week {
  weekNumber: number;
  days: Day[];
}

// ---- Program ----
export interface Program {
  id: string;
  name: string;
  lift: Lift;
  daysPerWeek: number;
  weeks: Week[];
}

// ---- Program State (runtime) ----
export interface ProgramState {
  lift: Lift;
  programId: string;
  currentWeek: number;  // 1-based, 0 = not started
  currentDay: number;   // 1-based within the week
  completed: boolean;
  visited: string[];    // Array of "week-day" pairs that have been opened
}

// ---- User Settings ----
export interface UserSettings {
  bench1RM: number;
  squat1RM: number;
  deadlift1RM: number;
  rounding: number;       // default 2.5
  restTimerSeconds: number; // default 90
}

export const DEFAULT_SETTINGS: UserSettings = {
  bench1RM: 0,
  squat1RM: 0,
  deadlift1RM: 0,
  rounding: 2.5,
  restTimerSeconds: 90,
};

// ---- Training Log ----
export interface ExerciseLog {
  name: string;
  plannedWeight: WeightSpec;
  actualWeight: number;    // kg used
  plannedSets: number;
  completedSets: number;
  plannedReps: RepsSpec;
  actualReps?: number;     // for AMAP sets
  notes: string;
}

export interface TrainingLogEntry {
  id: string;
  date: string;           // ISO timestamp
  lift: Lift;
  programId: string;
  programName: string;
  week: number;
  day: number;
  exercises: ExerciseLog[];
}

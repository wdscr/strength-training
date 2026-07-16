import type { UserSettings, WeightSpec } from '../types';

/**
 * Calculate the display weight for a percentage-based WeightSpec.
 * Returns null for non-computable types (rm, placeholder, warmup, etc.)
 */
export function calcWeight(weightSpec: WeightSpec, oneRM: number, rounding: number): number | null {
  if (weightSpec.type === 'percentage') {
    const raw = weightSpec.value * oneRM;
    return roundWeight(raw, rounding);
  }
  return null;
}

/**
 * Round a weight to the nearest rounding increment.
 */
export function roundWeight(value: number, rounding: number): number {
  if (rounding <= 0) return value;
  return Math.round(value / rounding) * rounding;
}

/**
 * Returns the 1RM for a given lift from settings.
 */
export function getOneRM(settings: UserSettings, lift: string): number {
  switch (lift) {
    case 'bench': return settings.bench1RM;
    case 'squat': return settings.squat1RM;
    case 'deadlift': return settings.deadlift1RM;
    default: return 0;
  }
}

/**
 * Get a human-readable label for a WeightSpec.
 */
export function weightLabel(spec: WeightSpec): string {
  switch (spec.type) {
    case 'percentage': return `${Math.round(spec.value * 100)}%`;
    case 'rm': return `${spec.rm}RM`;
    case 'placeholder': return spec.label;
    case 'bodyweight': return '自重';
    case 'new-1rm': return '测新极限';
    case 'rpe': return `RPE ${spec.rpe}`;
  }
}

/**
 * Get a human-readable label for a RepsSpec.
 */
export function repsLabel(spec: { type: string; value?: number; min?: number; max?: number; subtract?: number }): string {
  switch (spec.type) {
    case 'fixed': return `${spec.value}`;
    case 'amap': return 'AMAP';
    case 'amap-minus': return `AMAP-${spec.subtract}`;
    case 'range': return `${spec.min}-${spec.max}`;
    default: return '';
  }
}

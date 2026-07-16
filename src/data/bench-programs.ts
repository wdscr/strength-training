import type { Program } from '../types'

/** Sort bench exercises: percentage exercises descending first, then non-percentage. */
function sortExercises(exercises: import('../types').Exercise[]): import('../types').Exercise[] {
  const pct = exercises.filter(e => e.weight.type === 'percentage').sort((a, b) => {
    if (a.weight.type === 'percentage' && b.weight.type === 'percentage') return b.weight.value - a.weight.value
    return 0
  })
  const nonPct = exercises.filter(e => e.weight.type !== 'percentage')
  return [...pct, ...nonPct]
}

const bench1xAdv: Program = {
  id: 'bench-1x-adv', name: 'Bench 1x Adv', lift: 'bench', daysPerWeek: 1,
  weeks: [
    { weekNumber: 1, days: [{ dayNumber: 1, exercises: sortExercises([
      { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 3, reps: { type: 'fixed', value: 5 }, notes: '' },
      { name: '卧推', weight: { type: 'percentage', value: 0.7 }, sets: 3, reps: { type: 'range', min: 8, max: 10 }, notes: '' },
      { name: '半程卧推（粘滞点/地板）', weight: { type: 'rm', rm: 10 }, sets: 1, reps: { type: 'fixed', value: 10 }, notes: 'EMOM 10分钟，若未失败则每30秒一次' },
      { name: '半程卧推（粘滞点/地板）', weight: { type: 'rm', rm: 10 }, sets: 4, reps: { type: 'fixed', value: 3 }, notes: '后续组 EMOM' },
      { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
      { name: '哑铃推举/飞鸟/臂屈伸/蝴蝶机', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 12 }, notes: '' },
      { name: '弯举/引体向上/高位下拉', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
    ]) }] },
    { weekNumber: 2, days: [{ dayNumber: 1, exercises: sortExercises([
      { name: '卧推', weight: { type: 'percentage', value: 0.85 }, sets: 3, reps: { type: 'fixed', value: 5 }, notes: '' },
      { name: '卧推', weight: { type: 'percentage', value: 0.75 }, sets: 3, reps: { type: 'range', min: 8, max: 10 }, notes: '' },
      { name: '半程卧推（粘滞点/地板）', weight: { type: 'rm', rm: 8 }, sets: 1, reps: { type: 'fixed', value: 8 }, notes: 'EMOM 10分钟' },
      { name: '半程卧推（粘滞点/地板）', weight: { type: 'rm', rm: 8 }, sets: 3, reps: { type: 'fixed', value: 2 }, notes: '后续组 EMOM' },
      { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 8 }, notes: '' },
      { name: '哑铃推举/飞鸟/臂屈伸/蝴蝶机', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 12 }, notes: '' },
      { name: '弯举/引体向上/高位下拉', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 8 }, notes: '' },
    ]) }] },
    { weekNumber: 3, days: [{ dayNumber: 1, exercises: sortExercises([
      { name: '卧推', weight: { type: 'percentage', value: 0.9 }, sets: 3, reps: { type: 'fixed', value: 1 }, notes: '' },
      { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 3, reps: { type: 'fixed', value: 5 }, notes: '' },
      { name: '半程卧推（粘滞点/地板）', weight: { type: 'rm', rm: 6 }, sets: 1, reps: { type: 'fixed', value: 6 }, notes: 'EMOM 10分钟' },
      { name: '半程卧推（粘滞点/地板）', weight: { type: 'rm', rm: 6 }, sets: 2, reps: { type: 'fixed', value: 2 }, notes: '后续组 EMOM' },
      { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'fixed', value: 8 }, notes: '' },
      { name: '哑铃推举/飞鸟/臂屈伸/蝴蝶机', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'fixed', value: 12 }, notes: '' },
      { name: '弯举/引体向上/高位下拉', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'fixed', value: 8 }, notes: '' },
    ]) }] },
    { weekNumber: 4, days: [{ dayNumber: 1, exercises: sortExercises([
      { name: '卧推', weight: { type: 'new-1rm' }, sets: 1, reps: { type: 'fixed', value: 1 }, notes: '' },
      { name: '半程卧推（粘滞点/地板）', weight: { type: 'rm', rm: 3 }, sets: 1, reps: { type: 'fixed', value: 3 }, notes: '' },
      { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'fixed', value: 8 }, notes: '' },
      { name: '哑铃推举/飞鸟/臂屈伸/蝴蝶机', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'fixed', value: 12 }, notes: '' },
      { name: '弯举', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'fixed', value: 8 }, notes: '' },
    ]) }] },
  ],
}

const bench2xAdv: Program = {
  id: 'bench-2x-adv', name: 'Bench 2x Adv', lift: 'bench', daysPerWeek: 2,
  weeks: [
    { weekNumber: 1, days: [
      { dayNumber: 1, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.85 }, sets: 2, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 4, reps: { type: 'fixed', value: 5 }, notes: '' },
        { name: '负重双杠臂屈伸', weight: { type: 'rm', rm: 10 }, sets: 1, reps: { type: 'fixed', value: 10 }, notes: '' },
        { name: '负重双杠臂屈伸', weight: { type: 'rm', rm: 10 }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '哑铃推举', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '弯举/引体向上/高位下拉', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 10 }, notes: '' },
      ]) },
      { dayNumber: 2, exercises: [
        { name: '窄距卧推', weight: { type: 'rm', rm: 12 }, sets: 1, reps: { type: 'fixed', value: 12 }, notes: '' },
        { name: '窄距卧推', weight: { type: 'rm', rm: 12 }, sets: 3, reps: { type: 'range', min: 8, max: 10 }, notes: '' },
        { name: '俯卧撑', weight: { type: 'bodyweight' }, sets: 2, reps: { type: 'amap' }, notes: '' },
        { name: '哑铃弯举', weight: { type: 'rm', rm: 30 }, sets: 2, reps: { type: 'amap' }, notes: '血流限制训练。第一组至少能做20-30次的重量。' },
        { name: '哑铃旋转臂屈伸', weight: { type: 'rm', rm: 30 }, sets: 2, reps: { type: 'amap' }, notes: '' },
        { name: '哑铃飞鸟', weight: { type: 'rm', rm: 30 }, sets: 2, reps: { type: 'amap' }, notes: '' },
      ] },
    ] },
    { weekNumber: 2, days: [
      { dayNumber: 1, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.85 }, sets: 4, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 2, reps: { type: 'fixed', value: 5 }, notes: '' },
        { name: '负重双杠臂屈伸', weight: { type: 'rm', rm: 8 }, sets: 1, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '负重双杠臂屈伸', weight: { type: 'rm', rm: 8 }, sets: 3, reps: { type: 'fixed', value: 6 }, notes: '' },
        { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: '递增' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '哑铃推举', weight: { type: 'placeholder', label: '递增' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '弯举/引体向上/高位下拉', weight: { type: 'placeholder', label: '递增' }, sets: 3, reps: { type: 'fixed', value: 10 }, notes: '' },
      ]) },
      { dayNumber: 2, exercises: [
        { name: '窄距卧推', weight: { type: 'rm', rm: 10 }, sets: 1, reps: { type: 'fixed', value: 10 }, notes: '' },
        { name: '窄距卧推', weight: { type: 'rm', rm: 10 }, sets: 4, reps: { type: 'range', min: 6, max: 8 }, notes: '' },
        { name: '俯卧撑', weight: { type: 'bodyweight' }, sets: 3, reps: { type: 'amap' }, notes: '' },
        { name: '哑铃弯举', weight: { type: 'rm', rm: 30 }, sets: 3, reps: { type: 'amap' }, notes: '血流限制训练' },
        { name: '哑铃旋转臂屈伸', weight: { type: 'rm', rm: 30 }, sets: 3, reps: { type: 'amap' }, notes: '' },
        { name: '哑铃飞鸟', weight: { type: 'rm', rm: 30 }, sets: 3, reps: { type: 'amap' }, notes: '' },
      ] },
    ] },
    { weekNumber: 3, days: [
      { dayNumber: 1, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.9 }, sets: 3, reps: { type: 'fixed', value: 1 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.85 }, sets: 3, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '负重双杠臂屈伸', weight: { type: 'rm', rm: 6 }, sets: 1, reps: { type: 'fixed', value: 6 }, notes: '' },
        { name: '负重双杠臂屈伸', weight: { type: 'rm', rm: 6 }, sets: 3, reps: { type: 'range', min: 4, max: 5 }, notes: '' },
        { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: '递增' }, sets: 3, reps: { type: 'fixed', value: 6 }, notes: '' },
        { name: '哑铃推举', weight: { type: 'placeholder', label: '递增' }, sets: 3, reps: { type: 'fixed', value: 6 }, notes: '' },
        { name: '弯举/引体向上/高位下拉', weight: { type: 'placeholder', label: '递增' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
      ]) },
      { dayNumber: 2, exercises: [
        { name: '窄距卧推', weight: { type: 'rm', rm: 8 }, sets: 1, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '窄距卧推', weight: { type: 'rm', rm: 8 }, sets: 5, reps: { type: 'range', min: 4, max: 6 }, notes: '' },
        { name: '俯卧撑', weight: { type: 'bodyweight' }, sets: 4, reps: { type: 'amap' }, notes: '' },
        { name: '弯举', weight: { type: 'rm', rm: 30 }, sets: 4, reps: { type: 'amap' }, notes: '血流限制训练' },
        { name: '哑铃旋转臂屈伸', weight: { type: 'rm', rm: 30 }, sets: 4, reps: { type: 'amap' }, notes: '' },
        { name: '哑铃飞鸟', weight: { type: 'rm', rm: 30 }, sets: 4, reps: { type: 'amap' }, notes: '' },
      ] },
    ] },
    { weekNumber: 4, days: [
      { dayNumber: 1, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.7 }, sets: 5, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '负重双杠臂屈伸', weight: { type: 'rm', rm: 6 }, sets: 3, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: 'W1 重量' }, sets: 3, reps: { type: 'fixed', value: 6 }, notes: '' },
        { name: '哑铃推举', weight: { type: 'placeholder', label: 'W1 重量' }, sets: 3, reps: { type: 'fixed', value: 6 }, notes: '' },
        { name: '弯举/引体向上/高位下拉', weight: { type: 'placeholder', label: 'W1 重量' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
      ]) },
      { dayNumber: 2, exercises: [
        { name: '卧推', weight: { type: 'new-1rm' }, sets: 1, reps: { type: 'fixed', value: 1 }, notes: '' },
        { name: '俯卧撑', weight: { type: 'bodyweight' }, sets: 1, reps: { type: 'amap' }, notes: '' },
        { name: '哑铃弯举', weight: { type: 'rm', rm: 20 }, sets: 3, reps: { type: 'amap' }, notes: '无血流限制。15-20次' },
        { name: '哑铃旋转臂屈伸', weight: { type: 'rm', rm: 20 }, sets: 3, reps: { type: 'amap' }, notes: '' },
        { name: '哑铃飞鸟', weight: { type: 'rm', rm: 20 }, sets: 3, reps: { type: 'amap' }, notes: '' },
      ] },
    ] },
  ],
}

const bench3xAdv: Program = {
  id: 'bench-3x-adv', name: 'Bench 3x Adv', lift: 'bench', daysPerWeek: 3,
  weeks: [
    { weekNumber: 1, days: [
      { dayNumber: 1, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.75 }, sets: 5, reps: { type: 'fixed', value: 5 }, notes: '' },
        { name: '窄距卧推', weight: { type: 'percentage', value: 0.6 }, sets: 2, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '窄距卧推', weight: { type: 'percentage', value: 0.6 }, sets: 1, reps: { type: 'amap' }, notes: '' },
        { name: '弯举', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'range', min: 8, max: 12 }, notes: '' },
      ]) },
      { dayNumber: 2, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.85 }, sets: 2, reps: { type: 'fixed', value: 1 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 1, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.7 }, sets: 1, reps: { type: 'fixed', value: 4 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.6 }, sets: 1, reps: { type: 'fixed', value: 6 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.5 }, sets: 1, reps: { type: 'fixed', value: 8 }, notes: '' },
      ]) },
      { dayNumber: 3, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 2, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '哑铃推举/飞鸟/臂屈伸/蝴蝶机', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 12 }, notes: '' },
        { name: '弯举/引体向上/高位下拉', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
      ]) },
    ] },
    { weekNumber: 2, days: [
      { dayNumber: 1, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 4, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.75 }, sets: 3, reps: { type: 'fixed', value: 6 }, notes: '' },
        { name: '窄距卧推', weight: { type: 'percentage', value: 0.65 }, sets: 2, reps: { type: 'fixed', value: 6 }, notes: '' },
        { name: '窄距卧推', weight: { type: 'percentage', value: 0.65 }, sets: 1, reps: { type: 'amap' }, notes: '' },
        { name: '弯举', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'range', min: 8, max: 12 }, notes: '' },
      ]) },
      { dayNumber: 2, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.85 }, sets: 2, reps: { type: 'fixed', value: 2 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 1, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.75 }, sets: 1, reps: { type: 'fixed', value: 4 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.7 }, sets: 1, reps: { type: 'fixed', value: 5 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.6 }, sets: 1, reps: { type: 'fixed', value: 6 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.5 }, sets: 1, reps: { type: 'fixed', value: 8 }, notes: '' },
      ]) },
      { dayNumber: 3, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 3, reps: { type: 'fixed', value: 4 }, notes: '' },
        { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '哑铃推举/飞鸟/臂屈伸/蝴蝶机', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 12 }, notes: '' },
        { name: '弯举/引体向上/高位下拉', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 8 }, notes: '' },
      ]) },
    ] },
    { weekNumber: 3, days: [
      { dayNumber: 1, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.85 }, sets: 4, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.7 }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '窄距卧推', weight: { type: 'percentage', value: 0.7 }, sets: 2, reps: { type: 'fixed', value: 4 }, notes: '' },
        { name: '窄距卧推', weight: { type: 'percentage', value: 0.7 }, sets: 1, reps: { type: 'amap' }, notes: '' },
        { name: '弯举', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'range', min: 8, max: 12 }, notes: '' },
      ]) },
      { dayNumber: 2, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.9 }, sets: 2, reps: { type: 'fixed', value: 1 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.85 }, sets: 2, reps: { type: 'fixed', value: 2 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 1, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.75 }, sets: 1, reps: { type: 'fixed', value: 4 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.7 }, sets: 1, reps: { type: 'fixed', value: 5 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.6 }, sets: 1, reps: { type: 'fixed', value: 6 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.5 }, sets: 1, reps: { type: 'fixed', value: 8 }, notes: '' },
      ]) },
      { dayNumber: 3, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 5, reps: { type: 'fixed', value: 4 }, notes: '' },
        { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '哑铃推举/飞鸟/臂屈伸/蝴蝶机', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'fixed', value: 12 }, notes: '' },
        { name: '弯举/引体向上/高位下拉', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'fixed', value: 8 }, notes: '' },
      ]) },
    ] },
    { weekNumber: 4, days: [
      { dayNumber: 1, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 3, reps: { type: 'fixed', value: 2 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.7 }, sets: 3, reps: { type: 'fixed', value: 5 }, notes: '' },
        { name: '窄距卧推', weight: { type: 'percentage', value: 0.75 }, sets: 3, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '弯举', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'range', min: 8, max: 12 }, notes: '' },
      ]) },
      { dayNumber: 2, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.8 }, sets: 2, reps: { type: 'fixed', value: 2 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.75 }, sets: 2, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.7 }, sets: 1, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.6 }, sets: 1, reps: { type: 'fixed', value: 4 }, notes: '' },
        { name: '卧推', weight: { type: 'percentage', value: 0.5 }, sets: 1, reps: { type: 'fixed', value: 5 }, notes: '' },
      ]) },
      { dayNumber: 3, exercises: sortExercises([
        { name: '卧推', weight: { type: 'percentage', value: 0.85 }, sets: 1, reps: { type: 'amap' }, notes: 'AMAP - 如果做5-6次，极限+2.5kg。如果做7+次，极限+5kg。' },
        { name: '肱三头肌臂屈伸', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '哑铃推举/飞鸟/臂屈伸/蝴蝶机', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'fixed', value: 12 }, notes: '' },
        { name: '弯举/引体向上/高位下拉', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'fixed', value: 8 }, notes: '' },
      ]) },
    ] },
  ],
}

export const benchPrograms: Program[] = [bench1xAdv, bench2xAdv, bench3xAdv]

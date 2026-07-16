import type { Program } from '../types'

const dl1xAdv: Program = {
  id: 'dl-1x-adv', name: 'DL 1x Adv', lift: 'deadlift', daysPerWeek: 1,
  weeks: [
    { weekNumber: 1, days: [{ dayNumber: 1, exercises: [
      { name: '硬拉（主站位）', weight: { type: 'percentage', value: 0.8 }, sets: 4, reps: { type: 'fixed', value: 5 }, notes: '' },
      { name: '硬拉（主站位）', weight: { type: 'percentage', value: 0.6 }, sets: 6, reps: { type: 'fixed', value: 3 }, notes: 'EMOM' },
      { name: '硬拉（相反站位）', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '最后一组应达到8-9 RPE。重量同上组' },
      { name: '划船', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 10 }, notes: '' },
      { name: '耸肩', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 10 }, notes: '' },
      { name: '臀推', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 10 }, notes: '' },
    ] }] },
    { weekNumber: 2, days: [{ dayNumber: 1, exercises: [
      { name: '硬拉（主站位）', weight: { type: 'percentage', value: 0.9 }, sets: 2, reps: { type: 'fixed', value: 1 }, notes: '' },
      { name: '硬拉（主站位）', weight: { type: 'percentage', value: 0.85 }, sets: 3, reps: { type: 'fixed', value: 3 }, notes: '' },
      { name: '硬拉（主站位）', weight: { type: 'percentage', value: 0.65 }, sets: 6, reps: { type: 'fixed', value: 3 }, notes: 'EMOM' },
      { name: '硬拉（相反站位）', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 6 }, notes: '最后一组应达到8-9 RPE。重量同上组' },
      { name: '划船', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 10 }, notes: '' },
      { name: '耸肩', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 10 }, notes: '' },
      { name: '臀推', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 10 }, notes: '' },
    ] }] },
    { weekNumber: 3, days: [{ dayNumber: 1, exercises: [
      { name: '硬拉（主站位）', weight: { type: 'percentage', value: 0.7 }, sets: 6, reps: { type: 'fixed', value: 3 }, notes: 'EMOM' },
      { name: '硬拉（相反站位）', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 4 }, notes: '最后一组应达到8-9 RPE。重量同上组' },
      { name: '划船', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
      { name: '耸肩', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
      { name: '臀推', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
    ] }] },
    { weekNumber: 4, days: [{ dayNumber: 1, exercises: [
      { name: '硬拉（主站位）', weight: { type: 'new-1rm' }, sets: 1, reps: { type: 'fixed', value: 1 }, notes: '' },
    ] }] },
  ],
}

const dl2xAdv: Program = {
  id: 'dl-2x-adv', name: 'DL 2x Adv', lift: 'deadlift', daysPerWeek: 2,
  weeks: [
    { weekNumber: 1, days: [
      { dayNumber: 1, exercises: [
        { name: '硬拉（主站位）', weight: { type: 'percentage', value: 0.75 }, sets: 8, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '罗马尼亚硬拉', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '杠铃/哑铃划船', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 8 }, notes: '' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '硬拉（相反站位）', weight: { type: 'rpe', rpe: 8, note: '8 RPE' }, sets: 2, reps: { type: 'fixed', value: 6 }, notes: '重量同上组' },
        { name: '架上拉', weight: { type: 'percentage', value: 0.85 }, sets: 5, reps: { type: 'fixed', value: 5 }, notes: '' },
      ] },
    ] },
    { weekNumber: 2, days: [
      { dayNumber: 1, exercises: [
        { name: '硬拉（主站位）', weight: { type: 'percentage', value: 0.8 }, sets: 6, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '罗马尼亚硬拉', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '杠铃/哑铃划船', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 10 }, notes: '' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '硬拉（相反站位）- 与第1周同重量', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'fixed', value: 6 }, notes: '与第1周同重量。重量同上组' },
        { name: '架上拉', weight: { type: 'percentage', value: 0.9 }, sets: 4, reps: { type: 'fixed', value: 3 }, notes: '' },
      ] },
    ] },
    { weekNumber: 3, days: [
      { dayNumber: 1, exercises: [
        { name: '硬拉（主站位）', weight: { type: 'percentage', value: 0.85 }, sets: 4, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '罗马尼亚硬拉', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '杠铃/哑铃划船', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'fixed', value: 12 }, notes: '' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '硬拉（相反站位）- 与第1周同重量', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'fixed', value: 5 }, notes: '与第1周同重量。重量同上组' },
        { name: '架上拉', weight: { type: 'percentage', value: 0.95 }, sets: 3, reps: { type: 'fixed', value: 2 }, notes: '' },
      ] },
    ] },
    { weekNumber: 4, days: [
      { dayNumber: 1, exercises: [
        { name: '硬拉（主站位）', weight: { type: 'percentage', value: 0.65 }, sets: 4, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '罗马尼亚硬拉', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '杠铃/哑铃划船', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'fixed', value: 8 }, notes: '' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '硬拉（相反站位）- 测新极限', weight: { type: 'new-1rm' }, sets: 1, reps: { type: 'fixed', value: 1 }, notes: '无动作变形的新极限重量' },
      ] },
    ] },
  ],
}

export const dlPrograms: Program[] = [dl1xAdv, dl2xAdv]

import type { Program } from '../types'

const squat1xAdv: Program = {
  id: 'squat-1x-adv', name: 'Squat 1x Adv', lift: 'squat', daysPerWeek: 1,
  weeks: [
    { weekNumber: 1, days: [{ dayNumber: 1, exercises: [
      { name: '深蹲', weight: { type: 'percentage', value: 0.75 }, sets: 1, reps: { type: 'amap' }, notes: '目标10+次' },
      { name: '深蹲', weight: { type: 'percentage', value: 0.75 }, sets: 5, reps: { type: 'amap-minus', subtract: 2 }, notes: 'AMAP次数减2。深蹲<180kg组间休息2分钟，>180kg休息3分钟。' },
      { name: '股四头肌辅助动作（腿举/负重登阶/负重弓步蹲/哈克深蹲等）', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'range', min: 8, max: 12 }, notes: '' },
      { name: '臀推/臀桥', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'range', min: 8, max: 12 }, notes: '' },
    ] }] },
    { weekNumber: 2, days: [{ dayNumber: 1, exercises: [
      { name: '深蹲', weight: { type: 'percentage', value: 0.8 }, sets: 1, reps: { type: 'amap' }, notes: '目标8+次' },
      { name: '深蹲', weight: { type: 'percentage', value: 0.8 }, sets: 5, reps: { type: 'amap-minus', subtract: 2 }, notes: 'AMAP次数减2。组间休息2-3分钟。' },
      { name: '股四头肌辅助动作（腿举/负重登阶/负重弓步蹲/哈克深蹲等）', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'range', min: 8, max: 12 }, notes: '' },
      { name: '臀推/臀桥', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'range', min: 8, max: 12 }, notes: '' },
    ] }] },
    { weekNumber: 3, days: [{ dayNumber: 1, exercises: [
      { name: '深蹲', weight: { type: 'percentage', value: 0.85 }, sets: 1, reps: { type: 'amap' }, notes: '目标5+次' },
      { name: '深蹲', weight: { type: 'percentage', value: 0.85 }, sets: 5, reps: { type: 'amap-minus', subtract: 2 }, notes: 'AMAP次数减2。组间休息2-3分钟。' },
      { name: '股四头肌辅助动作（腿举/负重登阶/负重弓步蹲/哈克深蹲等）', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'range', min: 8, max: 12 }, notes: '' },
      { name: '臀推/臀桥', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'range', min: 8, max: 12 }, notes: '' },
    ] }] },
    { weekNumber: 4, days: [{ dayNumber: 1, exercises: [
      { name: '深蹲', weight: { type: 'new-1rm' }, sets: 1, reps: { type: 'fixed', value: 1 }, notes: '' },
      { name: '深蹲', weight: { type: 'percentage', value: 0.7 }, sets: 3, reps: { type: 'fixed', value: 10 }, notes: '' },
      { name: '股四头肌辅助动作（腿举/负重登阶/负重弓步蹲/哈克深蹲等）', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'range', min: 15, max: 20 }, notes: '' },
      { name: '臀推/臀桥', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'range', min: 15, max: 20 }, notes: '' },
    ] }] },
  ],
}

const squat2xAdv: Program = {
  id: 'squat-2x-adv', name: 'Squat 2x Adv', lift: 'squat', daysPerWeek: 2,
  weeks: [
    { weekNumber: 1, days: [
      { dayNumber: 1, exercises: [
        { name: '深蹲', weight: { type: 'percentage', value: 0.8 }, sets: 5, reps: { type: 'fixed', value: 5 }, notes: '' },
        { name: '股四头肌辅助动作（腿举/负重登阶/负重弓步蹲/哈克深蹲等）', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'range', min: 10, max: 12 }, notes: '' },
        { name: '臀推/臀桥', weight: { type: 'placeholder', label: '自选' }, sets: 3, reps: { type: 'range', min: 10, max: 12 }, notes: '' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '前蹲', weight: { type: 'rm', rm: 8 }, sets: 1, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '前蹲', weight: { type: 'rm', rm: 8 }, sets: 3, reps: { type: 'range', min: 5, max: 6 }, notes: '' },
        { name: '宽站距暂停深蹲', weight: { type: 'rm', rm: 10 }, sets: 1, reps: { type: 'fixed', value: 10 }, notes: '' },
        { name: '宽站距暂停深蹲', weight: { type: 'rm', rm: 10 }, sets: 3, reps: { type: 'range', min: 7, max: 8 }, notes: '' },
      ] },
    ] },
    { weekNumber: 2, days: [
      { dayNumber: 1, exercises: [
        { name: '深蹲', weight: { type: 'percentage', value: 0.85 }, sets: 4, reps: { type: 'fixed', value: 3 }, notes: '' },
        { name: '股四头肌辅助动作（腿举/负重登阶/负重弓步蹲/哈克深蹲等）', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'range', min: 10, max: 12 }, notes: '' },
        { name: '臀推/臀桥', weight: { type: 'placeholder', label: '自选' }, sets: 4, reps: { type: 'range', min: 10, max: 12 }, notes: '' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '前蹲', weight: { type: 'rm', rm: 5 }, sets: 1, reps: { type: 'fixed', value: 5 }, notes: '' },
        { name: '前蹲', weight: { type: 'rm', rm: 5 }, sets: 3, reps: { type: 'range', min: 3, max: 4 }, notes: '' },
        { name: '宽站距暂停深蹲', weight: { type: 'rm', rm: 8 }, sets: 1, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '宽站距暂停深蹲', weight: { type: 'rm', rm: 8 }, sets: 3, reps: { type: 'range', min: 5, max: 6 }, notes: '' },
      ] },
    ] },
    { weekNumber: 3, days: [
      { dayNumber: 1, exercises: [
        { name: '深蹲', weight: { type: 'percentage', value: 0.9 }, sets: 3, reps: { type: 'fixed', value: 1 }, notes: '' },
        { name: '股四头肌辅助动作（腿举/负重登阶/负重弓步蹲/哈克深蹲等）', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'range', min: 10, max: 12 }, notes: '' },
        { name: '臀推/臀桥', weight: { type: 'placeholder', label: '自选' }, sets: 5, reps: { type: 'range', min: 10, max: 12 }, notes: '' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '前蹲', weight: { type: 'rm', rm: 3 }, sets: 1, reps: { type: 'fixed', value: 5 }, notes: '' },
        { name: '前蹲', weight: { type: 'rm', rm: 3 }, sets: 3, reps: { type: 'range', min: 1, max: 2 }, notes: '' },
        { name: '宽站距暂停深蹲', weight: { type: 'rm', rm: 5 }, sets: 1, reps: { type: 'fixed', value: 5 }, notes: '' },
        { name: '宽站距暂停深蹲', weight: { type: 'rm', rm: 5 }, sets: 3, reps: { type: 'range', min: 3, max: 4 }, notes: '' },
      ] },
    ] },
    { weekNumber: 4, days: [
      { dayNumber: 1, exercises: [
        { name: '深蹲', weight: { type: 'new-1rm' }, sets: 1, reps: { type: 'fixed', value: 1 }, notes: '' },
        { name: '股四头肌辅助动作（腿举/负重登阶/负重弓步蹲/哈克深蹲等）', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'range', min: 15, max: 20 }, notes: '' },
        { name: '臀推/臀桥', weight: { type: 'placeholder', label: '自选' }, sets: 2, reps: { type: 'range', min: 15, max: 20 }, notes: '' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '前蹲', weight: { type: 'new-1rm' }, sets: 1, reps: { type: 'fixed', value: 1 }, notes: '' },
        { name: '宽站距暂停深蹲', weight: { type: 'rm', rm: 10 }, sets: 4, reps: { type: 'fixed', value: 5 }, notes: '' },
      ] },
    ] },
  ],
}

const squat3xIntAdv: Program = {
  id: 'squat-3x-intadv', name: 'Squat 3x IntAdv', lift: 'squat', daysPerWeek: 3,
  weeks: [
    { weekNumber: 1, days: [
      { dayNumber: 1, exercises: [
        { name: '低杆深蹲', weight: { type: 'rm', rm: 10 }, sets: 1, reps: { type: 'fixed', value: 10 }, notes: '' },
        { name: '低杆深蹲', weight: { type: 'rm', rm: 10 }, sets: 3, reps: { type: 'range', min: 7, max: 8 }, notes: '' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '前蹲 - RPE 8 大重量6次', weight: { type: 'rpe', rpe: 8, note: '逐渐加到大重量做6次' }, sets: 1, reps: { type: 'fixed', value: 6 }, notes: '逐渐加到大重量做一组6次（RPE 8）' },
        { name: '前蹲 - 每组6次直到RPE 9', weight: { type: 'placeholder', label: '自选' }, sets: 1, reps: { type: 'fixed', value: 6 }, notes: '做6次组直到达到RPE 9' },
      ] },
      { dayNumber: 3, exercises: [
        { name: '暂停无腰带高杆深蹲', weight: { type: 'percentage', value: 0.5 }, sets: 6, reps: { type: 'fixed', value: 5 }, notes: '*基于低杆有腰带极限重量' },
      ] },
    ] },
    { weekNumber: 2, days: [
      { dayNumber: 1, exercises: [
        { name: '低杆深蹲', weight: { type: 'rm', rm: 8 }, sets: 1, reps: { type: 'fixed', value: 8 }, notes: '' },
        { name: '低杆深蹲', weight: { type: 'rm', rm: 8 }, sets: 3, reps: { type: 'range', min: 5, max: 6 }, notes: '' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '前蹲 - RPE 8 大重量4次', weight: { type: 'rpe', rpe: 8, note: '逐渐加到大重量做4次' }, sets: 1, reps: { type: 'fixed', value: 4 }, notes: '逐渐加到大重量做一组4次（RPE 8）' },
        { name: '前蹲 - 每组4次直到RPE 9', weight: { type: 'placeholder', label: '自选' }, sets: 1, reps: { type: 'fixed', value: 4 }, notes: '做4次组直到达到RPE 9' },
      ] },
      { dayNumber: 3, exercises: [
        { name: '暂停无腰带高杆深蹲', weight: { type: 'percentage', value: 0.55 }, sets: 6, reps: { type: 'fixed', value: 4 }, notes: '*基于低杆有腰带极限重量' },
      ] },
    ] },
    { weekNumber: 3, days: [
      { dayNumber: 1, exercises: [
        { name: '低杆深蹲', weight: { type: 'rm', rm: 5 }, sets: 1, reps: { type: 'fixed', value: 5 }, notes: '' },
        { name: '低杆深蹲', weight: { type: 'rm', rm: 5 }, sets: 3, reps: { type: 'fixed', value: 3 }, notes: '' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '前蹲 - RPE 8 大重量2次', weight: { type: 'rpe', rpe: 8, note: '逐渐加到大重量做2次' }, sets: 1, reps: { type: 'fixed', value: 2 }, notes: '逐渐加到大重量做一组2次（RPE 8）' },
        { name: '前蹲 - 每组2次直到RPE 9', weight: { type: 'placeholder', label: '自选' }, sets: 1, reps: { type: 'fixed', value: 2 }, notes: '做2次组直到达到RPE 9' },
      ] },
      { dayNumber: 3, exercises: [
        { name: '暂停无腰带高杆深蹲', weight: { type: 'percentage', value: 0.6 }, sets: 6, reps: { type: 'fixed', value: 3 }, notes: '*基于低杆有腰带极限重量' },
      ] },
    ] },
    { weekNumber: 4, days: [
      { dayNumber: 1, exercises: [
        { name: '低杆深蹲', weight: { type: 'rm', rm: 3 }, sets: 1, reps: { type: 'fixed', value: 3 }, notes: '将3RM代入极限重量计算器，据此调整下个月的极限重量' },
      ] },
      { dayNumber: 2, exercises: [
        { name: '前蹲 - 上周2RM的75%', weight: { type: 'placeholder', label: '上周2RM的75%' }, sets: 4, reps: { type: 'fixed', value: 3 }, notes: '' },
      ] },
      { dayNumber: 3, exercises: [
        { name: '暂停无腰带高杆深蹲', weight: { type: 'percentage', value: 0.65 }, sets: 6, reps: { type: 'fixed', value: 2 }, notes: '*基于低杆有腰带极限重量' },
      ] },
    ] },
  ],
}

export const squatPrograms: Program[] = [squat1xAdv, squat2xAdv, squat3xIntAdv]

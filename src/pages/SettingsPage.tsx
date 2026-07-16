import { useEffect, useState } from 'react'
import { useSettings } from '../hooks/useSettings'
import { useProgramState } from '../hooks/useProgramState'
import { useWeightMemory } from '../hooks/useTrainingLog'
import { getProgramById } from '../data/programs'
import { weightLabel } from '../utils/weight'
import { LIFT_LABELS, LIFTS } from '../types'
import type { Lift, Program } from '../types'

// Exercise category pick options
const EXERCISE_OPTIONS: Record<string, string[]> = {
  '肱三头肌臂屈伸': ['绳索下压', '窄距卧推', '哑铃颈后臂屈伸', '双杠臂屈伸', 'EZ杆臂屈伸', '其他'],
  '弯举/引体向上/高位下拉': ['哑铃弯举', '杠铃弯举', '锤式弯举', '引体向上', '高位下拉', '其他'],
  '哑铃推举/飞鸟/臂屈伸/蝴蝶机': ['哑铃推举', '哑铃飞鸟', '双杠臂屈伸', '蝴蝶机夹胸', '其他'],
  '股四头肌辅助动作（腿举/负重登阶/负重弓步蹲/哈克深蹲等）': ['腿举', '负重登阶', '负重弓步蹲', '哈克深蹲', '腿屈伸', '其他'],
  '臀推/臀桥': ['杠铃臀推', '哑铃臀推', '单腿臀桥', '其他'],
  '划船': ['杠铃划船', '哑铃划船', 'T杆划船', '潘德勒划船', '其他'],
  '耸肩': ['杠铃耸肩', '哑铃耸肩', '六角杠耸肩', '其他'],
}

type PresetEntry = {
  lift: Lift
  exerciseName: string
  weightLabel: string
  compoundKey: string
}

/** Collect all unique (exerciseName, weightLabel) pairs from a program for presetting */
function collectPresets(program: Program | undefined): PresetEntry[] {
  if (!program) return []
  const seen = new Set<string>()
  const entries: PresetEntry[] = []
  for (const week of program.weeks) {
    for (const day of week.days) {
      for (const ex of day.exercises) {
        if (ex.weight.type === 'rm' || ex.weight.type === 'placeholder' || ex.weight.type === 'rpe') {
          const label = weightLabel(ex.weight)
          const compoundKey = `${program.lift}:${ex.name}:${label}`
          if (!seen.has(compoundKey)) {
            seen.add(compoundKey)
            entries.push({ lift: program.lift, exerciseName: ex.name, weightLabel: label, compoundKey })
          }
        }
      }
    }
  }
  return entries
}

function PresetPanel() {
  const { states } = useProgramState()
  const { getMemory, setMemory } = useWeightMemory()
  const [entries, setEntries] = useState<PresetEntry[]>([])
  const [values, setValues] = useState<Record<string, string>>({})
  const [loaded, setLoaded] = useState(false)
  const [pickingKey, setPickingKey] = useState<string | null>(null)

  useEffect(() => {
    const all: PresetEntry[] = []
    for (const lift of LIFTS) {
      const state = states[lift]
      const program = state ? getProgramById(state.programId) : undefined
      all.push(...collectPresets(program))
    }
    setEntries(all)

    // Load existing values
    const load = async () => {
      const vals: Record<string, string> = {}
      for (const e of all) {
        const v = await getMemory(e.compoundKey)
        if (v !== undefined) vals[e.compoundKey] = String(v)
      }
      setValues(vals)
      setLoaded(true)
    }
    load()
  }, [states])

  if (entries.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-amber-400 mb-4">辅助动作重量预设</h2>
        <p className="text-slate-400 text-sm">请先在首页选择训练计划</p>
      </section>
    )
  }

  if (!loaded) return null

  // Group by lift
  const grouped: Record<Lift, PresetEntry[]> = { bench: [], squat: [], deadlift: [] }
  for (const e of entries) grouped[e.lift].push(e)

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-amber-400 mb-4">辅助动作重量预设 (kg)</h2>
      {LIFTS.filter(l => grouped[l].length > 0).map(lift => (
        <div key={lift} className="mb-4">
          <h3 className="text-sm font-medium text-slate-300 mb-2">{LIFT_LABELS[lift]}</h3>
          <div className="space-y-2">
            {grouped[lift].map((entry) => {
              const options = EXERCISE_OPTIONS[entry.exerciseName]
              const isPicking = pickingKey === entry.compoundKey

              return (
                <div key={entry.compoundKey} className="flex items-center justify-between bg-slate-800 rounded-lg px-4 py-3">
                  <div className="flex-1 mr-3">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white">{entry.exerciseName}</p>
                      {options && (
                        <button
                          onClick={() => setPickingKey(isPicking ? null : entry.compoundKey)}
                          className="text-xs px-2 py-0.5 bg-slate-700 text-slate-400 rounded"
                        >
                          {isPicking ? '收起' : '选取'}
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{entry.weightLabel}</p>
                    {isPicking && options && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {options.map(opt => (
                          <button
                            key={opt}
                            className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded hover:bg-slate-600"
                            onClick={() => {
                              const oldKey = entry.compoundKey
                              const newKey = `${entry.lift}:${opt}:${entry.weightLabel}`
                              const oldVal = values[oldKey]
                              if (oldVal) setMemory(newKey, parseFloat(oldVal))
                              localStorage.setItem(`_pick:${entry.lift}:${entry.exerciseName}`, opt)
                              entry.exerciseName = opt
                              entry.compoundKey = newKey
                              setPickingKey(null)
                              setValues({ ...values })
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={values[entry.compoundKey] ?? ''}
                    placeholder="___"
                    onChange={(e) => {
                      const newVals = { ...values, [entry.compoundKey]: e.target.value }
                      setValues(newVals)
                      const v = parseFloat(e.target.value)
                      if (v > 0) setMemory(entry.compoundKey, v)
                    }}
                    className="w-20 bg-slate-700 text-white rounded px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}

export default function SettingsPage() {
  const { settings, loaded, updateSettings } = useSettings()

  if (!loaded) {
    return <div className="p-8 text-center text-slate-400">加载中...</div>
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">设置</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-amber-400 mb-4">1RM 极限重量 (kg)</h2>
        <div className="space-y-4">
          {(['bench', 'squat', 'deadlift'] as const).map((lift) => (
            <div key={lift} className="flex items-center justify-between bg-slate-800 rounded-lg p-4">
              <label className="text-slate-300 font-medium">{LIFT_LABELS[lift]}</label>
              <input
                type="number"
                inputMode="decimal"
                value={settings[`${lift}1RM` as keyof typeof settings] || ''}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0
                  updateSettings({ [`${lift}1RM`]: val } as any)
                }}
                placeholder="0"
                className="w-24 bg-slate-700 text-white rounded-lg px-3 py-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-amber-400 mb-4">重量取整</h2>
        <div className="flex items-center justify-between bg-slate-800 rounded-lg p-4">
          <label className="text-slate-300 font-medium">取整步长 (kg)</label>
          <div className="flex gap-2">
            {[1, 2.5, 5].map((r) => (
              <button
                key={r}
                onClick={() => updateSettings({ rounding: r })}
                className={`px-4 py-2 rounded-lg font-medium ${
                  settings.rounding === r
                    ? 'bg-amber-400 text-slate-900'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-amber-400 mb-4">组间休息计时器</h2>
        <div className="flex items-center justify-between bg-slate-800 rounded-lg p-4">
          <label className="text-slate-300 font-medium">默认时长 (秒)</label>
          <input
            type="number"
            inputMode="numeric"
            value={settings.restTimerSeconds}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 0
              updateSettings({ restTimerSeconds: val > 0 ? val : 90 })
            }}
            placeholder="90"
            className="w-24 bg-slate-700 text-white rounded-lg px-3 py-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </section>

      <PresetPanel />
    </div>
  )
}

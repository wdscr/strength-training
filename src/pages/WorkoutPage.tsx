import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSettings } from '../hooks/useSettings'
import { useProgramState } from '../hooks/useProgramState'
import { useWeightMemory } from '../hooks/useTrainingLog'
import { getProgramById } from '../data/programs'
import { calcWeight, weightLabel, repsLabel, getOneRM } from '../utils/weight'
import { addTrainingLog } from '../db'
import { LIFT_LABELS } from '../types'
import type { WeightSpec, ExerciseLog, Lift } from '../types'

const EXERCISE_OPTIONS: Record<string, string[]> = {
  '肱三头肌臂屈伸': ['绳索下压', '窄距卧推', '哑铃颈后臂屈伸', '双杠臂屈伸', 'EZ杆臂屈伸', '其他'],
  '弯举/引体向上/高位下拉': ['哑铃弯举', '杠铃弯举', '锤式弯举', '引体向上', '高位下拉', '其他'],
  '哑铃推举/飞鸟/臂屈伸/蝴蝶机': ['哑铃推举', '哑铃飞鸟', '双杠臂屈伸', '蝴蝶机夹胸', '其他'],
  '股四头肌辅助动作（腿举/负重登阶/负重弓步蹲/哈克深蹲等）': ['腿举', '负重登阶', '负重弓步蹲', '哈克深蹲', '腿屈伸', '其他'],
  '臀推/臀桥': ['杠铃臀推', '哑铃臀推', '单腿臀桥', '其他'],
  '划船': ['杠铃划船', '哑铃划船', 'T杆划船', '潘德勒划船', '其他'],
  '耸肩': ['杠铃耸肩', '哑铃耸肩', '六角杠耸肩', '其他'],
}

// Build a storage key for saving/restoring workout state
function saveKey(lift: string, programId: string, week: number, day: number, suffix: string) {
  return `wk:${lift}:${programId}:${week}:${day}:${suffix}`
}

function RestTimer({ defaultSeconds }: { defaultSeconds: number }) {
  const [seconds, setSeconds] = useState(defaultSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setRunning(false)
            if (navigator.vibrate) navigator.vibrate([200, 100, 200])
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('组间休息结束', { body: '开始下一组！' })
            }
            return 0
          }
          return s - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, seconds])

  const start = () => {
    if (seconds === 0) setSeconds(defaultSeconds)
    setRunning(true)
  }
  const pause = () => setRunning(false)
  const reset = () => {
    setRunning(false)
    setSeconds(defaultSeconds)
  }

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="flex items-center gap-3 bg-slate-700/50 rounded-lg px-4 py-2">
      <span className={`font-mono text-lg ${running ? 'text-amber-400' : 'text-slate-300'}`}>
        {mins}:{secs.toString().padStart(2, '0')}
      </span>
      {running ? (
        <button onClick={pause} className="text-sm px-3 py-1 bg-slate-600 rounded text-white hover:bg-slate-500">
          暂停
        </button>
      ) : (
        <button onClick={start} className="text-sm px-3 py-1 bg-amber-400 text-slate-900 rounded font-medium hover:bg-amber-300">
          {seconds === 0 ? '重新开始' : '开始'}
        </button>
      )}
      {!running && seconds !== defaultSeconds && seconds > 0 && (
        <button onClick={reset} className="text-sm px-3 py-1 bg-slate-600 rounded text-slate-300 hover:bg-slate-500">
          重置
        </button>
      )}
    </div>
  )
}

function SetTracker({
  sets,
  completed,
  onToggle,
  isAmap,
  amapReps,
  onAmapRepsChange,
}: {
  sets: number
  completed: Set<number>
  onToggle: (index: number) => void
  isAmap?: boolean
  amapReps?: number
  onAmapRepsChange?: (reps: number) => void
}) {
  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: sets }, (_, i) => (
          <button
            key={i}
            onClick={() => onToggle(i)}
            className={`w-11 h-11 rounded-full text-lg font-bold transition-all active:scale-90 ${
              completed.has(i)
                ? 'bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/30'
                : 'bg-slate-700 text-slate-500 border-2 border-slate-600 hover:border-amber-400/50'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <span className="text-xs text-slate-500 self-center ml-2">
          {completed.size}/{sets}
        </span>
      </div>
      {isAmap && completed.size > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <label className="text-xs text-slate-400">AMAP 次数:</label>
          <input
            type="number"
            inputMode="numeric"
            value={amapReps ?? ''}
            placeholder="?"
            onChange={(e) => onAmapRepsChange?.(parseInt(e.target.value) || 0)}
            className="w-16 bg-slate-700 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      )}
    </div>
  )
}

function WeightDisplay({
  weightSpec,
  oneRM,
  rounding,
  memoryWeight,
  inheritedWeight,
  onOverride,
}: {
  weightSpec: WeightSpec
  oneRM: number
  rounding: number
  memoryWeight?: number
  inheritedWeight?: number
  onOverride?: (w: number) => void
}) {
  const [overriding, setOverriding] = useState(false)
  const [overrideVal, setOverrideVal] = useState('')

  if (weightSpec.type === 'percentage') {
    const w = calcWeight(weightSpec, oneRM, rounding)
    return (
      <div>
        <span className="text-2xl font-bold text-white">{w}</span>
        <span className="text-sm text-slate-400 ml-2">kg</span>
        <span className="text-xs text-slate-500 ml-2">({weightLabel(weightSpec)})</span>
      </div>
    )
  }

  if (weightSpec.type === 'bodyweight') {
    return <span className="text-lg text-slate-400">自重</span>
  }

  if (weightSpec.type === 'new-1rm') {
    return <span className="text-lg text-amber-400 font-bold">测试新极限</span>
  }

  // Inherited weight (e.g. DL opposite stance follows primary stance)
  const displayWeight = inheritedWeight ?? memoryWeight
  const label = weightSpec.type === 'rpe' ? (weightSpec.note || `RPE ${weightSpec.rpe}`) : weightLabel(weightSpec)

  if (overriding) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-400">{label}</span>
        <input
          type="number" inputMode="decimal" autoFocus
          value={overrideVal}
          placeholder={displayWeight ? String(displayWeight) : '___ kg'}
          onChange={(e) => setOverrideVal(e.target.value)}
          onBlur={() => {
            const v = parseFloat(overrideVal)
            if (v > 0) { onOverride?.(v); setOverriding(false) }
            else setOverriding(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const v = parseFloat(overrideVal)
              if (v > 0) { onOverride?.(v); setOverriding(false) }
            }
          }}
          className="w-24 bg-slate-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
    )
  }

  if (displayWeight !== undefined && displayWeight > 0) {
    return (
      <div onClick={() => { setOverrideVal(String(displayWeight)); setOverriding(true) }} className="cursor-pointer">
        <span className="text-2xl font-bold text-white">{displayWeight}</span>
        <span className="text-sm text-slate-400 ml-2">kg</span>
        <span className="text-xs text-slate-500 ml-2">({label})</span>
        {inheritedWeight !== undefined && <span className="text-xs text-amber-500 ml-2">(同上组)</span>}
      </div>
    )
  }

  // No weight set — show nothing (don't display "0 kg" or "___ kg")
  return null
}

function ExerciseNamePicker({ liftKey, category, currentName }: { liftKey: string; category: string; currentName: string }) {
  const [open, setOpen] = useState(false)
  const options = EXERCISE_OPTIONS[category]
  if (!options) return null

  return (
    <>
      <button onClick={() => setOpen(!open)} className="text-xs ml-2 px-2 py-0.5 bg-slate-700 text-slate-400 rounded align-middle">
        选取
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center" onClick={() => setOpen(false)}>
          <div className="bg-slate-800 rounded-t-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">选择具体动作</h3>
            <p className="text-sm text-slate-400 mb-3">当前: {currentName}</p>
            <div className="grid grid-cols-2 gap-2">
              {options.map(opt => (
                <button
                  key={opt}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    currentName === opt ? 'bg-amber-400 text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                  onClick={() => {
                    localStorage.setItem(`_pick:${liftKey}:${category}`, opt)
                    // Force re-render: close picker
                    setOpen(false)
                    window.location.reload()
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function WorkoutPage() {
  const { lift } = useParams<{ lift: string }>()
  const navigate = useNavigate()
  const { settings, loaded: settingsLoaded } = useSettings()
  const { states, loaded: statesLoaded, advanceProgram } = useProgramState()
  const { getMemoryForExercise } = useWeightMemory()

  const liftKey = lift as Lift
  const state = states[liftKey]
  const program = state ? getProgramById(state.programId) : undefined
  const week = program?.weeks.find((w) => w.weekNumber === state?.currentWeek)
  const day = week?.days.find((d) => d.dayNumber === state?.currentDay)
  const oneRM = getOneRM(settings, liftKey)

  // Save/restore key generator
  const sk = (s: string) => saveKey(liftKey, program?.id || '', state?.currentWeek || 0, state?.currentDay || 0, s)

  // Track completed sets, weights, AMAP — restored from localStorage AFTER state loads
  const [completedSets, setCompletedSets] = useState<Map<number, Set<number>>>(new Map())
  const [weightValues, setWeightValues] = useState<Map<number, number>>(new Map())
  const [amapReps, setAmapReps] = useState<Map<number, number>>(new Map())
  const [sessionRestored, setSessionRestored] = useState(false)
  // Loaded weight memories
  const [memoriesLoaded, setMemoriesLoaded] = useState(false)

  // Load saved weight memories for this workout
  useEffect(() => {
    if (!day || memoriesLoaded) return
    const load = async () => {
      const newWeights = new Map<number, number>()
      for (let i = 0; i < day.exercises.length; i++) {
        const ex = day.exercises[i]
        if (ex.weight.type === 'rm' || ex.weight.type === 'placeholder' || ex.weight.type === 'rpe') {
          const label = weightLabel(ex.weight)
          const mem = await getMemoryForExercise(liftKey, ex.name, label)
          if (mem !== undefined) newWeights.set(i, mem)
        }
      }
      setWeightValues(newWeights)
      setMemoriesLoaded(true)
    }
    load()
  }, [day, liftKey, getMemoryForExercise, memoriesLoaded])

  // Restore saved session state AFTER weight memories are loaded
  useEffect(() => {
    if (!state || !program || !day || !memoriesLoaded || sessionRestored) return
    try {
      const raw = localStorage.getItem(sk('sets'))
      if (raw) {
        const m = new Map<number, Set<number>>()
        for (const [k, v] of JSON.parse(raw)) m.set(k, new Set(v))
        setCompletedSets(m)
      }
      const rawW = localStorage.getItem(sk('weights'))
      if (rawW) setWeightValues(new Map(JSON.parse(rawW)))
      const rawA = localStorage.getItem(sk('amap'))
      if (rawA) setAmapReps(new Map(JSON.parse(rawA)))
    } catch {}
    setSessionRestored(true)
  }, [state, program, day, memoriesLoaded, sessionRestored, liftKey, state?.currentWeek, state?.currentDay])

  // Auto-save workout state to localStorage whenever it changes
  useEffect(() => {
    if (!state || !program || !day || !sessionRestored) return
    const setsArr: [number, number[]][] = []
    completedSets.forEach((s, k) => setsArr.push([k, [...s]]))
    localStorage.setItem(sk('sets'), JSON.stringify(setsArr))
    localStorage.setItem(sk('weights'), JSON.stringify([...weightValues]))
    localStorage.setItem(sk('amap'), JSON.stringify([...amapReps]))
  }, [completedSets, weightValues, amapReps, state, program])

  // Reset state when lift/W/D changes
  useEffect(() => {
    // Clear old session data so it doesn't bleed into new week/day
    localStorage.removeItem(sk('sets'))
    localStorage.removeItem(sk('weights'))
    localStorage.removeItem(sk('amap'))
    setCompletedSets(new Map())
    setWeightValues(new Map())
    setAmapReps(new Map())
    setSessionRestored(false)
    setMemoriesLoaded(false)
  }, [liftKey, state?.programId, state?.currentWeek, state?.currentDay])

  if (!settingsLoaded || !statesLoaded || !memoriesLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400">加载中...</p>
      </div>
    )
  }

  if (!state || !program || !week || !day) {
    return (
      <div className="py-8 text-center">
        <p className="text-slate-400 mb-4">请先选择训练计划</p>
        <button
          onClick={() => navigate('/')}
          className="bg-amber-400 text-slate-900 px-6 py-3 rounded-lg font-bold"
        >
          返回首页
        </button>
      </div>
    )
  }

  const hasPctExercises = day.exercises.some(e => e.weight.type === 'percentage')
  if (hasPctExercises && oneRM === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-amber-400 text-lg mb-4">
          ⚠️ 请先在设置中填写{LIFT_LABELS[liftKey]}的1RM
        </p>
        <button
          onClick={() => navigate('/settings')}
          className="bg-amber-400 text-slate-900 px-6 py-3 rounded-lg font-bold"
        >
          前往设置
        </button>
      </div>
    )
  }

  // Compute inherited weights: DL opposite stance gets preceding percentage weight
  const inheritedWeights = new Map<number, number>()
  let lastPctWeight: number | null = null
  day.exercises.forEach((ex, i) => {
    if (ex.weight.type === 'percentage') {
      const w = calcWeight(ex.weight, oneRM, settings.rounding)
      if (w !== null) lastPctWeight = w
    }
    if (ex.name.includes('相反站位') && lastPctWeight !== null) {
      inheritedWeights.set(i, lastPctWeight)
    }
  })

  const toggleSet = (exerciseIdx: number, setIdx: number) => {
    setCompletedSets((prev) => {
      const next = new Map(prev)
      const current = new Set(next.get(exerciseIdx) || [])
      if (current.has(setIdx)) {
        current.delete(setIdx)
      } else {
        current.add(setIdx)
      }
      next.set(exerciseIdx, current)
      return next
    })
  }

  const handleSaveWeight = (exerciseIdx: number, _ex: unknown, weight: number) => {
    setWeightValues((prev) => new Map(prev).set(exerciseIdx, weight))
  }

  const handleComplete = async () => {
    // Read current state first
    const currentSets = completedSets
    const currentWeights = weightValues
    const currentAmap = amapReps
    // Clear auto-save
    localStorage.removeItem(sk('sets'))
    localStorage.removeItem(sk('weights'))
    localStorage.removeItem(sk('amap'))
    setCompletedSets(new Map())
    setWeightValues(new Map())
    setAmapReps(new Map())
    setSessionRestored(false)
    const exerciseLogs: ExerciseLog[] = day.exercises.map((ex, i) => {
      const actualWeight = inheritedWeights.get(i) ?? currentWeights.get(i) ?? calcWeight(ex.weight, oneRM, settings.rounding) ?? 0
      const setsCompleted = currentSets.get(i)?.size ?? 0
      const amapVal = currentAmap.get(i)
      return {
        name: localStorage.getItem(`_pick:${liftKey}:${ex.name}`) || ex.name,
        plannedWeight: ex.weight,
        actualWeight,
        plannedSets: ex.sets,
        completedSets: setsCompleted,
        plannedReps: ex.reps,
        actualReps: amapVal,
        notes: ex.notes || '',
      }
    })

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      lift: liftKey,
      programId: program.id,
      programName: program.name,
      week: state.currentWeek,
      day: state.currentDay,
      exercises: exerciseLogs,
    }

    await addTrainingLog(entry)
    await advanceProgram(liftKey, program)
    navigate('/')
  }

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/')} className="text-slate-400 text-2xl">&larr;</button>
        <div>
          <h1 className="text-xl font-bold">{program.name}</h1>
          <p className="text-sm text-amber-400">
            Week {state.currentWeek} · Day {state.currentDay}
            {program.daysPerWeek > 1 && ` / ${program.daysPerWeek}`}
          </p>
        </div>
      </div>

      {/* Rest Timer */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-slate-400 mb-2">组间休息</h2>
        <RestTimer defaultSeconds={settings.restTimerSeconds} />
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        {day.exercises.map((ex, exerciseIdx) => {
          const pickedName = localStorage.getItem(`_pick:${liftKey}:${ex.name}`) || ex.name
          return (
            <div
              key={exerciseIdx}
              className="bg-slate-800 rounded-xl p-4 border border-slate-700"
            >
              <h3 className="font-semibold text-white mb-3">
                {pickedName}
                {EXERCISE_OPTIONS[ex.name] && (
                  <ExerciseNamePicker
                    liftKey={liftKey}
                    category={ex.name}
                    currentName={pickedName}
                  />
                )}
              </h3>

              {/* Weight */}
              <div className="mb-3">
                <WeightDisplay
                  weightSpec={ex.weight}
                  oneRM={oneRM}
                  rounding={settings.rounding}
                  memoryWeight={weightValues.get(exerciseIdx)}
                  inheritedWeight={inheritedWeights.get(exerciseIdx)}
                  onOverride={(w) => handleSaveWeight(exerciseIdx, ex, w)}
                />
              </div>

              {/* Sets + Reps */}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-slate-400">
                  <span className="font-mono text-white">{ex.sets}</span> 组 ×{' '}
                  <span className="font-mono text-white">{repsLabel(ex.reps)}</span> 次
                </span>
              </div>

              {/* Set Tracker */}
              <SetTracker
                sets={ex.sets}
                completed={completedSets.get(exerciseIdx) || new Set()}
                onToggle={(si) => toggleSet(exerciseIdx, si)}
                isAmap={ex.reps.type === 'amap' || ex.reps.type === 'amap-minus'}
                amapReps={amapReps.get(exerciseIdx)}
                onAmapRepsChange={(reps) =>
                  setAmapReps((prev) => new Map(prev).set(exerciseIdx, reps))
                }
              />

              {/* Notes */}
              {ex.notes && (
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">{ex.notes}</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Complete Button */}
      <div className="mt-8 mb-8">
        <button
          onClick={handleComplete}
          className="w-full bg-green-500 text-white font-bold py-4 rounded-xl text-lg hover:bg-green-400 active:scale-95 transition-all shadow-lg shadow-green-500/20"
        >
          ✓ 完成训练
        </button>
        <p className="text-xs text-slate-500 text-center mt-2">
          完成后自动推进到下一个训练日
        </p>
      </div>
    </div>
  )
}

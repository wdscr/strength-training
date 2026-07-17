import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgramState } from '../hooks/useProgramState'
import { useTrainingLog } from '../hooks/useTrainingLog'
import { getProgramsByLift, getProgramById } from '../data/programs'
import { LIFTS, LIFT_LABELS, LIFT_EMOJI } from '../types'
import type { Lift, ProgramState } from '../types'

function DayPicker({
  state,
  program,
  historyDays,
  onJump,
  onClose,
}: {
  state: ProgramState
  program: import('../types').Program
  historyDays: Set<string>
  onJump: (week: number, day: number) => void
  onClose: () => void
}) {
  const weeks = program.weeks
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-slate-800 rounded-t-2xl p-6 max-w-md w-full max-h-[75vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">选择训练日</h3>
          <button onClick={onClose} className="text-slate-400 text-2xl">&times;</button>
        </div>
        {weeks.map(w => {
          const active = w.weekNumber === state.currentWeek
          return (
            <div key={w.weekNumber} className="mb-4">
              <h4 className={`text-sm font-semibold mb-2 ${active ? 'text-amber-400' : 'text-slate-400'}`}>
                Week {w.weekNumber}
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {w.days.map(d => {
                  const current = w.weekNumber === state.currentWeek && d.dayNumber === state.currentDay
                  const done = historyDays.has(`${w.weekNumber}-${d.dayNumber}`)
                  return (
                    <button
                      key={`${w.weekNumber}-${d.dayNumber}`}
                      onClick={() => { onJump(w.weekNumber, d.dayNumber); onClose() }}
                      className={`p-3 rounded-lg text-sm font-medium ${
                        current
                          ? 'bg-amber-400 text-slate-900'
                          : done
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      Day {d.dayNumber}
                      {done && <span className="ml-1 text-xs">✓</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function LiftCard({
  lift,
  state,
  onSelectProgram,
  onJumpToDay,
}: {
  lift: Lift
  state?: ProgramState
  onSelectProgram: () => void
  onJumpToDay: () => void
}) {
  const navigate = useNavigate()
  const program = state ? getProgramById(state.programId) : undefined
  const currentKey = state ? `${state.currentWeek}-${state.currentDay}` : ''
  const isVisited = state?.visited.includes(currentKey)

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{LIFT_EMOJI[lift]}</span>
          <div>
            <h2 className="text-lg font-bold">{LIFT_LABELS[lift]}</h2>
            {program && !state?.completed && (
              <p className="text-xs text-slate-400">{program.name}</p>
            )}
          </div>
        </div>
        <span className="text-xs text-slate-500">
          {lift === 'bench' ? '胸' : lift === 'squat' ? '腿' : '背'}
        </span>
      </div>

      {state && !state.completed ? (
        <>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 bg-slate-700 rounded-full h-2">
              <div
                className="bg-amber-400 h-2 rounded-full transition-all"
                style={{
                  width: `${((state.currentWeek - 1) / 4) * 100 + (state.currentDay / (program?.daysPerWeek ?? 1)) * (100 / 4)}%`,
                }}
              />
            </div>
            <span className="text-xs text-slate-400 whitespace-nowrap cursor-pointer hover:text-amber-400" onClick={onJumpToDay}>
              W{state.currentWeek} · D{state.currentDay}
            </span>
          </div>

          {/* Status badges */}
          {isVisited && (
            <div className="mb-3">
              <span className="inline-block bg-slate-600/50 text-slate-400 text-xs px-3 py-1 rounded-full">
                已访问 · 未完成
              </span>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/workout/${lift}`)}
              className={`flex-1 font-bold py-3 rounded-lg text-sm active:scale-95 transition-all ${
                isVisited
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-amber-400 text-slate-900 hover:bg-amber-300'
              }`}
            >
              {isVisited ? '继续训练' : '开始训练'}
            </button>
            <button
              onClick={onSelectProgram}
              className="px-3 py-3 bg-slate-700 text-slate-400 rounded-lg text-xs hover:bg-slate-600"
            >
              换计划
            </button>
          </div>
        </>
      ) : state?.completed ? (
        <>
          <div className="mb-4">
            <span className="inline-block bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full">
              ✓ 已完成
            </span>
            {program && <p className="text-sm text-slate-400 mt-2">{program.name}</p>}
          </div>
          <button
            onClick={onSelectProgram}
            className="w-full bg-slate-700 text-slate-300 font-medium py-3 rounded-lg text-sm hover:bg-slate-600"
          >
            选择新计划
          </button>
        </>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-sm text-slate-400">尚未选择训练计划</p>
          </div>
          <button
            onClick={onSelectProgram}
            className="w-full bg-amber-400 text-slate-900 font-bold py-3 rounded-lg text-sm hover:bg-amber-300"
          >
            选择计划
          </button>
        </>
      )}
    </div>
  )
}

function DayPickerWrapped({ dayPicker, historyDays, jumpToDay, onClose }: {
  dayPicker: { lift: Lift; state: ProgramState }
  historyDays: Set<string>
  jumpToDay: (l: Lift, w: number, d: number) => void
  onClose: () => void
}) {
  const program = getProgramById(dayPicker.state.programId)
  if (!program) return null
  return (
    <DayPicker
      state={dayPicker.state}
      program={program}
      historyDays={historyDays}
      onJump={(w, d) => { jumpToDay(dayPicker.lift, w, d); onClose() }}
      onClose={onClose}
    />
  )
}

function ProgramSelectorWrapped({ selectorLift, setProgram, onClose }: {
  selectorLift: Lift
  setProgram: (l: Lift, id: string) => void
  onClose: () => void
}) {
  const programs = getProgramsByLift(selectorLift)
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-slate-800 rounded-t-2xl p-6 max-w-md w-full max-h-[60vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">
            {LIFT_EMOJI[selectorLift]} {LIFT_LABELS[selectorLift]} 计划
          </h3>
          <button onClick={onClose} className="text-slate-400 text-2xl">&times;</button>
        </div>
        <div className="space-y-2">
          {programs.map((p) => (
            <button
              key={p.id}
              onClick={() => { setProgram(selectorLift, p.id); onClose() }}
              className="w-full bg-slate-700 hover:bg-slate-600 text-left p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-slate-400">
                  每周 {p.daysPerWeek} 天 · {p.daysPerWeek === 1 ? '高强度单次训练' : p.daysPerWeek === 2 ? '主项+变式' : '高容量'}
                </p>
              </div>
              <span className="text-slate-400 text-xl">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { states, loaded, setProgram, jumpToDay } = useProgramState()
  const [selectorLift, setSelectorLift] = useState<Lift | null>(null)
  const [dayPicker, setDayPicker] = useState<{ lift: Lift; state: ProgramState } | null>(null)
  // Load all training logs to find completed days
  const { logs } = useTrainingLog()

  // Compute set of "week-day" pairs that have training logs
  const historyDays = new Set<string>()
  for (const entry of logs) {
    historyDays.add(`${entry.week}-${entry.day}`)
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400">加载中...</p>
      </div>
    )
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-2">力量训练</h1>
      <p className="text-slate-400 text-sm mb-6">选择动作，开始今天的训练</p>

      <div className="space-y-4">
        {LIFTS.map((lift) => {
          const s = states[lift]
          return (
          <LiftCard
            key={lift}
            lift={lift}
            state={s}
            onSelectProgram={() => setSelectorLift(lift)}
            onJumpToDay={() => {
              if (s) setDayPicker({ lift, state: s })
            }}
          />
        )})}
      </div>

      {selectorLift && (
        <ProgramSelectorWrapped
          selectorLift={selectorLift}
          setProgram={setProgram}
          onClose={() => setSelectorLift(null)}
        />
      )}

      {dayPicker && (
        <DayPickerWrapped
          dayPicker={dayPicker}
          historyDays={historyDays}
          jumpToDay={jumpToDay}
          onClose={() => setDayPicker(null)}
        />
      )}
    </div>
  )
}

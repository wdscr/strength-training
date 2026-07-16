import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgramState } from '../hooks/useProgramState'
import { getProgramsByLift, getProgramById } from '../data/programs'
import { LIFTS, LIFT_LABELS, LIFT_EMOJI } from '../types'
import type { Lift, ProgramState } from '../types'

function LiftCard({
  lift,
  state,
  onSelectProgram,
}: {
  lift: Lift
  state?: ProgramState
  onSelectProgram: () => void
}) {
  const navigate = useNavigate()
  const program = state ? getProgramById(state.programId) : undefined

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
            <span className="text-xs text-slate-400 whitespace-nowrap">
              W{state.currentWeek} · D{state.currentDay}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/workout/${lift}`)}
              className="flex-1 bg-amber-400 text-slate-900 font-bold py-3 rounded-lg text-sm hover:bg-amber-300 active:scale-95 transition-all"
            >
              开始训练
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

function ProgramSelector({
  lift,
  onSelect,
  onClose,
}: {
  lift: Lift
  onSelect: (programId: string) => void
  onClose: () => void
}) {
  const programs = getProgramsByLift(lift)

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center" onClick={onClose}>
      <div
        className="bg-slate-800 rounded-t-2xl p-6 max-w-md w-full max-h-[60vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">
            {LIFT_EMOJI[lift]} {LIFT_LABELS[lift]} 计划
          </h3>
          <button onClick={onClose} className="text-slate-400 text-2xl">&times;</button>
        </div>
        <div className="space-y-2">
          {programs.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
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
  const { states, loaded, setProgram } = useProgramState()
  const [selectorLift, setSelectorLift] = useState<Lift | null>(null)

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
        {LIFTS.map((lift) => (
          <LiftCard
            key={lift}
            lift={lift}
            state={states[lift]}
            onSelectProgram={() => setSelectorLift(lift)}
          />
        ))}
      </div>

      {selectorLift && (
        <ProgramSelector
          lift={selectorLift}
          onSelect={(programId) => {
            setProgram(selectorLift, programId)
            setSelectorLift(null)
          }}
          onClose={() => setSelectorLift(null)}
        />
      )}
    </div>
  )
}

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTrainingLog } from '../hooks/useTrainingLog'
import { LIFT_LABELS, LIFTS } from '../types'
import type { Lift, TrainingLogEntry } from '../types'
import { repsLabel } from '../utils/weight'

function HistoryEntry({ entry }: { entry: TrainingLogEntry }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold">{LIFT_LABELS[entry.lift]}</span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">{entry.programName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>W{entry.week} D{entry.day}</span>
            <span>·</span>
            <span>{new Date(entry.date).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            <span>·</span>
            <span>{entry.exercises.length} 个动作</span>
          </div>
        </div>
        <span className={`text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-700">
          <div className="divide-y divide-slate-700/50">
            {entry.exercises.map((ex, i) => (
              <div key={i} className="py-3">
                <p className="text-sm font-medium text-white">{ex.name}</p>
                <div className="flex gap-4 mt-1 text-xs text-slate-400">
                  <span>{ex.actualWeight} kg</span>
                  <span>{ex.completedSets}/{ex.plannedSets} 组</span>
                  <span>{repsLabel(ex.plannedReps)}</span>
                  {ex.actualReps && <span className="text-amber-400">实际: {ex.actualReps} reps</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function HistoryPage() {
  const { lift } = useParams<{ lift?: string }>()
  const [filter, setFilter] = useState<Lift | 'all'>(lift as Lift | 'all' || 'all')
  const { logs, loaded } = useTrainingLog(filter === 'all' ? undefined : filter)

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-2">训练记录</h1>
      <p className="text-slate-400 text-sm mb-6">查看你的训练历史</p>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium ${
            filter === 'all' ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-400'
          }`}
        >
          全部
        </button>
        {LIFTS.map((l) => (
          <button
            key={l}
            onClick={() => setFilter(l)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium ${
              filter === l ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {LIFT_LABELS[l]}
          </button>
        ))}
      </div>

      {!loaded ? (
        <p className="text-center text-slate-400 py-12">加载中...</p>
      ) : logs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg mb-2">暂无训练记录</p>
          <p className="text-slate-500 text-sm">完成一次训练后，记录会出现在这里</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((entry) => (
            <HistoryEntry key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}

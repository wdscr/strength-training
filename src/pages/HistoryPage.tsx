import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTrainingLog } from '../hooks/useTrainingLog'
import { deleteTrainingLog, deleteTrainingLogs } from '../db'
import { LIFT_LABELS, LIFTS } from '../types'
import type { Lift, TrainingLogEntry } from '../types'
import { repsLabel } from '../utils/weight'

function HistoryEntry({
  entry,
  selecting,
  selected,
  onToggle,
  onDelete,
}: {
  entry: TrainingLogEntry
  selecting: boolean
  selected: boolean
  onToggle?: () => void
  onDelete: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)

  const doDelete = () => {
    if (confirm('确认删除这条训练记录？')) onDelete(entry.id)
  }

  return (
    <div className={`bg-slate-800 rounded-xl border overflow-hidden ${selecting ? 'border-amber-400/50' : 'border-slate-700'}`}>
      <div className="flex items-start">
        {selecting && (
          <div className="p-4 pr-0" onClick={onToggle}>
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
              selected ? 'bg-amber-400 border-amber-400 text-slate-900' : 'border-slate-500'
            }`}>
              {selected && <span className="text-sm font-bold">✓</span>}
            </div>
          </div>
        )}
        <button
          onClick={() => !selecting && setExpanded(!expanded)}
          className="flex-1 p-4 text-left flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              {!selecting && (
                <span className="text-sm font-semibold">{LIFT_LABELS[entry.lift]}</span>
              )}
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
          {!selecting && (
            <div className="flex items-center gap-2">
              <span className={`text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
            </div>
          )}
        </button>
        {!selecting && (
          <button onClick={doDelete} className="p-4 text-slate-500 hover:text-red-400 text-sm">✕</button>
        )}
      </div>

      {expanded && !selecting && (
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
  const { logs, loaded, reload } = useTrainingLog(filter === 'all' ? undefined : filter)
  const [selecting, setSelecting] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggleSelectAll = () => {
    if (selected.size === logs.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(logs.map(l => l.id)))
    }
  }

  const deleteSelected = async () => {
    if (selected.size === 0) return
    if (confirm(`确认删除选中 ${selected.size} 条记录？`)) {
      await deleteTrainingLogs(Array.from(selected))
      setSelected(new Set())
      setSelecting(false)
      reload()
    }
  }

  const doDelete = async (id: string) => {
    await deleteTrainingLog(id)
    reload()
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">训练记录</h1>
        {logs.length > 0 && (
          <button
            onClick={() => { setSelecting(!selecting); if (selecting) setSelected(new Set()) }}
            className={`text-sm px-3 py-1 rounded ${selecting ? 'bg-amber-400 text-slate-900' : 'text-slate-400'}`}
          >
            {selecting ? '取消' : '选择'}
          </button>
        )}
      </div>
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

      {/* Selection toolbar */}
      {selecting && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-slate-800 rounded-lg">
          <button onClick={toggleSelectAll} className="text-sm text-slate-300">
            {selected.size === logs.length ? '取消全选' : '全选'}
          </button>
          <span className="text-xs text-slate-500">已选 {selected.size} 项</span>
          <button
            onClick={deleteSelected}
            disabled={selected.size === 0}
            className="ml-auto text-sm px-4 py-1.5 bg-red-500/20 text-red-400 rounded disabled:opacity-30"
          >
            删除选中
          </button>
        </div>
      )}

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
            <HistoryEntry
              key={entry.id}
              entry={entry}
              selecting={selecting}
              selected={selected.has(entry.id)}
              onToggle={() => {
                const next = new Set(selected)
                if (next.has(entry.id)) next.delete(entry.id)
                else next.add(entry.id)
                setSelected(next)
              }}
              onDelete={doDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

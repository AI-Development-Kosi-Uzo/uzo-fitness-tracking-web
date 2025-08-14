import type { WorkoutSession } from '../../data/types'

export interface SessionListProps {
  sessions: WorkoutSession[]
}

export function SessionList({ sessions }: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-sm text-gray-500">No sessions on this day.</div>
    )
  }
  return (
    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
      {sessions.map((s) => (
        <li key={s.id} className="p-3 flex items-center justify-between">
          <div>
            <div className="font-medium">{s.title}</div>
            <div className="text-xs text-gray-500">Volume: {s.totalVolume}</div>
          </div>
          {s.duration != null && (
            <div className="text-xs text-gray-500">{Math.round(s.duration / 60)} min</div>
          )}
        </li>
      ))}
    </ul>
  )
}
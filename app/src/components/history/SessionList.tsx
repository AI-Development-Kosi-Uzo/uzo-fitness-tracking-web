import type { WorkoutSession } from '../../data/types'

type Props = {
  sessions: WorkoutSession[]
}

export function SessionList({ sessions }: Props) {
  if (!sessions.length) return <div>No sessions</div>
  return (
    <ul style={{ display: 'grid', gap: 8 }}>
      {sessions.map((s) => (
        <li key={s.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 8 }}>
          <div style={{ fontWeight: 600 }}>{s.title}</div>
          <div style={{ fontSize: 12, color: '#555' }}>{s.date}</div>
          <div style={{ fontSize: 12 }}>Total Volume: {s.totalVolume}</div>
        </li>
      ))}
    </ul>
  )
}

export default SessionList



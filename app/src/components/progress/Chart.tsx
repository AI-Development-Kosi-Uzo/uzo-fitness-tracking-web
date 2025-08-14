import type { ExerciseTrend } from '../../routes/progress/stats'

interface Props {
  data: ExerciseTrend[]
}

export function Chart({ data }: Props) {
  return (
    <div>
      <strong>Placeholder Chart</strong>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 120 }}>
        {data.map((d) => (
          <div key={`${d.exerciseId}-${d.weekStartDate}`} style={{ width: 16, background: '#8884d8', height: Math.min(100, Math.round(d.totalVolume / 10)) }} title={`${d.exerciseName} ${d.weekStartDate}`} />
        ))}
      </div>
    </div>
  )
}

export default Chart



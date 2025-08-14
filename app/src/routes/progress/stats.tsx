import { Outlet } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { ExerciseTrendsChart, ExerciseTrendsChartSkeleton, type TrendMetric, type ExerciseTrendPoint } from '@components/progress/Chart'

export const ProgressLayout = () => {
  return <Outlet />
}

export const ProgressStatsPage = () => {
  const [metric, setMetric] = useState<TrendMetric>('volume')

  // Placeholder data; will be replaced by aggregated performed exercises data
  const data = useMemo<ExerciseTrendPoint[]>(() => [
    { weekStartDate: '2025-01-06', totalVolume: 1200, maxWeight: 185, totalReps: 24 },
    { weekStartDate: '2025-01-13', totalVolume: 1400, maxWeight: 195, totalReps: 26 },
    { weekStartDate: '2025-01-20', totalVolume: 1600, maxWeight: 205, totalReps: 28 },
  ], [])

  return (
    <div className="p-3 space-y-3">
      <div className="inline-flex rounded border overflow-hidden">
        {(['volume','maxWeight','reps'] as TrendMetric[]).map((m) => (
          <button
            key={m}
            className={`px-3 py-1 text-sm ${m === metric ? 'bg-blue-600 text-white' : 'bg-white'} border-r last:border-r-0`}
            onClick={() => setMetric(m)}
          >
            {m}
          </button>
        ))}
      </div>
      {data ? <ExerciseTrendsChart data={data} metric={metric} /> : <ExerciseTrendsChartSkeleton />}
    </div>
  )
}
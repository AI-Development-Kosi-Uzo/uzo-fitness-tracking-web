import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

export type TrendMetric = 'volume' | 'maxWeight' | 'reps'

export interface ExerciseTrendPoint {
  weekStartDate: string
  totalVolume: number
  maxWeight: number
  totalReps: number
}

export function ExerciseTrendsChart({ data, metric }: { data: ExerciseTrendPoint[]; metric: TrendMetric }) {
  const lineKey = useMemo(() => {
    if (metric === 'volume') return 'totalVolume'
    if (metric === 'maxWeight') return 'maxWeight'
    return 'totalReps'
  }, [metric])

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-gray-500">No trend data yet</div>
    )
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weekStartDate" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey={lineKey} stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ExerciseTrendsChartSkeleton() {
  return (
    <div className="w-full h-64 animate-pulse bg-gray-100 rounded" />
  )
}
import { useMemo } from 'react'

type Props = {
  selectedDate: string
  onSelectDate: (date: string) => void
  workoutDates: string[]
}

function toIso(date: Date) { return date.toISOString().slice(0, 10) }

function getMonthGrid(ref: Date) {
  const first = new Date(ref.getFullYear(), ref.getMonth(), 1)
  const start = new Date(first)
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
  const cells: Date[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    cells.push(d)
  }
  return cells
}

export function Calendar({ selectedDate, onSelectDate, workoutDates }: Props) {
  const selected = useMemo(() => new Date(selectedDate + 'T00:00:00'), [selectedDate])
  const monthCells = useMemo(() => getMonthGrid(selected), [selected])
  const hasWorkout = useMemo(() => new Set(workoutDates), [workoutDates])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
      {monthCells.map((d) => {
        const iso = toIso(d)
        const isSelected = iso === selectedDate
        const inMonth = d.getMonth() === selected.getMonth()
        const dot = hasWorkout.has(iso) ? '•' : ' '
        return (
          <button
            key={iso}
            onClick={() => onSelectDate(iso)}
            style={{
              padding: 8,
              borderRadius: 8,
              border: '1px solid #ddd',
              background: isSelected ? '#eef6ff' : '#fff',
              opacity: inMonth ? 1 : 0.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1.2,
            }}
            aria-pressed={isSelected}
            aria-label={`Select ${iso}`}
          >
            <span>{d.getDate()}</span>
            <span aria-hidden style={{ color: '#2563eb' }}>{dot}</span>
          </button>
        )
      })}
    </div>
  )
}

export default Calendar



import { useMemo } from 'react'

export interface CalendarProps {
  datesWithSessions: string[]
  selectedDate: string | null
  onSelectDate: (date: string) => void
}

function toIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

function addDays(d: Date, days: number): Date {
  const nd = new Date(d)
  nd.setDate(nd.getDate() + days)
  return nd
}

function startOfCalendarGrid(monthDate: Date): Date {
  const first = startOfMonth(monthDate)
  const weekday = first.getDay() // 0=Sun
  return addDays(first, -weekday)
}

function endOfCalendarGrid(monthDate: Date): Date {
  const last = endOfMonth(monthDate)
  const weekday = last.getDay() // 0=Sun
  return addDays(last, 6 - weekday)
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function Calendar({ datesWithSessions, selectedDate, onSelectDate }: CalendarProps) {
  const todayIso = toIsoDate(new Date())
  const monthAnchor = useMemo(() => (selectedDate ? new Date(selectedDate) : new Date()), [selectedDate])

  const setOfSessionDates = useMemo(() => new Set(datesWithSessions), [datesWithSessions])

  const { monthLabel, weeks } = useMemo(() => {
    const start = startOfCalendarGrid(monthAnchor)
    const end = endOfCalendarGrid(monthAnchor)
    const days: Date[] = []
    for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
      days.push(new Date(d))
    }
    const weeks: Date[][] = []
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7))
    }
    const monthLabel = monthAnchor.toLocaleString(undefined, { month: 'long', year: 'numeric' })
    return { monthLabel, weeks }
  }, [monthAnchor])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">{monthLabel}</div>
      </div>
      <div className="grid grid-cols-7 text-xs text-gray-500">
        {DAY_LABELS.map((d) => (
          <div key={d} className="p-1 text-center">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="contents">
            {week.map((date) => {
              const iso = toIsoDate(date)
              const isCurrentMonth = date.getMonth() === monthAnchor.getMonth()
              const isSelected = selectedDate === iso
              const hasSession = setOfSessionDates.has(iso)
              const isToday = iso === todayIso
              return (
                <button
                  key={iso}
                  onClick={() => onSelectDate(iso)}
                  className={[
                    'aspect-square rounded-md p-1 flex flex-col items-center justify-center border',
                    isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-900 border-gray-200',
                    !isCurrentMonth && !isSelected ? 'opacity-40' : '',
                  ].join(' ')}
                >
                  <div className="text-sm leading-none">
                    {date.getDate()}
                  </div>
                  <div className="h-1 w-1 rounded-full mt-1"
                    style={{ backgroundColor: hasSession ? (isSelected ? 'white' : '#2563eb') : 'transparent' }}
                    aria-hidden="true"
                  />
                  {isToday && !isSelected && (
                    <div className="sr-only">Today</div>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
### History (HistoryPage)

Purpose: Calendar of sessions with streaks and day drill-down.

Props/state
- Query: workoutSessions (with sessionExercises)
- Local: selectedDate

Events
- selectDate(date)

Layout
- Calendar grid with dots on workout days
- Sessions list for selected day

Computed
- streakCount, totalWorkoutDays



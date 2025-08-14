import type { WorkoutSession } from '../../data/types'

export function groupSessionsByDate(sessions: WorkoutSession[]): Record<string, WorkoutSession[]> {
	return sessions.reduce<Record<string, WorkoutSession[]>>((acc, s) => {
		const key = s.date
		if (!acc[key]) acc[key] = []
		acc[key].push(s)
		return acc
	}, {})
}

export function computeStreak(dates: string[]): number {
	if (dates.length === 0) return 0
	const set = new Set(dates)
	let streak = 0
	const cursor = new Date()
	while (true) {
		const iso = cursor.toISOString().slice(0, 10)
		if (set.has(iso)) {
			streak += 1
			cursor.setDate(cursor.getDate() - 1)
		} else {
			break
		}
	}
	return streak
}
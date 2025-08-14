import type { DayTemplate, ExerciseTemplate, Exercise } from '../../data/types'
import { ExerciseTemplateRow } from './ExerciseTemplateRow'

interface DayListProps {
	days: DayTemplate[]
	exercisesByDayId: Record<string, ExerciseTemplate[]>
	exercisesIndex: Map<string, Exercise>
}

export function DayList(props: DayListProps) {
	const { days, exercisesByDayId, exercisesIndex } = props
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
			{days.map((day) => {
				const exerciseTemplates = exercisesByDayId[day.id] ?? []
				return (
					<section key={day.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
						<header style={{ marginBottom: 8, fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
							<span style={{ textTransform: 'capitalize' }}>{day.weekday}</span>
							{day.isRest ? <span style={{ color: '#999' }}>Rest</span> : null}
						</header>
						{exerciseTemplates.length === 0 ? (
							<div style={{ color: '#999' }}>No exercises yet</div>
						) : (
							<div>
								{exerciseTemplates
									.sort((a, b) => a.position - b.position)
									.map((et) => (
										<ExerciseTemplateRow key={et.id} exerciseTemplate={et} exercise={exercisesIndex.get(et.exerciseId)} />
									))}
							</div>
						)}
					</section>
				)
			})}
		</div>
	)
}
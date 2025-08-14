import type { ExerciseTemplate, Exercise } from '../../data/types'

interface ExerciseTemplateRowProps {
	exerciseTemplate: ExerciseTemplate
	exercise: Exercise | undefined
}

export function ExerciseTemplateRow(props: ExerciseTemplateRowProps) {
	const { exerciseTemplate, exercise } = props
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
			<div style={{ display: 'flex', gap: 8 }}>
				<span style={{ fontWeight: 600 }}>{exercise?.name ?? 'Unknown Exercise'}</span>
				<span style={{ color: '#666' }}>x{exerciseTemplate.setCount} sets</span>
				<span style={{ color: '#666' }}>{exerciseTemplate.reps} reps</span>
				{exerciseTemplate.weight != null ? (
					<span style={{ color: '#666' }}>{exerciseTemplate.weight} lb</span>
				) : null}
			</div>
			<div style={{ color: '#999' }}>#{exerciseTemplate.position + 1}</div>
		</div>
	)
}
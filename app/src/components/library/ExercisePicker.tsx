import type { Exercise } from '../../data/types'
import { useMemo, useState } from 'react'

interface ExercisePickerProps {
	exercises: Exercise[]
	onSelect: (exercise: Exercise) => void
}

export function ExercisePicker(props: ExercisePickerProps) {
	const { exercises, onSelect } = props
	const [query, setQuery] = useState('')

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase()
		if (!q) return exercises
		return exercises.filter((e) => e.name.toLowerCase().includes(q))
	}, [exercises, query])

	return (
		<div>
			<input
				type="text"
				placeholder="Search exercises"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 6, marginBottom: 8 }}
			/>
			<ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: 280, overflow: 'auto' }}>
				{filtered.map((ex) => (
					<li key={ex.id}>
						<button
							onClick={() => onSelect(ex)}
							style={{ width: '100%', textAlign: 'left', padding: '8px 10px', border: '1px solid #eee', borderRadius: 6, marginBottom: 6 }}
						>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<span>{ex.name}</span>
								<span style={{ color: '#999' }}>{ex.category}</span>
							</div>
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
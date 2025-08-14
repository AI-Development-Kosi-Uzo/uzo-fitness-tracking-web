import { useEffect, useState } from 'react'
import type { WorkoutTemplate } from '../../data/types'
import { MemoryWorkoutTemplatesRepository } from '../../data/repositories/memory/workoutTemplates.repo'
import { Link } from '@tanstack/react-router'

export const LibraryPage = () => {
	const [templates, setTemplates] = useState<WorkoutTemplate[]>([])

	useEffect(() => {
		const repo = new MemoryWorkoutTemplatesRepository()
		repo.list().then(setTemplates)
	}, [])

	return (
		<div style={{ paddingBottom: 60 }}>
			<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
				<h1 style={{ fontSize: 22, fontWeight: 800 }}>Library</h1>
				<Link to="/library/exercises">Exercises</Link>
			</header>
			<section>
				<h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Workout Templates</h2>
				{templates.length === 0 ? (
					<div style={{ color: '#999' }}>No templates yet</div>
				) : (
					<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
						{templates.map((t) => (
							<li key={t.id} style={{ marginBottom: 8 }}>
								<Link to="/library/templates/$templateId" params={{ templateId: t.id } as const}>
									<div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
										<div style={{ fontWeight: 700 }}>{t.name}</div>
										<div style={{ color: '#666' }}>{t.summary}</div>
									</div>
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>
		</div>
	)
}
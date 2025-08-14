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
		<div className="pb-16 p-4 space-y-3">
			<header className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold tracking-tight">Library</h1>
				<Link to="/library/exercises" className="text-sm text-blue-600">Exercises</Link>
			</header>
			<section>
				<h2 className="text-base font-semibold mb-2">Workout Templates</h2>
				{templates.length === 0 ? (
					<div className="text-sm text-gray-600">No templates yet</div>
				) : (
					<ul className="space-y-2">
						{templates.map((t) => (
							<li key={t.id}>
								<Link to="/library/templates/$templateId" params={{ templateId: t.id } as const}>
									<div className="rounded-2xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.08),0_10px_20px_-10px_rgba(0,0,0,0.25)] p-3">
										<div className="font-semibold">{t.name}</div>
										<div className="text-sm text-gray-600">{t.summary}</div>
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
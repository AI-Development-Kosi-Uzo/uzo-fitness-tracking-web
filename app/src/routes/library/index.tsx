import { useEffect, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import type { Exercise, WorkoutTemplate } from '../../data/types'
import { exercisesRepo, workoutTemplatesRepo } from './data'
import { paths } from '../../routes/paths'

export default function LibraryIndexRoute() {
  const [templates, setTemplates] = useState<WorkoutTemplate[] | null>(null)
  const [exercises, setExercises] = useState<Exercise[] | null>(null)

  // Dialog state
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false)
  const [isCreateExerciseOpen, setIsCreateExerciseOpen] = useState(false)

  // Form state
  const [templateName, setTemplateName] = useState('')
  const [templateSummary, setTemplateSummary] = useState('')
  const canCreateTemplate = useMemo(() => templateName.trim() && templateSummary.trim(), [templateName, templateSummary])

  const [exerciseName, setExerciseName] = useState('')
  const [exerciseCategory, setExerciseCategory] = useState<'strength' | 'cardio' | 'mobility' | 'balance'>('strength')
  const [exerciseInstructions, setExerciseInstructions] = useState('')
  const canCreateExercise = useMemo(() => exerciseName.trim() && exerciseInstructions.trim(), [exerciseName, exerciseInstructions])

  useEffect(() => {
    ;(async () => {
      setTemplates(await workoutTemplatesRepo.list())
      setExercises(await exercisesRepo.list())
    })()
  }, [])

  async function handleCreateTemplate() {
    if (!canCreateTemplate) return
    await workoutTemplatesRepo.create({ name: templateName.trim(), summary: templateSummary.trim(), createdAt: new Date().toISOString() })
    setTemplateName(''); setTemplateSummary(''); setIsCreateTemplateOpen(false)
    setTemplates(await workoutTemplatesRepo.list())
  }

  async function handleCreateExercise() {
    if (!canCreateExercise) return
    await exercisesRepo.create({
      name: exerciseName.trim(),
      category: exerciseCategory,
      instructions: exerciseInstructions.trim(),
      mediaAssetId: null,
      lastUsedWeight: null,
      lastUsedReps: null,
      lastTotalVolume: null,
      lastUsedDate: null,
    })
    setExerciseName(''); setExerciseInstructions(''); setIsCreateExerciseOpen(false)
    setExercises(await exercisesRepo.list())
  }

  return (
    <div className="p-4 grid gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Library</h1>
        <div className="flex gap-2">
          <button onClick={() => setIsCreateTemplateOpen(true)} className="px-3 py-1 rounded border">Create Template</button>
          <button onClick={() => setIsCreateExerciseOpen(true)} className="px-3 py-1 rounded border">Create Exercise</button>
        </div>
      </header>

      <section>
        <h2 className="text-lg font-medium">Templates</h2>
        {!templates && <div className="text-gray-500">Loading templates…</div>}
        {templates && templates.length === 0 && <div className="text-gray-500">No templates yet.</div>}
        {templates && templates.length > 0 && (
          <ul className="mt-2 grid gap-2">
            {templates.map((t) => (
              <li key={t.id}>
                <Link to={paths.libraryTemplate(t.id)} className="block border rounded px-3 py-2 hover:bg-gray-50">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-gray-600">{t.summary}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-medium">Exercises</h2>
        {!exercises && <div className="text-gray-500">Loading exercises…</div>}
        {exercises && exercises.length === 0 && <div className="text-gray-500">No exercises yet.</div>}
        {exercises && exercises.length > 0 && (
          <ul className="mt-2 grid gap-2">
            {exercises.map((e) => (
              <li key={e.id} className="border rounded px-3 py-2">
                <div className="font-medium">{e.name}</div>
                <div className="text-sm text-gray-600 capitalize">{e.category}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {isCreateTemplateOpen && (
        <div className="fixed inset-0 bg-black/20 grid place-items-center">
          <div className="bg-white rounded shadow p-4 w-full max-w-md">
            <h3 className="text-lg font-medium">Create Template</h3>
            <div className="mt-3 grid gap-3">
              <label className="grid gap-1">
                <span className="text-sm text-gray-600">Name</span>
                <input value={templateName} onChange={(e) => setTemplateName(e.target.value)} className="border rounded px-2 py-1" />
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-gray-600">Summary</span>
                <input value={templateSummary} onChange={(e) => setTemplateSummary(e.target.value)} className="border rounded px-2 py-1" />
              </label>
              <div className="flex justify-end gap-2">
                <button onClick={() => setIsCreateTemplateOpen(false)} className="px-3 py-1 rounded border">Cancel</button>
                <button onClick={handleCreateTemplate} disabled={!canCreateTemplate} className="px-3 py-1 rounded bg-black text-white disabled:opacity-40">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCreateExerciseOpen && (
        <div className="fixed inset-0 bg-black/20 grid place-items-center">
          <div className="bg-white rounded shadow p-4 w-full max-w-md">
            <h3 className="text-lg font-medium">Create Exercise</h3>
            <div className="mt-3 grid gap-3">
              <label className="grid gap-1">
                <span className="text-sm text-gray-600">Name</span>
                <input value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} className="border rounded px-2 py-1" />
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-gray-600">Category</span>
                <select value={exerciseCategory} onChange={(e) => setExerciseCategory(e.target.value as any)} className="border rounded px-2 py-1">
                  <option value="strength">Strength</option>
                  <option value="cardio">Cardio</option>
                  <option value="mobility">Mobility</option>
                  <option value="balance">Balance</option>
                </select>
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-gray-600">Instructions</span>
                <textarea value={exerciseInstructions} onChange={(e) => setExerciseInstructions(e.target.value)} className="border rounded px-2 py-1 min-h-24" />
              </label>
              <div className="flex justify-end gap-2">
                <button onClick={() => setIsCreateExerciseOpen(false)} className="px-3 py-1 rounded border">Cancel</button>
                <button onClick={handleCreateExercise} disabled={!canCreateExercise} className="px-3 py-1 rounded bg-black text-white disabled:opacity-40">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}



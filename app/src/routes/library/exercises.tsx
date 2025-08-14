import { useEffect, useMemo, useState } from 'react'
import type { Exercise } from '../../data/types'
import { exercisesRepo } from './data'

export default function LibraryExercisesRoute() {
  const [list, setList] = useState<Exercise[] | null>(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    ;(async () => setList(await exercisesRepo.list()))()
  }, [])

  const filtered = useMemo(() => {
    if (!list) return null
    const needle = q.trim().toLowerCase()
    if (!needle) return list
    return list.filter((e) => e.name.toLowerCase().includes(needle))
  }, [q, list])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Exercises</h1>
      <input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} className="border rounded px-2 py-1 mt-3" />
      {!filtered && <div className="mt-4 text-gray-500">Loading…</div>}
      {filtered && filtered.length === 0 && <div className="mt-4 text-gray-500">No exercises.</div>}
      {filtered && filtered.length > 0 && (
        <ul className="mt-4 grid gap-2">
          {filtered.map((e) => (
            <li key={e.id} className="border rounded px-3 py-2">
              <div className="font-medium">{e.name}</div>
              <div className="text-sm text-gray-600 capitalize">{e.category}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}



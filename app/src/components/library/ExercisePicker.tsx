import { useEffect, useMemo, useState } from 'react'
import type { Exercise } from '../../data/types'
import { exercisesRepo } from '../../routes/library/data'

type Props = {
  onSelect?: (exercise: Exercise) => void
}

export function ExercisePicker(props: Props) {
  const { onSelect } = props
  const [query, setQuery] = useState('')
  const [list, setList] = useState<Exercise[]>([])

  useEffect(() => {
    ;(async () => setList(await exercisesRepo.list()))()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter((e) => e.name.toLowerCase().includes(q))
  }, [query, list])

  return (
    <div>
      <div className="flex gap-2 items-center">
        <input placeholder="Search exercises" value={query} onChange={(e) => setQuery(e.target.value)} className="border rounded px-2 py-1" />
      </div>
      <ul className="mt-2 grid gap-1">
        {filtered.map((e) => (
          <li key={e.id}>
            <button onClick={() => onSelect?.(e)} className="w-full text-left border rounded px-2 py-1 hover:bg-gray-50">
              {e.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}



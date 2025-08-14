import { useEffect, useMemo, useState } from 'react'
import type { WorkoutTemplate } from '../../data/types'

type Props = {
  template: WorkoutTemplate
}

export function TemplateEditor(props: Props) {
  const { template } = props
  const [name, setName] = useState(template.name)
  const [summary, setSummary] = useState(template.summary)

  useEffect(() => {
    setName(template.name)
    setSummary(template.summary)
  }, [template.id])

  const canSave = useMemo(() => name.trim().length > 0 && summary.trim().length > 0, [name, summary])

  return (
    <div>
      <h2 className="text-xl font-semibold">Template Editor</h2>
      <div className="mt-4 grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm text-gray-600">Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="border rounded px-2 py-1" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-gray-600">Summary</span>
          <input value={summary} onChange={(e) => setSummary(e.target.value)} className="border rounded px-2 py-1" />
        </label>
        <button disabled={!canSave} className="bg-black text-white disabled:opacity-40 rounded px-3 py-1 w-fit">Save (stub)</button>
      </div>
    </div>
  )
}



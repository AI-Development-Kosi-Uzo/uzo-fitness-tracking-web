import type { ProgressPhoto } from '@data/types'
import { useState } from 'react'

export interface EditPhotoModalProps {
  photo: ProgressPhoto
  onSave: (updates: { date: string; manualWeight: number | null; notes: string }) => void
  onCancel: () => void
}

export function EditPhotoModal({ photo, onSave, onCancel }: EditPhotoModalProps) {
  const [date, setDate] = useState(photo.date)
  const [manualWeight, setManualWeight] = useState<string>(photo.manualWeight?.toString() ?? '')
  const [notes, setNotes] = useState(photo.notes)

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded shadow p-4 space-y-3">
        <h2 className="text-lg font-semibold">Edit Photo</h2>
        <label className="block text-sm">
          <span className="block text-gray-600 mb-1">Date</span>
          <input
            className="w-full border rounded px-2 py-1"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="block text-gray-600 mb-1">Manual Weight (lb)</span>
          <input
            className="w-full border rounded px-2 py-1"
            type="number"
            inputMode="decimal"
            placeholder="e.g. 180"
            value={manualWeight}
            onChange={(e) => setManualWeight(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="block text-gray-600 mb-1">Notes</span>
          <textarea
            className="w-full border rounded px-2 py-1"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <button className="px-3 py-1 rounded border" onClick={onCancel}>Cancel</button>
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white"
            onClick={() => onSave({ date, manualWeight: manualWeight === '' ? null : Number(manualWeight), notes })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
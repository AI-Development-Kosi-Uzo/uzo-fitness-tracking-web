import { useState } from 'react'
import type { ProgressPhoto } from '../../data/types'

interface Props {
  photo: ProgressPhoto
  onSave(updates: Partial<Pick<ProgressPhoto, 'date' | 'manualWeight'>>): void
  onClose(): void
}

export function EditPhotoModal({ photo, onSave, onClose }: Props) {
  const [date, setDate] = useState(photo.date)
  const [manualWeight, setManualWeight] = useState<string>(
    photo.manualWeight != null ? String(photo.manualWeight) : '',
  )

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', display: 'grid', placeItems: 'center' }}>
      <div style={{ background: 'white', padding: 16, borderRadius: 8, minWidth: 280 }}>
        <h3 style={{ marginTop: 0 }}>Edit Photo</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          <label>
            <div>Date</div>
            <input value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            <div>Manual Weight (lb)</div>
            <input
              value={manualWeight}
              onChange={(e) => setManualWeight(e.target.value)}
              inputMode="decimal"
            />
          </label>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={() =>
                onSave({ date, manualWeight: manualWeight ? Number(manualWeight) : null })
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPhotoModal



import { useEffect, useMemo, useState } from 'react'
import { PhotoGrid } from '@components/progress/PhotoGrid'
import { CompareView } from '@components/progress/CompareView'
import { EditPhotoModal } from '@components/progress/EditPhotoModal'
import type { ProgressPhoto } from '@data/types'
import { MemoryProgressPhotosRepository } from '@data/repositories/memory/progressPhotos.repo'

const repo = new MemoryProgressPhotosRepository()

export const ProgressPhotosPage = () => {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null)

  useEffect(() => {
    repo.list().then(setPhotos)
  }, [])

  const selectedPhotos = useMemo(() => selected.map((id) => photos.find((p) => p.id === id)).filter(Boolean) as ProgressPhoto[], [selected, photos])
  const editingPhoto = useMemo(() => photos.find((p) => p.id === editingPhotoId) ?? null, [photos, editingPhotoId])

  function toggleSelect(photoId: string) {
    setSelected((prev) => {
      if (prev.includes(photoId)) return prev.filter((id) => id !== photoId)
      if (prev.length >= 2) return [prev[1], photoId]
      return [...prev, photoId]
    })
  }

  async function handleDelete(photoId: string) {
    await repo.remove(photoId)
    setPhotos(await repo.list())
    setSelected((prev) => prev.filter((id) => id !== photoId))
  }

  async function handleSave(updates: { date: string; manualWeight: number | null; notes: string }) {
    if (!editingPhoto) return
    await repo.update(editingPhoto.id, updates)
    setPhotos(await repo.list())
    setEditingPhotoId(null)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-3 pt-3">
        <div className="text-sm text-gray-600">Tap photos to select two and compare</div>
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
          onClick={async () => {
            const now = new Date()
            await repo.create({
              date: now.toISOString().slice(0,10),
              angle: 'front',
              assetIdentifier: 'demo',
              weightSampleId: null,
              notes: '',
              manualWeight: null,
              createdAt: now.toISOString(),
            })
            setPhotos(await repo.list())
          }}
        >
          Add Photo
        </button>
      </div>
      <PhotoGrid photos={photos} onSelect={(id) => { toggleSelect(id); setEditingPhotoId(id) }} onDelete={handleDelete} />
      <CompareView a={selectedPhotos[0]} b={selectedPhotos[1]} />
      {editingPhoto && (
        <EditPhotoModal
          photo={editingPhoto}
          onCancel={() => setEditingPhotoId(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
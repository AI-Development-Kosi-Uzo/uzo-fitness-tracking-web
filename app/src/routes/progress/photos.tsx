import { useEffect, useState } from 'react'
import PhotoGrid from '../../components/progress/PhotoGrid'
import type { ProgressPhoto } from '../../data/types'
import { MemoryProgressPhotosRepository } from '../../data/repositories/memory/progressPhotos.repo'

export function ProgressPhotosPage() {
  const [photos, setPhotos] = useState<ProgressPhoto[] | null>(null)

  useEffect(() => {
    const repo = new MemoryProgressPhotosRepository()
    ;(async () => {
      const list = await repo.list()
      setPhotos(list)
    })()
  }, [])

  return (
    <div>
      <h1>Progress - Photos</h1>
      {!photos && <div>Loading…</div>}
      {photos && photos.length === 0 && <div>No photos yet</div>}
      {photos && photos.length > 0 && <PhotoGrid photos={photos} />}
    </div>
  )
}

export default ProgressPhotosPage



import type { ProgressPhoto } from '@data/types'

export interface PhotoGridProps {
  photos: ProgressPhoto[]
  onSelect?: (photoId: string) => void
  onDelete?: (photoId: string) => void
}

export function PhotoGrid({ photos, onSelect, onDelete }: PhotoGridProps) {
  if (!photos || photos.length === 0) {
    return <div className="p-6 text-center text-sm text-gray-500">No photos yet</div>
  }

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {photos.map((p) => (
        <div key={p.id} className="relative group">
          <button
            type="button"
            className="block w-full aspect-square bg-gray-100 rounded overflow-hidden"
            onClick={() => onSelect?.(p.id)}
          >
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">
              {p.angle}
            </div>
          </button>
          {onDelete && (
            <button
              type="button"
              className="absolute top-1 right-1 hidden group-hover:block bg-red-600 text-white text-xs px-2 py-1 rounded"
              onClick={() => onDelete(p.id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
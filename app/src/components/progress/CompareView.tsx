import type { ProgressPhoto } from '@data/types'

export function CompareView({ a, b }: { a?: ProgressPhoto; b?: ProgressPhoto }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      <div className="aspect-[3/4] bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600">
        {a ? `${a.date} (${a.angle})` : 'Select Photo A'}
      </div>
      <div className="aspect-[3/4] bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600">
        {b ? `${b.date} (${b.angle})` : 'Select Photo B'}
      </div>
    </div>
  )
}
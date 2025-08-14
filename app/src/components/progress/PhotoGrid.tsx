import type { ProgressPhoto } from '../../data/types'

interface Props {
  photos: ProgressPhoto[]
}

export function PhotoGrid({ photos }: Props) {
  if (photos.length === 0) return <div>No photos yet</div>
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {photos.map((p) => (
        <figure key={p.id} style={{ border: '1px solid #eee', padding: 8, borderRadius: 8 }}>
          <img src={p.assetIdentifier} alt={`${p.angle} ${p.date}`} style={{ width: '100%', height: 'auto' }} />
          <figcaption style={{ fontSize: 12 }}>
            {p.date} — {p.angle} {p.manualWeight ? `(${p.manualWeight} lb)` : ''}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default PhotoGrid



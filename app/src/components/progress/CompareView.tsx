import type { ProgressPhoto } from '../../data/types'

interface Props {
  left?: ProgressPhoto
  right?: ProgressPhoto
}

export function CompareView({ left, right }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div>
        <h3 style={{ margin: '4px 0' }}>Left</h3>
        {left ? (
          <img src={left.assetIdentifier} alt={`left ${left.date}`} style={{ width: '100%', height: 'auto' }} />
        ) : (
          <div style={{ border: '1px dashed #ccc', padding: 24, textAlign: 'center' }}>Select photo</div>
        )}
      </div>
      <div>
        <h3 style={{ margin: '4px 0' }}>Right</h3>
        {right ? (
          <img src={right.assetIdentifier} alt={`right ${right.date}`} style={{ width: '100%', height: 'auto' }} />
        ) : (
          <div style={{ border: '1px dashed #ccc', padding: 24, textAlign: 'center' }}>Select photo</div>
        )}
      </div>
    </div>
  )
}

export default CompareView



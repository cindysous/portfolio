interface Props {
  layout?: 'single' | 'grid'
  count?: number
}

const PLACEHOLDER_BG = '#D6D2CC'
const RADIUS = 12

export default function CaseStudyImages({ layout = 'grid', count = 3 }: Props) {
  if (layout === 'single') {
    return (
      <div style={{ padding: '0 0 16px' }}>
        <div style={{
          width: '100%',
          aspectRatio: '8 / 3',
          background: PLACEHOLDER_BG,
          borderRadius: RADIUS,
        }} />
      </div>
    )
  }

  // grid layout — equal columns
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${count}, 1fr)`,
      gap: 16,
      padding: '0 0 16px',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          aspectRatio: '1 / 1',
          background: PLACEHOLDER_BG,
          borderRadius: RADIUS,
        }} />
      ))}
    </div>
  )
}

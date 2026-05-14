import type { ReactNode } from 'react'

interface Props {
  label: string
  description?: string
  children: ReactNode
  first?: boolean
}

export default function CaseStudySection({ label, description, children, first }: Props) {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: '0 64px',
      padding: first ? '80px 0 72px' : '72px 0',
      borderTop: first ? 'none' : '1px solid var(--border)',
      alignItems: 'start',
    }}>

      {/* Left — section label + optional description */}
      <div className="not-prose" style={{ paddingTop: 4 }}>
        <h2 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(24px, 2.6vw, 38px)',
          fontWeight: 600,
          letterSpacing: '-0.025em',
          lineHeight: 1.05,
          color: 'var(--ink)',
          margin: 0,
        }}>
          {label}
        </h2>
        {description && (
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 14, lineHeight: 1.7,
            color: 'var(--warm-mid)',
            marginTop: 14, marginBottom: 0,
            maxWidth: '26ch',
          }}>
            {description}
          </p>
        )}
      </div>

      {/* Right — markdown content */}
      <div>
        {children}
      </div>

    </section>
  )
}

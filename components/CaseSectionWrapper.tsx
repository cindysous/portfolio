import type { ReactNode } from 'react'
import ShapeTexture from '@/components/ShapeTexture'

interface Props {
  bg: string
  children: ReactNode
  shape?: boolean
  /** Override ShapeTexture fill — use a light value on dark backgrounds. */
  shapeFill?: string
  /** Dark-background section: cascades light CSS tokens + prose overrides. */
  dark?: boolean
}

// Full-bleed colored background wrapper for case study sections.
// Escapes both the 80px content padding AND the --sidebar-gap to reach
// the true left edge of the page behind the nav.
export default function CaseSectionWrapper({ bg, children, shape, shapeFill = '#71717a', dark }: Props) {
  return (
    <div
      data-reveal
      className="case-section-wrapper"
      {...(dark ? { 'data-dark-section': '' } : {})}
      style={{
        marginLeft: 'calc(-80px - var(--sidebar-gap))',
        marginRight: '-80px',
        paddingLeft: 'calc(80px + var(--sidebar-gap))',
        paddingRight: '80px',
        paddingBottom: '80px',
        background: bg,
        ...(shape ? { position: 'relative', overflow: 'hidden' } : {}),
      }}
    >
      {shape && (
        <ShapeTexture
          fill={shapeFill}
          opacity={0.07}
          style={{
            // V1 — "2 Intro" frame: vector at x=−601, y=368 in 1920×1080.
            // All units are vw (1920px = 100vw) so the crop scales with viewport.
            left: '-31.3vw',
            top: '19.2vw',
            width: '209vw',
            height: '209vw',
          }}
        />
      )}
      {/* When shape is present, content must sit above the z-index:0 ShapeTexture. */}
      {shape ? (
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      ) : (
        children
      )}
    </div>
  )
}

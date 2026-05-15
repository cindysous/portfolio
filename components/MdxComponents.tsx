import type { MDXComponents } from 'mdx/types'
import TransactionListMockup from '@/components/TransactionListMockup'
import OldDesignCard from '@/components/OldDesignCard'
import ComponentSystemShowcase from '@/components/ComponentSystemShowcase'
import OutcomesShowcase from '@/components/OutcomesShowcase'
import TransactionOutcomesSection from '@/components/TransactionOutcomesSection'
import TransactionAiExplorationSection from '@/components/TransactionAiExplorationSection'
import TransactionLearnings from '@/components/TransactionLearnings'
import TransactionProcessSection from '@/components/TransactionProcessSection'
import EntityProblemCards from '@/components/EntityProblemCards'
import EntityLearnings from '@/components/EntityLearnings'
import EntityOverviewVisual from '@/components/EntityOverviewVisual'
import EntityProcessCarousel from '@/components/EntityProcessCarousel'
import EntityPhases from '@/components/EntityPhases'
import EntityPhasedRollout from '@/components/EntityPhasedRollout'
import EntityLaunchComms from '@/components/EntityLaunchComms'
import EntityOutcomes from '@/components/EntityOutcomes'
import EntityOverviewCarousel from '@/components/EntityOverviewCarousel'
import Phase1ScreenPreview from '@/components/Phase1ScreenPreview'
import Phase1AnimatedPrototype from '@/components/Phase1AnimatedPrototype'
import CaseStudySection from '@/components/CaseStudySection'
import CaseSectionWrapper from '@/components/CaseSectionWrapper'
import CaseStudyImages from '@/components/CaseStudyImages'
import ProcessCarousel from '@/components/ProcessCarousel'

// Scoped styling wrapper for the overview text column.
// Overrides prose defaults for h4, ul/li, code, p, and strong within the blue-tinted bg.
function OverviewText({ children }: { children: React.ReactNode }) {
  return (
    <div className="ov-text">
      {children}
      <style>{`
        .ov-text h4 {
          font-family: var(--font-inter) !important;
          font-size: 9px !important;
          font-weight: 700 !important;
          letter-spacing: 0.14em !important;
          text-transform: uppercase !important;
          line-height: 1 !important;
          color: #7d5a4a !important;
          margin: 26px 0 10px !important;
        }
        .ov-text h4:first-child { margin-top: 0 !important; }
        .ov-text p {
          font-size: 13.5px !important;
          line-height: 1.72 !important;
          color: #5c6677 !important;
          margin: 0 0 12px !important;
        }
        .ov-text strong { color: #3d2a20 !important; font-weight: 600 !important; }
        .ov-text ul {
          list-style: none !important;
          padding-left: 0 !important;
          margin: 4px 0 0 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 7px !important;
        }
        .ov-text ul > li {
          display: flex !important;
          align-items: flex-start !important;
          gap: 10px !important;
          font-family: var(--font-inter) !important;
          font-size: 13.5px !important;
          line-height: 1.62 !important;
          color: #5c6677 !important;
          padding-left: 0 !important;
          margin: 0 !important;
        }
        .ov-text ul > li::before {
          content: '' !important;
          width: 4px !important;
          height: 4px !important;
          border-radius: 50% !important;
          background: rgba(125,79,62,0.55) !important;
          flex-shrink: 0 !important;
          margin-top: 9px !important;
          display: block !important;
        }
        .ov-text ul > li > p { margin: 0 !important; }
        .ov-text code {
          font-family: ui-monospace, 'SF Mono', Menlo, monospace !important;
          font-size: 12px !important;
          background: rgba(125,79,62,0.08) !important;
          color: #7d4030 !important;
          padding: 3px 8px !important;
          border-radius: 5px !important;
          border: 1px solid rgba(125,79,62,0.18) !important;
          font-weight: 500 !important;
        }
        .ov-text em {
          font-style: italic !important;
          color: #7d5a4a !important;
          font-size: 13.5px !important;
          line-height: 1.65 !important;
          display: block !important;
          margin: 8px 0 4px !important;
          padding-left: 12px !important;
          border-left: 2px solid rgba(125,79,62,0.30) !important;
        }
      `}</style>
    </div>
  )
}

// Overview layout: cols=1 for text-only, cols=2 for text + visual
function OverviewLayout({ children, cols = 2 }: { children: React.ReactNode; cols?: 1 | 2 }) {
  return (
    <div className="overview-layout-section" style={{ padding: '80px 0 72px' }}>
      <h2 className="not-prose" style={{
        fontFamily: 'var(--font-inter)',
        fontSize: 'clamp(24px, 2.6vw, 38px)',
        fontWeight: 600,
        letterSpacing: '-0.025em',
        lineHeight: 1.05,
        color: 'var(--ink)',
        margin: '0 0 48px',
      }}>
        Overview
      </h2>
      <div className="overview-layout-grid" style={{
        display: 'grid',
        gridTemplateColumns: cols === 1 ? '1fr' : '1fr 1fr',
        gap: '0 56px',
        alignItems: 'start',
      }}>
        {children}
      </div>
    </div>
  )
}

function ImagePlaceholder({
  label = 'Image placeholder',
  caption,
  aspect = '16/9',
}: {
  label?: string
  caption?: string
  aspect?: string
}) {
  return (
    <figure style={{ margin: '0' }}>
      <div style={{
        width: '100%', aspectRatio: aspect,
        background: 'rgba(26,21,19,0.14)',
        border: '1.5px dashed rgba(255,255,255,0.18)',
        borderRadius: 12,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
        {/* Icon */}
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.14)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <rect x="1.5" y="1.5" width="12" height="12" rx="2" stroke="rgba(255,255,255,0.65)" strokeWidth="1.1"/>
            <circle cx="5" cy="5" r="1.1" fill="rgba(255,255,255,0.55)"/>
            <path d="M1.5 10l3-3 2.5 2.5L10 7l3.5 3.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Labels */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.10em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.80)',
          }}>
            Coming soon
          </span>
          {label && (
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: 10,
              letterSpacing: '0.03em', color: 'rgba(255,255,255,0.42)',
              textAlign: 'center', padding: '0 20px',
            }}>
              {label}
            </span>
          )}
        </div>
      </div>
      {caption && (
        <figcaption style={{
          marginTop: 10, fontFamily: 'var(--font-inter)', fontSize: 9,
          letterSpacing: '0.06em', color: 'var(--warm-light)', textAlign: 'center',
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function InProgressBanner() {
  return (
    <div className="not-prose" style={{ paddingTop: 44, paddingBottom: 0 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 16px',
        background: 'rgba(180,83,9,0.05)',
        border: '1px solid rgba(180,83,9,0.14)',
        borderRadius: 10,
      }}>
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#b45309', opacity: 0.75, flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: 12,
          color: '#92600a', letterSpacing: '0.01em', lineHeight: 1,
        }}>
          This case study is currently in progress
        </span>
      </div>
    </div>
  )
}

// Two or three images side by side — use inside MDX as:
// <ImageGrid>
//   <ImagePlaceholder label="..." />
//   <ImagePlaceholder label="..." />
// </ImageGrid>
function ImageGrid({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className="image-grid-container" style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 12, margin: '0',
    }}>
      {children}
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{
        fontFamily: 'var(--font-inter)', fontSize: 'clamp(40px, 5vw, 60px)',
        fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1,
      }}>
        {value}
      </span>
      <span style={{
        fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: 'var(--warm-light)', marginTop: 8,
      }}>
        {label}
      </span>
    </div>
  )
}

function StatsGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: 32, margin: '48px 0', padding: '36px 40px',
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 16,
    }}>
      {children}
    </div>
  )
}

function ProcessStep({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div style={{
      display: 'flex', gap: 18,
      padding: '16px 0',
      borderTop: number !== '01' ? '1px solid var(--border)' : 'none',
    }}>
      <div style={{
        flexShrink: 0, width: 30, height: 30, borderRadius: '50%',
        background: 'rgba(4,69,245,0.06)',
        border: '1px solid rgba(4,69,245,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: 2,
      }}>
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700,
          color: '#0445f5', letterSpacing: '0.02em',
        }}>
          {number}
        </span>
      </div>
      <div style={{ paddingTop: 5 }}>
        <div style={{
          fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 700,
          letterSpacing: '-0.015em', lineHeight: 1.2,
          color: 'var(--ink)', marginBottom: children ? 3 : 0,
        }}>
          {title}
        </div>
        {children && (
          <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--warm-mid)' }}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

// 4 discrete status label chips with arrows — used in Overview "labeling problem"
function StatusFlow() {
  const LABELS = [
    { text: 'Initiated',              clr: '#4a5568', bg: 'rgba(26,37,53,0.05)',  border: 'rgba(26,37,53,0.12)' },
    { text: 'Processing',             clr: '#4a5568', bg: 'rgba(26,37,53,0.05)',  border: 'rgba(26,37,53,0.12)' },
    { text: 'In Compliance Review',   clr: '#92600a', bg: 'rgba(217,119,6,0.07)', border: 'rgba(217,119,6,0.18)' },
    { text: 'Completed',              clr: '#0445f5', bg: 'rgba(4,69,245,0.07)',  border: 'rgba(4,69,245,0.18)' },
  ]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, margin: '10px 0 12px' }}>
      {LABELS.map(({ text, clr, bg, border }, i) => (
        <div key={text} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            fontSize: 10, fontWeight: 500,
            color: clr, background: bg, border: `1px solid ${border}`,
            borderRadius: 5, padding: '4px 10px', whiteSpace: 'nowrap',
          }}>{text}</span>
          {i < LABELS.length - 1 && (
            <span style={{ color: 'rgba(26,37,53,0.28)', fontSize: 11, lineHeight: 1, userSelect: 'none' }}>→</span>
          )}
        </div>
      ))}
    </div>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      margin: '40px 0', padding: '24px 28px',
      background: 'var(--surface)', borderLeft: '3px solid var(--sage)',
      borderRadius: '0 12px 12px 0',
    }}>
      <div style={{
        fontFamily: 'var(--font-inter)', fontSize: 'clamp(16px, 1.6vw, 20px)',
        fontWeight: 400, lineHeight: 1.55, color: 'var(--ink)',
      }}>
        {children}
      </div>
    </div>
  )
}

const mdxComponents: MDXComponents = {
  OverviewLayout,
  OverviewText,
  StatusFlow,
  TransactionLearnings,
  TransactionProcessSection,
  InProgressBanner,
  ImagePlaceholder,
  ImageGrid,
  OldDesignCard,
  ComponentSystemShowcase,
  OutcomesShowcase,
  TransactionOutcomesSection,
  TransactionAiExplorationSection,
  CaseStudySection,
  CaseSectionWrapper,
  CaseStudyImages,
  ProcessCarousel,
  Stat,
  StatsGrid,
  ProcessStep,
  Callout,
  TransactionListMockup,
  EntityProblemCards,
  EntityLearnings,
  EntityOverviewVisual,
  EntityProcessCarousel,
  EntityPhases,
  EntityPhasedRollout,
  EntityLaunchComms,
  EntityOutcomes,
  EntityOverviewCarousel,
  Phase1ScreenPreview,
  Phase1AnimatedPrototype,

  h2: ({ children }) => (
    <div className="mdx-h2-block" style={{ marginTop: 72, marginBottom: 28, paddingTop: 48, borderTop: '1px solid var(--border)' }}>
      <div style={{
        fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: 'var(--warm-light)', marginBottom: 14,
      }}>
        //
      </div>
      <h2 style={{
        fontFamily: 'var(--font-inter)',
        fontSize: 'clamp(26px, 3vw, 40px)',
        fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05,
        color: 'var(--ink)', margin: 0,
      }}>
        {children}
      </h2>
    </div>
  ),

  h3: ({ children }) => (
    <h3 style={{
      fontFamily: 'var(--font-inter)',
      fontSize: 'clamp(17px, 1.8vw, 21px)',
      fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25,
      color: 'var(--ink)', marginTop: 40, marginBottom: 12,
    }}>
      {children}
    </h3>
  ),

  blockquote: ({ children }) => (
    <blockquote style={{
      margin: '40px 0',
      padding: '28px 32px',
      background: 'var(--surface)',
      borderLeft: '3px solid var(--sage)',
      borderRadius: '0 12px 12px 0',
      fontStyle: 'normal',
    }}>
      <div style={{
        fontFamily: 'var(--font-inter)',
        fontSize: 'clamp(18px, 1.8vw, 22px)',
        fontWeight: 400, fontStyle: 'italic',
        lineHeight: 1.5, color: 'var(--ink)',
      }}>
        {children}
      </div>
    </blockquote>
  ),

  hr: () => (
    <div style={{
      margin: '56px 0',
      height: 1,
      background: 'var(--border)',
    }} />
  ),
}

export default mdxComponents

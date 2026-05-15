'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { CaseStudyFrontmatter } from '@/lib/case-studies'

type Study = CaseStudyFrontmatter & { slug: string }

// ── Card visual illustrations ──────────────────────────────────────────────
function IllustrationA() {
  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Grid lines */}
      <line x1="0" y1="90" x2="260" y2="90" stroke="rgba(122,158,117,0.12)" strokeWidth="0.5"/>
      <line x1="130" y1="0" x2="130" y2="180" stroke="rgba(122,158,117,0.12)" strokeWidth="0.5"/>
      {/* Data bars */}
      <rect x="24"  y="80" width="28" height="80" rx="3" fill="rgba(74,107,69,0.25)"/>
      <rect x="60"  y="50" width="28" height="110" rx="3" fill="rgba(74,107,69,0.35)"/>
      <rect x="96"  y="30" width="28" height="130" rx="3" fill="rgba(122,158,117,0.5)"/>
      <rect x="132" y="55" width="28" height="105" rx="3" fill="rgba(74,107,69,0.35)"/>
      <rect x="168" y="70" width="28" height="90"  rx="3" fill="rgba(74,107,69,0.25)"/>
      <rect x="204" y="90" width="28" height="70"  rx="3" fill="rgba(74,107,69,0.18)"/>
      {/* Trend line */}
      <polyline
        points="38,115 74,85 110,55 146,80 182,100 218,125"
        stroke="#7a9e75" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="200" strokeDashoffset="200"
        style={{ animation: 'drawLine 1.4s ease forwards 0.5s' }}
      />
      {/* Dots on trend line */}
      <circle cx="110" cy="55" r="4" fill="#7a9e75" opacity="0.8"/>
      <circle cx="38"  cy="115" r="3" fill="rgba(122,158,117,0.5)"/>
      {/* Label chip */}
      <rect x="24" y="16" width="80" height="14" rx="7" fill="rgba(74,107,69,0.2)"/>
      <rect x="28" y="20" width="40" height="6" rx="3" fill="rgba(122,158,117,0.5)"/>
    </svg>
  )
}

function IllustrationB() {
  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Radial hint */}
      <circle cx="130" cy="90" r="70" stroke="rgba(212,137,106,0.08)" strokeWidth="40" fill="none"/>
      {/* Progress arc */}
      <circle cx="130" cy="90" r="54" stroke="rgba(212,137,106,0.12)" strokeWidth="8" fill="none"/>
      <circle cx="130" cy="90" r="54" stroke="rgba(212,137,106,0.6)" strokeWidth="8" fill="none"
        strokeDasharray="210 130" strokeLinecap="round" strokeDashoffset="70"
        style={{ transform: 'rotate(-90deg)', transformOrigin: '130px 90px', animation: 'growArc 1.2s ease forwards 0.3s' }}
      />
      {/* Center text placeholder */}
      <rect x="108" y="82" width="44" height="8" rx="4" fill="rgba(212,137,106,0.3)"/>
      <rect x="116" y="95" width="28" height="5" rx="2.5" fill="rgba(212,137,106,0.18)"/>
      {/* Satellite chips */}
      <rect x="22"  y="40"  width="52" height="14" rx="7" fill="rgba(212,137,106,0.12)" stroke="rgba(212,137,106,0.2)" strokeWidth="0.7"/>
      <rect x="186" y="40"  width="52" height="14" rx="7" fill="rgba(212,137,106,0.12)" stroke="rgba(212,137,106,0.2)" strokeWidth="0.7"/>
      <rect x="22"  y="126" width="52" height="14" rx="7" fill="rgba(212,137,106,0.12)" stroke="rgba(212,137,106,0.2)" strokeWidth="0.7"/>
      <rect x="186" y="126" width="52" height="14" rx="7" fill="rgba(212,137,106,0.12)" stroke="rgba(212,137,106,0.2)" strokeWidth="0.7"/>
      {/* Connector lines */}
      <line x1="74"  y1="47"  x2="96"  y2="65"  stroke="rgba(212,137,106,0.15)" strokeWidth="0.8"/>
      <line x1="186" y1="47"  x2="165" y2="65"  stroke="rgba(212,137,106,0.15)" strokeWidth="0.8"/>
      <line x1="74"  y1="133" x2="96"  y2="116" stroke="rgba(212,137,106,0.15)" strokeWidth="0.8"/>
      <line x1="186" y1="133" x2="165" y2="116" stroke="rgba(212,137,106,0.15)" strokeWidth="0.8"/>
    </svg>
  )
}

function IllustrationC() {
  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Search/interface mockup */}
      <rect x="20" y="20" width="220" height="140" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"/>
      {/* Top bar */}
      <rect x="20" y="20" width="220" height="32" rx="12" fill="rgba(255,255,255,0.05)"/>
      <rect x="20" y="38" width="220" height="14" fill="rgba(255,255,255,0.05)"/>
      <circle cx="38" cy="36" r="5" fill="rgba(255,255,255,0.1)"/>
      <circle cx="54" cy="36" r="5" fill="rgba(255,255,255,0.07)"/>
      <circle cx="70" cy="36" r="5" fill="rgba(255,255,255,0.05)"/>
      {/* Search bar */}
      <rect x="34" y="62" width="192" height="16" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(74,107,69,0.4)" strokeWidth="0.8"/>
      <rect x="42" y="67" width="60" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
      {/* Result rows */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="34"  y={92+i*22} width="12" height="12" rx="2" fill="rgba(74,107,69,0.2)"/>
          <rect x="52"  y={94+i*22} width="80" height="5"  rx="2.5" fill="rgba(255,255,255,0.12)"/>
          <rect x="52"  y={101+i*22} width="50" height="4" rx="2" fill="rgba(255,255,255,0.06)"/>
          <rect x="198" y={94+i*22} width="24" height="10" rx="5" fill={i===0 ? 'rgba(74,107,69,0.35)' : 'rgba(255,255,255,0.04)'} stroke={i===0 ? 'rgba(74,107,69,0.6)' : 'rgba(255,255,255,0.08)'} strokeWidth="0.6"/>
        </g>
      ))}
    </svg>
  )
}

const CARD_DATA = [
  {
    bg: 'linear-gradient(145deg, #1a2a18 0%, #0f1a0d 100%)',
    accentColor: '#7a9e75',
    label: 'B2B · Fintech',
    Illustration: IllustrationA,
    size: 'feature', // wider + taller
  },
  {
    bg: 'linear-gradient(145deg, #261812 0%, #1a100a 100%)',
    accentColor: '#d4896a',
    label: 'Healthtech · Mobile',
    Illustration: IllustrationB,
    size: 'medium',
  },
  {
    bg: 'linear-gradient(145deg, #101520 0%, #0a0e18 100%)',
    accentColor: '#6a8ab0',
    label: 'B2C · Search UX',
    Illustration: IllustrationC,
    size: 'medium',
  },
]

// ── Card component ─────────────────────────────────────────────────────────
function StudyCard({
  study, cardData, index, visible,
}: {
  study: Study
  cardData: typeof CARD_DATA[number]
  index: number
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const { bg, accentColor, label, Illustration } = cardData

  return (
    <Link
      href={`/work/${study.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: bg,
        borderRadius: 20,
        overflow: 'hidden',
        textDecoration: 'none',
        position: 'relative',
        height: '100%',
        minHeight: cardData.size === 'feature' ? 480 : 340,
        transform: hovered
          ? 'scale(1.025)'
          : visible
          ? 'scale(1) translateY(0)'
          : 'scale(0.98) translateY(32px)',
        opacity: visible ? 1 : 0,
        transition: `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 110}ms,
                     opacity 0.55s ease ${index * 110}ms,
                     box-shadow 0.3s ease`,
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.25)'
          : '0 4px 20px rgba(0,0,0,0.25)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Illustration area ── */}
      <div
        style={{
          flex: 1,
          padding: '32px 32px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <Illustration />
        {study.company === 'Conduit' && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/whitelogo.svg" alt="Conduit" style={{ position: 'absolute', top: 20, left: 20, height: 14, width: 'auto', opacity: 0.45, pointerEvents: 'none' }} />
        )}
      </div>

      {/* ── Bottom content ── */}
      <div style={{ padding: '20px 28px 28px' }}>
        {/* Eyebrow label */}
        <div style={{
          fontFamily: 'var(--font-inter)', fontSize: 9,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: accentColor, marginBottom: 10, opacity: 0.85,
        }}>
          {label}
        </div>

        {/* Title + arrow row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-inter)',
              fontSize: cardData.size === 'feature' ? 28 : 22,
              fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15,
              color: 'rgba(245,243,239,0.95)',
              marginBottom: 6,
            }}>
              {study.title}
            </div>
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 13,
              color: 'rgba(245,243,239,0.6)', lineHeight: 1.5,
            }}>
              {study.teaser ?? study.tags.join(' · ')}
            </div>
          </div>

          {/* Arrow button */}
          <div style={{
            flexShrink: 0,
            width: 38, height: 38, borderRadius: '50%',
            border: `1px solid ${accentColor}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: hovered ? accentColor + '30' : 'transparent',
            transition: 'background 0.25s',
            color: accentColor,
            fontSize: 16,
          }}>
            →
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
export default function CaseStudiesSection({ studies }: { studies: Study[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Fill to 3 items max
  const displayed = studies.slice(0, 3)
  while (displayed.length < 3) displayed.push(displayed[0])

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ padding: '100px 40px 100px var(--sidebar-gap)', background: 'var(--bg)' }}
    >
      {/* ── Header ── */}
      <div
        className="case-studies-header"
        style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 48, paddingBottom: 24,
          borderBottom: '1px solid var(--border)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <div>
          <div style={{
            fontFamily: 'var(--font-inter)', fontSize: 9,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--sage)', marginBottom: 8,
          }}>
            // selected work
          </div>
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05,
            color: 'var(--ink)', margin: 0,
          }}>
            Case Studies
          </h2>
        </div>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 14,
          color: 'var(--warm-mid)', maxWidth: 260,
          textAlign: 'right', lineHeight: 1.65, margin: 0,
        }}>
          Three projects. Each one a system problem in disguise.
        </p>
      </div>

      {/* ── Card grid — forhers layout ── */}
      {/* Row 1: feature card (wide) + medium card */}
      <div className="case-studies-row1" style={{
        display: 'grid',
        gridTemplateColumns: '3fr 2fr',
        gap: 16,
        marginBottom: 16,
      }}>
        <StudyCard study={displayed[0]} cardData={CARD_DATA[0]} index={0} visible={visible} />
        <StudyCard study={displayed[1]} cardData={CARD_DATA[1]} index={1} visible={visible} />
      </div>

      {/* Row 2: full-width shorter card */}
      <div>
        <Link
          href={`/work/${displayed[2].slug}`}
          className="case-studies-row2-card"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            alignItems: 'center',
            background: CARD_DATA[2].bg,
            borderRadius: 20,
            overflow: 'hidden',
            textDecoration: 'none',
            minHeight: 200,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: `opacity 0.55s ease 330ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) 330ms, box-shadow 0.3s ease`,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 24px 60px rgba(0,0,0,0.45)'
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.015)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = ''
            ;(e.currentTarget as HTMLAnchorElement).style.transform = visible ? 'translateY(0)' : 'translateY(32px)'
          }}
        >
          {/* Left — content */}
          <div style={{ padding: '36px 40px' }}>
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 9,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: CARD_DATA[2].accentColor, marginBottom: 12, opacity: 0.85,
            }}>
              {CARD_DATA[2].label}
            </div>
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 26,
              fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15,
              color: 'rgba(245,243,239,0.95)', marginBottom: 8,
            }}>
              {displayed[2].title}
            </div>
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 13,
              color: 'rgba(245,243,239,0.6)', lineHeight: 1.5, marginBottom: 24,
            }}>
              {displayed[2].teaser ?? displayed[2].tags.join(' · ')}
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 500,
              color: CARD_DATA[2].accentColor,
            }}>
              View case study <span style={{ fontSize: 16 }}>→</span>
            </div>
          </div>

          {/* Right — illustration */}
          <div style={{ padding: '28px 36px 28px 0' }}>
            <IllustrationC />
          </div>
        </Link>
      </div>
    </section>
  )
}

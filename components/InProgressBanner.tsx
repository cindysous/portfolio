'use client'

import { useEffect, useState } from 'react'

// Fixed banner that slides in directly below CaseStudyScrollBar (height 52px).
// Mirrors the scroll bar's visibility trigger so they move together.
export default function InProgressBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-label="Case study status"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        // When visible: sit at translateY(52px) = directly below the 52px scroll bar.
        // When hidden: translateY(-100%) slides it off screen upward.
        transform: visible ? 'translateY(52px)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        background: '#b45309',
        borderBottom: '1px solid rgba(0,0,0,0.12)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: 38,
        paddingLeft: 'calc(var(--sidebar-gap) + 32px)',
        paddingRight: 48,
        gap: 9,
      }}>
        {/* Clock icon */}
        <svg
          width="13" height="13" viewBox="0 0 13 13" fill="none"
          aria-hidden
          style={{ flexShrink: 0, opacity: 0.80 }}
        >
          <circle cx="6.5" cy="6.5" r="5.5" stroke="rgba(255,255,255,0.90)" strokeWidth="1.2"/>
          <path d="M6.5 3.5V6.5L8.5 8" stroke="rgba(255,255,255,0.90)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <span style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 12,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.92)',
          letterSpacing: '0.02em',
          lineHeight: 1,
        }}>
          This case study is currently still in progress
        </span>
      </div>
    </div>
  )
}

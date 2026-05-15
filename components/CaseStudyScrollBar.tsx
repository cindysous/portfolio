'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
  title: string
  company: string
  teaser: string
}

export default function CaseStudyScrollBar({ title, company, teaser }: Props) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible]   = useState(false)
  const [dark, setDark]         = useState(false)

  // Detect dark mode from DOM
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Scroll progress + show/hide
  useEffect(() => {
    const onScroll = () => {
      const scrolled  = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrolled / docHeight) * 100 : 0)
      setVisible(scrolled > 280)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  const borderColor = dark ? 'rgba(122,158,117,0.30)' : 'rgba(74,107,69,0.18)'

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: dark ? 'rgba(17,18,16,0.92)' : 'rgba(255,255,255,0.65)',
        borderBottom: `1px solid ${borderColor}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: 52,
      }}>

        {/* ── Wordmark zone — matches sidebar-gap width ── */}
        <div className="scrollbar-wordmark-zone" style={{
          width: 'var(--sidebar-gap)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 26,
          borderRight: `1px solid ${borderColor}`,
          height: '100%',
        }}>
          <Link
            href="/"
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700,
              letterSpacing: '-0.01em', textDecoration: 'none',
              color: dark ? 'rgba(245,243,239,0.70)' : 'rgba(26,25,23,0.65)',
              transition: 'color 0.2s',
            }}
          >
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: 'var(--sage)',
              flexShrink: 0,
            }} />
            Cindy Sous
          </Link>
        </div>

        {/* ── Project info ── */}
        <div style={{
          flex: 1, minWidth: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px 0 32px',
          gap: 24,
        }}>

          {/* Left — company + title + teaser */}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.10em',
                textTransform: 'uppercase', color: 'var(--sage)',
                flexShrink: 0, lineHeight: 1,
              }}>
                {company}
              </span>
              <span style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 14, fontWeight: 700,
                letterSpacing: '-0.01em', lineHeight: 1.2,
                color: 'var(--ink)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {title}
              </span>
            </div>
            <div style={{
              fontSize: 11.5, lineHeight: 1.35,
              color: dark ? 'rgba(200,191,180,0.55)' : 'rgba(90,83,72,0.65)',
              marginTop: 2,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {teaser}
            </div>
          </div>

        </div>
      </div>

      {/* ── Progress bar — aligns with content start ── */}
      <div style={{
        position: 'absolute', bottom: -1,
        left: 'var(--sidebar-gap)', right: 0,
        height: 2,
        background: dark ? 'rgba(122,158,117,0.15)' : 'rgba(74,107,69,0.10)',
      }}>
        <div style={{
          height: '100%',
          background: 'var(--sage)',
          width: `${progress}%`,
          transition: 'width 0.08s linear',
          borderRadius: 1,
        }} />
      </div>
    </div>
  )
}

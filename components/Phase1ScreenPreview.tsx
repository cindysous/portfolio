'use client'

import { useState, useEffect, useCallback } from 'react'

const SRC = '/images/phase1-transaction-screen.png'
// Native dimensions from Figma export
const AW = 1734
const AH = 1141

export default function Phase1ScreenPreview() {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  return (
    <>
      <style>{`
        .p1-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(4,69,245,0.16), 0 2px 8px rgba(0,0,0,0.10) !important; }
        .p1-btn:hover .p1-overlay { background: rgba(4,69,245,0.05) !important; }
        .p1-btn:hover .p1-badge { opacity: 1 !important; transform: translateY(0) !important; }
        @keyframes p1FadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes p1Rise { from { opacity: 0; transform: scale(0.97) translateY(10px) } to { opacity: 1; transform: none } }
        /* Remove Tailwind Typography's 2em top/bottom margin on img inside prose */
        .p1-btn img { margin: 0 !important; }
      `}</style>

      <figure style={{ margin: 0 }}>
        <button
          className="p1-btn"
          onClick={() => setOpen(true)}
          aria-label="View Phase 1 screen fullscreen"
          style={{
            display: 'block', width: '100%', padding: 0,
            border: '1px solid var(--border)', background: 'none',
            cursor: 'zoom-in', borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 2px 20px rgba(4,69,245,0.08), 0 1px 4px rgba(0,0,0,0.06)',
            transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease',
            position: 'relative',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SRC}
            alt="Phase 1 — Transaction list and status redesign"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />

          {/* Hover overlay + expand badge */}
          <div className="p1-overlay" style={{
            position: 'absolute', inset: 0,
            background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s ease',
            pointerEvents: 'none',
          }}>
            <div className="p1-badge" style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'rgba(255,255,255,0.94)',
              border: '1px solid rgba(4,69,245,0.15)',
              borderRadius: 20, padding: '7px 14px',
              opacity: 0, transform: 'translateY(4px)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="#0445f5" strokeWidth="2.2" strokeLinecap="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 11,
                fontWeight: 600, color: '#0445f5', letterSpacing: '0.04em',
              }}>
                View fullscreen
              </span>
            </div>
          </div>
        </button>

        <figcaption style={{
          marginTop: 10, fontFamily: 'var(--font-inter)', fontSize: 11,
          letterSpacing: '0.05em', color: 'var(--warm-light)', textAlign: 'center',
        }}>
          Phase 1 — Transaction list &amp; status redesign
        </figcaption>
      </figure>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Phase 1 screen preview"
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(4,8,18,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '56px 24px 40px',
            animation: 'p1FadeIn 0.18s ease both',
          }}
        >
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); close() }}
            aria-label="Close preview"
            style={{
              position: 'absolute', top: 16, right: 20,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: '50%', width: 36, height: 36,
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.72)', fontSize: 20,
              fontFamily: 'sans-serif', lineHeight: 1,
              transition: 'background 0.15s',
            }}
          >
            ×
          </button>

          {/* Dismiss hint */}
          <div style={{
            position: 'absolute', bottom: 18, left: 0, right: 0,
            textAlign: 'center', fontFamily: 'var(--font-inter)', fontSize: 10,
            letterSpacing: '0.10em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)', pointerEvents: 'none',
          }}>
            ESC or click outside to close
          </div>

          {/* Image — stops propagation so clicking image doesn't close */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              // Constrain to 90vw OR 88vh (preserving aspect ratio)
              maxWidth: `min(90vw, calc(88vh * ${(AW / AH).toFixed(4)}))`,
              width: '100%',
              borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)',
              animation: 'p1Rise 0.22s cubic-bezier(0.16,1,0.3,1) both',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SRC}
              alt="Phase 1 — Transaction list and status redesign"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )}
    </>
  )
}

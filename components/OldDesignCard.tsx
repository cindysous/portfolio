'use client'

import { useState } from 'react'

const SRC = '/olddesign-txns.png'

export default function OldDesignCard() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <figure style={{ margin: 0 }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            display: 'block', width: '100%', background: 'none',
            border: 'none', padding: 0, cursor: 'zoom-in', textAlign: 'left',
          }}
        >
          <div style={{
            border: '1px solid rgba(74,107,69,0.2)',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0px 4px 24px 0px rgba(0,0,0,0.12)',
          }}>
            {/* Label bar — dark navy matching hero */}
            <div style={{
              background: '#1c2b3a',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{
                display: 'inline-block',
                fontFamily: 'var(--font-inter)',
                fontSize: 10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#141412',
                background: '#d0e5fa',
                padding: '3px 8px',
                borderRadius: 4,
              }}>
                old design
              </span>
            </div>
            {/* Screenshot — cropped to fixed height */}
            <div style={{ position: 'relative', height: 500, overflow: 'hidden', background: '#fff' }}>
              <img
                alt="Transaction detail — existing state"
                src={SRC}
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
              {/* Bottom fade */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 72,
                background: 'linear-gradient(to bottom, transparent, #fff)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        </button>
        <figcaption style={{
          marginTop: 10,
          fontFamily: 'var(--font-inter)',
          fontSize: 9,
          letterSpacing: '0.06em',
          color: 'var(--warm-light)',
        }}>
          A data dump: technically complete, emotionally useless
        </figcaption>
      </figure>

      {/* Lightbox */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out',
            padding: 32,
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', top: 20, right: 24,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'white', fontSize: 28, lineHeight: 1, padding: 8,
            }}
            aria-label="Close"
          >
            ×
          </button>
          <img
            alt="Transaction detail — existing state"
            src={SRC}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '100%', maxHeight: '90vh',
              borderRadius: 12,
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              cursor: 'default',
            }}
          />
        </div>
      )}
    </>
  )
}

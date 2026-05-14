'use client'

const BEFORE_ROWS = ['Acme Corp', 'Jane Doe', 'Widget LLC']

const AFTER_TYPES = [
  { label: 'Client',       color: '#0445f5', bg: 'rgba(4,69,245,0.09)' },
  { label: 'Customer',     color: '#059669', bg: 'rgba(5,150,105,0.09)' },
  { label: 'Counterparty', color: '#7c3aed', bg: 'rgba(124,58,237,0.09)' },
]

export default function EntityOverviewVisual() {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.72)',
      border: '1px solid rgba(125,79,62,0.18)',
      borderRadius: 14,
      overflow: 'hidden',
      fontFamily: 'var(--font-inter)',
    }}>
      {/* Mac chrome */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 14px',
        background: 'rgba(240,235,229,0.75)',
        borderBottom: '1px solid rgba(125,79,62,0.12)',
      }}>
        {['#e8746a', '#e8b36a', '#6ac49e'].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.75 }} />
        ))}
        <span style={{
          marginLeft: 4, fontSize: 10.5, fontWeight: 600,
          color: '#7d4f3e', letterSpacing: '0.04em',
        }}>
          Entity Table — Existing State
        </span>
      </div>

      <div style={{ padding: '16px 16px 18px' }}>

        {/* Before */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="6" stroke="#dc2626" strokeWidth="1"/>
              <path d="M4 4l5 5M9 4L4 9" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#dc2626' }}>
              No entity classification
            </span>
          </div>

          <div style={{
            border: '1px solid rgba(0,0,0,0.09)', borderRadius: 8, overflow: 'hidden',
          }}>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr',
              padding: '5px 10px',
              background: 'rgba(0,0,0,0.03)',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
            }}>
              {['Name', 'Type', 'Status'].map(h => (
                <span key={h} style={{
                  fontSize: 8.5, fontWeight: 700, letterSpacing: '0.09em',
                  textTransform: 'uppercase', color: '#9ca3af',
                }}>
                  {h}
                </span>
              ))}
            </div>

            {BEFORE_ROWS.map((name, i) => (
              <div key={name} style={{
                display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr',
                padding: '7px 10px',
                background: i % 2 === 0 ? '#fff' : 'rgba(0,0,0,0.015)',
                borderBottom: i < BEFORE_ROWS.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
              }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: '#374151' }}>{name}</span>
                <span style={{ fontSize: 10, color: '#d1d5db', fontStyle: 'italic' }}>—</span>
                <span style={{ fontSize: 10, color: '#d1d5db', fontStyle: 'italic' }}>—</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(125,79,62,0.15)' }} />
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1.5v10M3 8l3.5 3.5L10 8" stroke="#7d4f3e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{ flex: 1, height: 1, background: 'rgba(125,79,62,0.15)' }} />
        </div>

        {/* After */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="6" stroke="#059669" strokeWidth="1"/>
              <path d="M3.5 6.5l2.5 2.5 3.5-4" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#059669' }}>
              Typed entity system
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {AFTER_TYPES.map(e => (
              <div key={e.label} style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: e.bg,
                border: `1px solid ${e.color}2e`,
                borderRadius: 20, padding: '4px 11px',
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: e.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: e.color, letterSpacing: '-0.01em' }}>
                  {e.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

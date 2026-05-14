'use client'

const FF = 'var(--font-inter)'
const PURPLE = '#6d28d9'
const PURPLE_LIGHT = 'rgba(109,40,217,0.09)'
const PURPLE_BORDER = 'rgba(109,40,217,0.20)'

// ─── Check icon ───────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <div style={{
      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
      background: 'rgba(109,40,217,0.10)',
      border: '1.5px solid rgba(109,40,217,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5.2L4 7.2L8 3" stroke={PURPLE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

// ─── Left card — "Coming Soon" migration notice ────────────────────────────────
export function CommsDetailCard() {
  const items = [
    {
      title: 'Improved Transparency and Data Accuracy',
      body: 'Clear separation between customers and payees improves visibility into customer activity and ensures accurate transaction records.',
    },
    {
      title: 'Streamlined KYB on Your Customers',
      body: 'Our KYB process provides consistent oversight, reduces risk, and keeps your compliance practices aligned with regulatory standards.',
    },
    {
      title: 'Access to Upcoming Features and Services',
      body: 'Unlocks access to upcoming features like USD accounts that require enhanced KYB.',
    },
  ]

  return (
    <div style={{
      fontFamily: FF,
      background: '#fff',
      borderRadius: 14,
      border: '1px solid rgba(0,0,0,0.08)',
      padding: '28px 28px 24px',
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
    }}>
      {/* Coming Soon badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        background: PURPLE_LIGHT, border: `1px solid ${PURPLE_BORDER}`,
        borderRadius: 20, padding: '4px 12px',
        alignSelf: 'flex-start', marginBottom: 18,
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: PURPLE, letterSpacing: '0.03em' }}>
          Coming Soon
        </span>
      </div>

      {/* Heading */}
      <p style={{
        fontSize: 15, fontWeight: 700, lineHeight: 1.45,
        color: '#111827', margin: '0 0 22px',
        letterSpacing: '-0.01em',
      }}>
        Conduit no longer supports nested payment flows. Any Counterparties you pay on
        behalf of will soon be moved to the Customers tab and require KYB.
      </p>

      {/* Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
        {items.map(item => (
          <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <CheckIcon />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', lineHeight: 1.3, marginBottom: 4 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: '#6b7280' }}>
                {item.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <button style={{
        alignSelf: 'flex-start',
        background: PURPLE, color: '#fff',
        border: 'none', borderRadius: 24,
        padding: '10px 20px',
        fontSize: 13, fontWeight: 600, fontFamily: FF,
        display: 'flex', alignItems: 'center', gap: 7,
        cursor: 'default',
      }}>
        Learn More
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </button>
    </div>
  )
}

// ─── Right card — "New" feature announcement with mini app mockup ──────────────
function MiniConduitRow({ name, tags, status, statusColor, statusBg }: {
  name: string; tags: string[];
  status: string; statusColor: string; statusBg: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '7px 12px', gap: 8, borderBottom: '1px solid #f3f4f6' }}>
      <div style={{ width: 14, height: 14, borderRadius: 3, background: '#f3f4f6', flexShrink: 0 }} />
      <span style={{ fontFamily: FF, fontSize: 11, fontWeight: 500, color: '#111827', flex: 1 }}>{name}</span>
      <div style={{ display: 'flex', gap: 4 }}>
        {tags.map(t => (
          <span key={t} style={{
            fontFamily: FF, fontSize: 9, fontWeight: 600, color: '#6b7280',
            background: '#f3f4f6', padding: '2px 6px', borderRadius: 4,
          }}>{t}</span>
        ))}
      </div>
      <span style={{
        fontFamily: FF, fontSize: 9, fontWeight: 600,
        color: statusColor, background: statusBg,
        padding: '2px 8px', borderRadius: 99, whiteSpace: 'nowrap',
      }}>{status}</span>
    </div>
  )
}

export function CommsModalCard() {
  return (
    <div style={{
      fontFamily: FF,
      background: '#f5f3ff',
      borderRadius: 14,
      border: '1px solid rgba(0,0,0,0.08)',
      padding: '20px 20px 0',
      display: 'flex', flexDirection: 'column', gap: 16,
      boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
      overflow: 'hidden',
    }}>
      {/* Acme Inc highlight card */}
      <div style={{
        background: '#fff', borderRadius: 10,
        border: '2px solid #6d28d9',
        padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 4px 16px rgba(109,40,217,0.15)',
      }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: '#f3f4f6', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
          </svg>
        </div>
        <span style={{ fontFamily: FF, fontSize: 13, fontWeight: 700, color: '#111827', flex: 1 }}>Acme Inc.</span>
        <span style={{
          fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: '#15803d', background: '#dcfce7', padding: '3px 9px', borderRadius: 99,
        }}>Active</span>
      </div>

      {/* Arrow */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
          <path d="M10 2 C10 2 10 16 10 18" stroke={PURPLE} strokeWidth="2" strokeLinecap="round"/>
          <path d="M5 14L10 20L15 14" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Mini Conduit interface */}
      <div style={{ background: '#fff', borderRadius: '10px 10px 0 0', overflow: 'hidden', border: '1px solid #e5e7eb', borderBottom: 'none' }}>
        {/* App nav bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #f3f4f6', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 52, height: 14, borderRadius: 3, background: '#f3f4f6' }} />
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {['#f3f4f6','#f3f4f6','#dcfce7'].map((bg, i) => (
              <div key={i} style={{ width: i === 2 ? 54 : 22, height: 22, borderRadius: 99, background: bg }} />
            ))}
          </div>
        </div>

        {/* Tab row */}
        <div style={{ display: 'flex', padding: '0 12px', borderBottom: '1px solid #f3f4f6', gap: 16 }}>
          {['Transactions', 'Counterparties', 'Documents', 'Details'].map((tab, i) => (
            <span key={tab} style={{
              fontFamily: FF, fontSize: 10, fontWeight: i === 1 ? 700 : 400,
              color: i === 1 ? PURPLE : '#9ca3af',
              padding: '7px 0',
              borderBottom: i === 1 ? `2px solid ${PURPLE}` : '2px solid transparent',
            }}>{tab}</span>
          ))}
        </div>

        {/* Search + controls */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', gap: 8, borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ flex: 1, height: 26, borderRadius: 6, background: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', paddingLeft: 8, gap: 6 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span style={{ fontFamily: FF, fontSize: 9, color: '#d1d5db' }}>Search by Name</span>
          </div>
          <div style={{ height: 26, padding: '0 10px', borderRadius: 6, background: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            <span style={{ fontFamily: FF, fontSize: 9, color: '#6b7280' }}>Filters</span>
          </div>
        </div>

        {/* Sidebar + table */}
        <div style={{ display: 'flex' }}>
          {/* Sidebar */}
          <div style={{ width: 100, borderRight: '1px solid #f3f4f6', padding: '8px 0' }}>
            {[
              { label: 'Customers', active: true },
              { label: 'Counterparties', active: false },
              { label: 'Team', active: false },
              { label: 'API Keys', active: false },
            ].map(({ label, active }) => (
              <div key={label} style={{
                padding: '6px 10px', fontSize: 10, fontWeight: active ? 600 : 400,
                color: active ? PURPLE : '#6b7280',
                background: active ? PURPLE_LIGHT : 'transparent',
                borderRadius: active ? 6 : 0, margin: active ? '0 6px' : 0,
                fontFamily: FF,
              }}>{label}</div>
            ))}
          </div>
          {/* Table rows */}
          <div style={{ flex: 1 }}>
            <MiniConduitRow name="Dovewood Technologies" tags={['PIX','ETH']} status="Active" statusColor="#15803d" statusBg="#dcfce7" />
            <MiniConduitRow name="Infinitech Labs" tags={['Fedwire','ETH']} status="Awaiting Compliance Review" statusColor="#92600a" statusBg="#fef9c3" />
            <MiniConduitRow name="Jane Doe" tags={['SPEI','TRX']} status="In Compliance Review" statusColor="#b45309" statusBg="#fff7ed" />
          </div>
        </div>

        {/* "New" feature banner */}
        <div style={{ borderTop: '1px solid #e5e7eb', padding: '14px 16px 16px', background: '#fff' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: '#dcfce7', borderRadius: 99,
            padding: '2px 9px', marginBottom: 8,
          }}>
            <span style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, color: '#15803d' }}>New</span>
          </div>
          <div style={{ fontFamily: FF, fontSize: 12, fontWeight: 700, color: '#111827', marginBottom: 5, lineHeight: 1.3 }}>
            You can now manage Counterparties linked to specific Customers!
          </div>
          <div style={{ fontFamily: FF, fontSize: 10.5, lineHeight: 1.6, color: '#6b7280', marginBottom: 10 }}>
            Simply click any active Customer in the &quot;Customers&quot; tab to open their profile, where you can view or manage linked Counterparties.
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              fontFamily: FF, fontSize: 11, fontWeight: 500, color: '#374151',
              border: '1px solid #e5e7eb', borderRadius: 8, padding: '5px 14px',
              background: '#fff',
            }}>Close</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Dovewood Technologies counterparty detail panel — crisp vectors, matches Acme Inc visual system

const BORDER = '1px solid #f0f0f0'
const FF = 'var(--font-inter)'

// Pencil icon — 11px, matching Acme Inc icon sizing
function PencilIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="#c0c0c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}

// Trash icon — 11px
function TrashIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="#c0c0c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
      <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
    </svg>
  )
}

// Ethereum diamond — 20×20 circle matching flag emoji size in Acme Inc
function EthIcon() {
  return (
    <div style={{
      width: 20, height: 20, borderRadius: '50%', background: '#627eea',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      animation: 'iconShimmer 6s ease-in-out infinite',
    }}>
      <svg width="8" height="13" viewBox="0 0 8 13" fill="white">
        <path d="M4 0L0 6.5L4 8.5L8 6.5L4 0Z" opacity="0.8"/>
        <path d="M0 7.6L4 13L8 7.6L4 9.6L0 7.6Z" opacity="0.6"/>
      </svg>
    </div>
  )
}

// Brazilian flag — 20×20 circle using Figma asset, matches EthIcon sizing
function BrazilFlagIcon() {
  return (
    <div style={{
      width: 20, height: 20, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
      animation: 'iconShimmer 6s ease-in-out infinite',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brazil-flag-circle.svg" alt="" width={20} height={20}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

// Tag pill — matches badge sizing in Acme Inc Active tag style but secondary
function Tag({ label }: { label: string }) {
  return (
    <span style={{
      fontFamily: FF, fontSize: 9, fontWeight: 500,
      color: '#6b7280', background: '#f3f4f6',
      padding: '2px 6px', borderRadius: 4,
    }}>{label}</span>
  )
}

// Payment method row — white card with border
function PaymentRow({ icon, name, tags }: { icon: React.ReactNode; name: string; tags: string[] }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 8, border: '1px solid #e8e8e8',
      padding: '11px 14px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {icon}
        <span style={{ fontFamily: FF, fontSize: 11, fontWeight: 600, color: '#111827', flex: 1 }}>
          {name}
        </span>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <PencilIcon /><TrashIcon />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 5 }}>
        {tags.map(t => <Tag key={t} label={t} />)}
      </div>
    </div>
  )
}

export default function CounterpartyPanel() {
  return (
    <div style={{
      height: '100%',
      background: '#f8f8f8',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 6,
      borderBottomLeftRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 -2px 16px rgba(0,0,0,0.08)',
    }}>
    <style>{`@keyframes iconShimmer{0%,100%{filter:brightness(1) saturate(1)}50%{filter:brightness(1.14) saturate(1.08)}}`}</style>

      {/* ── Header — matches Acme Inc nav height + font sizes exactly ─────── */}
      <div style={{
        height: 42, display: 'flex', alignItems: 'center',
        padding: '0 14px', gap: 8,
        background: '#fff', borderBottom: BORDER,
      }}>
        {/* Link-out icon in circle — matches back-arrow circle pattern */}
        <div style={{
          width: 20, height: 20, borderRadius: '50%', background: '#f0f0f0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
            stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M7 7h10v10"/>
          </svg>
        </div>
        <span style={{ fontFamily: FF, fontSize: 12, fontWeight: 600, color: '#111827' }}>
          Dovewood Technologies
        </span>
        {/* Active badge — identical to Acme Inc */}
        <span style={{
          fontFamily: FF, fontSize: 9, fontWeight: 600,
          color: '#15803d', background: '#dcfce7',
          padding: '2px 7px', borderRadius: 99,
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>Active</span>
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="#bbb" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </div>
      </div>

      {/* ── Tabs — matching Acme Inc Domestic/International tabs exactly ───── */}
      <div style={{ display: 'flex', padding: '0 16px', background: '#fff', borderBottom: BORDER }}>
        {[
          { label: 'Payment Methods', active: true },
          { label: 'Documents',       active: false },
          { label: 'Details',         active: false },
        ].map(({ label, active }) => (
          <span key={label} style={{
            fontFamily: FF,
            fontSize: 11,
            fontWeight: active ? 600 : 400,
            color: active ? '#4f46e5' : '#bbb',
            padding: '8px 0',
            marginRight: 14,
            borderBottom: active ? '2px solid #4f46e5' : '2px solid transparent',
          }}>{label}</span>
        ))}
      </div>

      {/* ── Payment method rows ───────────────────────────────────────────── */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PaymentRow
          icon={<BrazilFlagIcon />}
          name="Banco do Brasil - 6789"
          tags={['PIX', 'TED']}
        />
        <PaymentRow
          icon={<EthIcon />}
          name="Business Wallet - 0xc1...1234"
          tags={['ETH']}
        />
      </div>

    </div>
  )
}

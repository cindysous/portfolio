const ITEMS = [
  { num: '01', text: 'B2B Fintech' },
  { num: '02', text: 'Cross-border Payments' },
  { num: '03', text: 'KYC / AML / KYB' },
  { num: '04', text: 'Mobile UX' },
  { num: '05', text: 'First Design Hire' },
  { num: '06', text: 'Healthtech' },
  { num: '07', text: 'Design Systems' },
  { num: '08', text: 'Consumer Apps' },
  { num: '09', text: 'Figma' },
  { num: '10', text: 'Denver CO' },
]

export default function Ticker() {
  // Duplicate for seamless loop
  const allItems = [...ITEMS, ...ITEMS]

  return (
    <div
      className="overflow-hidden flex"
      style={{ background: 'var(--sage)', padding: '10px 0' }}
      aria-hidden="true"
    >
      <div className="ticker-track flex">
        {allItems.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              padding: '0 32px',
              borderRight: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.35)', marginRight: 8 }}>{item.num}</span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}

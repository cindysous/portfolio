'use client'

// ─── Figma asset URLs ─────────────────────────────────────────────────────────
const IMG_FOR_YOU_ICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 24' fill='%231b1543'><circle cx='13' cy='8' r='5'/><path d='M2 24c0-6 4.9-10 11-10s11 4 11 10z'/></svg>"
const IMG_WEEKENDS     = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><circle cx='12' cy='12' r='5' stroke='%23f97316' stroke-width='2'/><path d='M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M17.66 6.34l-1.41 1.41M5.34 17.66l-1.41 1.41' stroke='%23f97316' stroke-width='2' stroke-linecap='round'/></svg>"
const IMG_LMH_BADGE    = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 20'><rect x='0' y='12' width='4' height='8' rx='1' fill='white' opacity='0.7'/><rect x='6' y='7' width='4' height='13' rx='1' fill='white' opacity='0.85'/><rect x='12' y='2' width='4' height='18' rx='1' fill='white'/></svg>"
const IMG_NEW_SHIFTS   = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 38 38' fill='none'><circle cx='19' cy='19' r='16' stroke='%230445f5' stroke-width='2'/><path d='M19 10v9l5 5' stroke='%230445f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>"

// New Facilities vectors
const IMG_V0  = 'https://www.figma.com/api/mcp/asset/d92a0035-e049-4bc2-bb77-9e6c57428741'
const IMG_V1  = 'https://www.figma.com/api/mcp/asset/d6d8bf09-e7fb-4c31-b322-4fcb910b8d18'
const IMG_V2  = 'https://www.figma.com/api/mcp/asset/00724c57-8810-40d1-967d-7b8041bdd21a'
const IMG_V3  = 'https://www.figma.com/api/mcp/asset/0542515e-9374-40d8-863b-1a7e87335ea5'
const IMG_V4  = 'https://www.figma.com/api/mcp/asset/656a8dfb-4f4f-4c64-8cad-d98348f353ed'
const IMG_G1  = 'https://www.figma.com/api/mcp/asset/99f75a26-6592-45a5-9b6c-abca2667e11c'
const IMG_G2  = 'https://www.figma.com/api/mcp/asset/011df1b0-51c0-412a-b450-c6f428a5fba4'
const IMG_G4  = 'https://www.figma.com/api/mcp/asset/e769d1c6-6a67-46bd-aa57-b4757b58d275'
const IMG_V5  = 'https://www.figma.com/api/mcp/asset/b7ea4771-8997-4b55-9229-2c563c2ce3be'
const IMG_V6  = 'https://www.figma.com/api/mcp/asset/393fbccf-d0de-4e89-95de-4347f3a02e61'
const IMG_V7  = 'https://www.figma.com/api/mcp/asset/86162530-6192-4d80-b239-4158598a6f70'
const IMG_V8  = 'https://www.figma.com/api/mcp/asset/e504e9f9-848c-45d2-b8b9-afd585d0d811'
const IMG_V9  = 'https://www.figma.com/api/mcp/asset/7112fa91-7814-4b78-9ad1-bb7e5126561f'
const IMG_V10 = 'https://www.figma.com/api/mcp/asset/3741e01b-643c-4438-bc3b-07cd5a571ca1'
const IMG_V11 = 'https://www.figma.com/api/mcp/asset/bc8b296c-4ec3-4887-9179-1084424e4635'
const IMG_V12 = 'https://www.figma.com/api/mcp/asset/b24e5f78-a194-40e9-a7fc-c2de48d35b1b'
const IMG_G5  = 'https://www.figma.com/api/mcp/asset/46fea0dc-4bfd-47e7-b62a-eceebe502d15'
const IMG_V13 = 'https://www.figma.com/api/mcp/asset/75bd5046-8cb4-4863-9c63-369e33c02599'
const IMG_V14 = 'https://www.figma.com/api/mcp/asset/4132dde2-8133-489c-8bbe-9712a556d458'

// ─── Block icon renderers ─────────────────────────────────────────────────────
function ForYouIcon() {
  return (
    <div style={{ width: 38.87, height: 38.87, borderRadius: '50%', background: '#ffcd31', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 26.277, height: 24, position: 'relative' }}>
        <img alt="" src={IMG_FOR_YOU_ICON} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  )
}

function WeekendsIcon() {
  return (
    <div style={{ width: 64, height: 64, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '21.04% 20.37% 18.22% 18.89%' }}>
        <img alt="" src={IMG_WEEKENDS} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  )
}

function NewFacilitiesIcon() {
  return (
    <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 6 }}>
      <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="9" width="8" height="12" rx="1" stroke="#5b21b6" strokeWidth="1.4"/>
        <rect x="9" y="5" width="6" height="16" rx="1" stroke="#5b21b6" strokeWidth="1.4"/>
        <rect x="15" y="11" width="8" height="10" rx="1" stroke="#5b21b6" strokeWidth="1.4"/>
        <path d="M1 21h22" stroke="#5b21b6" strokeWidth="1.4" strokeLinecap="round"/>
        <rect x="11" y="14" width="2" height="7" rx="0.5" fill="#5b21b6" opacity="0.45"/>
        <rect x="3" y="12" width="2" height="2" rx="0.3" fill="#5b21b6" opacity="0.45"/>
        <rect x="3" y="16" width="2" height="2" rx="0.3" fill="#5b21b6" opacity="0.45"/>
        <rect x="11" y="8" width="2" height="2" rx="0.3" fill="#5b21b6" opacity="0.45"/>
        <rect x="17" y="14" width="2" height="2" rx="0.3" fill="#5b21b6" opacity="0.45"/>
      </svg>
    </div>
  )
}

function LMHIcon() {
  return (
    <div style={{ width: 38.87, height: 38.87, borderRadius: '50%', background: '#66c2f2', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 11.43, top: 10.43, width: 16, height: 20 }}>
        <div style={{ position: 'absolute', inset: '0.58% 0 3.77% 0' }}>
          <div style={{ position: 'absolute', inset: '-10.45% -12.5% -13.24% -12.5%' }}>
            <img alt="" src={IMG_LMH_BADGE} style={{ display: 'block', width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function NewShiftsIcon() {
  return (
    <div style={{ width: 38, height: 38, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '2.25% 2.75% 2.75% 2.25%' }}>
        <img alt="" src={IMG_NEW_SHIFTS} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  )
}

// ─── Block definitions ────────────────────────────────────────────────────────
const BLOCKS = [
  { id: 'for-you',    label: 'For You',        icon: <ForYouIcon />,        alignItems: 'center' },
  { id: 'weekends',   label: 'Weekends',       icon: <WeekendsIcon />,      alignItems: 'center' },
  { id: 'facilities', label: 'New Facilities', icon: <NewFacilitiesIcon />, alignItems: 'flex-end' },
  { id: 'lmh',        label: 'LMH',            icon: <LMHIcon />,           alignItems: 'center' },
  { id: 'new-shifts', label: 'New Shifts',     icon: <NewShiftsIcon />,     alignItems: 'center' },
]

// ─── Grid layout: 3 top, 2 bottom centred ─────────────────────────────────────
// Each entry: [col-start (1-based), row]
const POSITIONS = [
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 3, row: 1 },
  { col: 1, row: 2, colSpanCenter: false },  // bottom-left of a centred pair
  { col: 2, row: 2 },                        // bottom-right of a centred pair
]

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function SearchFilterMockup() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* 3-col grid, rows auto, centred bottom row via margin trick */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 88px)',
        gridTemplateRows: 'repeat(2, auto)',
        gap: '20px 24px',
      }}>
        {BLOCKS.map((block, i) => {
          const delay = i * 0.55   // stagger start
          const dur   = 3.6 + i * 0.4  // slightly different period per block

          // Last two blocks: shift them to centre under the 3 above
          const style: React.CSSProperties = {}
          // Nudge the bottom pair so they sit centred beneath the top 3
          if (i === 3) { style.gridColumn = '1'; style.marginLeft = '56px' }
          if (i === 4) style.gridColumn = '2'

          return (
            <div
              key={block.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                animation: `sfFloat ${dur}s ease-in-out ${delay}s infinite`,
                ...style,
              }}
            >
              {/* Icon tile */}
              <div style={{
                width: 88,
                height: 80,
                borderRadius: 8,
                background: '#f1f4f6',
                display: 'flex',
                alignItems: block.alignItems as 'center' | 'flex-end',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
              }}>
                {block.icon}
              </div>

              {/* Label */}
              <span style={{
                fontSize: 11,
                color: '#647385',
                fontFamily: 'system-ui, sans-serif',
                whiteSpace: 'nowrap',
              }}>
                {block.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Row 2 centring trick: the bottom row only has 2 items in columns 1–2,
          so we nudge the whole grid's bottom row right by half a column */}
      <style>{`
        @keyframes sfFloat {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-9px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  )
}

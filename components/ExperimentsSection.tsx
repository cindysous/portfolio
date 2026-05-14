'use client'

const PROJECTS = [
  {
    name: 'This portfolio',
    desc: 'Designed and vibe coded entirely in conversation with Claude Code. No Figma handoff, no boilerplate — just prompts, plants, and pure chaos.',
    stack: ['Next.js', 'Claude Code', 'Tailwind'],
    status: 'live',
    statusColor: '#7a9e75',
    previewBg: 'linear-gradient(135deg, #1a2a18 0%, #0f1a0d 100%)',
    previewContent: (
      <svg viewBox="0 0 220 120" fill="none" style={{ width: '100%', height: '100%' }}>
        <rect x="16" y="16" width="60" height="8" rx="4" fill="rgba(122,158,117,0.4)"/>
        <rect x="16" y="30" width="100" height="24" rx="3" fill="rgba(122,158,117,0.15)"/>
        <rect x="16" y="60" width="80" height="6" rx="3" fill="rgba(122,158,117,0.2)"/>
        <rect x="16" y="72" width="60" height="6" rx="3" fill="rgba(122,158,117,0.12)"/>
        <circle cx="170" cy="60" r="32" fill="rgba(74,107,69,0.12)" stroke="rgba(122,158,117,0.25)" strokeWidth="1"/>
        <path d="M170 92 C170 76 169 62 170 50 C171 40 170 32 171 24" stroke="#4a6b45" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M170 72 C160 66 152 60 150 52 C148 46 153 42 158 44 C163 46 170 56 170 66Z" fill="rgba(74,107,69,0.2)" stroke="#7a9e75" strokeWidth="0.8"/>
        <path d="M171 58 C180 52 186 46 184 40 C182 35 176 36 173 40 C170 44 170 54 171 58Z" fill="rgba(74,107,69,0.15)" stroke="#7a9e75" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    name: 'Plant Pal',
    desc: 'A plant care tracker that judges you (gently) for forgetting to water your monstera for three weeks. Again.',
    stack: ['React', 'Claude API', 'LocalStorage'],
    status: 'wip',
    statusColor: '#d4896a',
    previewBg: 'linear-gradient(135deg, #1a2215 0%, #111a0e 100%)',
    previewContent: (
      <svg viewBox="0 0 220 120" fill="none" style={{ width: '100%', height: '100%' }}>
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x={16 + i * 68} y="24" width="52" height="72" rx="8" fill="rgba(74,107,69,0.12)" stroke="rgba(122,158,117,0.2)" strokeWidth="0.8"/>
            <circle cx={42 + i * 68} cy="52" r="14" fill="rgba(74,107,69,0.18)" stroke="rgba(122,158,117,0.3)" strokeWidth="0.8"/>
            <path d={`M${42 + i*68} 66 C${42+i*68} 60 ${41+i*68} 55 ${42+i*68} 50`} stroke="#4a6b45" strokeWidth="1" strokeLinecap="round"/>
            <rect x={26 + i * 68} y="76" width="32" height="4" rx="2" fill="rgba(122,158,117,0.3)"/>
            <rect x={30 + i * 68} y="84" width="24" height="3" rx="1.5" fill="rgba(122,158,117,0.15)"/>
          </g>
        ))}
        <rect x="16" y="104" width={[48,32,56][0]} height="3" rx="1.5" fill="rgba(212,137,106,0.5)"/>
        <rect x="84" y="104" width="32" height="3" rx="1.5" fill="rgba(74,107,69,0.4)"/>
        <rect x="152" y="104" width="40" height="3" rx="1.5" fill="rgba(74,107,69,0.6)"/>
      </svg>
    ),
  },
  {
    name: 'Palette Thief',
    desc: 'Drop an image, steal its soul (colour palette). Export as CSS variables, Tailwind config, or just vibe with the swatches.',
    stack: ['Next.js', 'Canvas API', 'Clipboard'],
    status: 'wip',
    statusColor: '#d4896a',
    previewBg: 'linear-gradient(135deg, #1a1420 0%, #110d18 100%)',
    previewContent: (
      <svg viewBox="0 0 220 120" fill="none" style={{ width: '100%', height: '100%' }}>
        <rect x="16" y="20" width="90" height="80" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
        <rect x="24" y="28" width="74" height="48" rx="4" fill="rgba(255,255,255,0.06)"/>
        <ellipse cx="61" cy="52" rx="18" ry="18" fill="rgba(212,137,106,0.35)"/>
        <ellipse cx="55" cy="48" rx="12" ry="12" fill="rgba(122,158,117,0.4)"/>
        <ellipse cx="68" cy="58" rx="10" ry="10" fill="rgba(106,138,176,0.45)"/>
        {['#d4896a','#7a9e75','#6a8ab0','#b8946a','rgba(200,180,160,0.6)'].map((c,i) => (
          <rect key={i} x={120 + (i % 2) * 44} y={20 + Math.floor(i/2) * 30 + (i===4?15:0)} width="34" height="22" rx="6" fill={c} opacity="0.85"/>
        ))}
      </svg>
    ),
  },
  {
    name: 'Focus Garden',
    desc: 'A Pomodoro timer where a tiny garden grows while you work and wilts when you doom-scroll. Accountability via guilt.',
    stack: ['React', 'CSS animations', 'Web Audio'],
    status: 'concept',
    statusColor: '#6a8ab0',
    previewBg: 'linear-gradient(135deg, #0e1a12 0%, #091410 100%)',
    previewContent: (
      <svg viewBox="0 0 220 120" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="110" cy="60" r="40" stroke="rgba(74,107,69,0.15)" strokeWidth="12" fill="none"/>
        <circle cx="110" cy="60" r="40" stroke="rgba(122,158,117,0.5)" strokeWidth="12" fill="none" strokeDasharray="180 72" strokeLinecap="round" strokeDashoffset="63"/>
        <text x="110" y="56" textAnchor="middle" fill="rgba(245,243,239,0.8)" fontSize="14" fontFamily="monospace" fontWeight="bold">23:41</text>
        <text x="110" y="70" textAnchor="middle" fill="rgba(122,158,117,0.6)" fontSize="7" fontFamily="monospace" letterSpacing="2">FOCUS</text>
        {[0,1,2,3,4].map(i => (
          <g key={i} transform={`translate(${28 + i*36}, 95)`}>
            <line x1="0" y1="16" x2="0" y2="4" stroke="#4a6b45" strokeWidth="1" strokeLinecap="round"/>
            <path d={`M0 ${10-i} C-4 ${6-i} -6 ${2-i} -3 ${-1-i} C0 ${-4-i} 3 ${-1-i} 0 ${10-i}Z`} fill="rgba(74,107,69,0.5)"/>
          </g>
        ))}
      </svg>
    ),
  },
  {
    name: 'Mood Log',
    desc: 'A one-tap daily mood journal with a heat map visualization. Because sometimes "fine" deserves to be tracked.',
    stack: ['Next.js', 'D3-lite', 'LocalStorage'],
    status: 'concept',
    statusColor: '#6a8ab0',
    previewBg: 'linear-gradient(135deg, #181220 0%, #100d18 100%)',
    previewContent: (
      <svg viewBox="0 0 220 120" fill="none" style={{ width: '100%', height: '100%' }}>
        {Array.from({length: 35}, (_,i) => {
          const opacities = [0.1,0.25,0.45,0.65,0.85]
          const op = opacities[Math.floor(Math.random() * opacities.length * (i < 28 ? 1 : 0.3))]
          return (
            <rect key={i} x={16 + (i%7)*28} y={20 + Math.floor(i/7)*18} width="22" height="12" rx="3"
              fill={`rgba(212,137,106,${i < 30 ? op : 0.05})`}/>
          )
        })}
        <rect x="16" y="110" width="16" height="5" rx="2.5" fill="rgba(255,255,255,0.1)"/>
        <rect x="36" y="110" width="16" height="5" rx="2.5" fill="rgba(212,137,106,0.2)"/>
        <rect x="56" y="110" width="16" height="5" rx="2.5" fill="rgba(212,137,106,0.4)"/>
        <rect x="76" y="110" width="16" height="5" rx="2.5" fill="rgba(212,137,106,0.65)"/>
        <rect x="96" y="110" width="16" height="5" rx="2.5" fill="rgba(212,137,106,0.85)"/>
      </svg>
    ),
  },
  {
    name: 'Recipe Remix',
    desc: "Tell it what's in your fridge, it tells you what to make. Powered by Claude, constrained by having only oat milk and old limes.",
    stack: ['Next.js', 'Claude API', 'Edge functions'],
    status: 'wip',
    statusColor: '#d4896a',
    previewBg: 'linear-gradient(135deg, #1a1508 0%, #141005 100%)',
    previewContent: (
      <svg viewBox="0 0 220 120" fill="none" style={{ width: '100%', height: '100%' }}>
        <rect x="16" y="16" width="188" height="32" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
        <rect x="24" y="26" width="120" height="12" rx="6" fill="rgba(255,255,255,0.06)"/>
        <rect x="24" y="28" width="70" height="8" rx="4" fill="rgba(200,170,100,0.3)"/>
        <rect x="180" y="23" width="16" height="18" rx="4" fill="rgba(212,137,106,0.4)"/>
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x="16" y={58+i*20} width="188" height="14" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6"/>
            <rect x="22" y={62+i*20} width={[80,60,100][i]} height="6" rx="3" fill="rgba(200,170,100,0.2)"/>
            <rect x={[108,88,122][i]} y={63+i*20} width="30" height="4" rx="2" fill="rgba(212,137,106,0.15)"/>
          </g>
        ))}
      </svg>
    ),
  },
]

const STATUS_LABELS: Record<string, string> = {
  live: '✿ In bloom',
  wip: '◐ Growing',
  concept: '○ Seedling',
}

export default function ExperimentsSection() {
  return (
    <section
      id="experiments"
      style={{
        padding: '80px 80px 96px var(--sidebar-gap)',
        background: 'var(--bg)',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <div data-reveal style={{ marginBottom: 64 }}>
        <div style={{
          fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 14,
        }}>
          // the idea garden
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <h1 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.0,
            color: 'var(--ink)', margin: 0,
          }}>
            Garden of<br />
            <span style={{ color: 'var(--sage)' }}>Ideas</span>
          </h1>
          <p style={{
            fontSize: 15, lineHeight: 1.75, color: 'var(--warm-mid)',
            maxWidth: 380, margin: 0, flexShrink: 0,
          }}>
            Side projects planted in stolen hours. Some are blooming, some are still
            finding their roots, and one is definitely overwatered.
          </p>
        </div>
      </div>

      {/* Project tiles */}
      <div
        data-reveal-stagger
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}
      >
        {PROJECTS.map((project) => (
          <div
            key={project.name}
            className="experiment-card"
            style={{
              display: 'flex', flexDirection: 'column',
              borderRadius: 16,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              overflow: 'hidden',
              textDecoration: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
              cursor: 'default',
            }}
          >
            {/* Preview area */}
            <div style={{
              height: 140,
              background: project.previewBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '12px 16px',
              overflow: 'hidden',
            }}>
              {project.previewContent}
            </div>

            {/* Info */}
            <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
              {/* Name + status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div style={{
                  fontFamily: 'var(--font-inter)', fontSize: 17, fontWeight: 700,
                  letterSpacing: '-0.02em', color: 'var(--ink)',
                }}>
                  {project.name}
                </div>
                <span style={{
                  fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: project.statusColor,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {STATUS_LABELS[project.status]}
                </span>
              </div>

              {/* Desc */}
              <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--warm-mid)', margin: 0, flexGrow: 1 }}>
                {project.desc}
              </p>

              {/* Stack tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                {project.stack.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.06em',
                    color: 'var(--warm-light)', border: '1px solid var(--border)',
                    borderRadius: 4, padding: '2px 7px',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

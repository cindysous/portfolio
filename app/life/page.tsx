export const metadata = {
  title: 'Life',
  description: 'Volunteering, side projects, hobbies, and crafts outside of work.',
}

const SECTIONS = [
  {
    tag: 'community',
    emoji: '🫶',
    title: 'Khmer Identity',
    description:
      'A community archive preserving Cambodian history, language, and culture for the diaspora. I co-lead design and content — building something slow and careful that outlasts any single sprint.',
    detail: 'Ongoing since 2019',
  },
  {
    tag: 'volunteering',
    emoji: '🌱',
    title: 'Design mentorship',
    description:
      'Mentoring early-career designers navigating their first roles in complex product orgs. Mostly just listening, asking questions, and reminding people that confusion is normal.',
    detail: 'ADPList · periodic',
  },
  {
    tag: 'craft',
    emoji: '🧵',
    title: 'Sewing & textile work',
    description:
      "Hand-sewing, mending, and slow fashion. There's something grounding about making something physical — no iterations, no user testing, just material and time.",
    detail: 'Ongoing hobby',
  },
  {
    tag: 'craft',
    emoji: '🪴',
    title: 'Plant keeping',
    description:
      "Tending to a small collection of houseplants. It's a practice in patience and paying attention — the same skills that make good design.",
    detail: 'Ongoing hobby',
  },
  {
    tag: 'design',
    emoji: '📷',
    title: 'Photography',
    description:
      'Mostly film. Mostly plants, light, and quiet moments. A counterweight to screen-heavy workdays.',
    detail: 'Personal project',
  },
  {
    tag: 'reading',
    emoji: '📚',
    title: 'Books & long reads',
    description:
      "Design history, organizational behavior, and fiction. Current obsessions: how institutions change slowly, and why some products feel human and others don't.",
    detail: 'Always',
  },
]

export default function LifePage() {
  return (
    <main
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
          // outside of work
        </div>
        <h1 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.0,
          color: 'var(--ink)', margin: '0 0 20px',
        }}>
          Life beyond<br />
          <span style={{ color: 'var(--sage)' }}>the screen</span>
        </h1>
        <p style={{
          fontSize: 16, lineHeight: 1.75, color: 'var(--warm-mid)',
          maxWidth: 480, margin: 0,
        }}>
          Volunteering, community work, crafts, and the hobbies that keep me sane. The slow things, the physical things, the things that don't have a sprint deadline.
        </p>
      </div>

      {/* Grid */}
      <div data-reveal-stagger style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1,
        background: 'var(--border)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        {SECTIONS.map((item) => (
          <div
            key={item.title}
            style={{
              background: 'var(--bg)',
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {/* Emoji + tag */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 30, lineHeight: 1 }}>{item.emoji}</span>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--sage)',
                border: '1px solid rgba(74,107,69,0.3)', borderRadius: 4,
                padding: '3px 8px',
              }}>
                {item.tag}
              </span>
            </div>

            {/* Title */}
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 20,
              fontWeight: 700, letterSpacing: '-0.02em',
              color: 'var(--ink)', lineHeight: 1.2,
            }}>
              {item.title}
            </div>

            {/* Description */}
            <p style={{
              fontSize: 13, lineHeight: 1.7,
              color: 'var(--warm-mid)', margin: 0, flexGrow: 1,
            }}>
              {item.description}
            </p>

            {/* Detail */}
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 9,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--warm-light)', marginTop: 4,
            }}>
              {item.detail}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

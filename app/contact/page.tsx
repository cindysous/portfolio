export const metadata = {
  title: 'Contact',
  description: 'Get in touch — open to senior and principal IC roles, contract engagements, and design advisory conversations.',
}

export default function ContactPage() {
  return (
    <main style={{ paddingTop: 80 }}>
      <section
        id="contact"
        style={{ padding: '100px 80px 100px var(--sidebar-gap)', borderTop: '1px solid var(--border)' }}
      >
        <div data-reveal style={{ maxWidth: 640 }}>
          <div style={{
            fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 10,
          }}>
            // get in touch
          </div>
          <h1 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05,
            color: 'var(--ink)', marginBottom: 24,
          }}>
            Let&apos;s work together.
          </h1>
          <p style={{
            fontSize: 15, lineHeight: 1.75, color: 'var(--warm-mid)',
            marginBottom: 40, maxWidth: 380,
          }}>
            Open to senior and principal IC roles, contract engagements, and design advisory conversations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a
              href="mailto:hello@cindysous.com"
              className="contact-link"
              style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'var(--ink)' }}
            >
              hello@cindysous.com →
            </a>
            <a
              href="https://linkedin.com/in/cindysous"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'var(--ink)' }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

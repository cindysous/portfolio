'use client'

const STEPS = [
  {
    number: '01',
    title: 'Shadowing compliance workflows',
    body: 'Four sessions with enterprise compliance managers. I mapped every click, every cross-reference, every moment of hesitation — and catalogued every workaround.',
  },
  {
    number: '02',
    title: 'Information architecture audit',
    body: 'Catalogued every entity screen, modal, and data field against jobs-to-be-done. Goal: surface the 20% of information needed 80% of the time, with clear paths to the rest.',
  },
  {
    number: '03',
    title: 'The Entity Card system',
    body: 'Replaced the table-first paradigm with a compact, information-dense card — compliance status, relationship context, last activity, and quick actions in a single scannable component.',
  },
  {
    number: '04',
    title: 'Hierarchy visualization',
    body: 'Introduced a collapsible relationship tree view — ownership chains and sub-account structures visible at a glance. The feature that made compliance officers feel like they finally had a map.',
  },
  {
    number: '05',
    title: 'Designing for error states',
    body: 'Deactivation, flagging, and override flows redesigned to explicitly name downstream impact before allowing destructive actions. Compliance errors in payments are regulatory events — the UI had to match that weight.',
  },
]

export default function EntityProcessCarousel() {
  return (
    <>
      <style>{`
        .entity-proc-track {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          margin: 0;
        }
        .entity-proc-track::-webkit-scrollbar { display: none; }
        .entity-proc-card {
          flex: 0 0 252px;
          padding: 22px 20px 24px;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
      `}</style>

      <div className="entity-proc-track">
        {STEPS.map(step => (
          <div key={step.number} className="entity-proc-card">
            {/* Number badge */}
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(4,69,245,0.06)',
              border: '1px solid rgba(4,69,245,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14, flexShrink: 0,
            }}>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700,
                color: '#0445f5', letterSpacing: '0.02em',
              }}>
                {step.number}
              </span>
            </div>

            {/* Title */}
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 13.5, fontWeight: 700,
              letterSpacing: '-0.015em', lineHeight: 1.25,
              color: 'var(--ink)', marginBottom: 9,
            }}>
              {step.title}
            </div>

            {/* Body */}
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 12.5, lineHeight: 1.68,
              color: 'var(--warm-mid)',
            }}>
              {step.body}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

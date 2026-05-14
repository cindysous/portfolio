import ProcessSection from '@/components/ProcessSection'

export const metadata = {
  title: 'Process',
  description: 'How I approach design — from research and discovery through structure, bloom, and handoff.',
}

export default function ProcessPage() {
  return (
    <main style={{ paddingTop: 80 }}>
      <ProcessSection />
    </main>
  )
}

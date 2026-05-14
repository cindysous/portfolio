import ExperimentsSection from '@/components/ExperimentsSection'

export const metadata = {
  title: 'Experiments',
  description: 'Side projects, experiments, and things built for curiosity or community.',
}

export default function ExperimentsPage() {
  return (
    <main style={{ paddingTop: 80 }}>
      <ExperimentsSection />
    </main>
  )
}

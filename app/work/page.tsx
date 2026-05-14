import CaseStudiesSection from '@/components/CaseStudiesSection'
import { getAllCaseStudies } from '@/lib/case-studies'

export const metadata = {
  title: 'Work',
  description: 'Case studies in B2B fintech, healthtech, and enterprise product design.',
}

export default async function WorkPage() {
  const studies = getAllCaseStudies()

  return (
    <main>
      <CaseStudiesSection studies={studies} />
    </main>
  )
}

'use client'

import TransactionTrackerMockup from '@/components/TransactionTrackerMockup'
import SearchFilterMockup from '@/components/SearchFilterMockup'
import EntityManagementMockup from '@/components/EntityManagementMockup'
import CounterpartyPanel from '@/components/CounterpartyPanel'

export default function CaseStudyHeroVisual({ slug }: { slug: string; heroColor: string }) {
  if (slug === 'conduit-transaction-tracker') return <TransactionTrackerMockup />
  if (slug === 'intelycare-search-filter') return <SearchFilterMockup />
  if (slug === 'conduit-entity-management') {
    // Two wrapped divs: EntityManagementMockup capped at 54% height so
    // CounterpartyPanel always receives enough space to fill to the bottom edge.
    return (
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        paddingTop: 16, paddingLeft: 16, paddingBottom: 14,
        display: 'flex', flexDirection: 'column', gap: 6,
        pointerEvents: 'none',
      }}>
        {/* Acme Inc — no height cap, shows full graph + banking details */}
        <div style={{ flex: '0 0 auto' }}>
          <EntityManagementMockup stacked />
        </div>
        {/* Dovewood — fills remaining space with bottom breathing room */}
        <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <CounterpartyPanel />
          </div>
        </div>
      </div>
    )
  }
  return null
}

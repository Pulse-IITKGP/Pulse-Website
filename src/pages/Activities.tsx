import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import type { ActivityCategory } from '../content/types'
import { activities, gallery } from '../content/activities'
import { activityCategories, activityLabel } from '../content/taxonomy'
import { usePageMeta } from '../lib/usePageMeta'
import { PageHeader } from '../components/ui/PageHeader'
import { SectionHeading } from '../components/ui/SectionHeading'
import { FilterGroup } from '../components/ui/Filters'
import { EmptyState } from '../components/ui/EmptyState'
import { Button, ButtonLink } from '../components/ui/Button'
import { ActivityRow } from '../components/cards/ActivityRow'
import { Gallery } from '../components/ui/Gallery'

const categoryIds = new Set<string>(activityCategories.map((c) => c.id))

export default function Activities() {
  usePageMeta(
    'Activities and gallery',
    'Workshops, technical demonstrations, guest lectures, industrial visits, competitions, build sessions and outreach at PULSE.',
  )
  const [params, setParams] = useSearchParams()
  const raw = params.get('type')
  const type = raw && categoryIds.has(raw) ? (raw as ActivityCategory) : null

  const options = useMemo(
    () =>
      activityCategories.map((c) => ({
        ...c,
        count: activities.filter((a) => a.category === c.id).length + gallery.filter((g) => g.category === c.id).length,
      })),
    [],
  )
  const shownActivities = type ? activities.filter((a) => a.category === type) : activities
  const shownPhotos = type ? gallery.filter((g) => g.category === type) : gallery

  const setType = (value: string | null) =>
    setParams(value ? { type: value } : {}, { replace: true, preventScrollReset: true })

  return (
    <>
      <PageHeader
        title="Activities and gallery"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Activities' }]}
        lede={
          <p>
            Workshops, demonstrations, guest lectures, visits, competitions, build sessions and outreach. Dates and
            locations are added only once they’re confirmed.
          </p>
        }
      />

      <div className="border-b border-line bg-mist">
        <div className="shell py-6">
          <FilterGroup
            legend="Show activity type"
            name="activity-type"
            options={options}
            value={type}
            onChange={setType}
            allLabel="Everything"
          />
        </div>
      </div>

      <section aria-labelledby="sessions-title" className="shell py-14 md:py-20">
        <SectionHeading
          id="sessions-title"
          title={type ? activityLabel(type) : 'Sessions'}
          intro="The entries below are planned session formats, not past events. Each will gain a date, location and photos once it runs."
        />
        <p aria-live="polite" className="sr-only">
          {shownActivities.length} sessions and {shownPhotos.length} photos shown
        </p>
        {shownActivities.length > 0 ? (
          <div className="divide-y divide-line border-y border-line">
            {shownActivities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={type ? `No ${activityLabel(type).toLowerCase()} yet` : 'No activities published yet'}
            schematic="loop"
            action={
              <div className="flex flex-wrap gap-3">
                {type ? (
                  <Button variant="secondary" onClick={() => setType(null)}>
                    Show everything
                  </Button>
                ) : null}
                <ButtonLink to="/get-involved#industry" variant="quiet">
                  Suggest or host a session
                </ButtonLink>
              </div>
            }
          >
            Nothing has been scheduled in this category. If you’d like to run, host or suggest one, get in touch.
          </EmptyState>
        )}
      </section>

      <section aria-labelledby="gallery-title" className="bg-mist py-14 md:py-20">
        <div className="shell">
          <SectionHeading
            id="gallery-title"
            title="Gallery"
            intro="Reference photographs hold each slot until photos from PULSE sessions are added. Select a photo to enlarge it."
          />
          {shownPhotos.length > 0 ? (
            <Gallery key={type ?? 'all'} items={shownPhotos} />
          ) : (
            <EmptyState title="No photos in this category yet" schematic="vessel">
              Photos will appear here after sessions take place.
            </EmptyState>
          )}
        </div>
      </section>
    </>
  )
}

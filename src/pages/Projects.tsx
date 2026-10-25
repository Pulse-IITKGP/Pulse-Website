import { useDeferredValue, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import type { ProjectCategory, ProjectStatus } from '../content/types'
import { projects } from '../content/projects'
import { projectCategories, projectStatuses } from '../content/taxonomy'
import { filterProjects } from '../lib/projectFilter'
import { usePageMeta } from '../lib/usePageMeta'
import { PageHeader } from '../components/ui/PageHeader'
import { FilterGroup, SearchField } from '../components/ui/Filters'
import { EmptyState } from '../components/ui/EmptyState'
import { Button, ButtonLink } from '../components/ui/Button'
import { ProjectCard } from '../components/cards/ProjectCard'

const categoryIds = new Set<string>(projectCategories.map((c) => c.id))
const statusIds = new Set<string>(projectStatuses.map((s) => s.id))
const hasPlaceholders = projects.some((p) => p.placeholder)

export default function Projects() {
  usePageMeta(
    'Projects',
    'Search and filter PULSE projects in prototyping, unit operations, process design, sustainability, automation and entrepreneurship.',
  )
  const [params, setParams] = useSearchParams()

  // Filters live in the URL so a filtered view can be bookmarked or shared.
  const text = params.get('q') ?? ''
  const rawCategory = params.get('category')
  const rawStatus = params.get('status')
  const category = rawCategory && categoryIds.has(rawCategory) ? (rawCategory as ProjectCategory) : null
  const status = rawStatus && statusIds.has(rawStatus) ? (rawStatus as ProjectStatus) : null

  const deferredText = useDeferredValue(text)
  const results = useMemo(
    () => filterProjects(projects, { text: deferredText, category, status }),
    [deferredText, category, status],
  )

  // Facet counts reflect the other active filters.
  const categoryOptions = useMemo(() => {
    const pool = filterProjects(projects, { text: deferredText, category: null, status })
    return projectCategories.map((c) => ({ ...c, count: pool.filter((p) => p.categories.includes(c.id)).length }))
  }, [deferredText, status])
  const statusOptions = useMemo(() => {
    const pool = filterProjects(projects, { text: deferredText, category, status: null })
    return projectStatuses.map((s) => ({ ...s, count: pool.filter((p) => p.status === s.id).length }))
  }, [deferredText, category])

  const update = (key: 'q' | 'category' | 'status', value: string | null) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true, preventScrollReset: true },
    )
  }

  const active = Boolean(text || category || status)
  const clearAll = () => setParams({}, { replace: true, preventScrollReset: true })
  const isStale = text !== deferredText

  return (
    <>
      <PageHeader
        title="Projects"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
        lede={
          <p>
            Prototypes, studies and venture ideas from PULSE teams. Every project lists its status honestly, and
            results appear only once they’ve been verified.
          </p>
        }
        aside={
          hasPlaceholders ? (
            <p className="rounded-sm border border-signal-line p-4 text-sm text-ink">
              The projects listed are concept placeholders that show how the directory works. None has started yet,
              and none reports results.
            </p>
          ) : undefined
        }
      />

      <div className="shell grid gap-10 py-12 md:py-16 lg:grid-cols-12">
        <aside aria-label="Filter projects" className="lg:col-span-3">
          <div className="space-y-7 lg:sticky lg:top-24">
            <SearchField label="Search projects" value={text} onChange={(v) => update('q', v || null)} placeholder="e.g. heat exchanger…" />
            <FilterGroup
              legend="Category"
              name="category"
              options={categoryOptions}
              value={category}
              onChange={(v) => update('category', v)}
              allLabel="All categories"
            />
            <FilterGroup
              legend="Status"
              name="status"
              options={statusOptions}
              value={status}
              onChange={(v) => update('status', v)}
              allLabel="Any status"
            />
            {active ? (
              <Button variant="quiet" onClick={clearAll}>
                Clear all filters
              </Button>
            ) : null}
          </div>
        </aside>

        <section aria-labelledby="results-title" className="lg:col-span-9">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <h2 id="results-title" className="title-card">
              Project directory
            </h2>
            <p aria-live="polite" className="tabular text-sm text-muted">
              {results.length === projects.length
                ? `${projects.length} projects`
                : `${results.length} of ${projects.length} projects`}
            </p>
          </div>

          {results.length > 0 ? (
            <ul
              className={`grid gap-x-8 gap-y-12 transition-opacity sm:grid-cols-2 xl:grid-cols-3 ${isStale ? 'opacity-60' : ''}`}
            >
              {results.map((project) => (
                <li key={project.slug} className="flex">
                  <ProjectCard project={project} className="w-full" />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="No projects match these filters"
              schematic="column"
              action={
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" onClick={clearAll}>
                    Clear all filters
                  </Button>
                  <ButtonLink to="/get-involved#propose" variant="quiet">
                    Propose a project
                  </ButtonLink>
                </div>
              }
            >
              {status && status !== 'proposed'
                ? 'No projects have reached this stage yet. Try another status, or clear the filters to see everything.'
                : 'Try a different search term or category, or clear the filters to see every project.'}
            </EmptyState>
          )}
        </section>
      </div>
    </>
  )
}

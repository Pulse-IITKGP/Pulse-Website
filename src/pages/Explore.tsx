import { Link } from 'react-router'
import { ExternalLink } from 'lucide-react'
import { externalResources, pulseDocuments, sustainabilityAreas, unitOperations, type Topic } from '../content/explore'
import { projects } from '../content/projects'
import { categoryLabel } from '../content/taxonomy'
import { usePageMeta } from '../lib/usePageMeta'
import { PageHeader } from '../components/ui/PageHeader'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Schematic, SchematicPanel } from '../components/diagrams/Schematic'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { VideoEmbed } from '../components/ui/VideoEmbed'
import { EmptyState } from '../components/ui/EmptyState'
import { Tag } from '../components/ui/Badges'
import { ButtonLink } from '../components/ui/Button'

const areas = [
  { id: 'unit-operations', label: 'Unit Operations Lab' },
  { id: 'sustainability', label: 'Sustainability and Impact' },
  { id: 'knowledge-hub', label: 'Knowledge Hub' },
]

function ContentKind({ kind }: { kind: 'general' | 'pulse' }) {
  return kind === 'general' ? (
    <span className="inline-flex items-center gap-1.5 text-meta font-medium text-muted">
      <span aria-hidden="true" className="size-2 rounded-full border border-muted" />
      General explainer
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-meta font-medium text-brand">
      <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
      PULSE work
    </span>
  )
}

function TopicBlock({ topic }: { topic: Topic }) {
  return (
    <article id={topic.id} aria-labelledby={`${topic.id}-title`} className="flex flex-col border-t-2 border-navy pt-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <ContentKind kind="general" />
          <h3 id={`${topic.id}-title`} className="h-sub mt-2">
            {topic.title}
          </h3>
        </div>
        {topic.image ? <Schematic kind={topic.schematic} className="size-16 shrink-0 text-brand" /> : null}
      </div>
      <p className="mt-3 text-body-lg">{topic.plain}</p>
      {topic.image ? (
        <figure className="mt-5">
          <ResponsiveImage
            image={topic.image}
            sizes="(min-width: 1024px) 40vw, 100vw"
            fallback={topic.schematic}
            className="aspect-[16/9] w-full rounded-sm border border-line"
          />
          <figcaption className="mt-1.5 text-meta text-muted">Reference photograph. {topic.image.credit}.</figcaption>
        </figure>
      ) : (
        <figure className="mt-5">
          <SchematicPanel kind={topic.schematic} className="aspect-[16/9] w-full rounded-sm border border-line" />
          <figcaption className="mt-1.5 text-meta text-muted">Simplified process symbol. A photograph can be added in explore.ts.</figcaption>
        </figure>
      )}
      <details className="group mt-5 rounded-sm border border-line bg-white open:bg-mist/60">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 font-medium text-brand marker:hidden [&::-webkit-details-marker]:hidden">
          Go deeper
          <span aria-hidden="true" className="text-xl leading-none transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="px-4 pb-4">
          <p className="text-small text-ink/90">{topic.deeper}</p>
          <p className="mt-3 text-sm font-medium text-ink">Key ideas</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {topic.keyIdeas.map((idea) => (
              <li key={idea}>
                <Tag className="bg-white">{idea}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </details>
      {topic.videoUrl ? (
        <div className="mt-5">
          <VideoEmbed url={topic.videoUrl} title={`${topic.title} demonstration`} />
        </div>
      ) : null}
    </article>
  )
}

export default function Explore() {
  usePageMeta(
    'Explore',
    'Unit operations explainers, sustainability focus areas and a knowledge hub of chemical engineering learning resources.',
  )

  return (
    <>
      <PageHeader
        title="Explore chemical engineering"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Explore' }]}
        lede={
          <p>
            Plain-language explainers for first-year students, with more depth for anyone who wants it. General
            educational material is marked separately from work carried out by PULSE.
          </p>
        }
        aside={
          <dl className="space-y-3 rounded-sm border border-line bg-white p-5 text-sm">
            <div className="flex items-start gap-3">
              <dt className="w-36 shrink-0">
                <ContentKind kind="general" />
              </dt>
              <dd className="text-muted">Textbook principles and outside resources. Not PULSE results.</dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="w-36 shrink-0">
                <ContentKind kind="pulse" />
              </dt>
              <dd className="text-muted">Projects and documents produced by PULSE teams.</dd>
            </div>
          </dl>
        }
      />

      <nav aria-label="Explore sections" className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur-sm">
        <ul className="shell flex gap-1 overflow-x-auto whitespace-nowrap">
          {areas.map((a) => (
            <li key={a.id}>
              <a href={`#${a.id}`} className="inline-flex min-h-12 items-center px-3 text-sm font-medium text-ink/80 hover:text-brand">
                {a.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* A. Unit Operations Lab */}
      <section id="unit-operations" aria-labelledby="unit-operations-title" className="shell py-16 md:py-20">
        <SectionHeading
          id="unit-operations-title"
          title="Unit Operations Lab"
          intro="Every chemical plant, however complex, is built from a handful of unit operations. Start with the one-line idea, then open “Go deeper” for the engineering."
        />
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
          {unitOperations.map((topic) => (
            <TopicBlock key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      {/* B. Sustainability & Impact */}
      <section id="sustainability" aria-labelledby="sustainability-title" className="bg-mist py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            id="sustainability-title"
            title="Sustainability and Impact"
            intro="Six areas where chemical engineering can reduce waste, emissions and resource use."
          />

          <div className="mb-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
            <div className="bg-white p-5">
              <p className="font-medium text-navy">Measured</p>
              <p className="mt-1 text-sm text-muted">Data from a PULSE experiment, with the method stated. None published yet.</p>
            </div>
            <div className="bg-white p-5">
              <p className="font-medium text-navy">Estimated</p>
              <p className="mt-1 text-sm text-muted">A calculation or model, labelled as an estimate with its assumptions.</p>
            </div>
            <div className="bg-white p-5">
              <p className="font-medium text-navy">General</p>
              <p className="mt-1 text-sm text-muted">Background from the literature, not a PULSE claim.</p>
            </div>
          </div>

          <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {sustainabilityAreas.map((area) => {
              const related = area.relatedCategory
                ? projects.filter((p) => p.categories.includes(area.relatedCategory!))
                : []
              return (
                <li key={area.id} id={area.id} className="flex flex-col">
                  {area.image ? (
                    <ResponsiveImage
                      image={area.image}
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="mb-5 aspect-[3/2] w-full rounded-sm border border-line"
                    />
                  ) : null}
                  <ContentKind kind="general" />
                  <h3 className="title-card mt-2">{area.title}</h3>
                  <p className="mt-2 text-muted">{area.summary}</p>
                  <div className="mt-4 border-t border-line pt-3 text-sm">
                    {related.length > 0 ? (
                      <>
                        <ContentKind kind="pulse" />
                        <p className="mt-1">
                          <Link to={`/projects?category=${area.relatedCategory}`} className="link">
                            {related.length} {categoryLabel(area.relatedCategory!).toLowerCase()} project
                            {related.length === 1 ? '' : 's'}
                          </Link>{' '}
                          <span className="text-muted">(concept stage)</span>
                        </p>
                      </>
                    ) : (
                      <p className="text-muted">No PULSE projects in this area yet.</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* C. Knowledge Hub */}
      <section id="knowledge-hub" aria-labelledby="knowledge-hub-title" className="shell py-16 md:py-20">
        <SectionHeading
          id="knowledge-hub-title"
          title="Knowledge Hub"
          intro="Explainers, tutorials, reports and documentation prepared by PULSE, plus trusted outside resources."
        />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="title-card">From PULSE</h3>
            <div className="mt-4">
              {pulseDocuments.length > 0 ? (
                <ul className="divide-y divide-line border-y border-line">
                  {pulseDocuments.map((doc) => (
                    <li key={doc.href} className="py-4">
                      <a href={doc.href} className="link font-medium">
                        {doc.title}
                      </a>
                      <p className="text-sm text-muted">{doc.description}</p>
                      {doc.approvedBy ? <p className="mt-1 text-meta text-muted">Approved by {doc.approvedBy}</p> : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  title="No PULSE documents published yet"
                  schematic="dryer"
                  action={
                    <ButtonLink to="/get-involved#propose" variant="secondary">
                      Offer to write an explainer
                    </ButtonLink>
                  }
                >
                  Tutorials, technical reports and project documentation will appear here after a faculty advisor
                  has approved them.
                </EmptyState>
              )}
            </div>
          </div>
          <div className="lg:col-span-7">
            <h3 className="title-card">Recommended outside resources</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {externalResources.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6"
                  >
                    <span>
                      <span className="inline-flex items-center gap-1.5 font-medium text-brand group-hover:underline">
                        {r.title}
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </span>
                      <span className="mt-0.5 block text-sm text-muted">{r.description}</span>
                    </span>
                    <span className="text-meta text-muted sm:pt-1">{r.kind}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

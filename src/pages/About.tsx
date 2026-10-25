import { Link } from 'react-router'
import { about } from '../content/about'
import { pillars } from '../content/pillars'
import { site } from '../content/site'
import { usePageMeta } from '../lib/usePageMeta'
import { PageHeader } from '../components/ui/PageHeader'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EmptyState } from '../components/ui/EmptyState'
import { PlaceholderTag } from '../components/ui/Badges'
import { CallToAction } from '../components/layout/CallToAction'

/** Idea → prototype → test → lead → venture, with a recycle stream of lessons learned. */
function WorkflowDiagram() {
  const steps = ['Idea', 'Prototype', 'Test', 'Team', 'Venture']
  return (
    <figure className="rounded-sm border border-line bg-white p-4 sm:p-6">
      <ol className="space-y-2 sm:hidden" aria-label="The PULSE project workflow">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className="grid h-10 flex-1 place-items-center rounded-sm border-2 border-brand font-semibold text-navy">
              {step}
            </span>
            <span aria-hidden="true" className="w-6 text-center text-brand">
              {i < steps.length - 1 ? '↓' : '↺'}
            </span>
          </li>
        ))}
        <li className="pt-1 text-meta font-medium text-signal-ink">recycle: lessons learned return to the idea</li>
      </ol>
      <svg
        viewBox="0 0 640 170"
        className="hidden w-full sm:block"
        role="img"
        aria-labelledby="workflow-title workflow-desc"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title id="workflow-title">The PULSE project workflow</title>
        <desc id="workflow-desc">
          A project moves from idea to prototype, test, team and venture. A recycle stream labelled lessons learned
          returns from the end back to the idea.
        </desc>
        {steps.map((step, i) => {
          const x = 20 + i * 126
          return (
            <g key={step}>
              <rect x={x} y="40" width="96" height="44" rx="4" stroke="var(--color-brand)" strokeWidth="2" fill="#fff" />
              <text x={x + 48} y="62" textAnchor="middle" dominantBaseline="middle" fontSize="15" fontWeight="600" fill="var(--color-navy)">
                {step}
              </text>
              {i < steps.length - 1 ? (
                <>
                  <path d={`M${x + 96} 62h26`} stroke="var(--color-brand)" strokeWidth="2" />
                  <path d={`M${x + 116} 57l6 5-6 5`} stroke="var(--color-brand)" strokeWidth="2" />
                </>
              ) : null}
            </g>
          )
        })}
        <path d="M572 84v46H68V90" stroke="var(--color-signal)" strokeWidth="2" strokeDasharray="6 6" />
        <path d="M62 96l6-6 6 6" stroke="var(--color-signal)" strokeWidth="2" />
        <text x="320" y="150" textAnchor="middle" fontSize="14" fontWeight="500" fill="var(--color-signal-ink)">
          recycle: lessons learned
        </text>
      </svg>
    </figure>
  )
}

export default function About() {
  usePageMeta(
    'About',
    'What PULSE is, what the acronym means, and how chemical engineering, prototyping, leadership and entrepreneurship fit together.',
  )

  return (
    <>
      <PageHeader
        title="About PULSE"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        lede={<p>How a student-run, faculty-guided hub works, what its name means, and why its four parts belong together.</p>}
      />

      <section aria-labelledby="overview-title" className="shell py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="overview-title" className="h-section lg:col-span-4">
            What the hub does
          </h2>
          <div className="prose-pulse text-body-lg lg:col-span-8">
            {about.overview.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-title" className="bg-mist py-16 md:py-20">
        <div className="shell">
          <h2 id="mission-title" className="sr-only">
            Mission and vision
          </h2>
          {about.draft ? (
            <p className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted">
              <PlaceholderTag label="Draft wording" />
              To be reviewed and adopted by the PULSE team.
            </p>
          ) : null}
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <div>
              <h3 className="label text-brand">
                Mission
              </h3>
              <p className="statement mt-3 text-navy">
                {about.mission}
              </p>
            </div>
            <div className="md:border-l md:border-line md:pl-14">
              <h3 className="label text-brand">
                Vision
              </h3>
              <p className="statement mt-3 text-navy">
                {about.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="acronym-title" className="shell py-16 md:py-20">
        <SectionHeading
          id="acronym-title"
          title="What the letters mean"
          intro={`${site.acronym} stands for ${site.expansion}.`}
        />
        <dl className="divide-y divide-line border-y border-line">
          {pillars.map((p) => (
            <div key={p.letter} className="grid gap-3 py-7 sm:grid-cols-[5rem_14rem_1fr] sm:gap-8">
              <dt className="contents">
                <span aria-hidden="true" className="text-5xl leading-none font-semibold tracking-[-0.03em] text-brand [font-stretch:80%]">
                  {p.letter}
                </span>
                <span className="title-card font-semibold text-navy">
                  {p.name}
                </span>
              </dt>
              <dd className="max-w-2xl text-muted">
                {p.summary}{' '}
                <Link to={p.link.to} className="link whitespace-nowrap">
                  {p.link.label}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="connection-title" className="shell pb-16 md:pb-20">
        <SectionHeading id="connection-title" title="Why these four belong together" />
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="prose-pulse lg:col-span-5">
            {about.connection.map((p) => (
              <p key={p.slice(0, 24)} className="text-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-7">
            <WorkflowDiagram />
          </div>
        </div>
      </section>

      <section id="mentorship" aria-labelledby="mentorship-title" className="border-y border-line bg-white py-16 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="mentorship-title" className="h-section">
              Faculty mentorship
            </h2>
            <p className="mt-4 text-muted">{about.mentorship.intro}</p>
            <Link to="/get-involved#faculty" className="link mt-6 inline-block font-medium">
              Faculty: become a mentor
            </Link>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {about.mentorship.roles.map((role) => (
              <li key={role} className="flex gap-3 bg-white p-5">
                <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full border-2 border-brand" />
                <span>{role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="history-title" className="shell py-16 md:py-20">
        <SectionHeading id="history-title" title="History" />
        {about.history.length > 0 ? (
          <ol className="relative ml-2 border-l-2 border-brand/25">
            {about.history.map((h) => (
              <li key={h.year + h.title} className="relative pb-8 pl-8 last:pb-0">
                <span aria-hidden="true" className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-brand bg-white" />
                <p className="tabular text-sm font-medium text-brand">{h.year}</p>
                <h3 className="title-card mt-1">{h.title}</h3>
                <p className="mt-1 max-w-2xl text-muted">{h.text}</p>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState title="The hub’s history is still being written" schematic="column">
            Founding details, first projects and milestones will be recorded here once they have been confirmed by
            the team.
          </EmptyState>
        )}
      </section>

      <section aria-labelledby="values-title" className="shell pb-16 md:pb-24">
        <SectionHeading
          id="values-title"
          title="How we work"
          intro={
            about.draft ? (
              <span className="flex flex-wrap items-center gap-3">
                Core values and working philosophy. <PlaceholderTag label="Draft wording" />
              </span>
            ) : (
              'Core values and working philosophy.'
            )
          }
        />
        <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {about.values.map((v) => (
            <div key={v.title} className="border-t-2 border-navy pt-4">
              <dt className="title-card font-semibold text-navy">
                {v.title}
              </dt>
              <dd className="mt-2 text-muted">{v.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CallToAction />
    </>
  )
}

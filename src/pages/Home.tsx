import { Link } from 'react-router'
import { library } from '../content/images'
import { pillars } from '../content/pillars'
import { projects } from '../content/projects'
import { activities, opportunities } from '../content/activities'
import { people } from '../content/people'
import { site } from '../content/site'
import { usePageMeta } from '../lib/usePageMeta'
import { formatDate } from '../lib/format'
import { AnnotatedPhoto, type Callout } from '../components/diagrams/AnnotatedPhoto'
import { ProcessTrain } from '../components/diagrams/ProcessTrain'
import { ProjectFeature, ProjectRow } from '../components/cards/ProjectCard'
import { ActivityRow } from '../components/cards/ActivityRow'
import { Portrait } from '../components/cards/ProfileCard'
import { ButtonLink } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { SectionHeading, StreamRule } from '../components/ui/SectionHeading'
import { CallToAction } from '../components/layout/CallToAction'

// Callout coordinates are measured on the 800 × 1054 source photo.
const heroCallouts: Callout[] = [
  { x: 205, y: 222, leader: 'l52 -52h40', label: 'Overhead vapour line', labelX: 306, labelY: 170 },
  { x: 690, y: 452, leader: 'l-50 48h-40', label: 'Access platform', labelX: 590, labelY: 500, anchor: 'end' },
  { x: 188, y: 560, leader: 'l56 50h40', label: 'Column shell', labelX: 292, labelY: 610 },
]

const featured = projects.filter((p) => p.featured)
const [leadProject, ...moreProjects] = featured.length > 0 ? featured : projects
const recentActivities = activities.slice(0, 3)
const peoplePreview = people.slice(0, 4)

export default function Home() {
  usePageMeta(
    'PULSE Hub',
    'PULSE brings together chemical engineering, hands-on prototyping and sustainable entrepreneurship to turn ideas into practical solutions.',
  )

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="border-b border-line">
        <div className="shell grid items-center gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="lg:col-span-7">
            <h1 id="hero-title" className="display max-w-[12ch]">
              Ideas engineered into impact.
            </h1>
            <p className="lede mt-6">
              PULSE brings together chemical engineering, hands-on prototyping and sustainable entrepreneurship to
              turn ideas into practical solutions. Students build, faculty mentor, and every project has to work
              outside the classroom too.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/projects" size="lg">
                Browse projects
              </ButtonLink>
              <ButtonLink to="/get-involved" variant="secondary" size="lg">
                Join or collaborate
              </ButtonLink>
            </div>
            <dl className="mt-10 max-w-xl border-t border-line pt-5 text-sm">
              <dt className="font-medium text-navy">What PULSE stands for</dt>
              <dd className="mt-1 text-muted">{site.expansion}</dd>
            </dl>
          </div>

          <figure className="lg:col-span-5">
            <AnnotatedPhoto
              image={library.distillationColumns}
              space={{ w: 800, h: 1054 }}
              callouts={heroCallouts}
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
              className="aspect-square rounded-sm border border-line"
            />
            <figcaption className="mt-3 text-meta text-muted">
              Reference photograph of distillation columns, not a PULSE facility. {library.distillationColumns.credit}.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Pillars */}
      <section aria-labelledby="pillars-title" className="shell py-16 md:py-24">
        <SectionHeading
          id="pillars-title"
          title="Four pillars, one process"
          intro="The letters of PULSE name four kinds of work. Projects usually pass through all four, the way a feed passes through every unit on a flowsheet."
        />
        <ProcessTrain pillars={pillars} />
      </section>

      {/* Featured projects */}
      <section aria-labelledby="projects-title" className="bg-mist py-16 md:py-24">
        <div className="shell">
          <SectionHeading
            id="projects-title"
            title="Projects on the bench"
            intro="Concepts the hub could take on first. Each will be confirmed, scoped and assigned a mentor before work starts."
            action={{ to: '/projects', label: `All projects (${projects.length})` }}
          />
          {leadProject ? <ProjectFeature project={leadProject} /> : null}
          {moreProjects.length > 0 ? (
            <div className="mt-10 grid border-t border-line md:grid-cols-2 md:gap-x-10">
              {moreProjects.slice(0, 2).map((project) => (
                <ProjectRow key={project.slug} project={project} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Activities */}
      <section aria-labelledby="activities-title" className="shell py-16 md:py-24">
        <SectionHeading
          id="activities-title"
          title="Activities and demonstrations"
          intro="Workshops, build sessions, visits and outreach. The formats below are planned; dates will be added once sessions are scheduled."
          action={{ to: '/activities', label: 'All activities' }}
        />
        {recentActivities.length > 0 ? (
          <div className="divide-y divide-line border-y border-line">
            {recentActivities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <EmptyState title="No activities published yet">
            Sessions will appear here once they have been held or scheduled.
          </EmptyState>
        )}
      </section>

      {/* Sustainability and impact */}
      <section aria-labelledby="impact-title" className="border-y border-line bg-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-72 lg:min-h-full">
            <ResponsiveImage
              image={library.aerationTank}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 size-full"
            />
            <p className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-navy/85 to-transparent px-4 pt-10 pb-3 text-meta text-white/90 sm:px-6">
              Activated-sludge aeration tank (reference photograph). {library.aerationTank.credit}.
            </p>
          </div>
          <div className="px-4 py-14 sm:px-6 md:py-20 lg:px-14 xl:px-20">
            <StreamRule />
            <h2 id="impact-title" className="h-section mt-6 max-w-lg">
              Less waste, less water, less energy
            </h2>
            <div className="prose-pulse mt-5 text-body-lg text-muted">
              <p>
                Sustainability at PULSE is a design constraint, not a slogan. Every project is asked the same three
                questions at review: what does it consume, what does it emit, and what would it cost someone to use?
              </p>
              <p>
                Focus areas include waste valorisation, water treatment, energy efficiency and resource recovery,
                topics covered in more depth on the Explore page.
              </p>
            </div>
            <div className="mt-8 max-w-lg rounded-sm border border-signal-line p-4">
              <p className="font-medium text-navy">Measured impact only</p>
              <p className="mt-1 text-sm text-ink/80">
                No PULSE impact figures have been verified yet. When a project measures a saving, it will be
                published here with the method used, clearly separated from estimates.
              </p>
            </div>
            <Link to="/explore#sustainability" className="link mt-8 inline-block font-medium">
              Sustainability focus areas
            </Link>
          </div>
        </div>
      </section>

      {/* People */}
      <section aria-labelledby="people-title" className="shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <StreamRule />
            <h2 id="people-title" className="h-section mt-6">
              Students lead, faculty mentor
            </h2>
            <p className="mt-4 text-muted">
              Student coordinators run the hub day to day. Faculty advisors review technical work and safety, and
              alumni and industry collaborators bring a view from practice. Profiles will be published once each
              person has approved theirs.
            </p>
            <Link to="/people" className="link mt-6 inline-block font-medium">
              Meet the people
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-8 lg:gap-6" aria-label="Profile preview">
            {peoplePreview.map((person) => (
              <li key={person.id}>
                <div className="overflow-hidden rounded-sm border border-line">
                  <Portrait person={person} />
                </div>
                <p className="mt-3 text-small font-medium text-navy">{person.role}</p>
                <p className="text-sm text-muted">{person.placeholder ? 'Name to be confirmed' : person.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Upcoming */}
      <section aria-labelledby="upcoming-title" className="shell pb-16 md:pb-24">
        <SectionHeading id="upcoming-title" title="Upcoming opportunities" />
        {opportunities.length > 0 ? (
          <ul className="divide-y divide-line border-y border-line">
            {opportunities.map((o) => (
              <li key={o.id} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr]">
                <span className="text-sm text-muted">{o.date ? formatDate(o.date) : 'Date to be confirmed'}</span>
                <div>
                  <h3 className="title-card">
                    {o.href ? (
                      <a href={o.href} className="hover:text-brand hover:underline">
                        {o.title}
                      </a>
                    ) : (
                      o.title
                    )}
                  </h3>
                  <p className="text-muted">{o.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Nothing scheduled right now"
            schematic="loop"
            action={
              <ButtonLink to="/get-involved#contact" variant="secondary">
                Register your interest
              </ButtonLink>
            }
          >
            Events, open calls and recruitment drives will be listed here as soon as dates are confirmed. Register
            your interest and you’ll be among the first to hear.
          </EmptyState>
        )}
      </section>

      <CallToAction />
    </>
  )
}

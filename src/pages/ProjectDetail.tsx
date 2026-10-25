import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import type { Project, ProjectSection } from '../content/types'
import { getProject, projects } from '../content/projects'
import { getPeople } from '../content/people'
import { categoryLabel } from '../content/taxonomy'
import { usePageMeta } from '../lib/usePageMeta'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { PlaceholderTag, StatusBadge } from '../components/ui/Badges'
import { ProjectCover } from '../components/cards/ProjectCard'
import { ProfileCard } from '../components/cards/ProfileCard'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { VideoEmbed } from '../components/ui/VideoEmbed'
import { ButtonLink } from '../components/ui/Button'
import NotFound from './NotFound'

type SectionId = keyof Project['detail'] | 'media' | 'team'

const outline: { id: SectionId; title: string }[] = [
  { id: 'problem', title: 'The problem' },
  { id: 'motivation', title: 'Motivation and context' },
  { id: 'concept', title: 'Engineering concept' },
  { id: 'methodology', title: 'Method and design decisions' },
  { id: 'media', title: 'Photos, diagrams and video' },
  { id: 'results', title: 'Results' },
  { id: 'challenges', title: 'Challenges, limitations and lessons' },
  { id: 'applications', title: 'Sustainability and applications' },
  { id: 'team', title: 'Team and mentors' },
  { id: 'future', title: 'Future development' },
]

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-10 first:border-t-0 first:pt-0">
      <h2 id={`${id}-title`} className="h-sub">
        {title}
      </h2>
      <div className="prose-pulse mt-4 text-body-lg text-ink/90">{children}</div>
    </section>
  )
}

function Paragraphs({ section, empty }: { section: ProjectSection; empty: string }) {
  if (section.paragraphs.length === 0) return <p className="text-muted">{empty}</p>
  return (
    <>
      {section.paragraphs.map((p) => (
        <p key={p.slice(0, 32)}>{p}</p>
      ))}
    </>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  usePageMeta(project?.title ?? 'Project not found', project?.summary ?? 'This project could not be found.')

  if (!project) return <NotFound kind="project" />

  const { detail } = project
  const contributors = getPeople(project.contributors)
  const mentors = getPeople(project.mentors)
  const index = projects.indexOf(project)
  const prev = projects[index - 1]
  const next = projects[index + 1]

  return (
    <article>
      <header className="border-b border-line">
        <div className="shell grid gap-8 pt-8 pb-12 md:pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects' }, { label: project.title }]} />
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <StatusBadge status={project.status} />
              {project.placeholder ? <PlaceholderTag label="Concept placeholder" /> : null}
              {project.period ? <span className="text-sm text-muted">{project.period}</span> : null}
            </div>
            <h1 className="display-detail mt-4">{project.title}</h1>
            <p className="lede mt-5">{project.summary}</p>
            <p className="mt-5 text-sm text-ink/75">
              <span className="font-medium text-ink">Categories: </span>
              {project.categories.map((c, i) => (
                <span key={c}>
                  {i > 0 ? ', ' : ''}
                  <Link to={`/projects?category=${c}`} className="link">
                    {categoryLabel(c)}
                  </Link>
                </span>
              ))}
            </p>
          </div>
          <div className="lg:col-span-5 lg:self-end">
            <div className="overflow-hidden rounded-sm border border-line">
              <ProjectCover project={project} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] w-full" />
            </div>
          </div>
        </div>
      </header>

      {project.placeholder ? (
        <div className="shell pt-8">
          <p className="rounded-sm border border-signal-line p-4 text-sm text-ink">
            <strong className="font-semibold">This is a concept placeholder.</strong> It describes a possible
            project and the general engineering behind it. It is not an active PULSE project, and it reports no
            results.
          </p>
        </div>
      ) : null}

      <div className="shell grid gap-10 py-12 md:py-16 lg:grid-cols-12">
        <nav aria-label="Project sections" className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24">
            <p className="text-sm font-medium text-ink">On this page</p>
            <ul className="mt-3 space-y-1 border-l border-line text-sm">
              {outline.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-3 text-muted hover:border-brand hover:text-brand">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="lg:col-span-9 xl:col-span-8">
          <Section id="problem" title="The problem">
            <Paragraphs section={detail.problem} empty="Not yet documented." />
          </Section>
          <Section id="motivation" title="Motivation and context">
            <Paragraphs section={detail.motivation} empty="Not yet documented." />
          </Section>
          <Section id="concept" title="Engineering concept">
            <Paragraphs section={detail.concept} empty="Not yet documented." />
          </Section>
          <Section id="methodology" title="Method and design decisions">
            <Paragraphs section={detail.methodology} empty="Not yet documented." />
          </Section>
          <Section id="media" title="Photos, diagrams and video">
            {project.media.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2">
                {project.media.map((m) => (
                  <li key={m.caption}>
                    <figure>
                      {m.kind === 'video' && m.videoUrl ? (
                        <VideoEmbed url={m.videoUrl} title={m.caption} />
                      ) : m.image ? (
                        <ResponsiveImage image={m.image} sizes="(min-width: 640px) 40vw, 100vw" className="aspect-[4/3] w-full rounded-sm" />
                      ) : null}
                      <figcaption className="mt-2 text-sm text-muted">{m.caption}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No photos, diagrams or videos have been added yet.</p>
            )}
          </Section>
          <Section id="results" title="Results">
            {detail.results.paragraphs.length > 0 ? (
              <Paragraphs section={detail.results} empty="" />
            ) : (
              <div className="rounded-sm border border-line bg-mist p-5">
                <p className="font-medium text-navy">No verified results yet</p>
                <p className="mt-1 text-small text-muted">
                  Results are published only after the team has run the work and a mentor has reviewed the data.
                </p>
              </div>
            )}
          </Section>
          <Section id="challenges" title="Challenges, limitations and lessons">
            <Paragraphs section={detail.challenges} empty="Not yet documented." />
          </Section>
          <Section id="applications" title="Sustainability and applications">
            <Paragraphs section={detail.applications} empty="Not yet documented." />
          </Section>
          <Section id="team" title="Team and mentors">
            {contributors.length + mentors.length > 0 ? (
              <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {[...mentors, ...contributors].map((person) => (
                  <li key={person.id}>
                    <ProfileCard person={person} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">
                Team and mentor to be announced.{' '}
                <Link to="/get-involved#students" className="link">
                  Interested in joining?
                </Link>
              </p>
            )}
          </Section>
          <Section id="future" title="Future development">
            <Paragraphs section={detail.future} empty="Not yet documented." />
          </Section>
        </div>
      </div>

      <nav aria-label="More projects" className="border-t border-line bg-mist">
        <div className="shell grid gap-4 py-8 sm:grid-cols-3 sm:items-center">
          <div>
            {prev ? (
              <Link to={`/projects/${prev.slug}`} className="group block">
                <span className="block text-sm text-muted">Previous project</span>
                <span className="font-medium text-navy group-hover:text-brand group-hover:underline">{prev.title}</span>
              </Link>
            ) : null}
          </div>
          <div className="sm:text-center">
            <ButtonLink to="/projects" variant="secondary">
              All projects
            </ButtonLink>
          </div>
          <div className="sm:text-right">
            {next ? (
              <Link to={`/projects/${next.slug}`} className="group block">
                <span className="block text-sm text-muted">Next project</span>
                <span className="font-medium text-navy group-hover:text-brand group-hover:underline">{next.title}</span>
              </Link>
            ) : null}
          </div>
        </div>
      </nav>
    </article>
  )
}

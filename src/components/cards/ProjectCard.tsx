import { Link } from 'react-router'
import type { Project } from '../../content/types'
import { categoryLabel } from '../../content/taxonomy'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { SchematicPanel } from '../diagrams/Schematic'
import { PlaceholderTag, StatusBadge } from '../ui/Badges'
import { cn } from '../../lib/format'

export function ProjectCover({ project, className, sizes }: { project: Project; className?: string; sizes: string }) {
  return project.cover ? (
    <ResponsiveImage image={project.cover} sizes={sizes} fallback={project.schematic} className={className} />
  ) : (
    <SchematicPanel kind={project.schematic} className={className} />
  )
}

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <StatusBadge status={project.status} />
      {project.placeholder ? <PlaceholderTag label="Concept placeholder" /> : null}
      {project.period ? <span className="text-meta text-muted">{project.period}</span> : null}
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  headingLevel?: 'h2' | 'h3'
  className?: string
}

/** Grid card: cover above, text below. The whole card is one link target. */
export function ProjectCard({ project, headingLevel: H = 'h3', className }: ProjectCardProps) {
  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="overflow-hidden rounded-sm border border-line transition-colors group-hover:border-brand/50">
        <ProjectCover
          project={project}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="aspect-[4/3] w-full"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <Meta project={project} />
        <H className="title-card mt-3">
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4"
          >
            {project.title}
          </Link>
        </H>
        <p className="mt-2 text-small text-muted">{project.summary}</p>
        <p className="mt-auto pt-4 text-sm text-ink/70">
          {project.categories.map(categoryLabel).join(', ')}
        </p>
      </div>
    </article>
  )
}

/** Wide variant used for the lead item on the home page. */
export function ProjectFeature({ project }: { project: Project }) {
  return (
    <article className="group relative grid gap-6 md:grid-cols-[1.15fr_1fr] md:gap-10">
      <div className="overflow-hidden rounded-sm border border-line transition-colors group-hover:border-brand/50">
        <ProjectCover project={project} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[16/10] w-full" />
      </div>
      <div className="flex flex-col justify-center">
        <Meta project={project} />
        <h3 className="h-sub mt-4">
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-muted">{project.summary}</p>
        <p className="mt-5 text-sm text-ink/70">{project.categories.map(categoryLabel).join(', ')}</p>
      </div>
    </article>
  )
}

/** Compact row variant: small schematic, title and status. */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="group relative flex gap-4 py-5">
      <div className="w-20 shrink-0 overflow-hidden rounded-xs border border-line sm:w-24">
        <ProjectCover project={project} sizes="96px" className="aspect-square w-full" />
      </div>
      <div className="min-w-0">
        <h3 className="title-card">
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand group-hover:underline group-hover:underline-offset-4"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{project.summary}</p>
        <div className="mt-2.5">
          <Meta project={project} />
        </div>
      </div>
    </article>
  )
}

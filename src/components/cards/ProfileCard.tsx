import { ExternalLink } from 'lucide-react'
import type { Person } from '../../content/types'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { PlaceholderTag, Tag } from '../ui/Badges'
import { cn } from '../../lib/format'

/** Portrait, or an outlined silhouette slot when no approved photo exists. */
export function Portrait({ person, className }: { person: Person; className?: string }) {
  if (person.photo) {
    return (
      <ResponsiveImage
        image={person.photo}
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 45vw"
        className={cn('aspect-square w-full', className)}
      />
    )
  }
  return (
    <div className={cn('grid-paper grid aspect-square w-full place-items-end justify-center overflow-hidden', className)}>
      <svg viewBox="0 0 100 100" className="h-4/5 text-brand/35" aria-hidden="true">
        <circle cx="50" cy="38" r="17" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M14 100c2-22 17-34 36-34s34 12 36 34" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
      <span className="sr-only">Photo not yet supplied</span>
    </div>
  )
}

export function ProfileCard({ person, headingLevel: H = 'h3' }: { person: Person; headingLevel?: 'h3' | 'h4' }) {
  return (
    <article className="flex flex-col">
      <div className="overflow-hidden rounded-sm border border-line">
        <Portrait person={person} />
      </div>
      <div className="mt-4">
        {person.placeholder ? <PlaceholderTag label="Profile slot" /> : null}
        <H className={cn('title-card', person.placeholder ? 'mt-2 text-muted' : '')}>
          {person.name}
        </H>
        <p className="mt-0.5 text-small font-medium text-brand">{person.role}</p>
        <p className="mt-2 text-sm text-muted">{person.bio}</p>
        {person.interests.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technical interests">
            {person.interests.map((interest) => (
              <li key={interest}>
                <Tag>{interest}</Tag>
              </li>
            ))}
          </ul>
        ) : null}
        {person.links.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {person.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
                  {link.label}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

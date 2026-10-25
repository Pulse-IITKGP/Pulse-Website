import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/format'

interface SectionHeadingProps {
  id: string
  title: string
  intro?: ReactNode
  action?: { to: string; label: string }
  className?: string
  /** Heading level; sections inside a page are h2 by default. */
  as?: 'h2' | 'h3'
}

/**
 * Section heading with the "stream rule": a hairline with a short blue flow
 * segment and arrowhead, borrowed from process flow diagrams.
 */
export function SectionHeading({ id, title, intro, action, className, as: H = 'h2' }: SectionHeadingProps) {
  return (
    <div className={cn('mb-8 md:mb-10', className)}>
      <StreamRule />
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="max-w-2xl">
          <H id={id} className="h-section">
            {title}
          </H>
          {intro ? <div className="mt-3 text-body-lg text-muted">{intro}</div> : null}
        </div>
        {action ? (
          <Link to={action.to} className="link shrink-0 font-medium">
            {action.label}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export function StreamRule({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <div className="relative h-px" aria-hidden="true">
      <div className={cn('absolute inset-0', tone === 'light' ? 'bg-line' : 'bg-white/15')} />
      <div className={cn('absolute left-0 top-0 h-px w-14', tone === 'light' ? 'bg-brand' : 'bg-on-navy')} />
      <svg
        className={cn('absolute -top-[4px] left-14', tone === 'light' ? 'text-brand' : 'text-on-navy')}
        width="7"
        height="9"
        viewBox="0 0 7 9"
      >
        <path d="M0 0l7 4.5L0 9z" fill="currentColor" />
      </svg>
    </div>
  )
}

import type { ReactNode } from 'react'
import type { ProjectStatus } from '../../content/types'
import { statusLabel } from '../../content/taxonomy'
import { cn } from '../../lib/format'

const statusStyles: Record<ProjectStatus, string> = {
  proposed: 'border-dashed border-line-strong text-muted bg-white',
  'in-progress': 'border-brand/30 bg-mist text-brand',
  completed: 'border-navy bg-navy text-white',
}

const statusDot: Record<ProjectStatus, string> = {
  proposed: 'border border-line-strong',
  'in-progress': 'bg-brand',
  completed: 'bg-white',
}

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-xs border px-2 py-0.5 text-meta font-medium',
        statusStyles[status],
        className,
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5 rounded-full', statusDot[status])} />
      <span className="sr-only">Status: </span>
      {statusLabel(status)}
    </span>
  )
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-xs bg-mist px-2 py-0.5 text-meta text-ink/80', className)}>
      {children}
    </span>
  )
}

/** Marks content that has not been verified by the PULSE team. */
export function PlaceholderTag({ className, label = 'Placeholder' }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-xs border border-signal-line px-2 py-0.5 text-meta font-medium text-signal-ink',
        className,
      )}
      title="This entry is a stand-in and has not been verified."
    >
      {label}
    </span>
  )
}

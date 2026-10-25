import type { ReactNode } from 'react'
import type { SchematicKind } from '../../content/types'
import { Schematic } from '../diagrams/Schematic'
import { cn } from '../../lib/format'

interface EmptyStateProps {
  title: string
  children: ReactNode
  action?: ReactNode
  schematic?: SchematicKind
  className?: string
  headingLevel?: 'h2' | 'h3'
}

/** An intentional "nothing here yet" panel with a next step. */
export function EmptyState({ title, children, action, schematic = 'vessel', className, headingLevel = 'h3' }: EmptyStateProps) {
  const H = headingLevel
  return (
    <div
      className={cn(
        'flex flex-col gap-5 rounded-sm border border-dashed border-line-strong/60 bg-white p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8',
        className,
      )}
    >
      <Schematic kind={schematic} className="size-16 shrink-0 text-brand/70" />
      <div className="max-w-xl">
        <H className="title-card">{title}</H>
        <div className="mt-2 text-muted">{children}</div>
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  )
}

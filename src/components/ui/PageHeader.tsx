import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { cn } from '../../lib/format'

interface PageHeaderProps {
  title: string
  lede?: ReactNode
  crumbs: Crumb[]
  /** Optional right-hand column: a schematic, a fact list or an image. */
  aside?: ReactNode
  className?: string
}

/** Opening block for inner pages: breadcrumb, title, lede and optional aside. */
export function PageHeader({ title, lede, crumbs, aside, className }: PageHeaderProps) {
  return (
    <header className={cn('border-b border-line bg-white', className)}>
      <div className="shell grid gap-8 pt-8 pb-12 md:pt-10 md:pb-16 lg:grid-cols-12 lg:gap-10">
        <div className={aside ? 'lg:col-span-7' : 'lg:col-span-9'}>
          <Breadcrumbs items={crumbs} />
          <h1 className="display mt-6 md:mt-8">{title}</h1>
          {lede ? <div className="lede mt-5">{lede}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-5 lg:self-end">{aside}</div> : null}
      </div>
    </header>
  )
}

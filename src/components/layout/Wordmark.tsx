import { cn } from '../../lib/format'

/**
 * PULSE wordmark: the logo (public/images/logo.png) beside the name.
 * The logo file has a white background, so on dark surfaces it sits on a white tile.
 */
export function Wordmark({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const ink = tone === 'dark' ? 'text-navy' : 'text-white'
  return (
    <span translate="no" className={cn('inline-flex items-center gap-2.5', ink, className)}>
      <img
        src="/images/logo.png"
        alt=""
        width={156}
        height={120}
        className={cn('h-9 w-auto shrink-0', tone === 'light' ? 'rounded-xs bg-white p-1' : '')}
      />
      <span className="leading-none">
        <span className="block text-[1.35rem] font-bold tracking-[0.04em] [font-stretch:80%]">
          PULSE
        </span>
        <span className={cn('mt-0.5 block whitespace-nowrap text-[0.75rem] font-medium tracking-[0.02em]', tone === 'dark' ? 'text-muted' : 'text-on-navy')}>
          Innovation Hub
        </span>
      </span>
    </span>
  )
}

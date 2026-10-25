import { MapPin } from 'lucide-react'
import type { Activity } from '../../content/types'
import { activityLabel } from '../../content/taxonomy'
import { formatDate } from '../../lib/format'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { PlaceholderTag } from '../ui/Badges'
import { VideoEmbed } from '../ui/VideoEmbed'

/**
 * Activity as a schedule row: date column, then details. Rows read better
 * than cards for event listings and keep dates scannable.
 */
export function ActivityRow({ activity, headingLevel: H = 'h3' }: { activity: Activity; headingLevel?: 'h2' | 'h3' }) {
  return (
    <article className="grid gap-x-8 gap-y-3 py-6 sm:grid-cols-[10rem_1fr] md:grid-cols-[12rem_1fr_auto]">
      <div className="text-sm">
        {activity.date ? (
          <time dateTime={activity.date} className="tabular font-medium text-navy">
            {formatDate(activity.date)}
          </time>
        ) : (
          <span className="text-muted">Date to be confirmed</span>
        )}
        <p className="mt-1 text-muted">{activityLabel(activity.category)}</p>
      </div>
      <div className="max-w-2xl">
        <H className="title-card">
          {activity.title}
        </H>
        <p className="mt-1.5 text-muted">{activity.summary}</p>
        {activity.image ? (
          <div className="mt-4 max-w-lg overflow-hidden rounded-sm border border-line">
            <ResponsiveImage image={activity.image} sizes="(min-width: 768px) 32rem, 100vw" className="aspect-[3/2] w-full" />
          </div>
        ) : null}
        {activity.location ? (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink/80">
            <MapPin className="size-4 text-brand" aria-hidden="true" />
            {activity.location}
          </p>
        ) : null}
        {activity.videoUrl ? (
          <div className="mt-4 max-w-lg">
            <VideoEmbed url={activity.videoUrl} title={activity.title} />
          </div>
        ) : null}
      </div>
      <div className="flex items-start gap-3 md:justify-end">
        {activity.placeholder ? <PlaceholderTag label="Placeholder format" /> : null}
      </div>
    </article>
  )
}

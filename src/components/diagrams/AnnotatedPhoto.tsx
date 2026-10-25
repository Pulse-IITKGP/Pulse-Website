import type { ImageAsset } from '../../content/types'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { cn } from '../../lib/format'

export interface Callout {
  /** Point on the source image, in the image's own pixel coordinates. */
  x: number
  y: number
  /** Leader line path relative to the point, ending where the label starts. */
  leader: string
  label: string
  labelX: number
  labelY: number
  anchor?: 'start' | 'end'
}

interface AnnotatedPhotoProps {
  image: ImageAsset
  /** Width and height of the coordinate space the callouts were measured in. */
  space: { w: number; h: number }
  callouts: Callout[]
  sizes: string
  className?: string
  priority?: boolean
}

/**
 * A photograph marked up like an engineer's redline: leader lines, markers and
 * labels. The <img> and the SVG overlay crop identically (cover, centred), so
 * callouts stay on their targets at every aspect ratio.
 */
export function AnnotatedPhoto({ image, space, callouts, sizes, className, priority }: AnnotatedPhotoProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <ResponsiveImage
        image={image}
        sizes={sizes}
        priority={priority}
        fallback="column"
        className="absolute inset-0 size-full object-center"
      />
      <svg
        viewBox={`0 0 ${space.w} ${space.h}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        {callouts.map((c, i) => (
          <g key={c.label} className="callout" style={{ animationDelay: `${300 + i * 220}ms` }}>
            <path
              d={`M${c.x} ${c.y}${c.leader}`}
              pathLength={1}
              fill="none"
              stroke="#fff"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d={`M${c.x} ${c.y}${c.leader}`}
              pathLength={1}
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="3"
              strokeLinecap="round"
              className="callout-line"
            />
            <circle cx={c.x} cy={c.y} r="11" fill="#fff" stroke="var(--color-brand)" strokeWidth="3" />
            <circle cx={c.x} cy={c.y} r="4.5" fill="var(--color-signal)" />
            <g className="callout-label max-sm:hidden">
              <text
                x={c.labelX}
                y={c.labelY}
                textAnchor={c.anchor ?? 'start'}
                dominantBaseline="middle"
                fill="var(--color-navy)"
                stroke="#fff"
                strokeWidth="8"
                strokeLinejoin="round"
                paintOrder="stroke"
                fontSize="25"
                fontWeight="600"
                style={{ fontStretch: '90%' }}
              >
                {c.label}
              </text>
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}

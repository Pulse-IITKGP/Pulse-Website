import { useState } from 'react'
import type { ImageAsset, SchematicKind } from '../../content/types'
import { SchematicPanel } from '../diagrams/Schematic'
import { cn } from '../../lib/format'

interface ResponsiveImageProps {
  image: ImageAsset
  /** `sizes` attribute describing the rendered width. */
  sizes: string
  className?: string
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean
  /** Shown if the file fails to load. */
  fallback?: SchematicKind
  /** Empty alt for decorative use next to a text equivalent. */
  decorative?: boolean
  fit?: 'cover' | 'contain'
}

export function ResponsiveImage({
  image,
  sizes,
  className,
  priority = false,
  fallback = 'vessel',
  decorative = false,
  fit = 'cover',
}: ResponsiveImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const largest = image.widths[image.widths.length - 1]
  const src = `${image.base}-${largest}.webp`

  // Compare against the current src so a new image retries automatically.
  if (failedSrc === src) {
    return (
      <SchematicPanel
        kind={fallback}
        className={className}
        label={decorative ? undefined : 'Image unavailable'}
      />
    )
  }

  return (
    <img
      src={src}
      srcSet={image.widths.map((w) => `${image.base}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      width={largest}
      height={Math.round(largest / image.ratio)}
      alt={decorative ? '' : image.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailedSrc(src)}
      className={cn('bg-mist', fit === 'cover' ? 'object-cover' : 'object-contain', className)}
    />
  )
}

import { useState } from 'react'
import { Play } from 'lucide-react'
import { parseVideoUrl } from '../../lib/video'

/**
 * Click-to-load video. Nothing is fetched from the video provider until the
 * visitor presses play, and nothing autoplays on page load.
 */
export function VideoEmbed({ url, title }: { url: string; title: string }) {
  const [active, setActive] = useState(false)
  const video = parseVideoUrl(url)

  if (!video) {
    return (
      <p className="rounded-sm border border-line bg-mist p-4 text-sm text-muted">
        This video link isn’t a supported YouTube or Vimeo address.{' '}
        <a href={url} className="link" target="_blank" rel="noreferrer">
          Open the video in a new tab
        </a>
        .
      </p>
    )
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-sm bg-navy">
      {active ? (
        <iframe
          src={video.embedUrl}
          title={title}
          className="absolute inset-0 size-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 flex items-center justify-center text-white"
        >
          {video.thumbnailUrl ? (
            <img src={video.thumbnailUrl} alt="" width={480} height={360} loading="lazy" className="absolute inset-0 size-full object-cover opacity-70" />
          ) : null}
          <span className="relative flex items-center gap-3 rounded-sm bg-navy/85 px-4 py-3 font-medium transition-colors group-hover:bg-brand">
            <Play className="size-5" aria-hidden="true" />
            Play video<span className="sr-only">: {title}</span>
          </span>
        </button>
      )}
    </div>
  )
}

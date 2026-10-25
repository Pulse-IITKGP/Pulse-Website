export interface VideoSource {
  provider: 'youtube' | 'vimeo'
  id: string
  /** Embed URL. Autoplay is requested only after the visitor presses play. */
  embedUrl: string
  thumbnailUrl?: string
}

const YOUTUBE = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
const VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/

/** Parse a YouTube or Vimeo URL. Returns null for anything else. */
export function parseVideoUrl(url: string | undefined): VideoSource | null {
  if (!url) return null
  const yt = YOUTUBE.exec(url)
  if (yt) {
    return {
      provider: 'youtube',
      id: yt[1],
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`,
      thumbnailUrl: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
    }
  }
  const vimeo = VIMEO.exec(url)
  if (vimeo) {
    return { provider: 'vimeo', id: vimeo[1], embedUrl: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1` }
  }
  return null
}

import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '../../content/types'
import { activityLabel } from '../../content/taxonomy'
import { ResponsiveImage } from './ResponsiveImage'
import { PlaceholderTag } from './Badges'

/**
 * Responsive photo grid with a lightbox built on the native <dialog> element,
 * which provides focus trapping, Escape-to-close and a backdrop for free.
 */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const current = items[index]
  // A 2×2 lead tile only when the remaining tiles fill the grid without gaps.
  const leadTile = items.length > 1 && (items.length - 1) % 4 === 0

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const step = (delta: number) => setIndex((i) => (i + delta + items.length) % items.length)

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {items.map((item, i) => (
          <li key={item.id} className={leadTile && i === 0 ? 'col-span-2 row-span-2' : ''}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block size-full overflow-hidden rounded-sm border border-line"
            >
              <ResponsiveImage
                image={item.image}
                sizes={leadTile && i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
                className="aspect-square size-full transition-transform duration-300 group-hover:scale-[1.03]"
                decorative
              />
              <span className="sr-only">
                Open photo {i + 1} of {items.length}: {item.caption}
              </span>
              {item.placeholder ? (
                <span className="absolute top-2 left-2">
                  <PlaceholderTag />
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        className="m-auto w-[min(64rem,calc(100vw-2rem))] max-w-none overscroll-contain rounded-sm bg-white p-0 backdrop:bg-navy/80"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => {
          // Clicking the backdrop (the dialog element itself) closes it.
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
      >
        {current ? (
          <figure>
            <div className="bg-navy">
              <ResponsiveImage
                image={current.image}
                sizes="(min-width: 1024px) 64rem, 100vw"
                fit="contain"
                className="mx-auto h-auto max-h-[70vh] w-auto max-w-full"
              />
            </div>
            <figcaption className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
              <div>
                <p className="text-sm text-muted">
                  {activityLabel(current.category)}, photo {index + 1} of {items.length}
                </p>
                <p className="mt-1 text-ink">{current.caption}</p>
                {current.image.credit ? <p className="mt-1 text-meta text-muted">{current.image.credit}</p> : null}
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => step(-1)} className="grid size-11 place-items-center rounded-sm border border-line hover:bg-mist" aria-label="Previous photo">
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} className="grid size-11 place-items-center rounded-sm border border-line hover:bg-mist" aria-label="Next photo">
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => dialogRef.current?.close()}
                  className="grid size-11 place-items-center rounded-sm bg-navy text-white hover:bg-brand"
                  aria-label="Close photo viewer"
                  autoFocus
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  )
}

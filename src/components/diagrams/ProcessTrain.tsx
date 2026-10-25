import { Link } from 'react-router'
import type { Pillar } from '../../content/pillars'
import { Schematic } from './Schematic'

/**
 * The four pillars drawn as a process train: equipment symbols joined by a
 * single pipe, the way units are connected on a flow diagram. Vertical on
 * small screens, horizontal from lg up.
 */
export function ProcessTrain({ pillars }: { pillars: Pillar[] }) {
  return (
    <ol className="relative grid gap-0 lg:grid-cols-4 lg:gap-8">
      {/* Horizontal pipe behind the symbols (lg+) */}
      <div aria-hidden="true" className="absolute top-[3.75rem] right-0 left-0 hidden h-0.5 bg-brand/25 lg:block" />
      {pillars.map((pillar, i) => (
        <li
          key={pillar.letter}
          className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0"
        >
          {/* Vertical pipe segment (mobile) */}
          {i < pillars.length - 1 ? (
            <div aria-hidden="true" className="absolute top-14 bottom-0 left-7 w-0.5 -translate-x-1/2 bg-brand/25 lg:hidden" />
          ) : null}

          <div className="relative flex flex-col items-center lg:mb-6 lg:h-[7.5rem] lg:flex-row lg:items-center lg:gap-4">
            <span
              aria-hidden="true"
              className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-2 border-brand bg-white text-2xl font-semibold text-navy [font-stretch:82%]"
            >
              {pillar.letter}
              <span className="absolute inset-x-1.5 top-1/2 h-px bg-brand/30" />
            </span>
            <span className="relative z-10 hidden bg-white px-1 text-brand lg:block">
              <Schematic kind={pillar.schematic} className="size-24" />
            </span>
            {i < pillars.length - 1 ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 8 10"
                className="absolute top-1/2 -right-6 hidden h-2.5 w-2 -translate-y-1/2 text-brand/60 lg:block"
              >
                <path d="M0 0l8 5-8 5z" fill="currentColor" />
              </svg>
            ) : null}
          </div>

          <div>
            <h3 className="h-sub">{pillar.name}</h3>
            <p className="mt-2 text-muted">{pillar.summary}</p>
            <Link to={pillar.link.to} className="link mt-3 inline-block text-small font-medium">
              {pillar.link.label}
            </Link>
          </div>
        </li>
      ))}
    </ol>
  )
}

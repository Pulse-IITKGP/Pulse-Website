import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import { primaryNav } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { Wordmark } from './Wordmark'
import { cn } from '../../lib/format'

// The current page is boxed in orange; other links reserve the same border so nothing shifts.
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex min-h-10 items-center rounded-xs border px-3 text-base font-medium transition-colors',
    isActive ? 'border-signal-line text-navy' : 'border-transparent text-ink/75 hover:border-line hover:text-brand',
  )

export function Header() {
  const location = useLocation()
  // The menu belongs to the location it was opened on; any navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === location.key
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const background = [document.getElementById('main'), document.getElementById('site-footer')]
    root.style.overflow = 'hidden'
    background.forEach((el) => el?.setAttribute('inert', ''))
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenOn(null)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = ''
      background.forEach((el) => el?.removeAttribute('inert'))
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/85">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link to="/" aria-label="PULSE Hub home" className="-ml-1 rounded-sm p-1">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink to="/get-involved" className="max-sm:hidden">
            Get involved
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-sm text-navy hover:bg-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenOn(open ? null : location.key)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
    </header>

    {/* Sibling of <header>: its backdrop-filter would otherwise become the containing block for this fixed panel. */}
    <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="shell py-6">
          <ul className="divide-y divide-line border-y border-line">
            {[{ to: '/', label: 'Home' }, ...primaryNav].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-14 items-center justify-between text-lg font-medium',
                      isActive ? 'text-navy' : 'text-ink/80',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive ? (
                        <span className="flex items-center gap-2 text-sm font-normal text-signal-ink">
                          <span aria-hidden="true" className="size-2 rounded-full bg-signal" />
                          Current page
                        </span>
                      ) : null}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <ButtonLink to="/get-involved" size="lg" className="mt-8 w-full">
            Get involved
          </ButtonLink>
        </nav>
      </div>
    </>
  )
}

import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation, useNavigation } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'

/** Moves focus to new content after client-side navigation and honours #hash links. */
function useRouteFocus() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      if (!hash) return
    }
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      target.scrollIntoView({ block: 'start' })
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname, hash])
}

export function SiteLayout() {
  const navigation = useNavigation()
  useRouteFocus()

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-sm bg-navy px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div
        aria-hidden="true"
        className={`fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-signal transition-transform duration-500 ${
          navigation.state === 'idle' ? 'scale-x-0 opacity-0' : 'scale-x-75'
        }`}
      />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}

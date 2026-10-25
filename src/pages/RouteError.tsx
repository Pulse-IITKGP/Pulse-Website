import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { Wordmark } from '../components/layout/Wordmark'
import NotFound from './NotFound'

/**
 * Last-resort error screen. Rendered outside the normal layout because the
 * layout itself may be what failed.
 */
export default function RouteError() {
  const error = useRouteError()
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />

  // A failed lazy-route import usually means a new version was deployed.
  const chunkFailed = error instanceof Error && /dynamically imported module|Importing a module script failed/i.test(error.message)

  return (
    <div className="shell py-16">
      <Link to="/" aria-label="PULSE Hub home">
        <Wordmark />
      </Link>
      <h1 className="display mt-12">Something went wrong</h1>
      <p className="lede mt-5">
        {chunkFailed
          ? 'Part of this page could not be loaded, possibly because the site was just updated. Reloading usually fixes it.'
          : 'This page hit an unexpected error. Reload to try again, or return to the home page.'}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex min-h-12 items-center rounded-sm bg-brand px-5 font-medium text-white hover:bg-brand-strong"
        >
          Reload the page
        </button>
        <a href="/" className="inline-flex min-h-12 items-center rounded-sm border border-brand/40 px-5 font-medium text-brand hover:bg-mist">
          Go to the home page
        </a>
      </div>
    </div>
  )
}

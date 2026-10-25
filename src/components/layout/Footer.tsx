import { Link } from 'react-router'
import { primaryNav, site } from '../../content/site'
import { Wordmark } from './Wordmark'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer id="site-footer" className="on-dark bg-navy text-on-navy">
      <div className="shell grid gap-10 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Wordmark tone="light" />
          <p className="mt-5 max-w-sm text-small leading-relaxed tracking-[0.005em]">
            {site.expansion}. {site.descriptor}
            {site.institution ? `, ${site.institution}` : ''}.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="label text-white">
            Site
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
            {[{ to: '/', label: 'Home' }, ...primaryNav, { to: '/get-involved', label: 'Get involved' }].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="inline-flex min-h-9 items-center hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="label text-white">
            Contact
          </h2>
          <dl className="mt-4 space-y-3 text-small">
            <div>
              <dt className="text-meta text-on-navy/80">Email</dt>
              <dd className="text-white">
                {site.contact.email ? (
                  <a href={`mailto:${site.contact.email}`} className="hover:underline">
                    {site.contact.email}
                  </a>
                ) : (
                  'To be confirmed'
                )}
              </dd>
            </div>
            <div>
              <dt className="text-meta text-on-navy/80">Location</dt>
              <dd className="text-white">{site.contact.location ?? 'Chemical Engineering department (details to be confirmed)'}</dd>
            </div>
            <div>
              <dt className="text-meta text-on-navy/80">Social</dt>
              <dd>
                {site.social.length > 0 ? (
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {site.social.map((s) => (
                      <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noreferrer" className="text-white hover:underline">
                          {s.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-white">Channels will be listed once confirmed</span>
                )}
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-sm">
            Prefer to write?{' '}
            <Link to="/get-involved#contact" className="text-white underline underline-offset-4 hover:text-signal-wash">
              Use the contact form
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Student and faculty initiative.
          </p>
          <p className="flex flex-wrap gap-x-5">
            <span>Entries tagged “Placeholder” are awaiting verification.</span>
            <Link to="/credits" className="text-white hover:underline">
              Image credits
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

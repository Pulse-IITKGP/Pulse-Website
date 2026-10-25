import { usePageMeta } from '../lib/usePageMeta'
import { Schematic } from '../components/diagrams/Schematic'
import { ButtonLink } from '../components/ui/Button'

export default function NotFound({ kind = 'page' }: { kind?: 'page' | 'project' }) {
  usePageMeta(
    kind === 'project' ? 'Project not found' : 'Page not found',
    'The page you were looking for does not exist on the PULSE Hub site.',
  )
  return (
    <section className="shell grid gap-10 py-20 md:grid-cols-12 md:py-28">
      <div className="md:col-span-7">
        <p className="label tabular text-muted">Error 404</p>
        <h1 className="display mt-3">{kind === 'project' ? 'Project not found' : 'Page not found'}</h1>
        <p className="lede mt-5">
          {kind === 'project'
            ? 'This project may have been renamed or removed. The project directory lists everything currently published.'
            : 'The address may be mistyped, or the page may have moved. Try one of these instead.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to={kind === 'project' ? '/projects' : '/'} size="lg">
            {kind === 'project' ? 'Browse all projects' : 'Go to the home page'}
          </ButtonLink>
          <ButtonLink to="/get-involved#contact" variant="secondary" size="lg">
            Contact the team
          </ButtonLink>
        </div>
      </div>
      <div className="hidden text-brand/60 md:col-span-5 md:grid md:place-items-center">
        <Schematic kind="loop" className="size-56" />
      </div>
    </section>
  )
}

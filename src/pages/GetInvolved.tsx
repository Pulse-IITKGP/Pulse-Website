import { useState } from 'react'
import { useLocation } from 'react-router'
import { involvementPaths, type InterestId } from '../content/involvement'
import { site } from '../content/site'
import { usePageMeta } from '../lib/usePageMeta'
import { PageHeader } from '../components/ui/PageHeader'
import { StreamRule } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { InterestForm } from '../components/forms/InterestForm'

export default function GetInvolved() {
  usePageMeta(
    'Get involved',
    'Join a PULSE project team, propose a project, mentor as faculty, or partner with PULSE as industry, alumni or a sponsor.',
  )
  const { hash } = useLocation()

  // Arriving at #faculty, #industry etc. pre-selects the matching interest.
  const [preset, setPreset] = useState<{ interest: InterestId; seq: number } | undefined>(() => {
    const path = involvementPaths.find((p) => `#${p.id}` === hash)
    return path ? { interest: path.interest, seq: 1 } : undefined
  })

  const choose = (interest: InterestId) => {
    setPreset((prev) => ({ interest, seq: (prev?.seq ?? 0) + 1 }))
    const form = document.getElementById('contact')
    form?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    requestAnimationFrame(() => form?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true }))
  }

  return (
    <>
      <PageHeader
        title="Get involved"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Get involved' }]}
        lede={<p>Students, faculty, industry, alumni and sponsors each have a way in. Pick the one that fits you.</p>}
        aside={
          <nav aria-label="Ways to take part" className="rounded-sm border border-line bg-white">
            <ul className="divide-y divide-line text-small">
              {involvementPaths.map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="flex min-h-12 items-center justify-between gap-3 px-4 hover:bg-mist hover:text-brand">
                    <span className="font-medium">{p.title}</span>
                    <span className="text-sm text-muted">{p.audience}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <div className="shell py-12 md:py-16">
        {involvementPaths.map((path) => (
          <section
            key={path.id}
            id={path.id}
            aria-labelledby={`${path.id}-title`}
            className="grid gap-6 border-b border-line py-10 first:pt-0 md:grid-cols-12 md:gap-10"
          >
            <div className="md:col-span-5">
              <p className="text-sm font-medium text-brand">{path.audience}</p>
              <h2 id={`${path.id}-title`} className="h-sub mt-1">
                {path.title}
              </h2>
              <p className="mt-3 text-muted">{path.summary}</p>
            </div>
            <div className="md:col-span-7">
              <ol className="space-y-3">
                {path.steps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="tabular grid size-7 shrink-0 place-items-center rounded-full border border-brand/40 text-sm font-medium text-brand"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              <Button variant="secondary" className="mt-6" onClick={() => choose(path.interest)}>
                {path.cta}
              </Button>
            </div>
          </section>
        ))}
      </div>

      <section id="contact" aria-labelledby="contact-title" className="bg-mist py-16 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <StreamRule />
            <h2 id="contact-title" className="h-section mt-6">
              Contact and interest form
            </h2>
            <p className="mt-4 text-muted">
              Tell us who you are and what you’re interested in. The student coordinators will pass your message to
              the right person.
            </p>
            <p className="mt-4 text-sm text-muted">
              {site.contact.email ? (
                <>
                  Prefer email? Write to{' '}
                  <a href={`mailto:${site.contact.email}`} className="link">
                    {site.contact.email}
                  </a>
                  .
                </>
              ) : (
                'A direct email address will be listed here once confirmed.'
              )}
            </p>
          </div>
          <div className="rounded-sm border border-line bg-white p-5 sm:p-8 lg:col-span-8">
            <InterestForm preset={preset} />
          </div>
        </div>
      </section>
    </>
  )
}

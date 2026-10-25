import { people } from '../content/people'
import { personGroups } from '../content/taxonomy'
import { usePageMeta } from '../lib/usePageMeta'
import { PageHeader } from '../components/ui/PageHeader'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EmptyState } from '../components/ui/EmptyState'
import { ProfileCard } from '../components/cards/ProfileCard'
import { ButtonLink } from '../components/ui/Button'
import { CallToAction } from '../components/layout/CallToAction'

const groups = personGroups.map((group) => ({
  ...group,
  members: people.filter((p) => p.group === group.id),
}))

const hasPlaceholders = people.some((p) => p.placeholder)

export default function People() {
  usePageMeta('People', 'Student leadership, project teams, faculty advisors, alumni and collaborators at PULSE.')

  return (
    <>
      <PageHeader
        title="People"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'People' }]}
        lede={
          <p>
            PULSE is run by students and guided by faculty. Profiles are published only with each person’s approval.
          </p>
        }
        aside={
          hasPlaceholders ? (
            <p className="rounded-sm border border-signal-line p-4 text-sm text-ink">
              Names and photos have not been supplied yet, so this page shows empty profile slots. No real people
              are named here until they’ve confirmed their details.
            </p>
          ) : undefined
        }
      />

      <nav aria-label="On this page" className="border-b border-line bg-white">
        <ul className="shell flex gap-6 overflow-x-auto py-3 text-sm whitespace-nowrap">
          {groups.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`} className="inline-flex min-h-10 items-center text-muted hover:text-brand">
                {g.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {groups.map((group, i) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-title`}
          className={i % 2 === 1 ? 'bg-mist py-16 md:py-20' : 'py-16 md:py-20'}
        >
          <div className="shell">
            <SectionHeading id={`${group.id}-title`} title={group.label} intro={group.intro} />
            {group.members.length > 0 ? (
              <ul className="grid grid-cols-1 gap-x-6 gap-y-10 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {group.members.map((person) => (
                  <li key={person.id}>
                    <ProfileCard person={person} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title={`No ${group.label.toLowerCase()} listed yet`}
                schematic="loop"
                action={
                  <ButtonLink to="/get-involved#alumni" variant="secondary">
                    Get in touch
                  </ButtonLink>
                }
              >
                If you’re a former member or collaborator and would like to be listed, get in touch through the
                contact form.
              </EmptyState>
            )}
          </div>
        </section>
      ))}

      <CallToAction />
    </>
  )
}

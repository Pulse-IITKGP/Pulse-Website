import type { Person } from './types'

/**
 * People directory.
 *
 * Every entry below is an EMPTY SLOT. No real names, titles or affiliations
 * have been supplied yet, so none are shown. To publish a profile, replace the
 * name, role and bio with details the person has approved, add a photo, and
 * remove `placeholder: true`.
 *
 * Photo: add `public/images/people/<id>-800.webp` (square works best) and set
 *   photo: { base: '/images/people/<id>', widths: [800], ratio: 1, alt: 'Portrait of …' }
 */
export const people: Person[] = [
  {
    id: 'lead-coordinator',
    name: 'Name to be confirmed',
    role: 'Student coordinator',
    group: 'leadership',
    bio: 'Coordinates the hub’s calendar, project intake and communication with faculty advisors.',
    interests: [],
    links: [],
    placeholder: true,
  },
  {
    id: 'lead-technical',
    name: 'Name to be confirmed',
    role: 'Technical lead',
    group: 'leadership',
    bio: 'Oversees build quality, lab safety checklists and design reviews across project teams.',
    interests: [],
    links: [],
    placeholder: true,
  },
  {
    id: 'lead-outreach',
    name: 'Name to be confirmed',
    role: 'Outreach and partnerships lead',
    group: 'leadership',
    bio: 'Organises demonstrations, visits and conversations with alumni and industry.',
    interests: [],
    links: [],
    placeholder: true,
  },
  {
    id: 'team-member-1',
    name: 'Name to be confirmed',
    role: 'Project team member',
    group: 'team',
    bio: 'Profile to be added once project teams are confirmed.',
    interests: [],
    links: [],
    placeholder: true,
  },
  {
    id: 'team-member-2',
    name: 'Name to be confirmed',
    role: 'Project team member',
    group: 'team',
    bio: 'Profile to be added once project teams are confirmed.',
    interests: [],
    links: [],
    placeholder: true,
  },
  {
    id: 'faculty-advisor-1',
    name: 'Faculty advisor to be confirmed',
    role: 'Faculty advisor',
    group: 'faculty',
    bio: 'Details will be added with the advisor’s approval.',
    interests: [],
    links: [],
    placeholder: true,
  },
  {
    id: 'faculty-advisor-2',
    name: 'Faculty advisor to be confirmed',
    role: 'Faculty advisor',
    group: 'faculty',
    bio: 'Details will be added with the advisor’s approval.',
    interests: [],
    links: [],
    placeholder: true,
  },
]

const byId = new Map(people.map((p) => [p.id, p]))

export const getPeople = (ids: readonly string[]) =>
  ids.flatMap((id) => {
    const person = byId.get(id)
    return person ? [person] : []
  })

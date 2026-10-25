import type { ActivityCategory, PersonGroup, ProjectCategory, ProjectStatus } from './types'

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: 'prototyping', label: 'Prototyping' },
  { id: 'unit-operations', label: 'Unit Operations' },
  { id: 'process-design', label: 'Process Design' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'automation', label: 'Automation and Instrumentation' },
  { id: 'entrepreneurship', label: 'Entrepreneurship' },
]

export const projectStatuses: { id: ProjectStatus; label: string }[] = [
  { id: 'proposed', label: 'Proposed' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
]

export const activityCategories: { id: ActivityCategory; label: string }[] = [
  { id: 'workshop', label: 'Workshops' },
  { id: 'demonstration', label: 'Technical demonstrations' },
  { id: 'lecture', label: 'Guest lectures' },
  { id: 'visit', label: 'Industrial visits' },
  { id: 'competition', label: 'Competitions' },
  { id: 'build-session', label: 'Build sessions' },
  { id: 'outreach', label: 'Outreach' },
]

export const personGroups: { id: PersonGroup; label: string; intro: string }[] = [
  {
    id: 'leadership',
    label: 'Student leadership',
    intro: 'Students who coordinate the hub, its projects and its events.',
  },
  {
    id: 'team',
    label: 'Project teams',
    intro: 'Members working on prototypes, studies and outreach.',
  },
  {
    id: 'faculty',
    label: 'Faculty advisors',
    intro: 'Faculty who review technical work, guide safety and mentor teams.',
  },
  {
    id: 'alumni',
    label: 'Alumni and collaborators',
    intro: 'Former members and external collaborators who stay involved.',
  },
]

const categoryLabels = new Map(projectCategories.map((c) => [c.id, c.label]))
const statusLabels = new Map(projectStatuses.map((s) => [s.id, s.label]))
const activityLabels = new Map(activityCategories.map((a) => [a.id, a.label]))

export const categoryLabel = (id: ProjectCategory) => categoryLabels.get(id) ?? id
export const statusLabel = (id: ProjectStatus) => statusLabels.get(id) ?? id
export const activityLabel = (id: ActivityCategory) => activityLabels.get(id) ?? id

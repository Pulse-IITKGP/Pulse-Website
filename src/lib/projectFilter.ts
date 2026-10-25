import type { Project, ProjectCategory, ProjectStatus } from '../content/types'
import { categoryLabel } from '../content/taxonomy'

export interface ProjectQuery {
  text: string
  category: ProjectCategory | null
  status: ProjectStatus | null
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')

// Search text is built once per project, not on every keystroke.
const searchIndex = new WeakMap<Project, string>()

function haystack(project: Project) {
  let text = searchIndex.get(project)
  if (text === undefined) {
    text = normalize(
      [project.title, project.summary, project.period ?? '', ...project.categories.map(categoryLabel)].join(' '),
    )
    searchIndex.set(project, text)
  }
  return text
}

export function filterProjects(projects: readonly Project[], query: ProjectQuery) {
  const terms = normalize(query.text).split(/\s+/).filter(Boolean)
  return projects.filter((project) => {
    if (query.category && !project.categories.includes(query.category)) return false
    if (query.status && project.status !== query.status) return false
    if (terms.length === 0) return true
    const text = haystack(project)
    return terms.every((term) => text.includes(term))
  })
}

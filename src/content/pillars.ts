import type { SchematicKind } from './types'

export interface Pillar {
  letter: 'P' | 'U' | 'L' | 'SE'
  name: string
  summary: string
  schematic: SchematicKind
  link: { to: string; label: string }
}

export const pillars: Pillar[] = [
  {
    letter: 'P',
    name: 'Prototypes',
    summary: 'Turn a sketch into hardware. Teams design, build and test bench-scale rigs to see whether an idea holds up.',
    schematic: 'reactor',
    link: { to: '/projects?category=prototyping', label: 'Prototyping projects' },
  },
  {
    letter: 'U',
    name: 'Unit Operations',
    summary:
      'Distillation, heat exchange, filtration, drying. The building blocks of every process plant, studied hands-on.',
    schematic: 'column',
    link: { to: '/explore#unit-operations', label: 'Unit operations lab' },
  },
  {
    letter: 'L',
    name: 'Leadership',
    summary:
      'Students run the projects: scoping, scheduling, mentoring juniors and presenting results to faculty and industry.',
    schematic: 'loop',
    link: { to: '/people', label: 'Meet the people' },
  },
  {
    letter: 'SE',
    name: 'Sustainable Entrepreneurship',
    summary:
      'Ask who would use it, what it costs, and what it does to the environment. Then decide whether it should exist.',
    schematic: 'exchanger',
    link: { to: '/explore#sustainability', label: 'Sustainability and impact' },
  },
]

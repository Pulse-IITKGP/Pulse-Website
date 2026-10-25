import type { ImageAsset, ProjectCategory, SchematicKind } from './types'
import { library } from './images'

/**
 * Explore page content.
 *
 * Everything in `unitOperations` and `sustainabilityAreas` is GENERAL
 * EDUCATIONAL material about chemical engineering. It does not describe work
 * carried out by PULSE. PULSE work is linked separately through
 * `relatedCategory`, which pulls in matching entries from projects.ts.
 */

export interface Topic {
  id: string
  title: string
  /** One-line plain-language definition for first-year students. */
  plain: string
  /** A slightly deeper explanation for experienced readers. */
  deeper: string
  keyIdeas: string[]
  schematic: SchematicKind
  image?: ImageAsset
  /** Optional YouTube or Vimeo URL for a demonstration video. */
  videoUrl?: string
}

export const unitOperations: Topic[] = [
  {
    id: 'distillation',
    title: 'Distillation',
    plain: 'Separating liquids by boiling them and condensing the vapour, using the fact that some components boil more easily than others.',
    deeper:
      'In a column, rising vapour and falling liquid meet repeatedly on trays or packing. Each contact enriches the vapour in the more volatile component. Reflux ratio and the number of stages trade energy cost against separation quality.',
    keyIdeas: ['Relative volatility', 'Vapour–liquid equilibrium', 'Reflux ratio', 'McCabe–Thiele method'],
    schematic: 'column',
    image: library.columnOverhead,
  },
  {
    id: 'heat-transfer',
    title: 'Heat transfer',
    plain: 'Moving heat from a hot stream to a cold one without letting them mix, so energy is reused instead of wasted.',
    deeper:
      'Exchanger duty depends on the overall heat transfer coefficient, the area and the log-mean temperature difference. Counter-current flow keeps the driving force more uniform, which is why most industrial exchangers use it.',
    keyIdeas: ['Conduction, convection, radiation', 'Overall coefficient U', 'LMTD', 'Fouling'],
    schematic: 'exchanger',
    image: library.tubeBundle,
  },
  {
    id: 'mass-transfer',
    title: 'Mass transfer',
    plain: 'How molecules move from one phase to another, such as a gas dissolving into a liquid or a solute crossing a membrane.',
    deeper:
      'Transfer rate equals a coefficient times an area times a concentration driving force. Absorption, extraction, drying and membrane separations are all designed around increasing that area or that driving force.',
    keyIdeas: ['Diffusion and Fick’s law', 'Two-film theory', 'Transfer units', 'Membrane flux'],
    schematic: 'still',
    image: library.crossflowFiltration,
  },
  {
    id: 'fluid-flow',
    title: 'Fluid flow',
    plain: 'Getting liquids and gases where they need to go through pipes, pumps and valves, using as little energy as possible.',
    deeper:
      'The Reynolds number tells you whether flow is laminar or turbulent. Friction factors and fitting losses give the pressure drop, and the system curve meets the pump curve at the operating point.',
    keyIdeas: ['Reynolds number', 'Bernoulli equation', 'Pressure drop', 'Pump and system curves'],
    schematic: 'pump',
  },
  {
    id: 'reaction-engineering',
    title: 'Reaction engineering',
    plain: 'Designing the vessel where a chemical or biological reaction happens so it runs safely and produces what you want.',
    deeper:
      'Reactor size follows from the rate law and the chosen reactor type: batch, continuous stirred-tank or plug flow. Temperature control, selectivity and residence time distribution matter as much as conversion.',
    keyIdeas: ['Rate laws', 'CSTR versus PFR', 'Conversion and selectivity', 'Heat of reaction'],
    schematic: 'reactor',
    image: library.bioreactors,
  },
  {
    id: 'equipment-design',
    title: 'Equipment design and experimental learning',
    plain: 'Sizing real equipment from calculations, then testing it to see where the textbook and the hardware disagree.',
    deeper:
      'Good experiments are planned around the question being asked: what to vary, what to hold constant, which instruments to trust and how to estimate uncertainty. Scale-up then asks which ratios must stay constant as size changes.',
    keyIdeas: ['Design of experiments', 'Uncertainty analysis', 'Dimensionless groups', 'Scale-up'],
    schematic: 'vessel',
  },
]

export interface SustainabilityArea {
  id: string
  title: string
  summary: string
  relatedCategory?: ProjectCategory
  image?: ImageAsset
}

export const sustainabilityAreas: SustainabilityArea[] = [
  {
    id: 'waste-valorisation',
    title: 'Waste valorisation',
    summary: 'Treating waste streams as raw materials for fuels, materials or chemicals.',
    relatedCategory: 'sustainability',
    image: library.algalCultures,
  },
  {
    id: 'water-treatment',
    title: 'Water treatment',
    summary: 'Physical, chemical and biological processes that make water safe to use or return to the environment.',
    image: library.aerationTank,
  },
  {
    id: 'energy-efficiency',
    title: 'Energy efficiency',
    summary: 'Heat integration, better insulation and smarter control: using less energy for the same product.',
    image: library.solarThermal,
  },
  {
    id: 'circular-economy',
    title: 'Circular economy',
    summary: 'Designing products and processes so materials stay in use instead of becoming waste.',
  },
  {
    id: 'sustainable-process-design',
    title: 'Sustainable process design',
    summary: 'Weighing emissions, safety and resource use alongside cost from the first flowsheet onward.',
    relatedCategory: 'process-design',
  },
  {
    id: 'resource-recovery',
    title: 'Resource recovery',
    summary: 'Recovering nutrients, metals, solvents or energy that would otherwise be lost.',
  },
]

export interface Resource {
  title: string
  description: string
  href: string
  kind: 'Course' | 'Tutorials' | 'Data' | 'Software' | 'Primer' | 'Professional body'
}

/** External learning resources. Links were checked on 25 October 2026. */
export const externalResources: Resource[] = [
  {
    title: 'LearnChemE',
    description: 'Short screencasts and interactive simulations covering core chemical engineering courses.',
    href: 'https://learncheme.com/',
    kind: 'Tutorials',
  },
  {
    title: 'MIT OpenCourseWare: Chemical Engineering',
    description: 'Free lecture notes, problem sets and exams from MIT chemical engineering courses.',
    href: 'https://ocw.mit.edu/search/?d=Chemical%20Engineering',
    kind: 'Course',
  },
  {
    title: 'NPTEL courses',
    description: 'Video courses from Indian Institutes of Technology and IISc, including chemical engineering.',
    href: 'https://nptel.ac.in/courses',
    kind: 'Course',
  },
  {
    title: 'NIST Chemistry WebBook',
    description: 'Thermochemical, thermophysical and spectroscopic data for thousands of compounds.',
    href: 'https://webbook.nist.gov/chemistry/',
    kind: 'Data',
  },
  {
    title: 'PubChem',
    description: 'Chemical properties, safety and hazard information from the US National Library of Medicine.',
    href: 'https://pubchem.ncbi.nlm.nih.gov/',
    kind: 'Data',
  },
  {
    title: 'DWSIM',
    description: 'Open-source chemical process simulator for building and solving flowsheets.',
    href: 'https://dwsim.org/',
    kind: 'Software',
  },
  {
    title: 'Circular economy introduction',
    description: 'An overview of circular economy principles from the Ellen MacArthur Foundation.',
    href: 'https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview',
    kind: 'Primer',
  },
  {
    title: 'IChemE',
    description: 'The Institution of Chemical Engineers, a professional body with learning and career resources.',
    href: 'https://www.icheme.org/',
    kind: 'Professional body',
  },
]

/**
 * PULSE-authored material (explainers, tutorials, approved reports).
 * Empty until documents have been reviewed and approved for publication.
 */
export const pulseDocuments: { title: string; description: string; href: string; approvedBy?: string }[] = []

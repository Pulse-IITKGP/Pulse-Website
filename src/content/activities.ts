import type { Activity, GalleryItem, Opportunity } from './types'
import { library } from './images'

/**
 * Activities, gallery and upcoming opportunities.
 *
 * Activities below are PLACEHOLDER FORMATS, not events that took place.
 * They have no dates or locations on purpose. Replace them with real sessions
 * and add `date` (YYYY-MM-DD) and `location` only once verified.
 *
 * `videoUrl` accepts YouTube or Vimeo links. Videos never autoplay; they load
 * only after the visitor presses play.
 */
export const activities: Activity[] = [
  {
    id: 'unit-ops-walkthrough',
    title: 'Unit operations lab walkthrough',
    category: 'demonstration',
    summary:
      'A guided tour of the department’s unit operations equipment for first-year students, with a short demonstration at each station.',
    placeholder: true,
  },
  {
    id: 'cad-for-process-equipment',
    title: 'Sketch to CAD: drawing process equipment',
    category: 'workshop',
    summary: 'A hands-on session on turning rough equipment sketches into dimensioned drawings ready for fabrication.',
    placeholder: true,
  },
  {
    id: 'microcontroller-build-night',
    title: 'Sensor and microcontroller build session',
    category: 'build-session',
    summary: 'Teams wire temperature, flow and level sensors and log their first data sets.',
    placeholder: true,
  },
  {
    id: 'school-outreach-demo',
    title: 'Chemical engineering for school students',
    category: 'outreach',
    summary: 'Simple, safe demonstrations explaining what chemical engineers do, for visiting school groups.',
    placeholder: true,
  },
]

/**
 * Gallery. These items use reference photos from the image library as
 * stand-ins. Replace each with a photo from a real PULSE session.
 */
export const gallery: GalleryItem[] = [
  {
    id: 'g-bioreactors',
    image: library.bioreactors,
    caption: 'Reference photo of laboratory bioreactors. Replace with a photo from a PULSE session.',
    category: 'demonstration',
    placeholder: true,
  },
  {
    id: 'g-filtration',
    image: library.crossflowFiltration,
    caption: 'Reference photo of a crossflow filtration unit. Replace with a photo from a PULSE visit.',
    category: 'visit',
    placeholder: true,
  },
  {
    id: 'g-tube-bundle',
    image: library.tubeBundle,
    caption: 'Reference photo of a heat exchanger tube bundle. Replace with a photo from a PULSE workshop.',
    category: 'workshop',
    placeholder: true,
  },
  {
    id: 'g-algae',
    image: library.algalCultures,
    caption: 'Reference photo of algal cultures. Replace with a photo from a PULSE outreach event.',
    category: 'outreach',
    placeholder: true,
  },
]

/**
 * Upcoming events, open calls and recruitment drives. Leave empty until a
 * date is confirmed; the site shows a clear "nothing scheduled" state.
 */
export const opportunities: Opportunity[] = []

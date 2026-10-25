import type { ImageAsset } from './types'

/**
 * Reference photographs from Wikimedia Commons, used for general engineering
 * context. They do NOT show PULSE facilities, people or events.
 * Full attribution lives in credits.ts and on the /credits page.
 *
 * To use your own photo: add `name-800.webp` and `name-1600.webp` to
 * public/images/, then point an entry at `/images/name`.
 */
const w = [800, 1600] as const

export const library = {
  distillationColumns: {
    base: '/images/library/distillation-columns',
    widths: w,
    ratio: 1600 / 2108,
    alt: 'Four tall stainless-steel distillation columns with yellow access platforms against a clear blue sky',
    credit: 'Photo: Luigi Chiesa, CC BY 3.0',
  },
  columnOverhead: {
    base: '/images/library/column-overhead',
    widths: w,
    ratio: 1600 / 1237,
    alt: 'The top of a process column with its overhead piping and a windsock at a petrochemical plant',
    credit: 'Photo: CEphoto, Uwe Aranas, CC BY-SA 3.0',
  },
  tubeBundle: {
    base: '/images/library/heat-exchanger-tube-bundle',
    widths: w,
    ratio: 1600 / 631,
    alt: 'Tube bundle of a shell-and-tube heat exchanger resting on a wooden crate before assembly',
    credit: 'Photo: Harald the Bard, CC BY-SA 4.0',
  },
  crossflowFiltration: {
    base: '/images/library/crossflow-filtration',
    widths: w,
    ratio: 1600 / 2133,
    alt: 'Stainless-steel crossflow membrane filtration housings connected by large bends of process pipe',
    credit: 'Photo: Wikiwayman, CC BY-SA 3.0',
  },
  bioreactors: {
    base: '/images/library/bioreactors',
    widths: w,
    ratio: 1,
    alt: 'Laboratory bioreactors with glass vessels, probes and control screens',
    credit: 'Photo: Habin Zhang, CC BY-SA 4.0',
  },
  aerationTank: {
    base: '/images/library/aeration-tank',
    widths: w,
    ratio: 1600 / 1067,
    alt: 'Circular aeration tank of an activated-sludge sewage treatment plant, its surface churned by air',
    credit: 'Photo: Vraj Acharya, WELL Labs, CC BY-SA 4.0',
  },
  algalCultures: {
    base: '/images/library/algal-cultures',
    widths: w,
    ratio: 4 / 3,
    alt: 'Flasks of green algal cultures on an illuminated laboratory shelf',
    credit: 'Photo: Oak Ridge National Laboratory, CC BY 2.0',
  },
  solarThermal: {
    base: '/images/library/solar-thermal',
    widths: w,
    ratio: 4 / 3,
    alt: 'Evacuated-tube solar thermal collector mounted on a tiled roof',
    credit: 'Photo: Barelyhere, CC BY-SA 4.0',
  },
} satisfies Record<string, ImageAsset>

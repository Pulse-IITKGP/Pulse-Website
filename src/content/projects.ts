import type { Project } from './types'

/**
 * Project directory.
 *
 * The entries below are CONCEPT PLACEHOLDERS written to show how the directory
 * and detail pages work. They describe plausible student projects and general
 * engineering principles; none of them is a confirmed PULSE project, and none
 * reports results. Replace them with real projects (see README → "Adding a project").
 *
 * Rules for real entries:
 * - `results` holds only verified, reviewed findings. Leave it empty otherwise.
 * - `status` must reflect the actual state agreed with the project mentor.
 * - Use person ids from people.ts in `contributors` and `mentors`.
 */
export const projects: Project[] = [
  {
    slug: 'bench-scale-co2-absorption-column',
    title: 'Bench-scale CO₂ absorption column',
    summary:
      'A transparent packed column for watching gas absorption happen, built to show how solvent flow and packing height change capture.',
    categories: ['process-design', 'sustainability'],
    status: 'proposed',
    schematic: 'column',
    contributors: [],
    mentors: [],
    placeholder: true,
    featured: true,
    detail: {
      problem: {
        paragraphs: [
          'Gas absorption is taught almost entirely on paper. Students meet the operating line, the equilibrium curve and the height of a transfer unit long before they ever see liquid trickle over packing.',
        ],
      },
      motivation: {
        paragraphs: [
          'Carbon capture by chemical absorption is one of the most discussed decarbonisation routes. A small, safe column would let students connect classroom mass transfer to a technology that is in the news.',
        ],
      },
      concept: {
        paragraphs: [
          'Gas containing CO₂ flows up through a packed bed while an absorbing solution flows down. The packing creates a large wetted surface where CO₂ transfers from gas to liquid. Capture depends on the liquid-to-gas ratio, the contact area and how fast the solvent reacts with CO₂.',
          'A dilute alkaline solution is a common teaching choice because the reaction is fast and the chemistry is well documented.',
        ],
      },
      methodology: {
        paragraphs: [
          'Proposed approach: a clear acrylic column with interchangeable packing sections, a small air pump blending in CO₂ from a regulated cylinder, and a peristaltic pump for the solvent. Inlet and outlet CO₂ would be logged with low-cost NDIR sensors so runs can be compared.',
          'Design choices still to be made with a mentor: packing type, solvent, sensor calibration method and the safety case for handling CO₂ indoors.',
        ],
      },
      results: { paragraphs: [] },
      challenges: {
        paragraphs: [
          'Expected challenges include channelling in a narrow column, sensor drift and keeping the experiment safe and well ventilated.',
        ],
      },
      applications: {
        paragraphs: [
          'Primarily educational: a rig for lab sessions and outreach that makes mass transfer visible. It could also be a test bed for comparing solvents.',
        ],
      },
      future: {
        paragraphs: ['Possible extensions include a stripping section for solvent regeneration and automated data logging.'],
      },
    },
    media: [],
  },
  {
    slug: 'double-pipe-heat-exchanger-rig',
    title: 'Low-cost double-pipe heat exchanger rig',
    summary:
      'A tabletop counter-current heat exchanger with temperature logging, for comparing parallel and counter-current flow in a single lab session.',
    categories: ['unit-operations', 'prototyping'],
    status: 'proposed',
    schematic: 'exchanger',
    contributors: [],
    mentors: [],
    placeholder: true,
    featured: true,
    detail: {
      problem: {
        paragraphs: [
          'Commercial heat transfer teaching units are expensive, so students often share one rig and spend little time on it.',
        ],
      },
      motivation: {
        paragraphs: [
          'A cheaper rig built from standard plumbing parts would let more groups run their own experiments and see how flow arrangement changes performance.',
        ],
      },
      concept: {
        paragraphs: [
          'Hot water flows through an inner tube while cold water flows through the annulus around it. Measuring all four terminal temperatures and both flow rates gives the duty, the log-mean temperature difference and the overall heat transfer coefficient.',
          'Switching valves change the cold stream between parallel and counter-current flow, which shows directly why counter-current exchangers are preferred.',
        ],
      },
      methodology: {
        paragraphs: [
          'Proposed approach: copper inner tube inside an insulated outer pipe, a small hot-water reservoir with a thermostat, rotameters on both streams and four thermocouples read by a microcontroller.',
        ],
      },
      results: { paragraphs: [] },
      challenges: {
        paragraphs: [
          'Heat losses to the surroundings and thermocouple placement will affect accuracy and need careful insulation and calibration.',
        ],
      },
      applications: {
        paragraphs: ['Teaching laboratories, outreach demonstrations and a template other departments could copy.'],
      },
      future: {
        paragraphs: ['Add a shell-and-tube module and an open data sheet so other groups can reproduce the rig.'],
      },
    },
    media: [],
  },
  {
    slug: 'tank-level-control-loop',
    title: 'Tank level control loop',
    summary:
      'A two-tank system with a sensor, controller and pump that students can tune by hand, to show how PID control behaves.',
    categories: ['automation', 'prototyping'],
    status: 'proposed',
    schematic: 'loop',
    contributors: [],
    mentors: [],
    placeholder: true,
    featured: true,
    detail: {
      problem: {
        paragraphs: [
          'Process control is abstract when it is taught through transfer functions alone. Students rarely get to change a gain and watch a real level respond.',
        ],
      },
      motivation: {
        paragraphs: [
          'Level control is the simplest loop found in almost every plant. A visible, safe version makes tuning intuitive.',
        ],
      },
      concept: {
        paragraphs: [
          'A level sensor measures the height of water in a tank. A controller compares it with the set point and adjusts pump speed. Proportional, integral and derivative actions each change how fast the level settles, how much it overshoots and whether an offset remains.',
        ],
      },
      methodology: {
        paragraphs: [
          'Proposed approach: two acrylic tanks, an ultrasonic or pressure-based level sensor, a small DC pump with a motor driver and an open-source microcontroller running a PID routine, with live plotting on a laptop.',
        ],
      },
      results: { paragraphs: [] },
      challenges: {
        paragraphs: ['Sensor noise, pump dead-band and keeping electronics away from water.'],
      },
      applications: {
        paragraphs: ['Control engineering lab sessions and a starting point for instrumentation projects.'],
      },
      future: {
        paragraphs: ['Add a disturbance valve, cascade control and a simple HMI screen.'],
      },
    },
    media: [],
  },
  {
    slug: 'solar-still-water-desalination',
    title: 'Solar still for small-scale desalination',
    summary:
      'A passive solar still that evaporates saline water and collects condensate, used to explore how design choices change daily yield.',
    categories: ['sustainability', 'prototyping'],
    status: 'proposed',
    schematic: 'still',
    contributors: [],
    mentors: [],
    placeholder: true,
    detail: {
      problem: {
        paragraphs: [
          'Many communities lack reliable access to clean drinking water, and conventional desalination needs electricity and maintenance.',
        ],
      },
      motivation: {
        paragraphs: [
          'Solar stills are simple and need no external energy, but their output is low. Understanding which design factors matter is a good exercise in heat and mass transfer.',
        ],
      },
      concept: {
        paragraphs: [
          'Sunlight heats a shallow basin of saline water. Water evaporates, condenses on a cooler sloped cover and runs into a collection channel, leaving the salts behind. Yield depends on solar input, basin depth, cover angle and how well the basin is insulated.',
        ],
      },
      methodology: {
        paragraphs: [
          'Proposed approach: build two or more stills that differ in one variable at a time, run them side by side outdoors and record condensate volume and temperatures across a day.',
        ],
      },
      results: { paragraphs: [] },
      challenges: {
        paragraphs: ['Weather variability makes fair comparisons hard; vapour leaks and salt build-up reduce output.'],
      },
      applications: {
        paragraphs: ['Emergency or remote water supply, and a hands-on teaching case for renewable thermal processes.'],
      },
      future: {
        paragraphs: ['Study wick-based or multi-effect variants and test water quality with a faculty-approved method.'],
      },
    },
    media: [],
  },
  {
    slug: 'food-waste-biogas-digester',
    title: 'Food-waste biogas digester',
    summary:
      'A small anaerobic digester for canteen food waste, to study how feed rate and temperature affect gas production.',
    categories: ['sustainability', 'process-design'],
    status: 'proposed',
    schematic: 'reactor',
    contributors: [],
    mentors: [],
    placeholder: true,
    detail: {
      problem: {
        paragraphs: [
          'Food waste from campus kitchens usually goes to landfill, where it decomposes and releases methane without any energy recovery.',
        ],
      },
      motivation: {
        paragraphs: [
          'Anaerobic digestion converts organic waste into biogas and a nutrient-rich digestate. A small digester is a practical way to learn bioprocess engineering and waste valorisation.',
        ],
      },
      concept: {
        paragraphs: [
          'In an oxygen-free vessel, microbial communities break down organic matter in stages, from hydrolysis to methanogenesis. Temperature, pH, retention time and the carbon-to-nitrogen ratio all affect stability and gas yield.',
        ],
      },
      methodology: {
        paragraphs: [
          'Proposed approach: a sealed, temperature-controlled vessel fed daily, with gas measured by water displacement and pH checked regularly. Any work with biogas requires a safety review by faculty before construction.',
        ],
      },
      results: { paragraphs: [] },
      challenges: {
        paragraphs: ['Process upsets from overfeeding, odour control and safe handling of a flammable gas.'],
      },
      applications: {
        paragraphs: ['Campus waste reduction and a case study for circular-economy thinking.'],
      },
      future: {
        paragraphs: ['Characterise the digestate and estimate the economics of scaling up.'],
      },
    },
    media: [],
  },
  {
    slug: 'spent-coffee-grounds-valorisation',
    title: 'Spent coffee grounds: a valorisation study',
    summary:
      'A desk study and small experiments asking whether campus coffee waste could become a useful product, and who would pay for it.',
    categories: ['entrepreneurship', 'sustainability'],
    status: 'proposed',
    schematic: 'dryer',
    contributors: [],
    mentors: [],
    placeholder: true,
    detail: {
      problem: {
        paragraphs: ['Coffee outlets discard spent grounds daily even though they contain oils and fibres that can be recovered.'],
      },
      motivation: {
        paragraphs: [
          'Valorisation projects show students that a process is only worthwhile if a market, a supply chain and a cost case exist alongside the chemistry.',
        ],
      },
      concept: {
        paragraphs: [
          'Possible routes in published literature include drying the grounds for use as a solid fuel or compost component and extracting oil with a solvent. Each route has different energy needs, product value and scale requirements.',
        ],
      },
      methodology: {
        paragraphs: [
          'Proposed approach: estimate the quantity of grounds on campus, review published routes, run small drying trials, and build a simple cost and customer model for the most promising option.',
        ],
      },
      results: { paragraphs: [] },
      challenges: {
        paragraphs: ['Collection logistics, moisture content and whether any product could compete on price.'],
      },
      applications: {
        paragraphs: ['A template for evaluating other campus waste streams as resources.'],
      },
      future: {
        paragraphs: ['Present the business case to faculty mentors and, if it holds up, pilot a collection scheme.'],
      },
    },
    media: [],
  },
]

const bySlug = new Map(projects.map((p) => [p.slug, p]))

export const getProject = (slug: string | undefined) => (slug ? bySlug.get(slug) : undefined)

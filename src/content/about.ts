/**
 * About page copy.
 *
 * Mission, vision and values are DRAFT WORDING prepared for the site build.
 * The PULSE team should review and adopt (or rewrite) them, then set
 * `draft` to false so the "draft wording" note disappears.
 */
export const about = {
  draft: true,
  overview: [
    'PULSE is an innovation hub in a chemical engineering department where students and faculty work together on hands-on projects. It is a place to build things, test them and learn what it takes to turn an engineering idea into something people can use.',
    'Projects range from bench-scale rigs that make a unit operation visible to early studies of whether a sustainable process could become a viable venture. Students lead the work; faculty advisors guide it and hold it to professional standards.',
  ],
  mission:
    'Give chemical engineering students the experience of designing, building and testing real equipment and processes, and the skills to lead that work responsibly.',
  vision:
    'A department where every student has taken an idea from sketch to working prototype, and where good ideas have a route to real-world use.',
  connection: [
    'Chemical engineering is about processes: how materials and energy move and change. Prototyping is how those processes are tested before anyone builds them at scale. Leadership keeps a project team moving, and entrepreneurship asks whether the result is worth making at all.',
    'PULSE treats these as one workflow rather than four separate interests. A project starts as an idea, becomes a prototype, is tested against unit-operations principles, is run by a student team, and is judged on whether it could be useful and sustainable. What the team learns feeds back into the next design.',
  ],
  mentorship: {
    intro:
      'Faculty advisors are central to PULSE. They help teams choose problems worth solving, review designs before anything is built, and make sure lab work meets the department’s safety requirements.',
    roles: [
      'Review project proposals and agree scope with the team',
      'Approve designs and safety plans before construction or testing',
      'Check that results are reported honestly, including what didn’t work',
      'Connect teams with alumni, industry and other departments',
    ],
  },
  /** Add verified milestones only. Example: { year: '2025', title: 'Hub founded', text: '…' } */
  history: [] as { year: string; title: string; text: string }[],
  values: [
    {
      title: 'Build to learn',
      text: 'A working prototype teaches more than a perfect report. We build early, measure honestly and iterate.',
    },
    {
      title: 'Safety is part of the design',
      text: 'Hazards are assessed before anything is assembled, and a faculty advisor signs off before testing.',
    },
    {
      title: 'Show your working',
      text: 'Methods, data and failures are documented so others can check the work and build on it.',
    },
    {
      title: 'Mentor forward',
      text: 'Senior members teach junior ones, so skills stay in the hub when people graduate.',
    },
    {
      title: 'Count the whole cost',
      text: 'Energy, materials, waste and price are weighed from the first sketch, not added at the end.',
    },
  ],
}

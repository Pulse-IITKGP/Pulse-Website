export const interestOptions = [
  { id: 'join', label: 'Joining a project team' },
  { id: 'propose', label: 'Proposing a project' },
  { id: 'mentor', label: 'Faculty mentorship' },
  { id: 'industry', label: 'Industry partnership' },
  { id: 'alumni', label: 'Alumni involvement or sponsorship' },
  { id: 'other', label: 'Something else' },
] as const

export type InterestId = (typeof interestOptions)[number]['id']

export interface InvolvementPath {
  /** Anchor id on the Get Involved page. */
  id: string
  audience: string
  title: string
  summary: string
  steps: string[]
  interest: InterestId
  cta: string
}

/** Ways to take part. Steps describe the intended process; adjust them to match how the hub actually operates. */
export const involvementPaths: InvolvementPath[] = [
  {
    id: 'students',
    audience: 'Students',
    title: 'Join a project team',
    summary: 'No prior project experience needed. Teams mix year groups so newer members learn alongside seniors.',
    steps: [
      'Send an expression of interest with your year and what you’d like to work on',
      'Meet the student coordinators at an intake session',
      'Join a team and complete the lab safety induction before hands-on work',
    ],
    interest: 'join',
    cta: 'Express interest',
  },
  {
    id: 'propose',
    audience: 'Students',
    title: 'Propose a project',
    summary: 'Have an idea for a prototype, study or venture? A short pitch is enough to start the conversation.',
    steps: [
      'Describe the problem, the idea and what you’d need to build or test it',
      'Student leads and a faculty advisor review the proposal for scope and safety',
      'Approved proposals get a mentor, a team and a listing in the project directory',
    ],
    interest: 'propose',
    cta: 'Pitch an idea',
  },
  {
    id: 'faculty',
    audience: 'Faculty',
    title: 'Mentor a team',
    summary: 'Guide a project in your area, from reviewing a proposal to signing off results.',
    steps: [
      'Tell us your research interests and the time you can offer',
      'Review proposals that match your expertise',
      'Meet the team at agreed milestones and approve safety plans and results',
    ],
    interest: 'mentor',
    cta: 'Offer mentorship',
  },
  {
    id: 'industry',
    audience: 'Industry',
    title: 'Partner with PULSE',
    summary: 'Set a technical challenge, host a site visit, give a guest lecture or support a build with equipment or expertise.',
    steps: [
      'Share the challenge or opportunity you have in mind',
      'Agree scope, confidentiality and safety requirements with faculty',
      'Work with a student team on a defined timeline',
    ],
    interest: 'industry',
    cta: 'Start a conversation',
  },
  {
    id: 'alumni',
    audience: 'Alumni and sponsors',
    title: 'Stay involved or sponsor',
    summary: 'Mentor current students, speak about your career, or support materials and competition costs.',
    steps: [
      'Tell us how you’d like to help',
      'We’ll match you with a project, event or team',
      'Sponsorship is acknowledged only with the sponsor’s written agreement',
    ],
    interest: 'alumni',
    cta: 'Get in touch',
  },
]

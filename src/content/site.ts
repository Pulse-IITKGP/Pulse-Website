/**
 * Site-wide settings. Fields set to `null` are unconfirmed and render as
 * "to be confirmed" text rather than as links.
 */
export const site = {
  name: 'PULSE Hub',
  acronym: 'PULSE',
  expansion: 'Prototypes, Unit Operations, Leadership, and Sustainable Entrepreneurship',
  descriptor: 'A chemical engineering innovation hub for students and faculty',
  /** e.g. "Department of Chemical Engineering, Example Institute of Technology" */
  institution: null as string | null,
  contact: {
    email: null as string | null,
    location: null as string | null,
  },
  /**
   * Add confirmed channels only, e.g.
   * { label: 'Instagram', href: 'https://www.instagram.com/your-handle/' }
   */
  social: [] as { label: string; href: string }[],
  /** Optional JSON form endpoint (see README → "Connecting the contact form"). */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() || null,
}

export const primaryNav = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/explore', label: 'Explore' },
  { to: '/activities', label: 'Activities' },
  { to: '/people', label: 'People' },
] as const

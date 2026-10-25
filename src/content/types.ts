/**
 * Content model for the PULSE site.
 *
 * Every content module in this folder is plain typed data so it can later be
 * swapped for a CMS or API response with the same shape.
 *
 * `placeholder: true` marks an entry that is a stand-in and has NOT been
 * verified by the PULSE team. The UI shows a visible "Placeholder" tag on
 * these entries. Remove the flag only once the details are confirmed.
 */

export interface ImageAsset {
  /** Path under /public, without the width suffix, e.g. "/images/library/aeration-tank". */
  base: string
  /** Widths that exist on disk as `${base}-${width}.webp`. */
  widths: readonly number[]
  /** Intrinsic aspect ratio (width / height) of the stored files. */
  ratio: number
  alt: string
  /** Credit line shown near the image, e.g. "Photo: Jane Doe, CC BY 4.0". */
  credit?: string
}

export type ProjectCategory =
  | 'prototyping'
  | 'unit-operations'
  | 'process-design'
  | 'sustainability'
  | 'automation'
  | 'entrepreneurship'

export type ProjectStatus = 'proposed' | 'in-progress' | 'completed'

/** Equipment symbol used for schematic artwork when no photo exists. */
export type SchematicKind =
  | 'column'
  | 'exchanger'
  | 'vessel'
  | 'reactor'
  | 'pump'
  | 'loop'
  | 'dryer'
  | 'still'

export interface ProjectSection {
  /** Body paragraphs. Leave empty to show the "not yet documented" note. */
  paragraphs: string[]
}

export interface ProjectMedia {
  kind: 'image' | 'video'
  /** For images, an ImageAsset; for videos, a YouTube or Vimeo URL. */
  image?: ImageAsset
  videoUrl?: string
  caption: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  categories: ProjectCategory[]
  status: ProjectStatus
  /** Academic year or date, only when known, e.g. "2025–26". */
  period?: string
  cover?: ImageAsset
  schematic: SchematicKind
  /** Person ids from people.ts. */
  contributors: string[]
  mentors: string[]
  placeholder?: boolean
  featured?: boolean
  detail: {
    problem: ProjectSection
    motivation: ProjectSection
    concept: ProjectSection
    methodology: ProjectSection
    /** Only verified, reviewed results belong here. */
    results: ProjectSection
    challenges: ProjectSection
    applications: ProjectSection
    future: ProjectSection
  }
  media: ProjectMedia[]
}

export type PersonGroup = 'leadership' | 'team' | 'faculty' | 'alumni'

export interface PersonLink {
  label: string
  href: string
}

export interface Person {
  id: string
  name: string
  role: string
  group: PersonGroup
  bio: string
  interests: string[]
  photo?: ImageAsset
  links: PersonLink[]
  placeholder?: boolean
}

export type ActivityCategory =
  | 'workshop'
  | 'demonstration'
  | 'lecture'
  | 'visit'
  | 'competition'
  | 'build-session'
  | 'outreach'

export interface Activity {
  id: string
  title: string
  category: ActivityCategory
  summary: string
  /** ISO date (YYYY-MM-DD), only when verified. */
  date?: string
  location?: string
  image?: ImageAsset
  videoUrl?: string
  placeholder?: boolean
}

export interface GalleryItem {
  id: string
  image: ImageAsset
  caption: string
  category: ActivityCategory
  placeholder?: boolean
}

export interface Opportunity {
  id: string
  title: string
  kind: 'event' | 'call' | 'recruitment'
  summary: string
  /** ISO date (YYYY-MM-DD). */
  date?: string
  href?: string
}

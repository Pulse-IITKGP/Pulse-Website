# PULSE Hub website

The website of **PULSE** (Prototypes, Unit Operations, Leadership, and Sustainable Entrepreneurship), a chemical engineering innovation hub for students and faculty.

It is a static single-page app built with React 19, TypeScript, Vite 8, Tailwind CSS 4 and React Router 8. There is no backend or database. All content lives in typed data files under `src/content/`.

> **Status:** first release. Most people, projects and activities are **placeholders** and are tagged as such on the site. Read [Replacing placeholder content](#replacing-placeholder-content) before publishing.

---

## Run it locally

You need **Node.js 20.19 or newer, or 22.12 or newer**. Download the LTS installer from <https://nodejs.org>.

```bash
npm install        # once, installs dependencies
npm run dev        # starts http://localhost:5173 with live reload
```

Other scripts:

| Command             | What it does                                             |
| ------------------- | -------------------------------------------------------- |
| `npm run build`     | Type-checks, then builds the production site into `dist/` |
| `npm run preview`   | Serves the built `dist/` at http://localhost:4173        |
| `npm run typecheck` | TypeScript check only                                    |
| `npm run lint`      | ESLint                                                   |

## Deploying

`npm run build` produces a fully static site in `dist/`. Any static host works. Because the site uses client-side routing, the host must send `index.html` for unknown paths so that links like `/projects/some-slug` load directly.

- **Netlify:** already configured by `public/_redirects`. Build command `npm run build`, publish directory `dist`.
- **Vercel:** already configured by `vercel.json`. The framework preset is Vite.
- **GitHub Pages / other hosts:** add an equivalent "rewrite everything to `/index.html`" rule. On GitHub Pages, copy `dist/index.html` to `dist/404.html` after building. If the site is served from a sub-path (e.g. `/pulse/`), also set `base: '/pulse/'` in `vite.config.ts`.

Nothing has been deployed publicly yet.

## Project structure

```
src/
  content/        ← all editable content (start here)
    site.ts         name, contact details, social links, navigation
    projects.ts     project directory and detail pages
    people.ts       profiles
    activities.ts   activities, gallery photos, upcoming opportunities
    explore.ts      unit operations explainers, sustainability areas, learning resources
    about.ts        overview, mission, vision, history, values
    involvement.ts  "Get involved" paths and form interest options
    images.ts       reference photo library
    credits.ts      image attributions (shown on /credits)
    taxonomy.ts     category, status and group labels
    types.ts        TypeScript types for all of the above
  components/
    layout/       header, mobile menu, footer, page shell, call-to-action band
    ui/           buttons, badges, filters, breadcrumbs, empty states, images, video, gallery
    cards/        project cards, profile cards, activity rows
    diagrams/     process-diagram symbols, annotated hero photo, pillar "process train"
    forms/        contact / interest form
  lib/            filtering, form validation, video URL parsing, page titles
  pages/          one file per route
  router.tsx      route table (each page is lazy-loaded)
  styles/index.css  design tokens and global styles
public/
  images/         photos (WebP, two sizes each)
  favicon.svg
```

Routes: `/`, `/about`, `/people`, `/projects`, `/projects/:slug`, `/activities`, `/explore`, `/get-involved`, `/credits`, plus a 404 page.

## Replacing placeholder content

Anything with `placeholder: true` shows an orange dashed **Placeholder** tag on the site. Remove the flag only once the details are confirmed by the people involved. **Never publish names, titles, results, partnerships, awards or statistics that haven't been verified.**

### Site details: `src/content/site.ts`
- `institution`: full department and institution name, once approved.
- `contact.email` / `contact.location`: they show as "To be confirmed" while `null`.
- `social`: add confirmed channels only, e.g. `{ label: 'Instagram', href: 'https://www.instagram.com/handle/' }`.

### People: `src/content/people.ts`
Each entry is an empty profile slot. For a real profile:
1. Get the person's approval for their name, role, bio and photo.
2. Edit `name`, `role`, `bio`, `interests` and `links`, then delete `placeholder: true`.
3. Photo: save a square portrait as `public/images/people/<id>-800.webp`, then set
   `photo: { base: '/images/people/<id>', widths: [800], ratio: 1, alt: 'Portrait of <name>' }`.

`group` decides the section: `leadership`, `team`, `faculty` or `alumni`.

### Projects: `src/content/projects.ts`
The six entries are **concept placeholders**. Replace or delete them. For each real project:
- `slug` is the URL (`/projects/<slug>`): lowercase words joined by hyphens, unique.
- `status`: `'proposed'`, `'in-progress'` or `'completed'`. Must match reality.
- `categories`: one or more of `prototyping`, `unit-operations`, `process-design`, `sustainability`, `automation`, `entrepreneurship`.
- `contributors` / `mentors`: person `id`s from `people.ts`.
- `featured: true` puts the project on the home page.
- `detail.results` must contain **only verified, mentor-reviewed results**. If it's empty, the page says "No verified results yet".
- `schematic` picks the line drawing used when there's no cover photo: `column`, `exchanger`, `vessel`, `reactor`, `pump`, `loop`, `dryer` or `still`.
- `cover` (optional) and `media` (photos and YouTube/Vimeo links). See *Adding photos* below.

### Activities, gallery and events: `src/content/activities.ts`
- `activities`: the current entries are planned formats with no dates. Add `date: 'YYYY-MM-DD'` and `location` only once confirmed. `videoUrl` accepts YouTube or Vimeo links; videos never autoplay.
- `gallery`: currently reference photos. Replace them with photos from real sessions.
- `opportunities`: empty, so the site shows "Nothing scheduled right now". Add events or open calls with real dates.

### About page: `src/content/about.ts`
Mission, vision and values are **draft wording**. Once the team has agreed on them, set `draft: false` to hide the "Draft wording" tags. Add verified milestones to `history`.

### Explore page: `src/content/explore.ts`
Unit-operations and sustainability text is general educational material, not PULSE work. Add approved PULSE documents to `pulseDocuments` (they appear under "From PULSE"). Topics can take a `videoUrl`.

### Adding photos
1. Export two sizes in WebP: `name-800.webp` and `name-1600.webp` (e.g. with <https://squoosh.app>), ideally under 250 KB each.
2. Put them in `public/images/` (any subfolder).
3. Reference them as an `ImageAsset`:
   ```ts
   { base: '/images/events/lab-tour', widths: [800, 1600], ratio: 3 / 2, alt: 'Students …', credit: 'Photo: …' }
   ```
   `ratio` is width ÷ height. Write `alt` text that describes what the photo shows. If a file fails to load, the site shows a schematic drawing instead of a broken image.

### Logo and favicon
The header and footer use the PULSE logo from `public/images/logo.png`, a trimmed, 120 px-tall copy of `logo.png` in the project root, through `src/components/layout/Wordmark.tsx`. To change it, replace that file and keep the `width`/`height` in `Wordmark.tsx` in proportion. The logo has a white background, so the footer places it on a white tile. `public/favicon.svg` is still the placeholder mark from the first build.

### Reference photos
The photos in `public/images/library/` come from Wikimedia Commons under Creative Commons licences and are credited on `/credits` (`src/content/credits.ts`). Keep the credits page up to date if you add or remove third-party images. Replace them with PULSE's own photos where possible.

## Connecting the contact form

By default the Get Involved form runs in **demo mode**. It validates input and then clearly tells the visitor that **nothing was sent**. Nothing is stored.

To deliver messages, use any service that accepts a JSON `POST`. [Formspree](https://formspree.io) is the simplest:

1. Create a form on Formspree and copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
2. Copy `.env.example` to `.env.local` and set:
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```
3. On your host, add the same environment variable, then rebuild.

The form sends `{ name, email, affiliation, interest, message }` with `Accept: application/json`. It shows "Message sent" only when the service returns a 2xx response; otherwise it shows the error and keeps the visitor's text. The endpoint URL is public by design (it ships in the browser bundle), so **never put secrets or API keys in `VITE_` variables**. Configure spam protection and allowed domains in the form service's dashboard.

## Design system

Tokens are defined in `src/styles/index.css` under `@theme` and used as Tailwind classes (`bg-navy`, `text-brand`, `border-line` …).

| Token                    | Value     | Use                                                   |
| ------------------------ | --------- | ----------------------------------------------------- |
| `white` / `mist`         | `#FFFFFF` / `#F3F7FC` | Page backgrounds (≈75% of the surface)     |
| `navy`                   | `#12345A` | Headings, footer, call-to-action band                 |
| `brand`                  | `#2463A6` | Buttons, links, diagram linework                      |
| `accent`                 | `#3478C9` | Decorative only (4.49:1 on white, too light for text) |
| `ink` / `muted`          | `#182638` / `#5D6B7A` | Body and secondary text                    |
| `line` / `line-strong`   | `#DCE5EF` / `#74889E` | Dividers / form-control borders (3:1)      |
| `signal`                 | `#F28C38` | Orange accent: active nav, valve and instrument marks |
| `signal-ink`             | `#A8500C` | Orange text on light backgrounds (5.5:1)              |
| `signal-line`            | `#D9711E` | Orange outlines: active nav tab, placeholder tags and notices (3.3:1) |

Notices and placeholder tags are plain orange outlines with no fill and no dashes. The current page in the main navigation is boxed with the same outline.

### Typography

One family: **Mona Sans** (variable, self-hosted via Fontsource). Its width axis carries the headline voice: display text is the most condensed and card titles the least. Fallback text uses a metric-matched Arial (`Mona Sans Fallback` in `index.css`), so the page barely shifts when the font loads.

| Role | Class | Size | Notes |
| --- | --- | --- | --- |
| Page title | `display` | 2.4 → 4.4rem (fluid) | weight 640, width 82% |
| Long title (project pages) | `display-detail` | 2.1 → 3.6rem (fluid) | width 84% |
| Section heading | `h-section` | 1.75 → 2.6rem (fluid) | headings default to weight 620, width 88% |
| Sub-section | `h-sub` | 1.5rem / 1.625rem from md | pillars, explainers, detail sections |
| Item title | `title-card` | 1.25rem | cards, profiles, list rows; width 94% |
| Pull statement | `statement` | 1.25 → 1.5rem | weight 450 so it never reads as a heading |
| Lead paragraph | `lede` | 1.0625 → 1.2rem | muted, max 38rem |
| Long-form body | `text-body-lg` | 1.0625rem | prose, section intros |
| Body / UI | `text-base` | 1rem | nav, buttons, form fields |
| Secondary copy | `text-small` | 0.9375rem | card summaries |
| Group label | `label` | 0.875rem | weight 620, slight tracking |
| Caption / badge | `text-meta` | 0.8125rem | captions, dates, tags |

Use these classes instead of one-off sizes so repeated roles stay identical across pages.

The visual motif comes from process flow diagrams: equipment symbols, stream lines with arrowheads, instrument bubbles and an annotated "redline" hero photograph.

## Quality checks

The first release was checked as follows:

- `npm run typecheck`, `npm run lint` and `npm run build` pass with no errors or warnings.
- Automated browser checks (Playwright, run outside the repo) at 360, 390, 768, 1024 and 1440 px across all routes: no horizontal overflow, no console errors, no failed requests or broken images, and exactly one `<h1>` per page.
- 31 interaction checks passed. They cover the internal link crawl (all routes and in-page anchors), mobile menu (open, Escape, focus return, closes on navigation), project search, filters, URL state and empty states, form validation, error summary, demo submission and pre-selected interests, the gallery lightbox, activity filters, keyboard access to disclosures and filter chips, the skip link, focus rings, reduced motion, the image-failure fallback, and direct loading of nested routes.
- An audit against the Vercel Web Interface Guidelines and a React best-practices review, with the findings fixed.

There is no unit-test framework in the repo. Add Vitest if the filtering or validation logic grows.

## Known limitations

- Content is mostly placeholder, by design. See above.
- The form needs `VITE_FORM_ENDPOINT` before it delivers messages.
- Video embeds are implemented (click-to-load YouTube/Vimeo) but no video URLs are configured yet.
- Page titles and descriptions are set client-side. Crawlers that don't run JavaScript see the defaults in `index.html`. Pre-rendering can be added later if search visibility matters.
- No analytics, CMS or authentication. Content files are shaped so a CMS could replace them later.

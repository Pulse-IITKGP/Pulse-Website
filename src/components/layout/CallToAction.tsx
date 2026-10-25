import { ButtonLink } from '../ui/Button'

/** Closing navy band inviting visitors to take part. */
export function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative overflow-hidden bg-navy text-white">
      <svg
        aria-hidden="true"
        className="absolute top-0 right-0 hidden h-full w-1/2 text-white/[0.09] md:block"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M0 120h180a20 20 0 0 1 20 20v140a20 20 0 0 0 20 20h380" />
        <path d="M120 0v60a20 20 0 0 0 20 20h300a20 20 0 0 1 20 20v300" />
        <rect x="380" y="150" width="70" height="200" rx="35" />
        <circle cx="260" cy="300" r="34" />
        <path d="M226 300h68" />
        <path d="M520 40l30 22v-22l-30 22z" stroke="var(--color-signal)" strokeWidth="2.5" />
      </svg>
      <div className="shell relative py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="h-section text-white">
            Bring an idea, a question or a problem worth solving
          </h2>
          <p className="mt-4 text-lg leading-relaxed tracking-[0.005em] text-on-navy">
            Students can join a team or pitch a project. Faculty, alumni and industry partners can mentor, set
            challenges or support a build.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/get-involved" variant="onDark" size="lg">
              Get involved
            </ButtonLink>
            <ButtonLink
              to="/get-involved#propose"
              size="lg"
              className="border border-white/30 bg-transparent shadow-none hover:bg-white/10"
            >
              Propose a project
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

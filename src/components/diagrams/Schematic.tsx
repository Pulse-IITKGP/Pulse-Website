import type { ReactNode } from 'react'
import type { SchematicKind } from '../../content/types'

/**
 * Process-flow-diagram style equipment symbols, drawn on a 120×120 grid.
 * Lines use currentColor; the single orange element in each symbol marks the
 * feed, signal or energy input, following the site's "orange as signal" rule.
 */

const signal = 'var(--color-signal)'

const symbols: Record<SchematicKind, ReactNode> = {
  column: (
    <>
      <rect x="45" y="14" width="30" height="92" rx="15" />
      <path d="M45 36h22M53 48h22M45 60h22M53 72h22M45 84h22" strokeWidth="1.5" />
      <path d="M60 14V6h34v14" />
      <circle cx="94" cy="28" r="8" />
      <path d="M94 36v10H75" />
      <path d="M60 106v8h34" />
      <path d="M16 66h29" stroke={signal} />
      <path d="M39 62l6 4-6 4" stroke={signal} fill="none" />
    </>
  ),
  exchanger: (
    <>
      <rect x="16" y="44" width="88" height="32" rx="16" />
      <path d="M26 55h68M26 65h68" strokeWidth="1.5" />
      <path d="M46 44v14M74 62v14" strokeWidth="1.5" />
      <path d="M40 44V28M80 76v16" />
      <path d="M4 60h12M104 60h12" stroke={signal} />
      <path d="M110 56l6 4-6 4" stroke={signal} fill="none" />
    </>
  ),
  vessel: (
    <>
      <rect x="40" y="16" width="40" height="88" rx="20" />
      <path d="M40 66h40" strokeDasharray="4 4" strokeWidth="1.5" />
      <path d="M60 16V6M60 104v10M80 40h18" />
      <path d="M22 52h18" stroke={signal} />
      <path d="M34 48l6 4-6 4" stroke={signal} fill="none" />
    </>
  ),
  reactor: (
    <>
      <rect x="34" y="32" width="52" height="70" rx="14" />
      <rect x="27" y="52" width="66" height="44" rx="12" strokeDasharray="4 4" strokeWidth="1.5" />
      <rect x="52" y="8" width="16" height="12" rx="2" />
      <path d="M60 20v62M46 82h28M46 77v10M74 77v10" />
      <path d="M86 44h22" stroke={signal} />
      <path d="M92 40l-6 4 6 4" stroke={signal} fill="none" />
    </>
  ),
  pump: (
    <>
      <circle cx="58" cy="62" r="20" />
      <path d="M58 42h42M16 62h22" />
      <path d="M44 82l-6 18h40l-6-18" />
      <path d="M100 42v-12" />
      <path d="M50 52l18 10-18 10z" stroke={signal} fill="none" />
    </>
  ),
  loop: (
    <>
      <rect x="12" y="50" width="42" height="54" rx="4" />
      <path d="M12 74h42" strokeDasharray="4 4" strokeWidth="1.5" />
      <circle cx="88" cy="32" r="14" stroke={signal} />
      <path d="M74 32h28" stroke={signal} strokeWidth="1.5" />
      <path d="M54 60h20V46M88 46v56" strokeDasharray="3 4" strokeWidth="1.5" />
      <path d="M33 104v8h40M103 112h13" />
      <path d="M73 106l15 12v-12l15 12z" />
    </>
  ),
  dryer: (
    <g transform="rotate(-10 60 62)">
      <rect x="14" y="48" width="92" height="28" rx="14" />
      <path d="M40 48v28M80 48v28" strokeWidth="1.5" />
      <path d="M14 62H2" stroke={signal} />
      <path d="M106 70v18" />
    </g>
  ),
  still: (
    <>
      <path d="M12 80L60 36l48 44" />
      <rect x="12" y="80" width="96" height="20" rx="2" />
      <path d="M20 90h80" strokeDasharray="4 4" strokeWidth="1.5" />
      <path d="M108 86h10v20" />
      <circle cx="98" cy="18" r="7" stroke={signal} />
      <path d="M98 4v4M112 18h-4M88 8l3 3" stroke={signal} strokeWidth="1.5" />
    </>
  ),
}

interface SchematicProps {
  kind: SchematicKind
  className?: string
  title?: string
}

export function Schematic({ kind, className, title }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {symbols[kind]}
    </svg>
  )
}

/** Schematic on engineering-grid paper; used where no photograph exists yet. */
export function SchematicPanel({
  kind,
  className = '',
  label,
}: {
  kind: SchematicKind
  className?: string
  label?: string
}) {
  return (
    <div className={`grid-paper relative grid place-items-center text-brand ${className}`}>
      <Schematic kind={kind} className="h-3/5 max-h-48 w-auto" />
      {label ? (
        <span className="absolute bottom-2.5 left-3 text-meta text-muted">{label}</span>
      ) : null}
    </div>
  )
}

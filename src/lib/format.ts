const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

/** Formats an ISO date (YYYY-MM-DD) without timezone drift. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return dateFormat.format(new Date(Date.UTC(y, m - 1, d, 12)))
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

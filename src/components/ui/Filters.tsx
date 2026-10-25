import { useId } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../lib/format'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterGroupProps {
  legend: string
  name: string
  options: FilterOption[]
  value: string | null
  onChange: (value: string | null) => void
  allLabel?: string
}

/**
 * Single-choice filter rendered as native radio inputs styled as chips, so
 * arrow keys, Tab order and screen readers behave as expected.
 */
export function FilterGroup({ legend, name, options, value, onChange, allLabel = 'All' }: FilterGroupProps) {
  const all = { id: '', label: allLabel }
  return (
    <fieldset>
      <legend className="mb-2.5 text-sm font-medium text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {[all, ...options].map((option) => {
          const checked = (value ?? '') === option.id
          return (
            <label
              key={option.id || 'all'}
              className={cn(
                'relative inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-sm border px-3 text-sm transition-colors',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand',
                checked
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-white text-ink hover:border-brand/50 hover:bg-mist',
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={checked}
                onChange={() => onChange(option.id || null)}
                className="sr-only"
              />
              {option.label}
              {'count' in option && typeof option.count === 'number' ? (
                <span className={cn('tabular text-meta', checked ? 'text-white/80' : 'text-muted')}>
                  {option.count}
                </span>
              ) : null}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

interface SearchFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchField({ label, value, onChange, placeholder }: SearchFieldProps) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-2.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="min-h-11 w-full rounded-sm border border-line-strong/70 bg-white py-2 pr-11 pl-9 text-base text-ink placeholder:text-muted/80 focus-visible:border-brand [&::-webkit-search-cancel-button]:hidden"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center rounded-sm text-muted hover:bg-mist hover:text-ink"
            aria-label="Clear search"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

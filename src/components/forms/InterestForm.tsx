import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Info, LoaderCircle } from 'lucide-react'
import { site } from '../../content/site'
import { interestOptions, type InterestId } from '../../content/involvement'
import {
  MESSAGE_MAX,
  validateInterestForm,
  type InterestFormErrors,
  type InterestFormValues,
} from '../../lib/validation'
import { Button } from '../ui/Button'
import { cn } from '../../lib/format'

const empty: InterestFormValues = { name: '', email: '', affiliation: '', interest: '', message: '' }
const fieldOrder: (keyof InterestFormValues)[] = ['name', 'email', 'affiliation', 'interest', 'message']
const fieldLabels: Record<keyof InterestFormValues, string> = {
  name: 'Name',
  email: 'Email',
  affiliation: 'Affiliation or year of study',
  interest: 'Area of interest',
  message: 'Message',
}

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'sent' }
  | { kind: 'demo'; values: InterestFormValues }
  | { kind: 'error'; message: string }

interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  children: (aria: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode
}

function Field({ id, label, hint, error, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return (
    <div>
      <label htmlFor={id} className="block font-medium text-ink">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="mt-0.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1 flex items-center gap-1.5 text-sm font-medium text-danger">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
      <div className="mt-2">{children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}</div>
    </div>
  )
}

const control = (invalid: boolean) =>
  cn(
    'w-full rounded-sm border bg-white px-3 py-2.5 text-base text-ink placeholder:text-muted/70 focus-visible:border-brand',
    invalid ? 'border-danger border-2' : 'border-line-strong/70',
  )

interface InterestFormProps {
  /** Pre-selected interest, set when a visitor picks a path on the page. */
  preset?: { interest: InterestId; seq: number }
}

export function InterestForm({ preset }: InterestFormProps) {
  const uid = useId()
  const [values, setValues] = useState<InterestFormValues>(empty)
  const [errors, setErrors] = useState<InterestFormErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const summaryRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  // Apply a new preset during render (no effect needed) when the visitor picks a path.
  const [appliedSeq, setAppliedSeq] = useState(0)
  if (preset && preset.seq !== appliedSeq) {
    setAppliedSeq(preset.seq)
    setValues((v) => ({ ...v, interest: preset.interest }))
    setErrors((e) => ({ ...e, interest: undefined }))
  }

  // Warn before leaving the page with an unsent message.
  const dirty = (status.kind === 'idle' || status.kind === 'error') && fieldOrder.some((k) => values[k].trim() !== '')
  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const set = (key: keyof InterestFormValues, value: string) => {
    const next = { ...values, [key]: value }
    setValues(next)
    // After the first submit attempt, re-validate as the visitor fixes things.
    if (attempted) setErrors(validateInterestForm(next))
  }

  const onBlur = (key: keyof InterestFormValues) => {
    if (!values[key].trim()) return
    const fieldError = validateInterestForm(values)[key]
    setErrors((e) => ({ ...e, [key]: fieldError }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAttempted(true)
    const found = validateInterestForm(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      affiliation: values.affiliation.trim(),
      interest: interestOptions.find((o) => o.id === values.interest)?.label ?? values.interest,
      message: values.message.trim(),
    }

    if (!site.formEndpoint) {
      setStatus({ kind: 'demo', values: payload })
      requestAnimationFrame(() => resultRef.current?.focus())
      return
    }

    setStatus({ kind: 'submitting' })
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`The form service responded with status ${res.status}.`)
      setStatus({ kind: 'sent' })
      setValues(empty)
      setAttempted(false)
    } catch (err) {
      setStatus({
        kind: 'error',
        message:
          err instanceof Error && err.message.startsWith('The form service')
            ? `${err.message} Your message was not sent. Please try again in a few minutes.`
            : 'Your message could not be sent because the connection failed. Check your internet connection and try again.',
      })
    }
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  const reset = () => {
    setValues(empty)
    setErrors({})
    setAttempted(false)
    setStatus({ kind: 'idle' })
  }

  if (status.kind === 'demo' || status.kind === 'sent') {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-sm border border-line bg-white p-6 sm:p-8">
        {status.kind === 'sent' ? (
          <>
            <p className="title-card flex items-center gap-2 font-semibold text-success">
              <CheckCircle2 className="size-6" aria-hidden="true" />
              Message sent
            </p>
            <p className="mt-3 text-muted">Thanks for getting in touch. A member of the PULSE team will reply by email.</p>
          </>
        ) : (
          <>
            <p className="title-card flex items-center gap-2 font-semibold text-navy">
              <Info className="size-6 text-brand" aria-hidden="true" />
              Demo mode: your message was not sent
            </p>
            <p className="mt-3 text-muted">
              Your details passed validation, but this site isn’t connected to a form service yet, so nothing was
              delivered or stored. Here is what would have been sent:
            </p>
            <dl className="mt-5 divide-y divide-line rounded-sm border border-line text-sm">
              {fieldOrder.map((key) => (
                <div key={key} className="grid gap-1 p-3 sm:grid-cols-[11rem_1fr]">
                  <dt className="text-muted">{fieldLabels[key]}</dt>
                  <dd className="break-words whitespace-pre-line text-ink">{status.values[key]}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
        <Button variant="secondary" className="mt-6" onClick={reset}>
          {status.kind === 'sent' ? 'Send another message' : 'Start again'}
        </Button>
      </div>
    )
  }

  const errorKeys = fieldOrder.filter((k) => errors[k])
  const id = (key: string) => `${uid}-${key}`

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-mode`} className="space-y-6">
      {!site.formEndpoint ? (
        <p id={`${uid}-mode`} className="flex gap-2 rounded-sm border border-dashed border-line-strong/60 bg-mist p-3 text-sm text-ink/85">
          <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
          Demo mode: this form checks your details but does not send them anywhere yet.
        </p>
      ) : (
        <p id={`${uid}-mode`} className="sr-only">
          Your message will be sent to the PULSE team by email.
        </p>
      )}

      {attempted && errorKeys.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-sm border-2 border-danger bg-white p-4"
          aria-labelledby={`${uid}-summary`}
        >
          <p id={`${uid}-summary`} className="font-semibold text-danger">
            {errorKeys.length === 1 ? 'There is 1 problem to fix' : `There are ${errorKeys.length} problems to fix`}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errorKeys.map((k) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="text-danger underline" onClick={(e) => { e.preventDefault(); document.getElementById(id(k))?.focus() }}>
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {status.kind === 'error' ? (
        <div ref={resultRef} tabIndex={-1} role="alert" className="flex gap-3 rounded-sm border-2 border-danger bg-white p-4 text-sm">
          <AlertCircle className="size-5 shrink-0 text-danger" aria-hidden="true" />
          <p>{status.message}</p>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id('name')} label={fieldLabels.name} error={errors.name}>
          {(aria) => (
            <input {...aria} name="name" type="text" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} onBlur={() => onBlur('name')} className={control(aria['aria-invalid'])} />
          )}
        </Field>
        <Field id={id('email')} label={fieldLabels.email} error={errors.email}>
          {(aria) => (
            <input {...aria} name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} value={values.email} onChange={(e) => set('email', e.target.value)} onBlur={() => onBlur('email')} className={control(aria['aria-invalid'])} />
          )}
        </Field>
      </div>

      <Field id={id('affiliation')} label={fieldLabels.affiliation} hint="For example: second-year chemical engineering, faculty member, or the company you work for." error={errors.affiliation}>
        {(aria) => (
          <input {...aria} name="affiliation" type="text" autoComplete="organization" value={values.affiliation} onChange={(e) => set('affiliation', e.target.value)} onBlur={() => onBlur('affiliation')} className={control(aria['aria-invalid'])} />
        )}
      </Field>

      <Field id={id('interest')} label={fieldLabels.interest} error={errors.interest}>
        {(aria) => (
          <select {...aria} name="interest" value={values.interest} onChange={(e) => set('interest', e.target.value)} className={cn(control(aria['aria-invalid']), 'min-h-12 appearance-auto')}>
            <option value="">Choose one</option>
            {interestOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id={id('message')} label={fieldLabels.message} hint="Tell us what you’d like to do or ask. At least 20 characters." error={errors.message}>
        {(aria) => (
          <>
            <textarea {...aria} name="message" rows={6} maxLength={MESSAGE_MAX} value={values.message} onChange={(e) => set('message', e.target.value)} onBlur={() => onBlur('message')} className={cn(control(aria['aria-invalid']), 'resize-y')} />
            <p className="tabular mt-1 text-right text-meta text-muted" aria-live="off">
              {values.message.length} / {MESSAGE_MAX}
            </p>
          </>
        )}
      </Field>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status.kind === 'submitting'}>
          {status.kind === 'submitting' ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : site.formEndpoint ? (
            'Send message'
          ) : (
            'Check and preview message'
          )}
        </Button>
        <p className="text-sm text-muted">All fields are required.</p>
      </div>
    </form>
  )
}

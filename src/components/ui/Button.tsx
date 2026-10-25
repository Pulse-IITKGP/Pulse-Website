import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/format'

type Variant = 'primary' | 'secondary' | 'onDark' | 'quiet'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-150 select-none disabled:cursor-not-allowed disabled:opacity-60 [&>svg]:size-4 [&>svg]:shrink-0'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.12)] hover:bg-brand-strong active:bg-navy',
  secondary: 'border border-brand/40 bg-white text-brand hover:border-brand hover:bg-mist active:bg-mist-deep',
  onDark: 'bg-white text-navy hover:bg-mist active:bg-white',
  quiet: 'text-brand underline-offset-4 hover:underline px-0!',
}

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-4 text-base',
  lg: 'min-h-12 px-5 text-base',
}

const buttonClass = (variant: Variant = 'primary', size: Size = 'md', extra?: string) =>
  cn(base, variants[variant], sizes[size], extra)

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size }

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, size, className)} {...props} />
}

type ButtonProps = ComponentProps<'button'> & { variant?: Variant; size?: Size }

export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />
}

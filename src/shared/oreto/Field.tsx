import React from 'react'

type Props = {
  label: string
  error?: string
  className?: string
  children: React.ReactElement<{ className?: string; id?: string; 'aria-invalid'?: boolean }>
}

/** Labelled form field. Styles the single input/textarea passed as its child. */
export function Field({ label, error, className = '', children }: Props) {
  const id = React.useId()
  const control = React.cloneElement(children, {
    id,
    'aria-invalid': !!error,
    className: `w-full rounded-xl border bg-cream/40 px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors duration-150 focus:bg-white focus:outline-none focus:ring-2 ${
      error ? 'border-chili/60 focus:ring-chili/30' : 'border-sand focus:border-gold focus:ring-gold/30'
    }`,
  })
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {control}
      {error && <p className="mt-1.5 text-xs font-medium text-chili">{error}</p>}
    </div>
  )
}

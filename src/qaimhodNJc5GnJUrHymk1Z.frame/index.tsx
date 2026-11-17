import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Loader2, ShoppingBag } from 'lucide-react'

import { WhatsAppIcon } from '../shared/oreto/BrandIcons'
import { useCart } from '../shared/oreto/cart'
import { STORE, whatsappLink } from '../shared/oreto/config'
import { EASE, formatLKR, NavigateFn } from '../shared/oreto/format'
import { Field } from '../shared/oreto/Field'
import { Layout } from '../shared/oreto/Layout'
import { OrderSummary } from '../shared/oreto/OrderSummary'
import { notify } from '../shared/oreto/toast'
import { buildOrderMessage, Customer } from '../shared/oreto/whatsappOrder'

export const args = {
  state: 'default',
}

export const argTypes = {
  state: { control: 'radio', options: ['default', 'placing', 'placed'] },
}

type Props = Partial<typeof args> & { onNavigate?: NavigateFn }

const EMPTY: Customer = { name: '', phone: '', email: '', address: '', notes: '' }

export default function Checkout(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const go: NavigateFn = onNavigate ?? (() => {})
  const { items, subtotal, clear } = useCart()
  const [form, setForm] = useState<Customer>(EMPTY)
  const [errors, setErrors] = useState<Partial<Customer>>({})
  const [status, setStatus] = useState<'default' | 'placing' | 'placed'>('default')
  const [placed, setPlaced] = useState<{ link: string; total: number } | null>(null)
  const shown = state !== 'default' ? state : status

  const set = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault()
    const er: Partial<Customer> = {}
    if (!form.name.trim()) er.name = 'Please enter your full name.'
    if (!/^\+?[\d\s-]{9,15}$/.test(form.phone.trim())) er.phone = 'Please enter a valid contact number.'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = 'Please enter a valid email address.'
    if (form.address.trim().length < 8) er.address = 'Please enter your full delivery address.'
    setErrors(er)
    if (Object.keys(er).length) {
      notify('Please check your details', { body: 'A few fields need your attention.', tone: 'error' })
      return
    }
    setStatus('placing')
    const link = whatsappLink(buildOrderMessage(items, subtotal, form))
    // Opened directly from the click so popup blockers allow it.
    window.open(link, '_blank', 'noopener')
    setTimeout(() => {
      setPlaced({ link, total: subtotal })
      setStatus('placed')
      clear()
      setForm(EMPTY)
      notify('Order sent to WhatsApp', { body: 'Press send in WhatsApp to complete your order.' })
    }, 700)
  }

  if (shown === 'placed') {
    return (
      <Layout current="checkout" onNavigate={onNavigate}>
        <section className="mx-auto max-w-xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <CheckCircle2 className="mx-auto h-14 w-14 text-leaf" strokeWidth={1.5} />
            <h1 className="mt-6 font-display text-5xl font-bold leading-none text-ink">Almost done!</h1>
            <p className="mt-4 leading-relaxed text-muted">
              Your order{placed ? ` of ${formatLKR(placed.total)}` : ''} is ready in WhatsApp. Press{' '}
              <strong className="text-ink">Send</strong> there, and we'll confirm delivery and payment with you shortly.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={placed?.link ?? whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-leaf px-7 text-sm font-semibold text-cream hover:bg-leaf/90"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" /> Open WhatsApp again
              </a>
              <button
                type="button"
                onClick={() => go('home')}
                className="h-12 whitespace-nowrap rounded-full border border-cocoa/25 px-7 text-sm font-semibold text-cocoa hover:border-cocoa hover:bg-parchment"
              >
                Back to home
              </button>
            </div>
          </motion.div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout current="checkout" onNavigate={onNavigate}>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <button
          type="button"
          onClick={() => go('cart')}
          className="flex items-center gap-2 text-sm font-semibold text-cocoa hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Back to cart
        </button>
        <h1 className="mt-4 font-display text-5xl font-bold leading-none text-ink">Checkout</h1>

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-sand">
            <ShoppingBag className="mx-auto h-12 w-12 text-cocoa/40" strokeWidth={1.3} />
            <p className="mt-5 font-display text-3xl font-semibold">Nothing to check out yet</p>
            <p className="mt-2 text-sm text-muted">Add some spices to your cart first.</p>
            <button
              type="button"
              onClick={() => go('products')}
              className="mt-8 h-12 rounded-full bg-espresso px-7 text-sm font-semibold text-cream hover:bg-cocoa"
            >
              Browse spices
            </button>
          </div>
        ) : (
          <form onSubmit={placeOrder} noValidate className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-sand sm:p-10">
              <h2 className="font-display text-2xl font-bold text-ink">Delivery details</h2>
              <p className="mt-1 text-sm text-muted">We'll use these to confirm and deliver your order.</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" error={errors.name} className="sm:col-span-2">
                  <input value={form.name} onChange={set('name')} autoComplete="name" placeholder="Nimali Perera" />
                </Field>
                <Field label="Contact number" error={errors.phone}>
                  <input value={form.phone} onChange={set('phone')} type="tel" autoComplete="tel" placeholder="07X XXX XXXX" />
                </Field>
                <Field label="Email address" error={errors.email}>
                  <input value={form.email} onChange={set('email')} type="email" autoComplete="email" placeholder="you@example.com" />
                </Field>
                <Field label="Delivery address" error={errors.address} className="sm:col-span-2">
                  <textarea
                    value={form.address}
                    onChange={set('address')}
                    rows={3}
                    autoComplete="street-address"
                    placeholder="House no., street, city"
                  />
                </Field>
                <Field label="Order notes (optional)" className="sm:col-span-2">
                  <textarea value={form.notes} onChange={set('notes')} rows={2} placeholder="Delivery time, landmarks…" />
                </Field>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <OrderSummary items={items} subtotal={subtotal} compact>
                <button
                  type="submit"
                  disabled={shown === 'placing'}
                  className="mt-6 flex h-13 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-leaf text-sm font-semibold text-cream transition-colors duration-150 hover:bg-leaf/90 disabled:opacity-80"
                >
                  {shown === 'placing' ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : <WhatsAppIcon className="h-4.5 w-4.5" />}
                  {shown === 'placing' ? 'Opening WhatsApp…' : 'Place Order via WhatsApp'}
                </button>
                <p className="mt-3 text-center text-xs leading-relaxed text-muted">
                  Your order is sent to {STORE.phoneDisplay}. Payment and delivery are confirmed on WhatsApp.
                </p>
              </OrderSummary>
            </div>
          </form>
        )}
      </section>
    </Layout>
  )
}

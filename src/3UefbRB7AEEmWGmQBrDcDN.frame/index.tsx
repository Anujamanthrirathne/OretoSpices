import React, { useState } from 'react'
import { Clock, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'

import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../shared/oreto/BrandIcons'
import { STORE, whatsappLink } from '../shared/oreto/config'
import { NavigateFn } from '../shared/oreto/format'
import { Field } from '../shared/oreto/Field'
import { Layout } from '../shared/oreto/Layout'
import { notify } from '../shared/oreto/toast'

export const args = {
  state: 'default',
}

export const argTypes = {
  state: { control: 'radio', options: ['default', 'sending', 'sent'] },
}

type Props = Partial<typeof args> & { onNavigate?: NavigateFn }

type Form = { name: string; email: string; phone: string; message: string }
const EMPTY: Form = { name: '', email: '', phone: '', message: '' }

export default function Contact(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Partial<Form>>({})
  const [status, setStatus] = useState<'default' | 'sending' | 'sent'>(state as 'default')
  const shown = state !== 'default' ? state : status

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const er: Partial<Form> = {}
    if (!form.name.trim()) er.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 5) er.message = 'Please write a short message.'
    setErrors(er)
    if (Object.keys(er).length) return
    setStatus('sending')
    // Opens the customer's email app with the message prefilled. Swap for a form service when ready.
    const body = `${form.message}\n\n— ${form.name}\n${form.email}${form.phone ? `\n${form.phone}` : ''}`
    window.location.href = `mailto:${STORE.email}?subject=${encodeURIComponent('Website enquiry from ' + form.name)}&body=${encodeURIComponent(body)}`
    setTimeout(() => {
      setStatus('sent')
      setForm(EMPTY)
      notify('Message ready to send', { body: 'Your email app has opened with your message.' })
    }, 600)
  }

  return (
    <Layout current="contact" onNavigate={onNavigate}>
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-24">
        {/* Details */}
        <div>
          <h1 className="font-display text-5xl font-bold leading-none text-ink sm:text-6xl">Get in touch</h1>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            Questions about our spices, bulk orders or delivery? The quickest way to reach us is WhatsApp.
          </p>

          <a
            href={whatsappLink('Hello ORETO Spices! I have a question.')}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex w-full items-center gap-4 rounded-2xl bg-leaf p-5 text-cream transition-colors duration-150 hover:bg-leaf/90 sm:max-w-md"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream/15">
              <WhatsAppIcon className="h-6 w-6" />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold">Chat with us on WhatsApp</span>
              <span className="block text-sm text-cream/80">{STORE.phoneDisplay}</span>
            </span>
          </a>

          <ul className="mt-10 space-y-5 text-sm">
            <Row icon={<Phone className="h-4.5 w-4.5" />} label="Phone">
              <a href={`tel:+${STORE.whatsappNumber}`} className="hover:text-chili">
                {STORE.phoneDisplay}
              </a>
            </Row>
            <Row icon={<Mail className="h-4.5 w-4.5" />} label="Email">
              <a href={`mailto:${STORE.email}`} className="hover:text-chili">
                {STORE.email}
              </a>
            </Row>
            <Row icon={<MapPin className="h-4.5 w-4.5" />} label="Location">
              {STORE.address}
            </Row>
            <Row icon={<Clock className="h-4.5 w-4.5" />} label="Hours">
              {STORE.hours}
            </Row>
          </ul>

          <div className="mt-10 border-t border-sand pt-6">
            <p className="text-sm font-semibold text-ink">Follow us</p>
            <div className="mt-3 flex gap-3">
              <a
                href={STORE.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ink ring-1 ring-sand transition-colors duration-150 hover:ring-cocoa/40"
              >
                <FacebookIcon className="h-4.5 w-4.5 text-[#1877f2]" /> Facebook
              </a>
              <a
                href={STORE.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ink ring-1 ring-sand transition-colors duration-150 hover:ring-cocoa/40"
              >
                <InstagramIcon className="h-4.5 w-4.5 text-chili" /> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-3xl bg-white p-6 ring-1 ring-sand sm:p-10">
          <h2 className="font-display text-3xl font-bold text-ink">Send us a message</h2>
          <p className="mt-2 text-sm text-muted">We usually reply within one working day.</p>

          {shown === 'sent' ? (
            <div className="mt-8 rounded-2xl bg-leaf-soft p-6" role="status">
              <p className="font-semibold text-leaf">Thank you — your message is on its way.</p>
              <p className="mt-1 text-sm text-muted">
                If your email app didn't open, write to us at {STORE.email} or message us on WhatsApp.
              </p>
              <button
                type="button"
                onClick={() => setStatus('default')}
                className="mt-4 text-sm font-semibold text-chili hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Your name" error={errors.name}>
                <input value={form.name} onChange={set('name')} autoComplete="name" placeholder="Nimali Perera" />
              </Field>
              <Field label="Phone (optional)">
                <input value={form.phone} onChange={set('phone')} type="tel" autoComplete="tel" placeholder="07X XXX XXXX" />
              </Field>
              <Field label="Email" error={errors.email} className="sm:col-span-2">
                <input value={form.email} onChange={set('email')} type="email" autoComplete="email" placeholder="you@example.com" />
              </Field>
              <Field label="Message" error={errors.message} className="sm:col-span-2">
                <textarea value={form.message} onChange={set('message')} rows={5} placeholder="How can we help?" />
              </Field>
              <button
                type="submit"
                disabled={shown === 'sending'}
                className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-espresso px-7 text-sm font-semibold text-cream transition-colors duration-150 hover:bg-cocoa disabled:opacity-70 sm:col-span-2 sm:justify-self-start"
              >
                {shown === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {shown === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  )
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-parchment text-cocoa">{icon}</span>
      <span>
        <span className="block text-xs text-muted">{label}</span>
        <span className="mt-0.5 block font-medium text-ink">{children}</span>
      </span>
    </li>
  )
}

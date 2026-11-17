import React from 'react'
import { ArrowRight } from 'lucide-react'

import { IMAGES, LOGO_URL } from '../shared/oreto/config'
import { NavigateFn } from '../shared/oreto/format'
import { Layout } from '../shared/oreto/Layout'
import { WhyChoose } from '../shared/oreto/WhyChoose'

export const args = {
  headline: 'Sri Lankan spices, the way home cooking deserves.',
  founded: '2023',
}

export const argTypes = {
  headline: { control: 'text' },
  founded: { control: 'text' },
}

type Props = Partial<typeof args> & { onNavigate?: NavigateFn }

const VALUES = [
  {
    title: 'Natural ingredients',
    body: 'Only real spices. No artificial colours, fillers or flavour enhancers in our packs.',
  },
  {
    title: 'Quality you can taste',
    body: 'Each batch is cleaned, sorted and checked for aroma, colour and texture before it is packed.',
  },
  {
    title: 'Freshness first',
    body: 'We grind in small quantities and seal quickly, so the oils that carry flavour stay in the spice.',
  },
  {
    title: 'Fair, affordable pricing',
    body: 'Good spices should be on every table. We keep our prices honest for every household.',
  },
]

export default function About(props: Props) {
  const { headline, founded, onNavigate } = { ...args, ...props }
  const go: NavigateFn = onNavigate ?? (() => {})

  return (
    <Layout current="about" onNavigate={onNavigate}>
      {/* Intro */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:py-24">
        <div>
          <p className="text-sm font-medium text-chili">About ORETO Spices · Est. {founded}</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.0] text-ink sm:text-6xl">{headline}</h1>
          <div className="mt-8 max-w-xl space-y-4 leading-relaxed text-muted">
            <p>
              ORETO Spices is a Sri Lankan spice business built on a simple idea: the spices in your kitchen should taste
              as rich and true as the ones our grandmothers ground by hand.
            </p>
            <p>
              We bring together pure spices and traditional blends — curry powder, mas curry, black pepper and turmeric
              — prepared from natural ingredients and packed fresh, so you get authentic Sri Lankan flavour in every
              meal.
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <img
            src={LOGO_URL}
            alt="ORETO Spices — Traditional Blends, Est. 2023"
            loading="lazy"
            decoding="async"
            className="w-full rounded-3xl bg-[#f8f6f1] ring-1 ring-sand"
          />
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-sand bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="max-w-lg font-display text-4xl font-bold leading-[1.05] text-ink">What goes into every pack</h2>
          <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="border-t-2 border-gold pt-5">
                <dt className="font-display text-2xl font-semibold text-ink">{v.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{v.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Farmers & sustainability */}
      <section className="bg-leaf text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
              Growing together with local farmers
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-cream/85">
              Our spices start with Sri Lankan growers. We buy locally wherever we can, so more of the value of every
              pack stays with the families who tend the pepper vines, turmeric and cinnamon.
            </p>
            <ul className="mt-8 space-y-4 text-cream/90">
              <li className="border-l-2 border-gold-soft pl-4">
                <strong className="font-semibold text-cream">Local sourcing</strong> — supporting small farms and rural
                communities across the island.
              </li>
              <li className="border-l-2 border-gold-soft pl-4">
                <strong className="font-semibold text-cream">Sustainable practice</strong> — careful use of water and
                energy, and less waste in processing.
              </li>
              <li className="border-l-2 border-gold-soft pl-4">
                <strong className="font-semibold text-cream">Responsible packaging</strong> — sealed to protect
                freshness, with less waste as we grow.
              </li>
            </ul>
          </div>
          <img
            src={IMAGES.farm}
            alt="A Sri Lankan farmer holding fresh pepper and cinnamon"
            loading="lazy"
            decoding="async"
            className="order-1 aspect-[4/3] w-full rounded-3xl object-cover lg:order-2 lg:aspect-[4/5]"
          />
        </div>
      </section>

      <WhyChoose />

      <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center">
        <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.05] text-ink">
          Taste the difference in your next curry.
        </h2>
        <button
          type="button"
          onClick={() => go('products')}
          className="flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-espresso px-7 text-sm font-semibold text-cream transition-colors duration-150 hover:bg-cocoa"
        >
          Shop our spices <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </Layout>
  )
}

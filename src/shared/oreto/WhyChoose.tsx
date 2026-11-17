import React from 'react'

import { IMAGES } from './config'

const REASONS = [
  {
    title: 'High-quality spices',
    body: 'Carefully selected raw spices, cleaned and ground to a consistent, fine texture.',
  },
  {
    title: 'Authentic Sri Lankan flavours',
    body: 'Traditional recipes and roasting methods that taste the way home cooking should.',
  },
  {
    title: 'Fresh ingredients',
    body: 'Ground in small batches and sealed quickly to keep the aroma and colour bright.',
  },
  {
    title: 'Affordable prices',
    body: 'Premium quality at honest prices, so good spices are part of every meal.',
  },
  {
    title: 'Customer satisfaction',
    body: 'Friendly service on WhatsApp, and we listen to every piece of feedback.',
  },
]

/** "Why choose ORETO" — an image-led list rather than a tile grid. */
export function WhyChoose() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-28">
        <div className="relative">
          <img
            src={IMAGES.grinding}
            alt="Spices being ground in a traditional stone mortar"
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-3xl object-cover lg:sticky lg:top-28"
          />
        </div>
        <div>
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">Why choose ORETO</h2>
          <p className="mt-4 max-w-lg text-muted">
            Five promises we keep in every pack — from the farms we buy from to the moment it reaches your kitchen.
          </p>
          <ol className="mt-10 divide-y divide-cocoa/15 border-y border-cocoa/15">
            {REASONS.map((r) => (
              <li key={r.title} className="grid gap-1 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <h3 className="font-display text-2xl font-semibold text-chili">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted sm:pt-1.5">{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Leaf } from 'lucide-react'

import { WhatsAppIcon } from '../shared/oreto/BrandIcons'
import { IMAGES, whatsappLink } from '../shared/oreto/config'
import { EASE, NavigateFn } from '../shared/oreto/format'
import { Layout } from '../shared/oreto/Layout'
import { ProductCard } from '../shared/oreto/ProductCard'
import { PRODUCTS } from '../shared/oreto/products'
import { WhyChoose } from '../shared/oreto/WhyChoose'

export const args = {
  headline: 'Bring the Authentic Taste of Sri Lanka to Your Kitchen.',
  intro:
    'ORETO Spices brings you pure, freshly ground spices and traditional blends from Sri Lanka — made with natural ingredients and the flavours of home.',
  featuredCount: 4,
}

export const argTypes = {
  headline: { control: 'text' },
  intro: { control: 'text' },
  featuredCount: { control: 'range', min: 1, max: 8, step: 1 },
}

type Props = Partial<typeof args> & { onNavigate?: NavigateFn }

export default function Home(props: Props) {
  const { headline, intro, featuredCount, onNavigate } = { ...args, ...props }
  const go: NavigateFn = onNavigate ?? (() => {})
  const reduce = useReducedMotion()
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, featuredCount)

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, ease: EASE, delay },
        }

  return (
    <Layout current="home" onNavigate={onNavigate}>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-espresso">
        <img
          src={IMAGES.hero}
          alt="Sri Lankan spices in brass bowls on a dark wooden table"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-espresso/75 md:bg-espresso/40" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 md:pb-32 md:pt-28 lg:pb-40 lg:pt-36">
          <div className="max-w-xl">
            <motion.p {...rise(0)} className="flex items-center gap-2 text-sm font-medium text-gold-soft">
              <Leaf className="h-4 w-4" /> Pure spices from Sri Lanka
            </motion.p>
            <motion.h1
              {...rise(0.05)}
              className="mt-5 font-display text-5xl font-bold leading-[0.98] text-cream sm:text-6xl lg:text-7xl"
            >
              {headline}
            </motion.h1>
            <motion.p {...rise(0.1)} className="mt-6 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">
              {intro}
            </motion.p>
            <motion.div {...rise(0.15)} className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => go('products')}
                className="flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-gold px-7 text-sm font-semibold text-espresso transition-colors duration-150 hover:bg-gold-soft active:scale-[0.98]"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#featured"
                className="flex h-12 items-center whitespace-nowrap rounded-full border border-cream/40 px-7 text-sm font-semibold text-cream transition-colors duration-150 hover:border-cream hover:bg-cream/10"
              >
                Explore Products
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section id="featured" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">Our spices</h2>
              <p className="mt-3 text-muted">
                Everyday essentials for Sri Lankan cooking — each one ground and packed fresh.
              </p>
            </div>
            <button
              type="button"
              onClick={() => go('products')}
              className="group flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-chili"
            >
              View all products
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-espresso text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <img
            src={IMAGES.farm}
            alt="A Sri Lankan farmer holding fresh pepper vines and cinnamon"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-3xl object-cover lg:aspect-[5/4]"
          />
          <div>
            <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
              From Sri Lankan soil to your spice rack
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-cream/75">
              We work with local growers, clean and roast each batch with care, and grind in small quantities so every
              pack carries the colour and aroma it should. No shortcuts, just honest spices.
            </p>
            <button
              type="button"
              onClick={() => go('about')}
              className="mt-8 flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-gold/60 px-7 text-sm font-semibold text-gold-soft transition-colors duration-150 hover:border-gold hover:bg-gold/10"
            >
              Our story <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <WhyChoose />

      {/* Order CTA */}
      <section>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold leading-[1.05] text-ink">Order in a single message</h2>
            <p className="mt-3 text-muted">
              Fill your cart, and we'll send your full order to us on WhatsApp. We confirm delivery and payment with you
              directly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => go('products')}
              className="flex h-12 items-center whitespace-nowrap rounded-full bg-espresso px-7 text-sm font-semibold text-cream transition-colors duration-150 hover:bg-cocoa"
            >
              Start shopping
            </button>
            <a
              href={whatsappLink('Hello ORETO Spices! I would like to know more about your products.')}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-leaf px-7 text-sm font-semibold text-cream transition-colors duration-150 hover:bg-leaf/90"
            >
              <WhatsAppIcon className="h-4.5 w-4.5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

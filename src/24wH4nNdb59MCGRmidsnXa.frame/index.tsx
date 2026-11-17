import React, { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PackageSearch } from 'lucide-react'

import { EASE, NavigateFn } from '../shared/oreto/format'
import { Layout } from '../shared/oreto/Layout'
import { ProductCard } from '../shared/oreto/ProductCard'
import { PRODUCTS } from '../shared/oreto/products'

export const args = {
  state: 'default',
  category: 'All',
  sort: 'featured',
}

export const argTypes = {
  state: { control: 'radio', options: ['default', 'loading'] },
  category: { control: 'radio', options: ['All', 'Blends', 'Pure Spices'] },
  sort: { control: 'select', options: ['featured', 'price-low', 'price-high', 'name'] },
}

type Props = Partial<typeof args> & { onNavigate?: NavigateFn }

const CATEGORIES = ['All', 'Blends', 'Pure Spices']
const SORTS: { value: string; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A – Z' },
]

export default function Products(props: Props) {
  const p = { ...args, ...props }
  const [category, setCategory] = useState(p.category)
  const [sort, setSort] = useState(p.sort)
  const reduce = useReducedMotion()

  useEffect(() => setCategory(p.category), [p.category])
  useEffect(() => setSort(p.sort), [p.sort])

  const list = useMemo(() => {
    const filtered = PRODUCTS.filter((x) => category === 'All' || x.category === category)
    const sorted = [...filtered]
    if (sort === 'price-low') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  }, [category, sort])

  return (
    <Layout current="products" onNavigate={p.onNavigate}>
      <section className="border-b border-sand bg-parchment">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 lg:pt-20">
          <h1 className="font-display text-5xl font-bold leading-none text-ink sm:text-6xl">Shop spices</h1>
          <p className="mt-4 max-w-xl text-muted">
            Pure spices and traditional Sri Lankan blends, freshly ground and sealed for flavour.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={`h-10 whitespace-nowrap rounded-full px-5 text-sm font-semibold transition-colors duration-150 ${
                  category === c ? 'bg-espresso text-cream' : 'bg-white text-cocoa ring-1 ring-sand hover:ring-cocoa/40'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted">
              {p.state === 'loading' ? 'Loading…' : `${list.length} product${list.length === 1 ? '' : 's'}`}
            </span>
            <label className="sr-only" htmlFor="sort">
              Sort products
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 rounded-full border-0 bg-white px-4 pr-8 text-sm font-medium text-ink ring-1 ring-sand focus:ring-2 focus:ring-gold focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {p.state === 'loading'
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : list.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: EASE, delay: Math.min(i, 6) * 0.04 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
        </div>

        {p.state !== 'loading' && list.length === 0 && (
          <div className="mx-auto mt-6 max-w-md py-16 text-center">
            <PackageSearch className="mx-auto h-10 w-10 text-cocoa/50" strokeWidth={1.5} />
            <p className="mt-4 font-display text-2xl font-semibold">No products here yet</p>
            <p className="mt-2 text-sm text-muted">New spices are on the way. Try another category for now.</p>
            <button
              type="button"
              onClick={() => setCategory('All')}
              className="mt-6 h-10 rounded-full bg-espresso px-5 text-sm font-semibold text-cream hover:bg-cocoa"
            >
              Show all products
            </button>
          </div>
        )}
      </section>
    </Layout>
  )
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-sand" aria-hidden="true">
      <div className="aspect-[4/5] animate-pulse bg-sand" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-16 animate-pulse rounded bg-sand" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-sand" />
        <div className="h-3 w-full animate-pulse rounded bg-parchment" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-parchment" />
        <div className="h-11 w-full animate-pulse rounded-full bg-parchment" />
      </div>
    </div>
  )
}

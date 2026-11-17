import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'

import { useCart } from '../shared/oreto/cart'
import { EASE, formatLKR, NavigateFn } from '../shared/oreto/format'
import { Layout } from '../shared/oreto/Layout'
import { OrderSummary } from '../shared/oreto/OrderSummary'
import { notify } from '../shared/oreto/toast'

export const args = {}
export const argTypes = {}

type Props = { onNavigate?: NavigateFn }

export default function Cart({ onNavigate }: Props) {
  const go: NavigateFn = onNavigate ?? (() => {})
  const { items, subtotal, count, setQty, remove, clear } = useCart()

  const removeItem = (id: string, name: string) => {
    remove(id)
    notify('Removed from cart', { body: name, tone: 'info' })
  }

  return (
    <Layout current="cart" onNavigate={onNavigate}>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-5xl font-bold leading-none text-ink">Your cart</h1>
          {count > 0 && (
            <p className="text-sm text-muted">
              {count} item{count === 1 ? '' : 's'}
            </p>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-white px-6 py-20 text-center ring-1 ring-sand">
            <ShoppingBag className="mx-auto h-12 w-12 text-cocoa/40" strokeWidth={1.3} />
            <p className="mt-5 font-display text-3xl font-semibold text-ink">Your cart is empty</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              Add a few spices to get started — your cart is saved on this device, even if you leave.
            </p>
            <button
              type="button"
              onClick={() => go('products')}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-espresso px-7 text-sm font-semibold text-cream transition-colors duration-150 hover:bg-cocoa"
            >
              Browse spices <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
            <div>
              <ul className="divide-y divide-sand border-y border-sand">
                <AnimatePresence initial={false}>
                  {items.map(({ product, qty, lineTotal }) => (
                    <motion.li
                      key={product.id}
                      layout
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="grid grid-cols-[80px_1fr] gap-4 py-6 sm:grid-cols-[96px_1fr_auto] sm:gap-6"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/5] w-full rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-muted">{product.sinhalaName}</p>
                        <h2 className="font-display text-2xl font-bold leading-tight text-ink">{product.name}</h2>
                        <p className="mt-1 text-sm text-muted">
                          {product.size} · {formatLKR(product.price)} each
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                          <div className="flex h-10 items-center rounded-full bg-white ring-1 ring-sand">
                            <button
                              type="button"
                              onClick={() => (qty === 1 ? removeItem(product.id, product.name) : setQty(product.id, qty - 1))}
                              className="grid h-10 w-10 place-items-center text-cocoa hover:text-ink"
                              aria-label={`Decrease ${product.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(product.id, qty + 1)}
                              className="grid h-10 w-10 place-items-center text-cocoa hover:text-ink"
                              aria-label={`Increase ${product.name}`}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id, product.name)}
                            className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-chili"
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </button>
                        </div>
                      </div>
                      <p className="col-start-2 font-display text-2xl font-bold tabular-nums text-ink sm:col-start-3 sm:text-right">
                        {formatLKR(lineTotal)}
                      </p>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => go('products')}
                  className="flex items-center gap-2 text-sm font-semibold text-cocoa hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4" /> Continue shopping
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clear()
                    notify('Cart cleared', { tone: 'info' })
                  }}
                  className="text-sm font-medium text-muted hover:text-chili"
                >
                  Clear cart
                </button>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <OrderSummary items={items} subtotal={subtotal}>
                <button
                  type="button"
                  onClick={() => go('checkout')}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gold text-sm font-semibold text-espresso transition-colors duration-150 hover:bg-gold-soft"
                >
                  Proceed to checkout <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-xs text-muted">You'll confirm your order on WhatsApp.</p>
              </OrderSummary>
            </div>
          </div>
        )}
      </section>
    </Layout>
  )
}

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Leaf, Loader2, Minus, Plus, ShoppingBag, X } from 'lucide-react'

import { EASE, formatLKR } from './format'
import { Product } from './products'
import { useAddToCart } from './useAddToCart'

type Props = { product: Product; open: boolean; onClose: () => void }

export function ProductModal({ product, open, onClose }: Props) {
  const [qty, setQty] = useState(1)
  const { status, add } = useAddToCart(product)

  useEffect(() => {
    if (!open) return
    setQty(1)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (typeof document === 'undefined') return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-espresso/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-cream sm:rounded-3xl md:grid-cols-[0.9fr_1.1fr]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-ink hover:bg-white"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={product.image}
              alt={product.name}
              decoding="async"
              className="h-72 w-full object-cover md:h-full"
            />
            <div className="flex flex-col p-6 sm:p-8">
              <p className="text-sm text-muted">{product.sinhalaName}</p>
              <h2 className="mt-1 font-display text-4xl font-bold leading-tight text-ink">{product.name}</h2>
              <p className="mt-3 font-display text-3xl font-bold text-chili">{formatLKR(product.price)}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-sand py-4 text-sm">
                <div>
                  <dt className="text-muted">Pack size</dt>
                  <dd className="mt-0.5 font-semibold text-ink">{product.size}</dd>
                </div>
                <div>
                  <dt className="text-muted">Availability</dt>
                  <dd className={`mt-0.5 font-semibold ${product.inStock ? 'text-leaf' : 'text-chili'}`}>
                    {product.inStock ? 'In stock' : 'Out of stock'}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 flex items-center gap-2 text-sm text-leaf">
                <Leaf className="h-4 w-4" /> Made in Sri Lanka
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                <div className="flex h-12 items-center rounded-full border border-cocoa/25 bg-white">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-12 w-11 place-items-center text-cocoa hover:text-ink"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="grid h-12 w-11 place-items-center text-cocoa hover:text-ink"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => add(qty)}
                  disabled={!product.inStock || status === 'adding'}
                  className={`flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-semibold transition-colors duration-150 ${
                    status === 'added' ? 'bg-leaf text-cream' : 'bg-espresso text-cream hover:bg-cocoa'
                  }`}
                >
                  {status === 'adding' && <Loader2 className="h-4 w-4 animate-spin" />}
                  {status === 'added' && <Check className="h-4 w-4" />}
                  {status === 'idle' && <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />}
                  {status === 'added' ? 'Added to cart' : status === 'adding' ? 'Adding…' : `Add to Cart · ${formatLKR(product.price * qty)}`}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

import React, { useState } from 'react'
import { Check, Loader2, ShoppingBag } from 'lucide-react'

import { formatLKR } from './format'
import { ProductImage } from './ProductImage'
import { ProductModal } from './ProductModal'
import { Product } from './products'
import { useAddToCart } from './useAddToCart'

export function ProductCard({ product }: { product: Product }) {
  const { status, add } = useAddToCart(product)
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(36,21,13,0.06),0_12px_32px_-18px_rgba(36,21,13,0.35)] ring-1 ring-sand transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(36,21,13,0.06),0_24px_44px_-20px_rgba(36,21,13,0.45)]">
      <button
        type="button"
        onClick={() => setDetailsOpen(true)}
        className="relative block overflow-hidden"
        aria-label={`View details for ${product.name}`}
      >
        <ProductImage
          src={product.image}
          alt={`${product.name} — ORETO Spices ${product.size} pack`}
          className="aspect-[4/5] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-2.5 py-1 text-[11px] font-semibold text-cocoa">
          {product.category}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-muted">{product.sinhalaName}</p>
        <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-ink">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{product.shortDescription}</p>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3 border-t border-sand pt-4">
            <div>
              <p className="text-xs text-muted">Pack size</p>
              <p className="mt-0.5 text-sm font-semibold text-ink">{product.size}</p>
            </div>
            <p className="font-display text-2xl font-bold text-chili">{formatLKR(product.price)}</p>
          </div>

          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <button
              type="button"
              onClick={() => add()}
              disabled={!product.inStock || status === 'adding'}
              className={`flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors duration-150 active:scale-[0.98] disabled:cursor-not-allowed ${
                status === 'added' ? 'bg-leaf text-cream' : 'bg-espresso text-cream hover:bg-cocoa'
              }`}
            >
              {status === 'adding' && <Loader2 className="h-4 w-4 animate-spin" />}
              {status === 'added' && <Check className="h-4 w-4" />}
              {status === 'idle' && <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />}
              {!product.inStock ? 'Out of stock' : status === 'added' ? 'Added' : status === 'adding' ? 'Adding…' : 'Add to Cart'}
            </button>
            <button
              type="button"
              onClick={() => setDetailsOpen(true)}
              className="h-11 whitespace-nowrap rounded-full border border-cocoa/25 px-4 text-sm font-semibold text-cocoa transition-colors duration-150 hover:border-cocoa hover:bg-parchment"
            >
              Details
            </button>
          </div>
        </div>
      </div>

      <ProductModal product={product} open={detailsOpen} onClose={() => setDetailsOpen(false)} />
    </article>
  )
}

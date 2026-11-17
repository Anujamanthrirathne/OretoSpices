import React from 'react'

import { CartItem } from './cart'
import { formatLKR } from './format'

type Props = { items: CartItem[]; subtotal: number; children?: React.ReactNode; compact?: boolean }

/** Totals panel used on the cart and checkout pages. */
export function OrderSummary({ items, subtotal, children, compact = false }: Props) {
  return (
    <aside className="rounded-3xl bg-white p-6 ring-1 ring-sand sm:p-8">
      <h2 className="font-display text-2xl font-bold text-ink">Order summary</h2>

      {compact && (
        <ul className="mt-5 space-y-4 border-b border-sand pb-5">
          {items.map((i) => (
            <li key={i.product.id} className="flex items-center gap-3">
              <img
                src={i.product.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-14 w-11 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{i.product.name}</p>
                <p className="text-xs text-muted">
                  {i.product.size} × {i.qty}
                </p>
              </div>
              <p className="text-sm font-medium tabular-nums text-ink">{formatLKR(i.lineTotal)}</p>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Items</dt>
          <dd className="tabular-nums text-ink">{items.reduce((n, i) => n + i.qty, 0)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Subtotal</dt>
          <dd className="tabular-nums text-ink">{formatLKR(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Delivery</dt>
          <dd className="text-right text-ink">Confirmed on WhatsApp</dd>
        </div>
      </dl>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-sand pt-5">
        <span className="font-semibold text-ink">Total</span>
        <span className="font-display text-3xl font-bold tabular-nums text-chili">{formatLKR(subtotal)}</span>
      </div>
      {children}
    </aside>
  )
}

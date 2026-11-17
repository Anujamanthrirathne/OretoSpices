import { useSyncExternalStore } from 'react'

import { getProduct, Product } from './products'

/** Cart line as stored in localStorage: only ids and quantities, so price edits apply instantly. */
export type CartLine = { id: string; qty: number }
export type CartItem = { product: Product; qty: number; lineTotal: number }

const KEY = 'oreto-cart-v1'
const MAX_QTY = 99

let lines: CartLine[] = read()
const listeners = new Set<() => void>()

function read(): CartLine[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : []
    return parsed.filter((l) => getProduct(l.id) && l.qty > 0)
  } catch {
    return []
  }
}

function commit(next: CartLine[]) {
  lines = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines))
  } catch {
    /* storage full or blocked — cart still works for this session */
  }
  listeners.forEach((l) => l())
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      lines = read()
      listeners.forEach((l) => l())
    }
  })
}

export const cart = {
  add(id: string, qty = 1) {
    const existing = lines.find((l) => l.id === id)
    if (existing) {
      commit(lines.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l)))
    } else {
      commit([...lines, { id, qty: Math.min(MAX_QTY, qty) }])
    }
  },
  setQty(id: string, qty: number) {
    if (qty <= 0) return cart.remove(id)
    commit(lines.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)))
  },
  remove(id: string) {
    commit(lines.filter((l) => l.id !== id))
  },
  clear() {
    commit([])
  },
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function useCart() {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => lines,
    () => lines
  )
  const items: CartItem[] = snapshot.flatMap((l) => {
    const product = getProduct(l.id)
    return product ? [{ product, qty: l.qty, lineTotal: product.price * l.qty }] : []
  })
  const count = items.reduce((n, i) => n + i.qty, 0)
  const subtotal = items.reduce((n, i) => n + i.lineTotal, 0)
  return { items, count, subtotal, ...cart }
}

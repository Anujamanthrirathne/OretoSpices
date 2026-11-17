import { useEffect, useRef, useState } from 'react'

import { cart } from './cart'
import { Product } from './products'
import { notify } from './toast'

/** Adds a product with a short confirm state on the button and a toast. */
export function useAddToCart(product: Product) {
  const [status, setStatus] = useState<'idle' | 'adding' | 'added'>('idle')
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const add = (qty = 1) => {
    if (status === 'adding' || !product.inStock) return
    setStatus('adding')
    timers.current.push(
      window.setTimeout(() => {
        cart.add(product.id, qty)
        setStatus('added')
        notify('Added to cart', { body: `${qty} × ${product.name} (${product.size})` })
        timers.current.push(window.setTimeout(() => setStatus('idle'), 1400))
      }, 350)
    )
  }

  return { status, add }
}

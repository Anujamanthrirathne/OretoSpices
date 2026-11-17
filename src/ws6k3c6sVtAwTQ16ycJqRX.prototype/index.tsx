import React, { useEffect, useState } from 'react'

import Home from '../doWZt7ZdzxRACkw9b5qaeX.frame'
import Products from '../24wH4nNdb59MCGRmidsnXa.frame'
import About from '../rzFyztXAi3w2GSHS2KoDkL.frame'
import Contact from '../3UefbRB7AEEmWGmQBrDcDN.frame'
import Cart from '../8Xu1E5t7K3WCR24mEHnMKm.frame'
import Checkout from '../qaimhodNJc5GnJUrHymk1Z.frame'

import type { Page } from '../shared/oreto/format'

const FRAME_BY_PAGE: Record<Page, string> = {
  home: 'doWZt7ZdzxRACkw9b5qaeX',
  products: '24wH4nNdb59MCGRmidsnXa',
  about: 'rzFyztXAi3w2GSHS2KoDkL',
  contact: '3UefbRB7AEEmWGmQBrDcDN',
  cart: '8Xu1E5t7K3WCR24mEHnMKm',
  checkout: 'qaimhodNJc5GnJUrHymk1Z',
}

/** The size every frame draws at, unless one exports its own. */
export const viewport = 'web'

export const folders = [
  { id: 'store', name: 'Store', frames: ['doWZt7ZdzxRACkw9b5qaeX', '24wH4nNdb59MCGRmidsnXa', 'rzFyztXAi3w2GSHS2KoDkL', '3UefbRB7AEEmWGmQBrDcDN'] },
  { id: 'ordering', name: 'Ordering', frames: ['8Xu1E5t7K3WCR24mEHnMKm', 'qaimhodNJc5GnJUrHymk1Z'] },
]

type Props = { start?: string }

export default function OretoSpices({ start }: Props) {
  const [frame, setFrame] = useState(() => start ?? FRAME_BY_PAGE.home)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [frame])

  const onNavigate = (page: Page) => setFrame(FRAME_BY_PAGE[page])

  switch (frame) {
    case FRAME_BY_PAGE.products:
      return <Products onNavigate={onNavigate} />
    case FRAME_BY_PAGE.about:
      return <About onNavigate={onNavigate} />
    case FRAME_BY_PAGE.contact:
      return <Contact onNavigate={onNavigate} />
    case FRAME_BY_PAGE.cart:
      return <Cart onNavigate={onNavigate} />
    case FRAME_BY_PAGE.checkout:
      return <Checkout onNavigate={onNavigate} />
    default:
      return <Home onNavigate={onNavigate} />
  }
}

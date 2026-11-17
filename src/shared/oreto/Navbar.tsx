import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'

import { useCart } from './cart'
import { EASE, NavigateFn, Page } from './format'
import { Logo } from './Logo'

export const NAV_LINKS: { page: Page; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'products', label: 'Products' },
  { page: 'about', label: 'About Us' },
  { page: 'contact', label: 'Contact' },
]

type Props = { current: Page; onNavigate: NavigateFn }

export function Navbar({ current, onNavigate }: Props) {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  const go = (p: Page) => {
    setOpen(false)
    onNavigate(p)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-espresso/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo size={44} onClick={() => go('home')} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((l) => {
            const active = current === l.page
            return (
              <button
                key={l.page}
                type="button"
                onClick={() => go(l.page)}
                aria-current={active ? 'page' : undefined}
                className={`relative whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                  active ? 'text-gold-soft' : 'text-cream/80 hover:text-cream'
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-gold"
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go('cart')}
            className={`relative flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
              current === 'cart' || current === 'checkout'
                ? 'border-gold bg-gold text-espresso'
                : 'border-gold/40 text-cream hover:border-gold hover:bg-gold/10'
            }`}
            aria-label={`Shopping cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            <ShoppingBag className="h-4.5 w-4.5" strokeWidth={1.8} />
            <span className="hidden whitespace-nowrap sm:inline">Cart</span>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={count}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.18, ease: EASE }}
                className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-semibold ${
                  current === 'cart' || current === 'checkout' ? 'bg-espresso text-gold-soft' : 'bg-gold text-espresso'
                }`}
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full text-cream hover:bg-cream/10 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="border-t border-gold/15 bg-espresso px-5 pb-5 pt-2 md:hidden"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.page}
                type="button"
                onClick={() => go(l.page)}
                className={`block w-full border-b border-cream/10 py-3.5 text-left font-display text-2xl font-semibold ${
                  current === l.page ? 'text-gold-soft' : 'text-cream'
                }`}
              >
                {l.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

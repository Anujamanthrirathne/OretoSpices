import React from 'react'

import { Footer } from './Footer'
import { NavigateFn, Page } from './format'
import { Navbar } from './Navbar'
import { Toaster } from './Toaster'

type Props = { current: Page; onNavigate?: NavigateFn; children: React.ReactNode }

/** Shared page shell: navigation, content, footer and notifications. */
export function Layout({ current, onNavigate, children }: Props) {
  const nav: NavigateFn = onNavigate ?? (() => {})
  return (
    <div className="min-h-full bg-cream font-sans text-ink">
      <Navbar current={current} onNavigate={nav} />
      <main>{children}</main>
      <Footer onNavigate={nav} />
      <Toaster />
    </div>
  )
}

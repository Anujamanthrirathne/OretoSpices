import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'

import { EASE } from './format'
import { dismiss, useToasts } from './toast'

export function Toaster() {
  const toasts = useToasts()
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl bg-espresso px-4 py-3.5 text-cream shadow-xl shadow-espresso/30 ring-1 ring-gold/25"
          >
            <span className="mt-0.5">
              {t.tone === 'success' && <CheckCircle2 className="h-5 w-5 text-gold" />}
              {t.tone === 'info' && <Info className="h-5 w-5 text-gold-soft" />}
              {t.tone === 'error' && <AlertCircle className="h-5 w-5 text-red-300" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.body && <p className="mt-0.5 text-sm text-cream/70">{t.body}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="rounded p-0.5 text-cream/50 hover:text-cream"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

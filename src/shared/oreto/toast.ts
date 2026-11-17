import { useSyncExternalStore } from 'react'

export type Toast = { id: number; title: string; body?: string; tone: 'success' | 'info' | 'error' }

let toasts: Toast[] = []
let nextId = 1
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

export function notify(title: string, opts: { body?: string; tone?: Toast['tone'] } = {}) {
  const id = nextId++
  toasts = [...toasts.slice(-2), { id, title, body: opts.body, tone: opts.tone ?? 'success' }]
  emit()
  setTimeout(() => dismiss(id), 3200)
}

export function dismiss(id: number) {
  toasts = toasts.filter((t) => t.id !== id)
  emit()
}

export function useToasts() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => toasts,
    () => toasts
  )
}

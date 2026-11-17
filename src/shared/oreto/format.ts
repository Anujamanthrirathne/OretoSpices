export type Page = 'home' | 'products' | 'about' | 'contact' | 'cart' | 'checkout'

export type NavigateFn = (page: Page) => void

export function formatLKR(amount: number) {
  return `LKR ${amount.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export const EASE = [0.23, 1, 0.32, 1] as const

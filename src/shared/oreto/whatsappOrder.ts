import { CartItem } from './cart'
import { formatLKR } from './format'

export type Customer = { name: string; phone: string; email: string; address: string; notes: string }

/** Builds the WhatsApp order message. WhatsApp renders *text* as bold. */
export function buildOrderMessage(items: CartItem[], subtotal: number, c: Customer) {
  const lines = items.map(
    (i, n) => `${n + 1}. ${i.product.name} (${i.product.size}) × ${i.qty} — ${formatLKR(i.lineTotal)}`
  )
  return [
    '*New Order — ORETO Spices*',
    '',
    '*Order items*',
    ...lines,
    '',
    `*Total: ${formatLKR(subtotal)}*`,
    '',
    '*Customer details*',
    `Name: ${c.name}`,
    `Phone: ${c.phone}`,
    `Email: ${c.email}`,
    `Delivery address: ${c.address}`,
    ...(c.notes.trim() ? ['', `Notes: ${c.notes.trim()}`] : []),
    '',
    'Please confirm my order and the delivery charge. Thank you!',
  ].join('\n')
}

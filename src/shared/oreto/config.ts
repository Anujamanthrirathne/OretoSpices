/**
 * ORETO Spices — store settings.
 * Edit these values to update contact details everywhere on the site.
 * Values marked PLACEHOLDER must be replaced with your real details.
 */
export const STORE = {
  name: 'ORETO Spices',
  tagline: 'Traditional Blends · Est. 2023',

  /** PLACEHOLDER — WhatsApp number in international format, digits only (94 = Sri Lanka). */
  whatsappNumber: '94770000000',
  /** PLACEHOLDER — shown to customers. */
  phoneDisplay: '+94 77 000 0000',
  /** PLACEHOLDER */
  email: 'hello@oretospices.lk',
  /** PLACEHOLDER */
  address: 'Colombo, Sri Lanka',
  /** PLACEHOLDER */
  hours: 'Mon – Sat, 8.30 am – 6.00 pm',

  /** PLACEHOLDER — replace with your real page links. */
  facebookUrl: 'https://www.facebook.com/',
  instagramUrl: 'https://www.instagram.com/',

  currency: 'LKR',
}

export const LOGO_URL =
  'https://cdn.magicpatterns.com/uploads/qf3ApBWX1NuTfzH6ixzwBk/Gemini_Generated_Image_3j81hm3j81hm3j81.jpg'

export const IMAGES = {
  hero: 'https://cdn.magicpatterns.com/patterns/generated-images/5e4172c8-625c-40c5-9dc9-70e2d34ad01d.jpg',
  farm: 'https://cdn.magicpatterns.com/patterns/generated-images/d26fa51d-03d0-44be-99bc-09350ac2817d.jpg',
  grinding: 'https://cdn.magicpatterns.com/patterns/generated-images/de7382fe-4b11-40c8-b6f4-20ca124c8e5c.jpg',
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${STORE.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

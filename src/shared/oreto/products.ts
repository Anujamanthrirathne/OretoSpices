/**
 * Product catalogue.
 * To add a product, copy one entry, give it a unique `id`, and fill in its details.
 * Every page (featured, shop, cart, checkout) reads from this list.
 *
 * PRICES ARE PLACEHOLDERS — replace `price` with your real selling price in LKR.
 */
export type Product = {
  id: string
  name: string
  sinhalaName: string
  shortDescription: string
  description: string
  price: number
  size: string
  image: string
  category: 'Blends' | 'Pure Spices'
  featured: boolean
  inStock: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'curry-powder',
    name: 'Curry Powder',
    sinhalaName: 'තුනපහ කුඩු',
    shortDescription: 'Classic roasted Sri Lankan curry blend for everyday rice and curry.',
    description:
      'A traditional Sri Lankan curry blend, prepared for the everyday rice and curry table. Use it in vegetable, dhal, chicken and fish curries for a deep, rounded flavour.',
    price: 350, // PLACEHOLDER — replace with real price
    size: '100 g',
    image: 'https://cdn.magicpatterns.com/uploads/hKuJrnDRJcSr5oCxqhSa1U/tunapaha.jpg',
    category: 'Blends',
    featured: true,
    inStock: true,
  },
  {
    id: 'black-pepper-powder',
    name: 'Black Pepper Powder',
    sinhalaName: 'ගම්මිරිස් කුඩු',
    shortDescription: 'Finely ground Sri Lankan black pepper with a sharp, warm bite.',
    description:
      'Ground black pepper from Sri Lanka, with the bold heat and aroma the island is known for. Ideal for pepper chicken, soups, marinades and finishing dishes at the table.',
    price: 450, // PLACEHOLDER — replace with real price
    size: '100 g',
    image: 'https://cdn.magicpatterns.com/uploads/4QPZeHidxD1TS7EeUX8qid/gammiris.jpg',
    category: 'Pure Spices',
    featured: true,
    inStock: true,
  },
  {
    id: 'turmeric-powder',
    name: 'Turmeric Powder',
    sinhalaName: 'කහ කුඩු',
    shortDescription: 'Bright golden turmeric for colour, aroma and earthy depth.',
    description:
      'Pure turmeric powder with a vivid golden colour. A staple of Sri Lankan cooking — add it to curries, rice, milk and marinades.',
    price: 300, // PLACEHOLDER — replace with real price
    size: '100 g',
    image: 'https://cdn.magicpatterns.com/uploads/7N5G5RnakBDugpbnnLTfPM/kaha_kudu.jpg',
    category: 'Pure Spices',
    featured: true,
    inStock: true,
  },
  {
    id: 'mas-curry-powder',
    name: 'Mas Curry Powder',
    sinhalaName: 'මස් කරි කුඩු',
    shortDescription: 'Rich, spiced blend made for meat curries with cinnamon and clove.',
    description:
      'A rich meat-curry blend with warm notes of cinnamon, cardamom and clove. Made for chicken, beef, mutton and pork curries with a dark, aromatic gravy.',
    price: 400, // PLACEHOLDER — replace with real price
    size: '100 g',
    image: 'https://cdn.magicpatterns.com/uploads/nE6VZkRWpESdzpaz7fiQpM/miris_kudu.jpg',
    category: 'Blends',
    featured: true,
    inStock: true,
  },
]

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id)
}

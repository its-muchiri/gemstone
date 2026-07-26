export interface BestSeller {
  categorySlug: string
  name: string
  imageUrl: string
  bestSellerPercent: number
}

export const bestSellers: BestSeller[] = [
  { categorySlug: 'sapphire', name: 'Sapphire', imageUrl: '/images/all_sapphire.jpg', bestSellerPercent: 12.02 },
  { categorySlug: 'topaz', name: 'Topaz', imageUrl: '/images/all_topaz.jpg', bestSellerPercent: 7.29 },
  { categorySlug: 'citrine', name: 'Citrine', imageUrl: '/images/all_citrine.jpg', bestSellerPercent: 4.86 },
  { categorySlug: 'amethyst', name: 'Amethyst', imageUrl: '/images/all_amethyst.jpg', bestSellerPercent: 4.60 },
  { categorySlug: 'tourmaline', name: 'Tourmaline', imageUrl: '/images/all_tourmaline.jpg', bestSellerPercent: 4.60 },
  { categorySlug: 'opal', name: 'Opal', imageUrl: '/images/all_opal.jpg', bestSellerPercent: 3.96 },
  { categorySlug: 'ruby', name: 'Ruby', imageUrl: '/images/all_ruby.jpg', bestSellerPercent: 3.58 },
  { categorySlug: 'garnet', name: 'Rhodolite Garnet', imageUrl: '/images/all_rhodolite-garnet.jpg', bestSellerPercent: 3.07 },
]

export interface Testimonial {
  id: string
  rating: number
  quote: string
  name: string
  date: string
  source: string
}

export const testimonials: Testimonial[] = [
  { id: 't1', rating: 10, quote: 'Very good place to buy gemstones', name: 'Elansary', date: 'March, 2026', source: 'Bizrate' },
  { id: 't2', rating: 9, quote: 'I loved the selection of gemstones you have a to z', name: 'James', date: 'May, 2026', source: 'Bizrate' },
  { id: 't3', rating: 10, quote: 'This is the first time I have used this site. I was dissatisfied with the quality of gems and supplies elsewhere and decided to try GemSelect. They are awesome! I was thrilled to see the variety and the great web performance.', name: 'PickyShopper', date: 'April, 2026', source: 'Bizrate' },
  { id: 't4', rating: 9, quote: "I think there's no problem", name: 'Napoleon', date: 'August, 2025', source: 'Bizrate' },
  { id: 't5', rating: 10, quote: "I was able to find what I've been looking for.", name: 'Tree Dog', date: 'April, 2026', source: 'Bizrate' },
  { id: 't6', rating: 10, quote: 'My experience was done with ease', name: 'Barb', date: 'October, 2025', source: 'Bizrate' },
  { id: 't7', rating: 10, quote: 'Would have bought an indigo and selenite, but neither listed. But, you do offer quite a large assortment otherwise.', name: 'JD', date: 'July, 2025', source: 'Bizrate' },
  { id: 't8', rating: 10, quote: 'I found the filter options excellent. Yours was the third site I visited and the first I purchased from as I was able to easily find what I was looking for.', name: 'Kelly', date: 'May, 2026', source: 'Bizrate' },
  { id: 't9', rating: 10, quote: 'Easy and good price', name: 'Bry_guy', date: 'March, 2026', source: 'Bizrate' },
]

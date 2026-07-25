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

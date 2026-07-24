export interface Category {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
  bestSellerPercent: number;
  colors: string[];
}

export const categories: Category[] = [
  {
    slug: 'sapphire',
    name: 'Sapphire',
    description: 'Sapphires are among the most coveted gemstones in the world, prized for their extraordinary depth of color. From the velvety cornflower blue of Kashmir to the vivid pinks of Sri Lanka, sapphires have adorned royalty for centuries. Our collection features untreated and heated sapphires in a stunning range of colors.',
    imageUrl: '/images/sapphire_main-cat.jpg',
    productCount: 24,
    bestSellerPercent: 32,
    colors: ['Blue', 'Pink', 'Yellow', 'White', 'Orange', 'Violet', 'Purple', 'Green', 'Multi'],
  },
  {
    slug: 'ruby',
    name: 'Ruby',
    description: 'The ruby is the king of precious stones, revered for its passionate red hue. Burmese rubies, known as "pigeon blood" rubies, are the most prized. Our rubies range from bright pigeon blood to deep burgundy, sourced from the finest mines worldwide.',
    imageUrl: '/images/ruby.jpg',
    productCount: 6,
    bestSellerPercent: 28,
    colors: ['Red', 'Pinkish-Red', 'Purplish-Red'],
  },
  {
    slug: 'emerald',
    name: 'Emerald',
    description: 'Emeralds have been treasured for over 5,000 years as a symbol of rebirth and eternal love. The finest emeralds display an intense bluish-green color with remarkable transparency. Our Colombian and Zambian emeralds represent the pinnacle of quality.',
    imageUrl: '/images/emerald.jpg',
    productCount: 7,
    bestSellerPercent: 25,
    colors: ['Green', 'Bluish-Green', 'Yellowish-Green'],
  },
  {
    slug: 'amethyst',
    name: 'Amethyst',
    description: 'Amethyst, the gemstone of sobriety and clarity, ranges from pale lavender to deep royal purple. Once reserved for royalty, this stunning variety of quartz is now beloved by gem collectors worldwide. Brazilian and Uruguayan amethysts offer the finest color saturation.',
    imageUrl: '/images/amethyst.jpg',
    productCount: 5,
    bestSellerPercent: 18,
    colors: ['Purple', 'Lavender', 'Deep Purple'],
  },
  {
    slug: 'topaz',
    name: 'Topaz',
    description: 'Topaz occurs in a rainbow of colors, from imperial golden-orange to sky blue. The rarest is the imperial topaz, prized for its warm peach-orange hue. Our collection includes both natural and treated topaz in stunning cuts and sizes.',
    imageUrl: '/images/topaz.jpg',
    productCount: 5,
    bestSellerPercent: 15,
    colors: ['Blue', 'Imperial', 'Yellow', 'Clear'],
  },
  {
    slug: 'aquamarine',
    name: 'Aquamarine',
    description: 'Named after seawater, aquamarine captures the serene beauty of tropical oceans. This beryl variety ranges from pale blue to vivid blue-green, with the deepest colors commanding the highest premiums. Perfect for elegant, understated jewelry.',
    imageUrl: '/images/aquamarine.jpg',
    productCount: 5,
    bestSellerPercent: 20,
    colors: ['Light Blue', 'Blue', 'Blue-Green'],
  },
  {
    slug: 'tourmaline',
    name: 'Tourmaline',
    description: 'Tourmaline is the most colorful gemstone family, occurring in virtually every shade of the rainbow. Paraíba tourmalines with their electric neon blue-green are among the rarest and most valuable. Our collection features extraordinary tourmalines in every color.',
    imageUrl: '/images/tourmaline.jpg',
    productCount: 6,
    bestSellerPercent: 14,
    colors: ['Pink', 'Green', 'Blue', 'Watermelon', 'Paraíba'],
  },
  {
    slug: 'opal',
    name: 'Opal',
    description: 'Opals display a mesmerizing play of color unmatched by any other gemstone. Australian boulder opals, Ethiopian welo opals, and Mexican fire opals each have distinctive character. Every opal is a unique work of natural art.',
    imageUrl: '/images/opal.jpg',
    productCount: 5,
    bestSellerPercent: 16,
    colors: ['White', 'Black', 'Crystal', 'Fire', 'Boulder'],
  },
  {
    slug: 'garnet',
    name: 'Garnet',
    description: 'Garnets span a remarkable color range from deep red tsavorite to vivid mandarin orange spessartite. Often associated with passion and vitality, garnets have been used in jewelry since the Bronze Age. Our collection showcases rare varieties beyond traditional red.',
    imageUrl: '/images/garnet.jpg',
    productCount: 5,
    bestSellerPercent: 12,
    colors: ['Red', 'Green', 'Orange', 'Pink', 'Purple'],
  },
  {
    slug: 'tanzanite',
    name: 'Tanzanite',
    description: 'Found only in a small area near Mount Kilimanjaro, tanzanite is 1,000 times rarer than diamond. Its pleochroic blue-violet hue is unlike any other gemstone. Available in larger sizes at a fraction of sapphire prices, tanzanite offers extraordinary value.',
    imageUrl: '/images/tanzanite.jpg',
    productCount: 4,
    bestSellerPercent: 22,
    colors: ['Blue-Violet', 'Blue', 'Violet'],
  },
  {
    slug: 'zircon',
    name: 'Zircon',
    description: 'Not to be confused with cubic zirconia, natural zircon is one of the oldest minerals on Earth. Its remarkable brilliance and fire rival that of diamond. Blue zircon, with its vivid aqua hue, is particularly popular and striking.',
    imageUrl: '/images/zircon.jpg',
    productCount: 4,
    bestSellerPercent: 8,
    colors: ['Blue', 'Golden', 'Red', 'Colorless'],
  },
  {
    slug: 'citrine',
    name: 'Citrine',
    description: 'Citrine, the gemstone of abundance and warmth, ranges from pale lemon to deep amber. As a variety of quartz, it offers exceptional clarity and brilliant yellow tones. Brazilian citrines are particularly prized for their rich honey-gold color.',
    imageUrl: '/images/citrine.jpg',
    productCount: 4,
    bestSellerPercent: 10,
    colors: ['Yellow', 'Golden', 'Amber', 'Lemon'],
  },
  {
    slug: 'moonstone',
    name: 'Moonstone',
    description: 'Moonstone captivates with its ethereal adularescence — a luminous sheen that appears to float beneath the surface. Revered since antiquity, this feldspar gemstone is associated with new beginnings and inner strength. Our moonstones display exceptional blue sheen.',
    imageUrl: '/images/moonstone.jpg',
    productCount: 3,
    bestSellerPercent: 7,
    colors: ['White', 'Blue Sheen', 'Rainbow', 'Peach'],
  },
  {
    slug: 'spinel',
    name: 'Spinel',
    description: 'Once confused with ruby, spinel is now recognized as a first-rate gemstone in its own right. Exceptional spinels rival fine rubies in color and brilliance. Available in red, pink, blue, and rare cobalt blue, spinel offers superb quality at accessible prices.',
    imageUrl: '/images/spinel.jpg',
    productCount: 4,
    bestSellerPercent: 9,
    colors: ['Red', 'Pink', 'Blue', 'Black', 'Gray'],
  },
  {
    slug: 'alexandrite',
    name: 'Alexandrite',
    description: 'The legendary color-change alexandrite shifts from emerald green in daylight to ruby red under incandescent light. One of the rarest and most valuable gemstones, alexandrite is prized by serious collectors. Fine specimens command extraordinary premiums.',
    imageUrl: '/images/alexandrite.jpg',
    productCount: 3,
    bestSellerPercent: 6,
    colors: ['Color-Changing', 'Green', 'Red'],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

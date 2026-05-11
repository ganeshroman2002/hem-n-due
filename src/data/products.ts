export interface Product {
  id: string;
  name: string;
  gender: 'Women' | 'Men';
  collection: 'Premium' | 'Royal';
  topNotes: string;
  middleNotes: string;
  baseNotes: string;
  price: string;
  image: string;
  gallery: string[];
}

export const products: Product[] = [

  // ─────────────────────────────────────────
  // PREMIUM COLLECTION — WOMEN  (8 products)
  // ─────────────────────────────────────────
  {
    id: 'chautm-opulence',
    name: 'Chautm Opulence',
    gender: 'Women',
    collection: 'Premium',
    topNotes: 'Pepper, Orange Blossom, Pear',
    middleNotes: 'Coffee, Jasmine, Vanilla',
    baseNotes: 'Vanilla, Patchouli, Cedar',
    price: '$180.00',
    image: '/product-images/Chautm Opulence/Chautm Opulence.png',
    gallery: [
      '/product-images/Chautm Opulence/Chautm Opulence1.png',
      '/product-images/Chautm Opulence/Chautm Opulence2.png',
      '/product-images/Chautm Opulence/Chautm Opulence3.png',
      '/product-images/Chautm Opulence/Chautm Opulence4.png'
    ]
  },
  {
    id: 'dewy-floral',
    name: 'Dewy Floral',
    gender: 'Women',
    collection: 'Premium',
    topNotes: 'Citruses, Mandarin Orange',
    middleNotes: 'Osmanthus, Rose',
    baseNotes: 'Sandalwood, Patchouli',
    price: '$160.00',
    image: '/product-images/Dewy Floral/Dewy Floral.png',
    gallery: [
      '/product-images/Dewy Floral/Dewy Floral1.png',
      '/product-images/Dewy Floral/Dewy Floral2.png',
      '/product-images/Dewy Floral/Dewy Floral3.png',
      '/product-images/Dewy Floral/Dewy Floral4.png'
    ]
  },
  {
    id: 'moon-lit-garden',
    name: 'Moon Lit Garden',
    gender: 'Women',
    collection: 'Premium',
    topNotes: 'Pink Pepper, Mandarin Orange, Bergamot',
    middleNotes: 'Lilac, Peach Geranium, Jasmine, Black Currant',
    baseNotes: 'Patchouli, Amber, White Musk, Vanilla',
    price: '$190.00',
    image: '/product-images/Moon Lit Garden/Moon Lit Garden.png',
    gallery: [
      '/product-images/Moon Lit Garden/Moon Lit Garden1.png',
      '/product-images/Moon Lit Garden/Moon Lit Garden2.png',
      '/product-images/Moon Lit Garden/Moon Lit Garden3.png',
      '/product-images/Moon Lit Garden/Moon Lit Garden4.png'
    ]
  },
  {
    id: 'sarit-silent',
    name: 'Sarit Silent',
    gender: 'Women',
    collection: 'Premium',
    topNotes: 'Patchouli, Neroli, Bergamot',
    middleNotes: 'Jasmine, Rose, Orris Root, Lily of the Valley',
    baseNotes: 'Musk, Sandalwood, Vetiver, Amber Moss',
    price: '$210.00',
    image: '/product-images/Sarit Silent/Sarit Silent.png',
    gallery: [
      '/product-images/Sarit Silent/Sarit Silent1.png',
      '/product-images/Sarit Silent/Sarit Silent2.png',
      '/product-images/Sarit Silent/Sarit Silent3.png',
      '/product-images/Sarit Silent/Sarit Silent4.png'
    ]
  },
  {
    id: 'berry-bloom',
    name: 'Berry Bloom',
    gender: 'Women',
    collection: 'Premium',
    topNotes: 'Strawberry, Raspberry, Blackberry, Sour Cherry, Black Currant, Mandarin Orange, Lemon',
    middleNotes: 'Strawberry, Raspberry, Blackberry, Sour Cherry, Black Currant, Mandarin Orange, Lemon',
    baseNotes: 'Musk, Vanilla, Cashmeran, Woody Notes, Oakmoss, Amber, Patchouli',
    price: '$175.00',
    image: '/product-images/Berry Bloom/Berry Bloom.png',
    gallery: [
      '/product-images/Berry Bloom/Berry Bloom1.png',
      '/product-images/Berry Bloom/Berry Bloom2.png',
      '/product-images/Berry Bloom/Berry Bloom3.png',
      '/product-images/Berry Bloom/Berry Bloom4.png'
    ]
  },
  {
    id: 'imperial-fusion',
    name: 'Imperial Fusion',
    gender: 'Women',
    collection: 'Premium',
    topNotes: 'Pear, Melon, Magnolia, Peach, Mandarin Orange, Bergamot',
    middleNotes: 'Jasmine, Lily of the Valley, Tuberose, Freesia, Rose, Orchid, Violet, Plum',
    baseNotes: 'Musk, Vanilla, Cedar, Blackberry',
    price: '$220.00',
    image: '/product-images/Imperial Fusion/Imperial Fusion.png',
    gallery: [
      '/product-images/Imperial Fusion/Imperial Fusion1.png',
      '/product-images/Imperial Fusion/Imperial Fusion2.png',
      '/product-images/Imperial Fusion/Imperial Fusion3.png',
      '/product-images/Imperial Fusion/Imperial Fusion4.png'
    ]
  },
  {
    id: 'scarlet-grace',
    name: 'Scarlet Grace',
    gender: 'Women',
    collection: 'Premium',
    topNotes: 'Freesia, Peach, Absinthe',
    middleNotes: 'Rose, Iris, Sandalwood',
    baseNotes: 'Cashmere Wood, Vanilla, Amber, Musk',
    price: '$230.00',
    image: '/product-images/Scarlet Grace/Scarlet Grace.png',
    gallery: [
      '/product-images/Scarlet Grace/Scarlet Grace1.png',
      '/product-images/Scarlet Grace/Scarlet Grace2.png',
      '/product-images/Scarlet Grace/Scarlet Grace3.png',
      '/product-images/Scarlet Grace/Scarlet Grace4.png'
    ]
  },
  {
    id: 'golden-peony',
    name: 'Golden Peony',
    gender: 'Women',
    collection: 'Premium',
    topNotes: 'Bergamot, Mandarin, Citrus, Bitter Almond',
    middleNotes: 'Peony, Ylang-Ylang, Rose, Upcycled Rose Oil',
    baseNotes: 'Vanilla, Tonka Bean, Coumarin',
    price: '$240.00',
    image: '/product-images/Golden Peony/Golden Peony.png',
    gallery: [
      '/product-images/Golden Peony/Golden Peony1.png',
      '/product-images/Golden Peony/Golden Peony2.png',
      '/product-images/Golden Peony/Golden Peony3.png',
      '/product-images/Golden Peony/Golden Peony4.png'
    ]
  },

  // ─────────────────────────────────────────
  // PREMIUM COLLECTION — MEN  (8 products)
  // ─────────────────────────────────────────
  {
    id: 'hexotic-aquaa',
    name: 'Hexotic Aquaa',
    gender: 'Men',
    collection: 'Premium',
    topNotes: 'Grape, Neroli, Mandarin Orange',
    middleNotes: 'Rosemary, Marine Accords',
    baseNotes: 'Virginia Cedar, Amber',
    price: '$180.00',
    image: '/product-images/Hexotic Aquaa/Hexotic Aquaa.png',
    gallery: [
      '/product-images/Hexotic Aquaa/Hexotic Aquaa1.png',
      '/product-images/Hexotic Aquaa/Hexotic Aquaa2.png',
      '/product-images/Hexotic Aquaa/Hexotic Aquaa3.png',
      '/product-images/Hexotic Aquaa/Hexotic Aquaa4.png'
    ]
  },
  {
    id: 'hempt-blue',
    name: 'Hempt Blue',
    gender: 'Men',
    collection: 'Premium',
    topNotes: 'Grapefruit, Mint, Bergamot',
    middleNotes: 'Ginger, Violet Leaf, Sage',
    baseNotes: 'Cedarwood, Vetiver',
    price: '$190.00',
    image: '/product-images/Hempt Blue/Hempt Blue.png',
    gallery: [
      '/product-images/Hempt Blue/Hempt Blue1.png',
      '/product-images/Hempt Blue/Hempt Blue2.png',
      '/product-images/Hempt Blue/Hempt Blue3.png',
      '/product-images/Hempt Blue/Hempt Blue4.png'
    ]
  },
  {
    id: 'd-ram-mint',
    name: 'D Ram Mint',
    gender: 'Men',
    collection: 'Premium',
    topNotes: 'Mandarin Orange, Pink Pepper, Cardamom',
    middleNotes: 'Lavender, Clary Sage, Vetiver, Mint Fruits',
    baseNotes: 'Oak, Olibanum, Fresh Deep Blue Sea',
    price: '$200.00',
    image: '/product-images/D Ram Mint/D Ram Mint.png',
    gallery: [
      '/product-images/D Ram Mint/D Ram Mint1.png',
      '/product-images/D Ram Mint/D Ram Mint2.png',
      '/product-images/D Ram Mint/D Ram Mint3.png',
      '/product-images/D Ram Mint/D Ram Mint4.png'
    ]
  },
  {
    id: 'vent-blanc',
    name: 'Vent Blanc',
    gender: 'Men',
    collection: 'Premium',
    topNotes: 'Grapefruit, Rosemary, Cardamom, Cedar Leaf',
    middleNotes: 'Tuberose, Ylang-Ylang',
    baseNotes: 'Cedarwood, Suede, Vetiver, Leather',
    price: '$210.00',
    image: '/product-images/Vent Blanc/Vent Blanc.png',
    gallery: [
      '/product-images/Vent Blanc/Vent Blanc1.png',
      '/product-images/Vent Blanc/Vent Blanc2.png',
      '/product-images/Vent Blanc/Vent Blanc3.png',
      '/product-images/Vent Blanc/Vent Blanc4.png'
    ]
  },
  {
    id: 'alpha-male',
    name: 'Alpha Male',
    gender: 'Men',
    collection: 'Premium',
    topNotes: 'Lavender, Lemon',
    middleNotes: 'African Orange Blossom',
    baseNotes: 'Virginia Cedarwood, Patchouli, Vanilla',
    price: '$225.00',
    image: '/product-images/Alpha Male/Alpha Male.png',
    gallery: [
      '/product-images/Alpha Male/Alpha Male1.png',
      '/product-images/Alpha Male/Alpha Male2.png',
      '/product-images/Alpha Male/Alpha Male3.png',
      '/product-images/Alpha Male/Alpha Male4.png'
    ]
  },
  {
    id: 'seventh-glory',
    name: 'Seventh Glory',
    gender: 'Men',
    collection: 'Premium',
    topNotes: 'Bergamot, Lavender, Cardamom, Artemisia',
    middleNotes: 'Tobacco, Cinnamon, Cedarwood, Iris',
    baseNotes: 'Vanilla, Musk, Sandalwood, Amber',
    price: '$240.00',
    image: '/product-images/Seventh Glory/Seventh Glory.png',
    gallery: [
      '/product-images/Seventh Glory/Seventh Glory1.png',
      '/product-images/Seventh Glory/Seventh Glory2.png',
      '/product-images/Seventh Glory/Seventh Glory3.png',
      '/product-images/Seventh Glory/Seventh Glory4.png'
    ]
  },
  {
    id: 'aahra-opulence',
    name: 'Aahra Opulence',
    gender: 'Men',
    collection: 'Premium',
    topNotes: 'Citron, Lemon, Orange, Black Currant, Mint, Coriander',
    middleNotes: 'Apricot, Basil, Carrot Seeds, May Rose',
    baseNotes: 'Fig, Dates, Ambrett',
    price: '$260.00',
    image: '/product-images/Aahra Opulence/Aahra Opulence.png',
    gallery: [
      '/product-images/Aahra Opulence/Aahra Opulence1.png',
      '/product-images/Aahra Opulence/Aahra Opulence2.png',
      '/product-images/Aahra Opulence/Aahra Opulence3.png',
      '/product-images/Aahra Opulence/Aahra Opulence4.png'
    ]
  },
  {
    id: 'golden-imperio',
    name: 'Golden Imperio',
    gender: 'Men',
    collection: 'Premium',
    topNotes: 'Watery Fruits, Bergamot, Mandarin',
    middleNotes: 'Violet Leaves, Geranium, Pomarose',
    baseNotes: 'Tobacco, Amber Wood, Musk',
    price: '$255.00',
    image: '/product-images/Golden Imperio/Golden Imperio.png',
    gallery: [
      '/product-images/Golden Imperio/Golden Imperio1.png',
      '/product-images/Golden Imperio/Golden Imperio2.png',
      '/product-images/Golden Imperio/Golden Imperio3.png',
      '/product-images/Golden Imperio/Golden Imperio4.png'
    ]
  },

  // ─────────────────────────────────────────
  // ROYAL COLLECTION — WOMEN  (4 products)
  // ─────────────────────────────────────────
  {
    id: 'gardenia-glamour',
    name: 'Gardenia Glamour',
    gender: 'Women',
    collection: 'Royal',
    topNotes: 'Strawberry, Red Berries, Bergamot',
    middleNotes: 'Night-Blooming Jasmine, Black Cherry',
    baseNotes: 'Dark Plum, Vanilla, Patchouli, Black Musk',
    price: '$320.00',
    image: '/product-images/Gardenia Glamour/Gardenia_Glamour.png',
    gallery: [
      '/product-images/Gardenia Glamour/Gardenia Glamour1.png',
      '/product-images/Gardenia Glamour/Gardenia Glamour2.png',
      '/product-images/Gardenia Glamour/Gardenia Glamour3.png',
      '/product-images/Gardenia Glamour/Gardenia Glamour4.png'
    ]
  },
  {
    id: 'rose-noir-oud',
    name: 'Rose Noir Oud',
    gender: 'Women',
    collection: 'Royal',
    topNotes: 'Kashmiri Red Roses',
    middleNotes: 'Amberwood',
    baseNotes: 'Afghan Oud',
    price: '$380.00',
    image: '/product-images/Rose Noir Oud/Rose_Noir_Oud.png',
    gallery: [
      '/product-images/Rose Noir Oud/Rose Noir Oud1.png',
      '/product-images/Rose Noir Oud/Rose Noir Oud2.png',
      '/product-images/Rose Noir Oud/Rose Noir Oud3.png',
      '/product-images/Rose Noir Oud/Rose Noir Oud4.png'
    ]
  },
  {
    id: 'velvet-tobacco',
    name: 'Velvet Tobacco',
    gender: 'Women',
    collection: 'Royal',
    topNotes: 'French Jasmine',
    middleNotes: 'Amber Wood',
    baseNotes: 'Blended Tobacco',
    price: '$345.00',
    image: '/product-images/Velvet Tobacco/Velvet_Tobacco.png',
    gallery: [
      '/product-images/Velvet Tobacco/Velvet Tobacco1.png',
      '/product-images/Velvet Tobacco/Velvet Tobacco2.png',
      '/product-images/Velvet Tobacco/Velvet Tobacco3.png',
      '/product-images/Velvet Tobacco/Velvet Tobacco4.png'
    ]
  },
  {
    id: 'silken-oud',
    name: 'Silken Oud',
    gender: 'Women',
    collection: 'Royal',
    topNotes: 'Neroli, Green Herbs',
    middleNotes: 'Agarwood (Oud), Patchouli, Amber',
    baseNotes: 'Musk, Sandalwood, Assam Oud',
    price: '$410.00',
    image: '/product-images/Silken Oud/Silken_Oud.png',
    gallery: [
      '/product-images/Silken Oud/Silken Oud1.png',
      '/product-images/Silken Oud/Silken Oud2.png',
      '/product-images/Silken Oud/Silken Oud3.png',
      '/product-images/Silken Oud/Silken Oud4.png'
    ]
  },

  // ─────────────────────────────────────────
  // ROYAL COLLECTION — MEN  (4 products)
  // ─────────────────────────────────────────
  {
    id: 'cuban-cigar',
    name: 'Cuban Cigar',
    gender: 'Men',
    collection: 'Royal',
    topNotes: 'Cardamom',
    middleNotes: 'Leather, Jasmine Sambac',
    baseNotes: 'Amber, Moss, Patchouli',
    price: '$350.00',
    image: '/product-images/Cuban Cigar/Cuban_Cigar.png',
    gallery: [
      '/product-images/Cuban Cigar/Cuban Cigar1.png',
      '/product-images/Cuban Cigar/Cuban Cigar2.png',
      '/product-images/Cuban Cigar/Cuban Cigar3.png',
      '/product-images/Cuban Cigar/Cuban Cigar4.png'
    ]
  },
  {
    id: 'crown-oud',
    name: 'Crown Oud',
    gender: 'Men',
    collection: 'Royal',
    topNotes: 'Bergamot, Pink Pepper, Elemi, Nutmeg, Mandarin, Honey',
    middleNotes: 'Patchouli, Vetiver, Cashmere Wood, Cinnamon, Saffron',
    baseNotes: 'Musk, Amber, Ambergris, Oakmoss, Leather, Sandalwood, Agarwood',
    price: '$480.00',
    image: '/product-images/Crown Oud/Crown_Oud.png',
    gallery: [
      '/product-images/Crown Oud/Crown Oud1.png',
      '/product-images/Crown Oud/Crown Oud2.png',
      '/product-images/Crown Oud/Crown Oud3.png',
      '/product-images/Crown Oud/Crown Oud4.png'
    ]
  },
  {
    id: 'swiss-oud',
    name: 'Swiss Oud',
    gender: 'Men',
    collection: 'Royal',
    topNotes: 'Spices (Saffron, Cardamom, Pepper), Light Fruity Touches',
    middleNotes: 'Rose, Oud Wood',
    baseNotes: 'Oud (Strong Woody Resin), Amber, Vanilla, Musk, Sweet Notes like Praline',
    price: '$420.00',
    image: '/product-images/Swiss Oud/Swiss_Oud.png',
    gallery: [
      '/product-images/Swiss Oud/Swiss Oud1.png',
      '/product-images/Swiss Oud/Swiss Oud2.png',
      '/product-images/Swiss Oud/Swiss Oud3.png',
      '/product-images/Swiss Oud/Swiss Oud4.png'
    ]
  },
  {
    id: 'royal-noir',
    name: 'Royal Noir',
    gender: 'Men',
    collection: 'Royal',
    topNotes: 'Spicy & Fruity Facets',
    middleNotes: 'Oud (Agarwood), Leather, Amber, Incense, Sandalwood',
    baseNotes: 'Oud Wood (Dominant), Patchouli, Musk, Vanilla, Honey',
    price: '$460.00',
    image: '/product-images/Royal Noir/Royal_Noir.png',
    gallery: [
      '/product-images/Royal Noir/Royal Noir1.png',
      '/product-images/Royal Noir/Royal Noir2.png',
      '/product-images/Royal Noir/Royal Noir3.png',
      '/product-images/Royal Noir/Royal Noir4.png'
    ]
  }

];
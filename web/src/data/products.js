export const products = [
  // MEN
  {
    id: 'prod_001',
    title: 'Classic Gold Silk Kurta Set',
    brand: 'Luxaen Heritage',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80'
    ],
    price: 3499,
    mrp: 6999,
    discount: 50,
    rating: 4.6,
    reviewCount: 142,
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 4 }
    ],
    colors: [
      { name: 'Royal Gold', hex: '#D4AF37' },
      { name: 'Ivory White', hex: '#FFFFF0' }
    ],
    description: 'An elegant pure silk kurta set crafted for festive celebrations and premium occasions. Features custom gold thread embroideries.',
    tags: ['trending'],
    created_at: '2026-07-10T12:00:00.000Z'
  },
  {
    id: 'prod_002',
    title: 'Textured Velvet Sherwani',
    brand: 'Luxaen Heritage',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80'
    ],
    price: 8999,
    mrp: 14999,
    discount: 40,
    rating: 4.8,
    reviewCount: 88,
    sizes: [
      { size: 'M', stock: 6 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 5 }
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#1B1B1B' },
      { name: 'Midnight Blue', hex: '#191970' }
    ],
    description: 'Ultra-premium velvet Sherwani featuring hand-stitched details and matching trousers. Perfect for weddings.',
    tags: ['trending'],
    created_at: '2026-07-08T10:00:00.000Z'
  },
  {
    id: 'prod_003',
    title: 'Linen Casual Summer Blazer',
    brand: 'Allen Solly',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80'
    ],
    price: 2499,
    mrp: 4999,
    discount: 50,
    rating: 4.2,
    reviewCount: 65,
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 7 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 0 }
    ],
    colors: [
      { name: 'Sand Beige', hex: '#C2B280' },
      { name: 'Sky Blue', hex: '#87CEEB' }
    ],
    description: 'Lightweight breathable linen blazer. Tailored fit suitable for semi-formal coordinates.',
    tags: ['deal'],
    created_at: '2026-06-25T08:00:00.000Z'
  },
  {
    id: 'prod_004',
    title: 'Pure Merino Wool Sweater',
    brand: 'Monte Carlo',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=600&auto=format&fit=crop&q=80'
    ],
    price: 1999,
    mrp: 3999,
    discount: 50,
    rating: 4.4,
    reviewCount: 51,
    sizes: [
      { size: 'M', stock: 8 },
      { size: 'L', stock: 9 },
      { size: 'XL', stock: 3 }
    ],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Maroon', hex: '#800000' }
    ],
    description: 'Premium knit Merino wool sweater for cozy winter comfort.',
    tags: ['deal'],
    created_at: '2026-06-20T09:00:00.000Z'
  },

  // WOMEN
  {
    id: 'prod_005',
    title: 'Handloom Kanjeevaram Silk Saree',
    brand: 'Luxaen Heritage',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80'
    ],
    price: 9499,
    mrp: 18999,
    discount: 50,
    rating: 4.9,
    reviewCount: 220,
    sizes: [
      { size: 'Free Size', stock: 15 }
    ],
    colors: [
      { name: 'Crimson Red', hex: '#DC143C' },
      { name: 'Emerald Gold', hex: '#50C878' }
    ],
    description: 'Exquisite hand-woven Kanjeevaram silk saree with real zari borders and patterns.',
    tags: ['trending'],
    created_at: '2026-07-12T11:00:00.000Z'
  },
  {
    id: 'prod_006',
    title: 'Embellished Georgette Anarkali',
    brand: 'Luxaen Heritage',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80'
    ],
    price: 4999,
    mrp: 9999,
    discount: 50,
    rating: 4.7,
    reviewCount: 112,
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 6 }
    ],
    colors: [
      { name: 'Dusty Pink', hex: '#D2B48C' },
      { name: 'Deep Lavender', hex: '#967BB6' }
    ],
    description: 'Flowy georgette Anarkali suit with sparkling sequin highlights and net dupatta.',
    tags: ['trending'],
    created_at: '2026-07-05T08:00:00.000Z'
  },
  {
    id: 'prod_007',
    title: 'Floral Summer Maxi Dress',
    brand: 'Zara',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80'
    ],
    price: 2999,
    mrp: 5999,
    discount: 50,
    rating: 4.1,
    reviewCount: 78,
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 4 }
    ],
    colors: [
      { name: 'Peach Floral', hex: '#FFDAB9' }
    ],
    description: 'Chic lightweight floral printed maxi dress with pleated details.',
    tags: ['trending'],
    created_at: '2026-07-14T09:00:00.000Z'
  },
  {
    id: 'prod_008',
    title: 'Premium Cashmere Pashmina Shawl',
    brand: 'Luxaen Heritage',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1520635360276-79f3dbd809f6?w=600&auto=format&fit=crop&q=80'
    ],
    price: 6499,
    mrp: 12999,
    discount: 50,
    rating: 4.8,
    reviewCount: 94,
    sizes: [
      { size: 'Free Size', stock: 8 }
    ],
    colors: [
      { name: 'Natural Tan', hex: '#D2B48C' },
      { name: 'Midnight', hex: '#1B1B1B' }
    ],
    description: 'Genuine hand-spun Pashmina cashmere shawl. Exceedingly soft, warm and elegant.',
    tags: ['trending', 'deal'],
    created_at: '2026-07-11T10:00:00.000Z'
  },

  // KIDS
  {
    id: 'prod_009',
    title: 'Boys Cotton Kurta Pyjama Set',
    brand: 'Fabindia Kids',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80'
    ],
    price: 1199,
    mrp: 2399,
    discount: 50,
    rating: 4.3,
    reviewCount: 38,
    sizes: [
      { size: '2-3Y', stock: 5 },
      { size: '4-5Y', stock: 8 },
      { size: '6-7Y', stock: 10 }
    ],
    colors: [
      { name: 'Marigold Yellow', hex: '#FFC72C' },
      { name: 'Festive Orange', hex: '#FF7F50' }
    ],
    description: 'Comfortable pure cotton ethnic set for boys. Breathable fabric safe for child skin.',
    tags: ['trending'],
    created_at: '2026-07-13T09:00:00.000Z'
  },
  {
    id: 'prod_010',
    title: 'Girls Layered Net Lehenga Choli',
    brand: 'Luxaen Heritage',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&auto=format&fit=crop&q=80'
    ],
    price: 2499,
    mrp: 4999,
    discount: 50,
    rating: 4.6,
    reviewCount: 45,
    sizes: [
      { size: '3-4Y', stock: 4 },
      { size: '5-6Y', stock: 6 },
      { size: '7-8Y', stock: 7 }
    ],
    colors: [
      { name: 'Fuchsia Pink', hex: '#FF00FF' },
      { name: 'Cyan Blue', hex: '#00FFFF' }
    ],
    description: 'Beautiful glittering lehenga choli with soft cotton inner lining.',
    tags: ['deal'],
    created_at: '2026-07-02T10:00:00.000Z'
  },

  // BEAUTY
  {
    id: 'prod_011',
    title: 'Luxaen Elixir Oud Perfume',
    brand: 'Luxaen Beauty',
    category: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop&q=80'
    ],
    price: 4999,
    mrp: 9999,
    discount: 50,
    rating: 4.8,
    reviewCount: 198,
    sizes: [
      { size: '50ml', stock: 15 },
      { size: '100ml', stock: 22 }
    ],
    colors: [
      { name: 'Gold Liquid', hex: '#D4AF37' }
    ],
    description: 'An premium, intensive fragrance made of real agarwood oud and aromatic amber notes.',
    tags: ['trending'],
    created_at: '2026-07-09T12:00:00.000Z'
  },
  {
    id: 'prod_012',
    title: 'Organic Kumkumadi Facial Oil',
    brand: 'Kama Ayurveda',
    category: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop&q=80'
    ],
    price: 1899,
    mrp: 3799,
    discount: 50,
    rating: 4.7,
    reviewCount: 165,
    sizes: [
      { size: '12ml', stock: 30 }
    ],
    colors: [
      { name: 'Saffron Orange', hex: '#FF9933' }
    ],
    description: 'Miraculous night serum crafted with pure saffron extracts to boost skin glow.',
    tags: ['deal'],
    created_at: '2026-07-15T09:00:00.000Z'
  }
];

export const getRecommendedProducts = (productId) => {
  return products.filter((p) => p.id !== productId).slice(0, 4);
};

export default products;

// Mock Products Data for Threads & Co.
// 55 realistic Indian clothing & beauty products

export const products = [
  // ═══════════════════════════════════════════
  // MEN'S CLOTHING (15 products)
  // ═══════════════════════════════════════════
  {
    id: 'prod_001',
    title: 'Classic Oxford Button-Down Shirt',
    brand: 'Allen Solly',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1299,
    mrp: 2499,
    discount: 48,
    rating: 4.3,
    reviewCount: 234,
    sizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 6 },
      { size: 'XXL', stock: 3 },
    ],
    colors: [
      {
        name: 'Sky Blue',
        hex: '#87CEEB',
        images: [
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'White',
        hex: '#FFFFFF',
        images: [
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A timeless oxford shirt crafted from premium cotton. Features a classic button-down collar and a comfortable regular fit that transitions effortlessly from office to weekend.',
    careInstructions: 'Machine wash cold. Tumble dry low. Iron on medium heat.',
    tags: ['trending', 'bestseller'],
    created_at: '2026-06-15T10:30:00.000Z',
  },
  {
    id: 'prod_002',
    title: 'Slim Fit Linen Casual Shirt',
    brand: 'Peter England',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495603889488-42d1fc6680bc?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
    ],
    price: 999,
    mrp: 1899,
    discount: 47,
    rating: 4.1,
    reviewCount: 178,
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 9 },
      { size: 'XL', stock: 0 },
    ],
    colors: [
      {
        name: 'Olive Green',
        hex: '#556B2F',
        images: [
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1534030716343-40aa521d7c9a?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Beige',
        hex: '#F5F5DC',
        images: [
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Stay cool in this breathable linen shirt, perfect for Indian summers. The slim fit silhouette keeps you looking sharp while the natural fabric keeps you comfortable all day.',
    careInstructions: 'Hand wash or gentle machine cycle. Hang dry. Iron while damp.',
    tags: ['summer_sale', 'new_arrival'],
    created_at: '2026-07-01T09:00:00.000Z',
  },
  {
    id: 'prod_003',
    title: 'Premium Stretch Denim Jeans',
    brand: "Levi's",
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
    ],
    price: 2199,
    mrp: 3999,
    discount: 45,
    rating: 4.6,
    reviewCount: 489,
    sizes: [
      { size: '28', stock: 5 },
      { size: '30', stock: 14 },
      { size: '32', stock: 20 },
      { size: '34', stock: 8 },
      { size: '36', stock: 0 },
    ],
    colors: [
      {
        name: 'Dark Indigo',
        hex: '#1B2A4A',
        images: [
          'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Light Wash',
        hex: '#A4C8E1',
        images: [
          'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Black',
        hex: '#1A1A1A',
        images: [
          'https://images.unsplash.com/photo-1495603889488-42d1fc6680bc?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      "Iconic Levi's denim with added stretch for all-day comfort. The 512 slim taper fit gives a modern look while the durable construction ensures these jeans last for years.",
    careInstructions: 'Machine wash cold inside out. Do not bleach. Tumble dry low.',
    tags: ['trending', 'bestseller'],
    created_at: '2026-05-20T11:00:00.000Z',
  },
  {
    id: 'prod_004',
    title: 'Oversized Graphic Print T-Shirt',
    brand: 'H&M',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534030716343-40aa521d7c9a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
    ],
    price: 599,
    mrp: 999,
    discount: 40,
    rating: 4.0,
    reviewCount: 312,
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 22 },
      { size: 'XL', stock: 10 },
    ],
    colors: [
      {
        name: 'Black',
        hex: '#1A1A1A',
        images: [
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Off White',
        hex: '#FAF9F6',
        images: [
          'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Make a statement with this oversized graphic tee. Crafted from 100% organic cotton with a trendy dropped-shoulder design that pairs perfectly with joggers or jeans.',
    careInstructions: 'Machine wash cold. Do not iron on print. Tumble dry low.',
    tags: ['trending', 'new_arrival'],
    created_at: '2026-07-05T08:00:00.000Z',
  },
  {
    id: 'prod_005',
    title: 'Royal Silk Kurta Set',
    brand: 'Manyavar',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80',
    ],
    price: 3999,
    mrp: 6999,
    discount: 43,
    rating: 4.7,
    reviewCount: 156,
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 7 },
      { size: 'L', stock: 5 },
      { size: 'XL', stock: 2 },
      { size: 'XXL', stock: 0 },
    ],
    colors: [
      {
        name: 'Maroon',
        hex: '#800000',
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1495603889488-42d1fc6680bc?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Gold',
        hex: '#CFB53B',
        images: [
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Exquisite silk kurta set with intricate jacquard weaving. This festive collection piece comes with matching churidar and a lightweight dupatta, perfect for weddings and celebrations.',
    careInstructions: 'Dry clean only. Store in garment bag. Avoid direct sunlight.',
    tags: ['trending', 'wedding_collection', 'premium'],
    created_at: '2026-06-01T10:00:00.000Z',
  },
  {
    id: 'prod_006',
    title: 'Textured Formal Blazer',
    brand: 'Raymond',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1534030716343-40aa521d7c9a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    ],
    price: 4999,
    mrp: 8999,
    discount: 44,
    rating: 4.5,
    reviewCount: 89,
    sizes: [
      { size: '38', stock: 4 },
      { size: '40', stock: 8 },
      { size: '42', stock: 6 },
      { size: '44', stock: 0 },
    ],
    colors: [
      {
        name: 'Charcoal Grey',
        hex: '#36454F',
        images: [
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Navy Blue',
        hex: '#1B2A4A',
        images: [
          'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Elevate your formal wardrobe with this premium textured blazer from Raymond. Features a two-button closure, notch lapel, and an impeccably tailored fit for the modern gentleman.',
    careInstructions: 'Dry clean only. Hang on padded hanger. Steam to remove wrinkles.',
    tags: ['premium', 'formal'],
    created_at: '2026-04-10T12:00:00.000Z',
  },
  {
    id: 'prod_007',
    title: 'Cotton Polo T-Shirt',
    brand: 'Van Heusen',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80',
    ],
    price: 799,
    mrp: 1499,
    discount: 47,
    rating: 4.2,
    reviewCount: 267,
    sizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 7 },
    ],
    colors: [
      {
        name: 'Teal',
        hex: '#008080',
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1495603889488-42d1fc6680bc?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Burgundy',
        hex: '#722F37',
        images: [
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'White',
        hex: '#FFFFFF',
        images: [
          'https://images.unsplash.com/photo-1534030716343-40aa521d7c9a?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A wardrobe essential – this classic polo tee is made from piqué cotton that feels soft and breathes easy. Ribbed collar and cuffs add structure to this versatile piece.',
    careInstructions: 'Machine wash cold. Do not bleach. Tumble dry low.',
    tags: ['bestseller'],
    created_at: '2026-03-15T10:00:00.000Z',
  },
  {
    id: 'prod_008',
    title: 'Tapered Fit Chinos',
    brand: 'Allen Solly',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1499,
    mrp: 2799,
    discount: 46,
    rating: 4.3,
    reviewCount: 198,
    sizes: [
      { size: '28', stock: 3 },
      { size: '30', stock: 11 },
      { size: '32', stock: 14 },
      { size: '34', stock: 0 },
      { size: '36', stock: 5 },
    ],
    colors: [
      {
        name: 'Khaki',
        hex: '#C3B091',
        images: [
          'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Navy',
        hex: '#1B2A4A',
        images: [
          'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Modern tapered chinos with a hint of stretch for effortless movement. The wrinkle-resistant fabric keeps you looking polished from morning meetings to evening plans.',
    careInstructions: 'Machine wash cold. Iron on low heat. Hang dry recommended.',
    tags: ['summer_sale'],
    created_at: '2026-05-10T09:30:00.000Z',
  },
  {
    id: 'prod_009',
    title: 'Mandarin Collar Cotton Shirt',
    brand: 'Fabindia',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495603889488-42d1fc6680bc?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1799,
    mrp: 2999,
    discount: 40,
    rating: 4.4,
    reviewCount: 143,
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 9 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 4 },
    ],
    colors: [
      {
        name: 'Indigo',
        hex: '#4B0082',
        images: [
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Rust',
        hex: '#B7410E',
        images: [
          'https://images.unsplash.com/photo-1534030716343-40aa521d7c9a?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Handloom cotton shirt with a distinctive mandarin collar. This Fabindia piece celebrates traditional Indian craftsmanship with contemporary styling for the conscious consumer.',
    careInstructions: 'Hand wash separately in cold water. Dry in shade. Iron on medium heat.',
    tags: ['new_arrival', 'handcrafted'],
    created_at: '2026-07-08T10:00:00.000Z',
  },
  {
    id: 'prod_010',
    title: 'Striped Henley Full Sleeve T-Shirt',
    brand: 'H&M',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
    ],
    price: 699,
    mrp: 1299,
    discount: 46,
    rating: 3.9,
    reviewCount: 201,
    sizes: [
      { size: 'S', stock: 7 },
      { size: 'M', stock: 13 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 9 },
    ],
    colors: [
      {
        name: 'Grey Melange',
        hex: '#9E9E9E',
        images: [
          'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Forest Green',
        hex: '#228B22',
        images: [
          'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A laid-back henley tee with subtle horizontal stripes. The brushed cotton interior feels soft against the skin, making it your go-to pick for casual weekends.',
    careInstructions: 'Machine wash cold with similar colors. Tumble dry low.',
    tags: ['casual'],
    created_at: '2026-04-22T11:00:00.000Z',
  },
  {
    id: 'prod_011',
    title: 'Embroidered Nehru Jacket',
    brand: 'Manyavar',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495603889488-42d1fc6680bc?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
    ],
    price: 2999,
    mrp: 5499,
    discount: 45,
    rating: 4.6,
    reviewCount: 112,
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 3 },
      { size: 'XXL', stock: 0 },
    ],
    colors: [
      {
        name: 'Royal Blue',
        hex: '#002366',
        images: [
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1534030716343-40aa521d7c9a?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Champagne',
        hex: '#F7E7CE',
        images: [
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'An elegantly embroidered Nehru jacket that adds a regal touch to any outfit. Features delicate threadwork and a mandarin collar, perfect for festive occasions and sangeet nights.',
    careInstructions: 'Dry clean only. Store flat or on padded hanger.',
    tags: ['wedding_collection', 'premium', 'trending'],
    created_at: '2026-06-20T10:00:00.000Z',
  },
  {
    id: 'prod_012',
    title: 'Relaxed Fit Cargo Joggers',
    brand: 'Zara',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1899,
    mrp: 3490,
    discount: 46,
    rating: 4.1,
    reviewCount: 167,
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 11 },
      { size: 'XL', stock: 4 },
    ],
    colors: [
      {
        name: 'Stone',
        hex: '#928E85',
        images: [
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Black',
        hex: '#1A1A1A',
        images: [
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Utility meets comfort in these cargo joggers featuring multiple pockets and an elasticated waistband. The relaxed fit and tapered leg create a contemporary streetwear silhouette.',
    careInstructions: 'Machine wash cold. Do not bleach. Tumble dry low.',
    tags: ['new_arrival', 'trending'],
    created_at: '2026-07-03T08:30:00.000Z',
  },
  {
    id: 'prod_013',
    title: 'Printed Hawaiian Resort Shirt',
    brand: 'H&M',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495603889488-42d1fc6680bc?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
    ],
    price: 899,
    mrp: 1499,
    discount: 40,
    rating: 4.0,
    reviewCount: 245,
    sizes: [
      { size: 'S', stock: 9 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 5 },
    ],
    colors: [
      {
        name: 'Tropical Blue',
        hex: '#1E90FF',
        images: [
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1534030716343-40aa521d7c9a?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Sunset Orange',
        hex: '#FD5E53',
        images: [
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Channel vacation vibes with this bold tropical-print shirt. Made from lightweight viscose, it drapes beautifully and keeps you cool during those hot Goa getaways.',
    careInstructions: 'Machine wash gentle cycle. Hang dry. Iron on low heat.',
    tags: ['summer_sale', 'trending'],
    created_at: '2026-06-25T10:00:00.000Z',
  },
  {
    id: 'prod_014',
    title: 'Slim Fit Formal Trousers',
    brand: 'Raymond',
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1699,
    mrp: 2999,
    discount: 43,
    rating: 4.4,
    reviewCount: 134,
    sizes: [
      { size: '28', stock: 4 },
      { size: '30', stock: 10 },
      { size: '32', stock: 15 },
      { size: '34', stock: 7 },
      { size: '36', stock: 3 },
    ],
    colors: [
      {
        name: 'Black',
        hex: '#1A1A1A',
        images: [
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Charcoal',
        hex: '#36454F',
        images: [
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Impeccably tailored formal trousers from Raymond with a permanent crease and wrinkle-resistant finish. The stretch fabric ensures comfort during long workdays.',
    careInstructions: 'Dry clean recommended. Iron on medium heat with steam.',
    tags: ['formal', 'bestseller'],
    created_at: '2026-04-05T10:00:00.000Z',
  },
  {
    id: 'prod_015',
    title: 'Acid Wash Denim Jacket',
    brand: "Levi's",
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495603889488-42d1fc6680bc?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
    ],
    price: 3499,
    mrp: 5999,
    discount: 42,
    rating: 4.5,
    reviewCount: 97,
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 },
    ],
    colors: [
      {
        name: 'Acid Wash Blue',
        hex: '#6F8FAF',
        images: [
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1534030716343-40aa521d7c9a?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      "A rugged denim jacket with a distinctive acid wash finish. This Levi's classic features metal button closures, dual chest pockets, and a comfortable trucker fit.",
    careInstructions: 'Machine wash cold inside out. Do not bleach. Line dry.',
    tags: ['new_arrival'],
    created_at: '2026-07-09T10:00:00.000Z',
  },

  // ═══════════════════════════════════════════
  // WOMEN'S CLOTHING (20 products)
  // ═══════════════════════════════════════════
  {
    id: 'prod_016',
    title: 'Floral Print Anarkali Kurti',
    brand: 'W',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1299,
    mrp: 2299,
    discount: 43,
    rating: 4.4,
    reviewCount: 321,
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 7 },
    ],
    colors: [
      {
        name: 'Mustard',
        hex: '#FFDB58',
        images: [
          'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Teal',
        hex: '#008080',
        images: [
          'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A gorgeous floral anarkali kurti that flows beautifully with every step. The flared silhouette and vibrant print make it a standout piece for festive gatherings and puja ceremonies.',
    careInstructions: 'Hand wash in cold water. Dry in shade. Iron on medium heat.',
    tags: ['trending', 'bestseller', 'new_arrival'],
    created_at: '2026-07-02T09:00:00.000Z',
  },
  {
    id: 'prod_017',
    title: 'Banarasi Silk Saree',
    brand: 'Fabindia',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1539008885759-45095e2694fa?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80',
    ],
    price: 4999,
    mrp: 8999,
    discount: 44,
    rating: 4.8,
    reviewCount: 87,
    sizes: [{ size: 'Free Size', stock: 15 }],
    colors: [
      {
        name: 'Red',
        hex: '#C41E3A',
        images: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Royal Purple',
        hex: '#6B3FA0',
        images: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'An exquisite handwoven Banarasi silk saree featuring intricate zari work and a rich pallu. This heirloom piece is perfect for weddings, receptions, and grand celebrations.',
    careInstructions: 'Dry clean only. Store wrapped in muslin cloth. Avoid moisture.',
    tags: ['premium', 'wedding_collection', 'handcrafted'],
    created_at: '2026-05-15T10:00:00.000Z',
  },
  {
    id: 'prod_018',
    title: 'Embroidered Cotton Kurta Set',
    brand: 'Biba',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1599,
    mrp: 2999,
    discount: 47,
    rating: 4.3,
    reviewCount: 256,
    sizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 6 },
      { size: 'XXL', stock: 0 },
    ],
    colors: [
      {
        name: 'Coral Pink',
        hex: '#F88379',
        images: [
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Sage Green',
        hex: '#9DC183',
        images: [
          'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1539008885759-45095e2694fa?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A beautifully embroidered kurta set that comes with matching palazzo pants and a dupatta. The breathable cotton fabric and delicate chikankari-inspired work make it ideal for daily ethnic wear.',
    careInstructions: 'Hand wash separately. Dry in shade. Do not wring.',
    tags: ['trending', 'summer_sale'],
    created_at: '2026-06-10T10:00:00.000Z',
  },
  {
    id: 'prod_019',
    title: 'A-Line Midi Dress',
    brand: 'Zara',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80',
    ],
    price: 2499,
    mrp: 4990,
    discount: 50,
    rating: 4.5,
    reviewCount: 178,
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 9 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 5 },
      { size: 'XL', stock: 0 },
    ],
    colors: [
      {
        name: 'Emerald Green',
        hex: '#50C878',
        images: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Black',
        hex: '#1A1A1A',
        images: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'An elegant A-line midi dress with a flattering silhouette. The structured bodice flows into a swishy skirt, making it perfect for brunches, date nights, and semi-formal events.',
    careInstructions: 'Machine wash cold on delicate cycle. Lay flat to dry.',
    tags: ['trending', 'new_arrival'],
    created_at: '2026-07-06T08:00:00.000Z',
  },
  {
    id: 'prod_020',
    title: 'Printed Wrap Maxi Dress',
    brand: 'Global Desi',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1899,
    mrp: 3499,
    discount: 46,
    rating: 4.2,
    reviewCount: 198,
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 11 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 3 },
    ],
    colors: [
      {
        name: 'Boho Print',
        hex: '#D2691E',
        images: [
          'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Indigo Paisley',
        hex: '#3F51B5',
        images: [
          'https://images.unsplash.com/photo-1539008885759-45095e2694fa?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A stunning wrap maxi dress with bohemian-inspired prints. The adjustable tie waist creates a universally flattering fit, while the flowy hemline adds graceful movement.',
    careInstructions: 'Hand wash cold. Do not bleach. Iron on low heat.',
    tags: ['summer_sale', 'bestseller'],
    created_at: '2026-06-05T10:00:00.000Z',
  },
  {
    id: 'prod_021',
    title: 'High-Waist Skinny Jeans',
    brand: "Levi's",
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1999,
    mrp: 3499,
    discount: 43,
    rating: 4.4,
    reviewCount: 367,
    sizes: [
      { size: '24', stock: 5 },
      { size: '26', stock: 12 },
      { size: '28', stock: 18 },
      { size: '30', stock: 9 },
      { size: '32', stock: 0 },
    ],
    colors: [
      {
        name: 'Dark Blue',
        hex: '#1B2A4A',
        images: [
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Black',
        hex: '#1A1A1A',
        images: [
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      "The perfect high-waist skinny jeans that sculpt and flatter. Levi's signature stretch denim hugs in all the right places while maintaining shape wash after wash.",
    careInstructions: 'Machine wash cold inside out. Do not bleach. Tumble dry low.',
    tags: ['trending', 'bestseller'],
    created_at: '2026-05-22T10:00:00.000Z',
  },
  {
    id: 'prod_022',
    title: 'Peplum Ethnic Top',
    brand: 'AND',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    ],
    price: 999,
    mrp: 1799,
    discount: 44,
    rating: 4.1,
    reviewCount: 145,
    sizes: [
      { size: 'XS', stock: 6 },
      { size: 'S', stock: 10 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 7 },
      { size: 'XL', stock: 0 },
    ],
    colors: [
      {
        name: 'Wine',
        hex: '#722F37',
        images: [
          'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Ivory',
        hex: '#FFFFF0',
        images: [
          'https://images.unsplash.com/photo-1539008885759-45095e2694fa?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A chic peplum top with ethnic block-print detailing. The structured waist and flared hem create a feminine silhouette that pairs beautifully with palazzos or slim-fit pants.',
    careInstructions: 'Hand wash in cold water. Do not wring. Iron on low heat.',
    tags: ['new_arrival'],
    created_at: '2026-07-07T10:00:00.000Z',
  },
  {
    id: 'prod_023',
    title: 'Georgette Sharara Set',
    brand: 'Aurelia',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80',
    ],
    price: 2799,
    mrp: 4999,
    discount: 44,
    rating: 4.6,
    reviewCount: 98,
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 6 },
      { size: 'XL', stock: 2 },
    ],
    colors: [
      {
        name: 'Blush Pink',
        hex: '#FFB6C1',
        images: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Powder Blue',
        hex: '#B0E0E6',
        images: [
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A dreamy georgette sharara set with sequin embellishments and mirror work. This three-piece set includes a short kurta, flared sharara, and a matching dupatta for a complete festive look.',
    careInstructions: 'Dry clean only. Handle with care to preserve embellishments.',
    tags: ['wedding_collection', 'premium', 'trending'],
    created_at: '2026-06-18T10:00:00.000Z',
  },
  {
    id: 'prod_024',
    title: 'Ribbed Crop Top',
    brand: 'H&M',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80',
    ],
    price: 499,
    mrp: 899,
    discount: 44,
    rating: 4.0,
    reviewCount: 289,
    sizes: [
      { size: 'XS', stock: 12 },
      { size: 'S', stock: 20 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 8 },
    ],
    colors: [
      {
        name: 'White',
        hex: '#FFFFFF',
        images: [
          'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1539008885759-45095e2694fa?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Black',
        hex: '#1A1A1A',
        images: [
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Dusty Rose',
        hex: '#DCAE96',
        images: [
          'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A versatile ribbed crop top that works year-round. Layer it under jackets in winter or wear it solo in summer – the stretchy rib fabric flatters every body type.',
    careInstructions: 'Machine wash cold. Do not bleach. Lay flat to dry.',
    tags: ['summer_sale', 'bestseller'],
    created_at: '2026-05-30T10:00:00.000Z',
  },
  {
    id: 'prod_025',
    title: 'Ikat Print Cotton Saree',
    brand: 'Fabindia',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
    ],
    price: 2499,
    mrp: 3999,
    discount: 38,
    rating: 4.5,
    reviewCount: 67,
    sizes: [{ size: 'Free Size', stock: 20 }],
    colors: [
      {
        name: 'Indigo Blue',
        hex: '#3F51B5',
        images: [
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Maroon',
        hex: '#800000',
        images: [
          'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A lightweight cotton saree with traditional Ikat patterns. Handwoven by artisans from Odisha, this saree is perfect for daily wear and office-friendly ethnic styling.',
    careInstructions: 'Hand wash in cold water. Dry in shade. Iron on medium heat.',
    tags: ['handcrafted', 'new_arrival'],
    created_at: '2026-07-04T10:00:00.000Z',
  },
  {
    id: 'prod_026',
    title: 'Ruffled Sleeve Blouse',
    brand: 'FabAlley',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539008885759-45095e2694fa?w=600&auto=format&fit=crop&q=80',
    ],
    price: 899,
    mrp: 1599,
    discount: 44,
    rating: 4.2,
    reviewCount: 189,
    sizes: [
      { size: 'XS', stock: 7 },
      { size: 'S', stock: 13 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 4 },
    ],
    colors: [
      {
        name: 'Lavender',
        hex: '#E6E6FA',
        images: [
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Peach',
        hex: '#FFDAB9',
        images: [
          'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A romantic ruffled-sleeve blouse that adds drama to any outfit. The lightweight fabric and relaxed fit make it ideal for workwear styled with trousers or dressed down with jeans.',
    careInstructions: 'Hand wash or gentle machine cycle. Iron on low heat.',
    tags: ['trending'],
    created_at: '2026-06-12T10:00:00.000Z',
  },
  {
    id: 'prod_027',
    title: 'Wide-Leg Palazzo Pants',
    brand: 'W',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
    ],
    price: 799,
    mrp: 1499,
    discount: 47,
    rating: 4.3,
    reviewCount: 312,
    sizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 5 },
      { size: 'XXL', stock: 3 },
    ],
    colors: [
      {
        name: 'Navy',
        hex: '#1B2A4A',
        images: [
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Maroon',
        hex: '#800000',
        images: [
          'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Black',
        hex: '#1A1A1A',
        images: [
          'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Flowy wide-leg palazzo pants with an elasticated waistband for all-day comfort. These versatile bottoms pair effortlessly with kurtis, tops, or crop blouses.',
    careInstructions: 'Machine wash cold with similar colors. Hang dry.',
    tags: ['bestseller', 'summer_sale'],
    created_at: '2026-05-18T10:00:00.000Z',
  },
  {
    id: 'prod_028',
    title: 'Sequin Embellished Party Gown',
    brand: 'FabAlley',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1539008885759-45095e2694fa?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80',
    ],
    price: 3499,
    mrp: 5999,
    discount: 42,
    rating: 4.7,
    reviewCount: 76,
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 7 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 0 },
    ],
    colors: [
      {
        name: 'Midnight Blue',
        hex: '#191970',
        images: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Rose Gold',
        hex: '#B76E79',
        images: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Steal the spotlight in this dazzling sequin gown. The figure-hugging bodice flows into a dramatic floor-length skirt, making it the perfect choice for cocktail parties and receptions.',
    careInstructions: 'Dry clean only. Store hanging in garment bag.',
    tags: ['premium', 'wedding_collection'],
    created_at: '2026-04-25T10:00:00.000Z',
  },
  {
    id: 'prod_029',
    title: 'Printed Kaftan Dress',
    brand: 'Global Desi',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1499,
    mrp: 2499,
    discount: 40,
    rating: 4.1,
    reviewCount: 167,
    sizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 6 },
    ],
    colors: [
      {
        name: 'Tropical Print',
        hex: '#FF6347',
        images: [
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Ocean Blue',
        hex: '#0077B6',
        images: [
          'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1539008885759-45095e2694fa?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A breezy kaftan dress with vibrant global-inspired prints. The relaxed, flowy silhouette makes it your ultimate summer companion – throw it on for beach days or brunch dates.',
    careInstructions: 'Machine wash gentle cycle. Do not bleach. Hang dry.',
    tags: ['summer_sale', 'new_arrival'],
    created_at: '2026-06-28T10:00:00.000Z',
  },
  {
    id: 'prod_030',
    title: 'Chanderi Silk Dupatta',
    brand: 'Aurelia',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80',
    ],
    price: 699,
    mrp: 1299,
    discount: 46,
    rating: 4.3,
    reviewCount: 134,
    sizes: [{ size: 'Free Size', stock: 25 }],
    colors: [
      {
        name: 'Gold & Pink',
        hex: '#FFD700',
        images: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Silver & Blue',
        hex: '#C0C0C0',
        images: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A delicate Chanderi silk dupatta with beautiful zari borders. This lightweight accessory adds an elegant finishing touch to any ethnic outfit, from kurtas to lehenga sets.',
    careInstructions: 'Dry clean recommended. Iron on low heat with cloth barrier.',
    tags: ['handcrafted'],
    created_at: '2026-05-08T10:00:00.000Z',
  },
  {
    id: 'prod_031',
    title: 'Smocked Bodice Summer Dress',
    brand: 'Zara',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1999,
    mrp: 3990,
    discount: 50,
    rating: 4.4,
    reviewCount: 203,
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 11 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 7 },
    ],
    colors: [
      {
        name: 'Floral White',
        hex: '#FFF8E7',
        images: [
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Terracotta',
        hex: '#CC5500',
        images: [
          'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1539008885759-45095e2694fa?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A charming summer dress with a smocked elastic bodice and tiered skirt. The puff sleeves and midi length create a romantic, cottagecore-inspired look that is effortlessly chic.',
    careInstructions: 'Machine wash cold on delicate. Do not wring. Hang dry.',
    tags: ['trending', 'summer_sale', 'new_arrival'],
    created_at: '2026-07-10T08:00:00.000Z',
  },
  {
    id: 'prod_032',
    title: 'Tailored Blazer Dress',
    brand: 'AND',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80',
    ],
    price: 2299,
    mrp: 3999,
    discount: 43,
    rating: 4.5,
    reviewCount: 112,
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 7 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 0 },
    ],
    colors: [
      {
        name: 'Camel',
        hex: '#C19A6B',
        images: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Black',
        hex: '#1A1A1A',
        images: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Power dressing at its finest – this blazer dress features sharp tailoring, padded shoulders, and a double-breasted closure. Wear it to boardrooms, power lunches, or evening events.',
    careInstructions: 'Dry clean recommended. Iron on medium heat.',
    tags: ['formal', 'trending'],
    created_at: '2026-06-22T10:00:00.000Z',
  },
  {
    id: 'prod_033',
    title: 'Chikankari Straight Kurti',
    brand: 'Biba',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1199,
    mrp: 1999,
    discount: 40,
    rating: 4.4,
    reviewCount: 278,
    sizes: [
      { size: 'S', stock: 9 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 11 },
      { size: 'XL', stock: 6 },
      { size: 'XXL', stock: 4 },
    ],
    colors: [
      {
        name: 'White',
        hex: '#FFFFFF',
        images: [
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Pastel Yellow',
        hex: '#FDFD96',
        images: [
          'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1539008885759-45095e2694fa?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A classic Lucknowi chikankari kurti with delicate hand-embroidered patterns. The straight-cut silhouette and breathable cotton make it perfect for everyday wear and office styling.',
    careInstructions: 'Hand wash separately in cold water. Dry in shade. Iron while slightly damp.',
    tags: ['handcrafted', 'bestseller'],
    created_at: '2026-05-12T10:00:00.000Z',
  },
  {
    id: 'prod_034',
    title: 'Denim Dungaree Dress',
    brand: 'H&M',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1599,
    mrp: 2999,
    discount: 47,
    rating: 4.0,
    reviewCount: 156,
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 9 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 0 },
    ],
    colors: [
      {
        name: 'Light Wash',
        hex: '#A4C8E1',
        images: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A playful denim dungaree dress that channels effortless cool. Features adjustable straps, front pockets, and a slightly flared skirt – layer it over a striped tee for the perfect casual look.',
    careInstructions: 'Machine wash cold inside out. Do not bleach. Line dry.',
    tags: ['casual', 'new_arrival'],
    created_at: '2026-06-30T10:00:00.000Z',
  },
  {
    id: 'prod_035',
    title: 'Lehenga Choli Set',
    brand: 'Biba',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
    ],
    price: 4499,
    mrp: 7999,
    discount: 44,
    rating: 4.7,
    reviewCount: 64,
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 0 },
    ],
    colors: [
      {
        name: 'Bridal Red',
        hex: '#CC0000',
        images: [
          'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Emerald Green',
        hex: '#046307',
        images: [
          'https://images.unsplash.com/photo-1610030470298-4c5b3c2a9efb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A breathtaking lehenga choli set with heavy thread work and sequin embroidery. The cancan-lined skirt adds volume, and the set includes a matching dupatta for a complete bridal look.',
    careInstructions: 'Dry clean only. Store in garment bag away from moisture.',
    tags: ['wedding_collection', 'premium'],
    created_at: '2026-03-20T10:00:00.000Z',
  },
  {
    id: 'prod_101',
    title: 'Beachside Resort Two-Piece Swimsuit',
    brand: 'Luxaen Beachwear',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1502823403499-6ccf6fbd8899?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1899,
    mrp: 3499,
    discount: 45,
    rating: 4.6,
    reviewCount: 112,
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 10 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 5 },
    ],
    colors: [
      {
        name: 'Summer Pink',
        hex: '#FF69B4',
        images: [
          'https://images.unsplash.com/photo-1502823403499-6ccf6fbd8899?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Ocean Blue',
        hex: '#008080',
        images: [
          'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Elevate your resort-wear styling with this premium two-piece swimsuit. Crafted from luxury quick-dry stretch fabrics with a clean minimalist cut and adjustable strap fits.',
    careInstructions: 'Hand wash cold. Flat dry in shade. Do not iron or bleach.',
    tags: ['trending', 'summer_sale'],
    created_at: '2026-07-10T12:00:00.000Z',
  },
  {
    id: 'prod_102',
    title: 'Backless Velvet Evening Bodycon Dress',
    brand: 'Luxaen Couture',
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
    ],
    price: 2999,
    mrp: 5999,
    discount: 50,
    rating: 4.8,
    reviewCount: 94,
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 0 },
    ],
    colors: [
      {
        name: 'Ruby Red',
        hex: '#9B111E',
        images: [
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Classic Black',
        hex: '#000000',
        images: [
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Make a statement in this striking backless bodycon evening dress. Tailored from a high-quality velvet-blend stretch fabric, featuring a plunge neckline and sleek silhouette design.',
    careInstructions: 'Dry clean only. Cool iron on reverse if necessary.',
    tags: ['trending', 'premium'],
    created_at: '2026-07-11T12:00:00.000Z',
  },

  // ═══════════════════════════════════════════
  // KIDS' CLOTHING (12 products)
  // ═══════════════════════════════════════════
  {
    id: 'prod_036',
    title: 'Dinosaur Print T-Shirt',
    brand: 'H&M',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
    ],
    price: 399,
    mrp: 699,
    discount: 43,
    rating: 4.3,
    reviewCount: 234,
    sizes: [
      { size: '2-3Y', stock: 10 },
      { size: '4-5Y', stock: 15 },
      { size: '6-7Y', stock: 12 },
      { size: '8-9Y', stock: 8 },
      { size: '10-11Y', stock: 0 },
    ],
    colors: [
      {
        name: 'Green',
        hex: '#4CAF50',
        images: [
          'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Blue',
        hex: '#2196F3',
        images: [
          'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A fun dinosaur-print t-shirt that kids absolutely love! Made from soft, pre-washed cotton for extra comfort with reinforced seams that withstand playground adventures.',
    careInstructions: 'Machine wash warm. Tumble dry low. Iron on low heat.',
    tags: ['trending', 'bestseller'],
    created_at: '2026-06-08T10:00:00.000Z',
  },
  {
    id: 'prod_037',
    title: 'Floral Frock with Bow',
    brand: 'H&M',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
    ],
    price: 599,
    mrp: 999,
    discount: 40,
    rating: 4.5,
    reviewCount: 178,
    sizes: [
      { size: '2-3Y', stock: 8 },
      { size: '4-5Y', stock: 12 },
      { size: '6-7Y', stock: 10 },
      { size: '8-9Y', stock: 0 },
    ],
    colors: [
      {
        name: 'Pink Floral',
        hex: '#FFB6C1',
        images: [
          'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Yellow Floral',
        hex: '#FFD700',
        images: [
          'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'An adorable floral frock with a sweet bow detail at the waist. The cotton-lined bodice and twirl-worthy skirt make every little one feel like a princess.',
    careInstructions: 'Machine wash cold. Do not bleach. Tumble dry low.',
    tags: ['new_arrival', 'trending'],
    created_at: '2026-07-01T10:00:00.000Z',
  },
  {
    id: 'prod_038',
    title: 'Kids Kurta Pajama Set',
    brand: 'Manyavar',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1299,
    mrp: 2499,
    discount: 48,
    rating: 4.6,
    reviewCount: 89,
    sizes: [
      { size: '2-3Y', stock: 5 },
      { size: '4-5Y', stock: 8 },
      { size: '6-7Y', stock: 10 },
      { size: '8-9Y', stock: 6 },
      { size: '10-11Y', stock: 3 },
    ],
    colors: [
      {
        name: 'Cream & Gold',
        hex: '#FFFDD0',
        images: [
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Turquoise',
        hex: '#40E0D0',
        images: [
          'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A charming kurta pajama set for little princes. Featuring subtle embroidery and a comfortable cotton lining, perfect for Diwali, Eid, weddings, and family celebrations.',
    careInstructions: 'Hand wash in cold water. Dry in shade. Iron on low heat.',
    tags: ['wedding_collection', 'trending'],
    created_at: '2026-06-15T10:00:00.000Z',
  },
  {
    id: 'prod_039',
    title: 'Striped Dungaree Set',
    brand: 'H&M',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
    ],
    price: 799,
    mrp: 1499,
    discount: 47,
    rating: 4.2,
    reviewCount: 145,
    sizes: [
      { size: '1-2Y', stock: 6 },
      { size: '2-3Y', stock: 10 },
      { size: '4-5Y', stock: 12 },
      { size: '6-7Y', stock: 0 },
    ],
    colors: [
      {
        name: 'Navy Stripe',
        hex: '#1B2A4A',
        images: [
          'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Red Stripe',
        hex: '#C41E3A',
        images: [
          'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'An adorable striped dungaree set that comes with a soft cotton t-shirt. Easy snap buttons make dressing and diaper changes a breeze for busy parents.',
    careInstructions: 'Machine wash warm with like colors. Tumble dry low.',
    tags: ['bestseller'],
    created_at: '2026-04-20T10:00:00.000Z',
  },
  {
    id: 'prod_040',
    title: 'Rainbow Unicorn Hoodie',
    brand: 'H&M',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
    ],
    price: 899,
    mrp: 1599,
    discount: 44,
    rating: 4.4,
    reviewCount: 201,
    sizes: [
      { size: '4-5Y', stock: 7 },
      { size: '6-7Y', stock: 13 },
      { size: '8-9Y', stock: 9 },
      { size: '10-11Y', stock: 5 },
    ],
    colors: [
      {
        name: 'Pink',
        hex: '#FF69B4',
        images: [
          'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Purple',
        hex: '#9370DB',
        images: [
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A magical unicorn hoodie with a 3D horn and rainbow mane on the hood. Made from super-soft fleece, this cozy layer is perfect for chilly evenings and sleepovers.',
    careInstructions: 'Machine wash cold. Do not bleach. Tumble dry low.',
    tags: ['trending', 'new_arrival'],
    created_at: '2026-07-08T10:00:00.000Z',
  },
  {
    id: 'prod_041',
    title: 'Boys Cargo Shorts',
    brand: 'Allen Solly',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
    ],
    price: 499,
    mrp: 899,
    discount: 44,
    rating: 4.1,
    reviewCount: 167,
    sizes: [
      { size: '4-5Y', stock: 10 },
      { size: '6-7Y', stock: 14 },
      { size: '8-9Y', stock: 11 },
      { size: '10-11Y', stock: 6 },
      { size: '12-13Y', stock: 0 },
    ],
    colors: [
      {
        name: 'Khaki',
        hex: '#C3B091',
        images: [
          'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Olive',
        hex: '#808000',
        images: [
          'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Durable cargo shorts with multiple pockets for all those treasures kids collect. The cotton twill fabric and elasticated waist make them practical and comfortable for active play.',
    careInstructions: 'Machine wash warm. Tumble dry medium. Iron if needed.',
    tags: ['summer_sale'],
    created_at: '2026-05-25T10:00:00.000Z',
  },
  {
    id: 'prod_042',
    title: 'Girls Lehenga Choli Set',
    brand: 'Biba',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1499,
    mrp: 2799,
    discount: 46,
    rating: 4.7,
    reviewCount: 78,
    sizes: [
      { size: '2-3Y', stock: 4 },
      { size: '4-5Y', stock: 7 },
      { size: '6-7Y', stock: 9 },
      { size: '8-9Y', stock: 5 },
      { size: '10-11Y', stock: 0 },
    ],
    colors: [
      {
        name: 'Pink & Gold',
        hex: '#FF69B4',
        images: [
          'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Red & Gold',
        hex: '#CC0000',
        images: [
          'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A stunning mini lehenga choli set for little fashionistas. Features mirror work, lace borders, and comes with a matching dupatta – perfect for festivals and family functions.',
    careInstructions: 'Hand wash in cold water. Do not wring. Dry flat in shade.',
    tags: ['wedding_collection', 'trending'],
    created_at: '2026-06-20T10:00:00.000Z',
  },
  {
    id: 'prod_043',
    title: 'Superhero Pyjama Set',
    brand: 'H&M',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
    ],
    price: 599,
    mrp: 999,
    discount: 40,
    rating: 4.3,
    reviewCount: 189,
    sizes: [
      { size: '2-3Y', stock: 8 },
      { size: '4-5Y', stock: 14 },
      { size: '6-7Y', stock: 11 },
      { size: '8-9Y', stock: 6 },
    ],
    colors: [
      {
        name: 'Spider Red',
        hex: '#DC3545',
        images: [
          'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Batman Grey',
        hex: '#6C757D',
        images: [
          'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'Let little heroes dream big in this superhero-themed pyjama set. The soft cotton fabric and snug fit ensure comfortable sleep, while the fun prints make bedtime exciting.',
    careInstructions: 'Machine wash cold. Do not iron on print. Tumble dry low.',
    tags: ['bestseller'],
    created_at: '2026-04-15T10:00:00.000Z',
  },
  {
    id: 'prod_044',
    title: 'Girls Cotton Jumpsuit',
    brand: 'Allen Solly',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
    ],
    price: 699,
    mrp: 1299,
    discount: 46,
    rating: 4.2,
    reviewCount: 134,
    sizes: [
      { size: '4-5Y', stock: 6 },
      { size: '6-7Y', stock: 10 },
      { size: '8-9Y', stock: 8 },
      { size: '10-11Y', stock: 0 },
      { size: '12-13Y', stock: 3 },
    ],
    colors: [
      {
        name: 'Coral',
        hex: '#FF7F50',
        images: [
          'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Mint Green',
        hex: '#98FF98',
        images: [
          'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A fun and easy one-piece jumpsuit for girls. The elasticated waist and button front make it easy to wear, while the playful print adds personality to casual outings.',
    careInstructions: 'Machine wash cold with similar colors. Hang dry.',
    tags: ['summer_sale', 'new_arrival'],
    created_at: '2026-06-28T10:00:00.000Z',
  },
  {
    id: 'prod_045',
    title: 'Boys Formal Shirt & Trouser Set',
    brand: 'Peter England',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
    ],
    price: 999,
    mrp: 1799,
    discount: 44,
    rating: 4.4,
    reviewCount: 98,
    sizes: [
      { size: '4-5Y', stock: 5 },
      { size: '6-7Y', stock: 9 },
      { size: '8-9Y', stock: 7 },
      { size: '10-11Y', stock: 4 },
      { size: '12-13Y', stock: 0 },
    ],
    colors: [
      {
        name: 'White & Navy',
        hex: '#FFFFFF',
        images: [
          'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Blue & Grey',
        hex: '#4682B4',
        images: [
          'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A smart formal set for young gentlemen. Includes a crisp cotton shirt with a matching trouser – perfect for school events, birthday parties, and family celebrations.',
    careInstructions: 'Machine wash cold. Iron on medium heat. Hang dry.',
    tags: ['formal'],
    created_at: '2026-05-05T10:00:00.000Z',
  },
  {
    id: 'prod_046',
    title: 'Kids Denim Jacket',
    brand: "Levi's",
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1499,
    mrp: 2499,
    discount: 40,
    rating: 4.5,
    reviewCount: 67,
    sizes: [
      { size: '4-5Y', stock: 4 },
      { size: '6-7Y', stock: 7 },
      { size: '8-9Y', stock: 9 },
      { size: '10-11Y', stock: 5 },
      { size: '12-13Y', stock: 0 },
    ],
    colors: [
      {
        name: 'Classic Blue',
        hex: '#4169E1',
        images: [
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      "A classic Levi's denim jacket sized for kids. Built with the same quality and durability as the adult version, featuring authentic metal buttons and a comfortable trucker fit.",
    careInstructions: 'Machine wash cold inside out. Do not bleach. Line dry.',
    tags: ['new_arrival'],
    created_at: '2026-07-09T10:00:00.000Z',
  },
  {
    id: 'prod_047',
    title: 'Baby Romper Gift Set',
    brand: 'H&M',
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
    ],
    price: 899,
    mrp: 1499,
    discount: 40,
    rating: 4.6,
    reviewCount: 112,
    sizes: [
      { size: '0-6M', stock: 10 },
      { size: '6-12M', stock: 15 },
      { size: '12-18M', stock: 8 },
      { size: '18-24M', stock: 5 },
    ],
    colors: [
      {
        name: 'Pastel Pack',
        hex: '#E6E6FA',
        images: [
          'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Animal Print',
        hex: '#DEB887',
        images: [
          'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A delightful 3-pack romper gift set for babies. Made from GOTS-certified organic cotton, these snap-closure rompers are incredibly soft on delicate skin and make perfect gifts.',
    careInstructions: 'Machine wash warm with baby detergent. Tumble dry low.',
    tags: ['bestseller', 'new_arrival'],
    created_at: '2026-07-05T10:00:00.000Z',
  },

  // ═══════════════════════════════════════════
  // BEAUTY PRODUCTS (8 products)
  // ═══════════════════════════════════════════
  {
    id: 'prod_048',
    title: 'Velvet Matte Lipstick Set',
    brand: 'FabAlley',
    category: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
    ],
    price: 799,
    mrp: 1499,
    discount: 47,
    rating: 4.3,
    reviewCount: 345,
    sizes: [{ size: 'One Size', stock: 50 }],
    colors: [
      {
        name: 'Red Velvet',
        hex: '#CC0000',
        images: [
          'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Nude Pink',
        hex: '#E8B4B8',
        images: [
          'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Berry',
        hex: '#8E4585',
        images: [
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A luxurious set of 4 velvet matte lipsticks with rich, long-lasting pigment. The creamy formula glides on smoothly without drying out your lips, lasting up to 12 hours.',
    careInstructions: 'Store in a cool, dry place. Replace cap tightly after use. Best used within 24 months of opening.',
    tags: ['trending', 'bestseller'],
    created_at: '2026-06-10T10:00:00.000Z',
  },
  {
    id: 'prod_049',
    title: 'Natural Glow Foundation',
    brand: 'FabAlley',
    category: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
    ],
    price: 599,
    mrp: 1199,
    discount: 50,
    rating: 4.1,
    reviewCount: 267,
    sizes: [{ size: '30ml', stock: 35 }],
    colors: [
      {
        name: 'Ivory',
        hex: '#FFFFF0',
        images: [
          'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Warm Beige',
        hex: '#D4A574',
        images: [
          'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Dusky',
        hex: '#8B6914',
        images: [
          'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A buildable, medium-coverage foundation that lets your natural skin shine through. Infused with hyaluronic acid and SPF 30, it hydrates while protecting your skin all day.',
    careInstructions: 'Store away from direct sunlight. Shake well before use. Use within 12 months of opening.',
    tags: ['bestseller'],
    created_at: '2026-05-18T10:00:00.000Z',
  },
  {
    id: 'prod_050',
    title: 'Rose Gold Eyeshadow Palette',
    brand: 'FabAlley',
    category: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1299,
    mrp: 2499,
    discount: 48,
    rating: 4.5,
    reviewCount: 189,
    sizes: [{ size: 'One Size', stock: 28 }],
    colors: [
      {
        name: 'Rose Gold Edition',
        hex: '#B76E79',
        images: [
          'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A stunning 18-shade eyeshadow palette in warm rose gold tones. Features a mix of matte, shimmer, and metallic finishes for creating everything from everyday looks to smoky evening eyes.',
    careInstructions: 'Keep palette closed when not in use. Clean brushes regularly. Best used within 18 months.',
    tags: ['trending', 'new_arrival'],
    created_at: '2026-07-02T10:00:00.000Z',
  },
  {
    id: 'prod_051',
    title: 'Kumkumadi Radiance Face Serum',
    brand: 'Fabindia',
    category: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
    ],
    price: 899,
    mrp: 1599,
    discount: 44,
    rating: 4.4,
    reviewCount: 156,
    sizes: [{ size: '30ml', stock: 20 }],
    colors: [
      {
        name: 'Golden Serum',
        hex: '#DAA520',
        images: [
          'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'An Ayurvedic face serum made with 26 precious herbs and saffron extract. This traditional kumkumadi formulation brightens skin, reduces pigmentation, and gives a natural radiant glow.',
    careInstructions: 'Store in a cool, dark place. Use dropper for application. Best used within 6 months of opening.',
    tags: ['trending', 'handcrafted'],
    created_at: '2026-06-05T10:00:00.000Z',
  },
  {
    id: 'prod_052',
    title: 'Jasmine & Mogra Perfume',
    brand: 'Fabindia',
    category: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
    ],
    price: 1499,
    mrp: 2499,
    discount: 40,
    rating: 4.6,
    reviewCount: 98,
    sizes: [{ size: '50ml', stock: 15 }],
    colors: [
      {
        name: 'Classic',
        hex: '#F0E68C',
        images: [
          'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A captivating fragrance that blends the intoxicating notes of jasmine and mogra with a warm sandalwood base. This Eau de Parfum lasts 8-10 hours and is perfect for Indian evenings.',
    careInstructions: 'Store in a cool place away from direct sunlight. Spray on pulse points.',
    tags: ['premium', 'bestseller'],
    created_at: '2026-05-28T10:00:00.000Z',
  },
  {
    id: 'prod_053',
    title: 'Henna & Hibiscus Hair Oil',
    brand: 'Fabindia',
    category: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
    ],
    price: 399,
    mrp: 699,
    discount: 43,
    rating: 4.2,
    reviewCount: 234,
    sizes: [{ size: '200ml', stock: 40 }],
    colors: [
      {
        name: 'Natural',
        hex: '#228B22',
        images: [
          'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A nourishing hair oil infused with henna, hibiscus, and coconut oil. This traditional blend strengthens roots, reduces hair fall, and promotes lustrous, healthy growth.',
    careInstructions: 'Store in a cool, dry place. Warm slightly before applying to scalp.',
    tags: ['bestseller', 'handcrafted'],
    created_at: '2026-04-12T10:00:00.000Z',
  },
  {
    id: 'prod_054',
    title: 'Kajal & Eyeliner Duo',
    brand: 'FabAlley',
    category: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
    ],
    price: 349,
    mrp: 599,
    discount: 42,
    rating: 4.0,
    reviewCount: 412,
    sizes: [{ size: 'One Size', stock: 60 }],
    colors: [
      {
        name: 'Intense Black',
        hex: '#0A0A0A',
        images: [
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A versatile 2-in-1 kajal and eyeliner that delivers intense black pigment with a single stroke. The smudge-proof, waterproof formula stays put for 16 hours without fading.',
    careInstructions: 'Close cap tightly after each use. Replace every 6 months for best results.',
    tags: ['trending', 'summer_sale'],
    created_at: '2026-06-22T10:00:00.000Z',
  },
  {
    id: 'prod_055',
    title: 'Turmeric & Saffron Face Pack',
    brand: 'Fabindia',
    category: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566134057883-9b88cf1e8557?w=600&auto=format&fit=crop&q=80',
    ],
    price: 299,
    mrp: 549,
    discount: 46,
    rating: 4.3,
    reviewCount: 189,
    sizes: [{ size: '100g', stock: 30 }],
    colors: [
      {
        name: 'Natural Yellow',
        hex: '#FFD700',
        images: [
          'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80',
        ],
      },
    ],
    description:
      'A luxurious face pack made with pure turmeric, saffron, and sandalwood. This ancient beauty ritual brightens skin, reduces tan, and leaves your face glowing with natural radiance.',
    careInstructions: 'Mix with rose water or milk before applying. Use within 12 months. Store in a cool, dry place.',
    tags: ['handcrafted', 'new_arrival'],
    created_at: '2026-07-06T10:00:00.000Z',
  },
];

// ═══════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════

/**
 * Returns products tagged as 'trending'
 */
export const getTrendingProducts = () => {
  return products.filter((p) => p.tags.includes('trending'));
};

/**
 * Returns products created within the last 30 days
 */
export const getNewArrivals = () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return products.filter((p) => new Date(p.created_at) >= thirtyDaysAgo);
};

/**
 * Returns products filtered by category ID
 * @param {string} categoryId - 'men', 'women', 'kids', or 'beauty'
 */
export const getProductsByCategory = (categoryId) => {
  return products.filter((p) => p.category === categoryId);
};

/**
 * Finds a product by its ID
 * @param {string} id - Product ID (e.g., 'prod_001')
 */
export const getProductById = (id) => {
  return products.find((p) => p.id === id) || null;
};

/**
 * Returns similar products (same category, excluding current product)
 * @param {string} productId - The current product's ID
 */
export const getSimilarProducts = (productId) => {
  const product = getProductById(productId);
  if (!product) return [];
  return products.filter(
    (p) => p.category === product.category && p.id !== productId
  );
};

/**
 * Searches products by title, brand, description, or tags
 * @param {string} query - Search query string
 */
export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};

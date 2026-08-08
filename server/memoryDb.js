// Fallback In-Memory / JSON File Database if MongoDB is not available.
// This ensures the Node.js backend runs successfully on the user's local machine.

const categoriesData = [
  {
    id: 'men',
    name: 'Men',
    icon: 'shirt-outline',
    iconLib: 'Ionicons',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    productCount: 15,
    subcategories: [
      { id: 'men_shirts', name: 'Shirts', icon: 'shirt' },
      { id: 'men_tshirts', name: 'T-Shirts', icon: 'shirt-outline' },
      { id: 'men_jeans', name: 'Jeans', icon: 'cut' },
      { id: 'men_trousers', name: 'Trousers', icon: 'resize' },
      { id: 'men_ethnic', name: 'Ethnic Wear', icon: 'sparkles' },
      { id: 'men_blazers', name: 'Blazers', icon: 'briefcase' },
      { id: 'men_jackets', name: 'Jackets', icon: 'snow' }
    ]
  },
  {
    id: 'women',
    name: 'Women',
    icon: 'rose-outline',
    iconLib: 'Ionicons',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop&q=80',
    productCount: 20,
    subcategories: [
      { id: 'women_dresses', name: 'Dresses', icon: 'flower' },
      { id: 'women_kurtis', name: 'Kurtis', icon: 'sparkles' },
      { id: 'women_sarees', name: 'Sarees', icon: 'ribbon' },
      { id: 'women_tops', name: 'Tops', icon: 'shirt-outline' },
      { id: 'women_jeans', name: 'Jeans', icon: 'cut' },
      { id: 'women_ethnic', name: 'Ethnic Sets', icon: 'star' },
      { id: 'women_gowns', name: 'Gowns', icon: 'diamond' }
    ]
  },
  {
    id: 'kids',
    name: 'Kids',
    icon: 'happy-outline',
    iconLib: 'Ionicons',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&auto=format&fit=crop&q=80',
    productCount: 12,
    subcategories: [
      { id: 'kids_boys', name: 'Boys', icon: 'man-outline' },
      { id: 'kids_girls', name: 'Girls', icon: 'woman-outline' },
      { id: 'kids_baby', name: 'Baby', icon: 'heart' },
      { id: 'kids_ethnic', name: 'Ethnic Wear', icon: 'sparkles' },
      { id: 'kids_nightwear', name: 'Nightwear', icon: 'moon' }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty',
    icon: 'sparkles-outline',
    iconLib: 'Ionicons',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80',
    productCount: 8,
    subcategories: [
      { id: 'beauty_lips', name: 'Lips', icon: 'heart-circle' },
      { id: 'beauty_face', name: 'Face', icon: 'happy-outline' },
      { id: 'beauty_eyes', name: 'Eyes', icon: 'eye' },
      { id: 'beauty_skincare', name: 'Skincare', icon: 'leaf' },
      { id: 'beauty_fragrance', name: 'Fragrance', icon: 'rose' },
      { id: 'beauty_haircare', name: 'Haircare', icon: 'water' }
    ]
  }
];

const productsData = [
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
    careInstructions: '🤲 Dry clean only for best results\n🌡️ Do not tumble dry or bleach\n👕 Store in a cool, dry place away from direct sunlight',
    highlights: ['Pure silk weave', 'Handcrafted gold zardozi work', 'Regular comfortable fit']
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
    careInstructions: '🤲 Dry clean only\n% Keep in moisture-free storage bag',
    highlights: ['Velvet fabric texture', 'Aline elegant cut', 'Hand embroidered cuffs']
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
    careInstructions: '🤲 Gentle machine wash cold\n👕 Iron on linen setting',
    highlights: ['100% Organic Linen', 'Double vented back', 'Casual notch lapels']
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
    careInstructions: '🤲 Hand wash only\n👕 Flat dry to maintain shape',
    highlights: ['Merino wool yarn', 'Ribbed cuffs and hem', 'Anti-pilling treatment']
  },
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
    sizes: [
      { size: 'Free Size', stock: 15 }
    ],
    colors: [
      { name: 'Crimson Red', hex: '#DC143C' },
      { name: 'Emerald Gold', hex: '#50C878' }
    ],
    description: 'Exquisite hand-woven Kanjeevaram silk saree with real zari borders and patterns.',
    tags: ['trending'],
    careInstructions: '🤲 Dry clean only\n👕 Wrap in white cotton cloth to store',
    highlights: ['Pure Mulberry Silk', 'Golden Zari border work', 'Includes blouse fabric']
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
    careInstructions: '🤲 Dry clean recommended\n👕 Wash inside out on delicate cycle',
    highlights: ['Lightweight georgette', 'Gota patti border detail', 'Comes with trousers']
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
    careInstructions: '🤲 Machine wash cold\n👕 Iron on low heat',
    highlights: ['Georgette crinkle print', 'Tie-up shoulder straps', 'Elastic waist design']
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
    sizes: [
      { size: 'Free Size', stock: 8 }
    ],
    colors: [
      { name: 'Natural Tan', hex: '#D2B48C' },
      { name: 'Midnight', hex: '#1B1B1B' }
    ],
    description: 'Genuine hand-spun Pashmina cashmere shawl. Exceedingly soft, warm and elegant.',
    tags: ['trending', 'deal'],
    careInstructions: '🤲 Dry clean only\n👕 Moth prevention storage recommended',
    highlights: ['100% Pashmina Cashmere', 'Kashmiri hand embroidery', 'Featherlight and warm']
  },
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
    careInstructions: '🤲 Hand wash cold\n👕 Wash separately as colours might bleed',
    highlights: ['100% Handloom Cotton', 'Elastic pyjama waist', 'Soft neck stitches']
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
    careInstructions: '🤲 Dry clean only\n👕 Do not iron directly on Net fabric',
    highlights: ['Glitter sequin patterns', 'Drawstring adjustable waist', 'Cotton inner lining']
  },
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
    sizes: [
      { size: '50ml', stock: 15 },
      { size: '100ml', stock: 22 }
    ],
    colors: [
      { name: 'Gold Liquid', hex: '#D4AF37' }
    ],
    description: 'An premium, intensive fragrance made of real agarwood oud and aromatic amber notes.',
    tags: ['trending'],
    careInstructions: '👕 Store in dry cool dark place\n🌡️ Flammable, keep away from fire',
    highlights: ['Genuine Agarwood Oud', 'Long lasting 12 Hours+', 'Unisex appeal']
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
    sizes: [
      { size: '12ml', stock: 30 }
    ],
    colors: [
      { name: 'Saffron Orange', hex: '#FF9933' }
    ],
    description: 'Miraculous night serum crafted with pure saffron extracts to boost skin glow.',
    tags: ['deal'],
    careInstructions: '🤲 Store bottle upright\n👕 Apply at night, wash off next morning',
    highlights: ['Pure Kashmiri Saffron', 'Sandalwood extract blended', 'Clinically proven results']
  }
];

const defaultUser = {
  email: 'sneha@example.com',
  password: 'Password123',
  profile: {
    name: 'Sneha Sharma',
    email: 'sneha@example.com',
    phone: '9876543210',
    avatar: null,
    initials: 'SS'
  },
  addresses: [
    {
      id: 'addr_1',
      name: 'Sneha Sharma',
      phone: '9876543210',
      pincode: '400001',
      city: 'Mumbai',
      state: 'Maharashtra',
      street: '42, Marine Drive, Churchgate',
      landmark: 'Near NCPA',
      isDefault: true
    }
  ],
  savedCards: [
    {
      id: 'card_1',
      type: 'VISA',
      last4: '4242',
      expiry: '12/27'
    }
  ],
  upiIds: ['sneha@upi'],
  wishlist: ['prod_001', 'prod_005'],
  credits: 500,
  isActive: true,
  createdAt: new Date('2026-07-10T12:00:00.000Z')
};

// Mock Orders List
const defaultOrders = [
  {
    id: 'ord_1001',
    userEmail: 'sneha@example.com',
    date: '12 Jul 2026, 06:14 PM',
    total: 3499,
    status: 'Delivered',
    items: [{
      id: 'prod_001',
      title: 'Classic Gold Silk Kurta Set',
      brand: 'Luxaen Heritage',
      price: 3499,
      quantity: 1,
      selectedSize: 'M',
      selectedColor: 'Royal Gold',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&auto=format&fit=crop&q=80',
      category: 'men'
    }],
    shippingAddress: {
      name: 'Sneha Sharma',
      phone: '9876543210',
      pincode: '400001',
      city: 'Mumbai',
      state: 'Maharashtra',
      street: '42, Marine Drive, Churchgate'
    },
    paymentMethod: {
      type: 'UPI',
      details: 'sneha@upi'
    },
    discountApplied: 0
  },
  {
    id: 'ord_1002',
    userEmail: 'sneha@example.com',
    date: '14 Jul 2026, 08:30 PM',
    total: 9499,
    status: 'Delivered',
    items: [{
      id: 'prod_005',
      title: 'Handloom Kanjeevaram Silk Saree',
      brand: 'Luxaen Heritage',
      price: 9499,
      quantity: 1,
      selectedSize: 'Free Size',
      selectedColor: 'Crimson Red',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&auto=format&fit=crop&q=80',
      category: 'women'
    }],
    shippingAddress: {
      name: 'Sneha Sharma',
      phone: '9876543210',
      pincode: '400001',
      city: 'Mumbai',
      state: 'Maharashtra',
      street: '42, Marine Drive, Churchgate'
    },
    paymentMethod: {
      type: 'Card',
      details: 'Visa ending in 4242'
    },
    discountApplied: 0
  },
  {
    id: 'ord_1003',
    userEmail: 'sneha@example.com',
    date: '15 Jul 2026, 02:45 PM',
    total: 4999,
    status: 'Returned',
    items: [{
      id: 'prod_006',
      title: 'Embellished Georgette Anarkali',
      brand: 'Luxaen Heritage',
      price: 4999,
      quantity: 1,
      selectedSize: 'L',
      selectedColor: 'Deep Lavender',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&auto=format&fit=crop&q=80',
      category: 'women'
    }],
    shippingAddress: {
      name: 'Sneha Sharma',
      phone: '9876543210',
      pincode: '400001',
      city: 'Mumbai',
      state: 'Maharashtra',
      street: '42, Marine Drive, Churchgate'
    },
    paymentMethod: {
      type: 'UPI',
      details: 'sneha@upi'
    },
    discountApplied: 0
  }
];

// In-Memory Database Objects
let categories = [...categoriesData];
let products = [...productsData];
let users = [defaultUser];
let orders = [...defaultOrders];

module.exports = {
  categories,
  products,
  users,
  orders
};

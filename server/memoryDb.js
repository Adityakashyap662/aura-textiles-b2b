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
    "id": "cat_saree_001",
    "sku": "AUR-S-7009",
    "title": "Soft Silk 7009 Lichi Silk Jacquard Work Saree Collection",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "All-Over Gold Zari Jacquard Weaving with Contrast Rich Pallu & Tassels",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "All-Over Gold Zari Jacquard Weaving with Contrast Rich Pallu & Tassels",
    "price": 850,
    "pricePerPiece": 850,
    "mrp": 1530,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 950,
    "fabric": "Soft Lichi Silk Jacquard",
    "work": "All-Over Gold Zari Jacquard Weaving with Contrast Rich Pallu & Tassels",
    "length": "5.5 Mtr Saree + 0.8 Mtr Unstitched Blouse Piece",
    "catalogWeight": "5.1 KG",
    "rating": 4.9,
    "reviewsCount": 38,
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_saree_002",
    "sku": "AUR-S-8002",
    "title": "Kanjivaram Royale Pure Silk Weaving Saree Collection",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "Heavy Temple Border Zari Weaving",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Heavy Temple Border Zari Weaving",
    "price": 1150,
    "pricePerPiece": 1150,
    "mrp": 2070,
    "discount": 45,
    "pcsInSet": 8,
    "singlesAvailable": true,
    "singlesPrice": 1250,
    "fabric": "Kanjivaram Art Silk",
    "work": "Heavy Temple Border Zari Weaving",
    "length": "5.5 Mtr Saree + 0.8 Mtr Blouse",
    "catalogWeight": "6.4 KG",
    "rating": 5,
    "reviewsCount": 42,
    "images": [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_saree_003",
    "sku": "AUR-S-9003",
    "title": "Organza Floral Digital Print Zari Border Saree Set",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "Digital Rose Floral Print with Cutwork Zari Border",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Digital Rose Floral Print with Cutwork Zari Border",
    "price": 720,
    "pricePerPiece": 720,
    "mrp": 1296,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 820,
    "fabric": "Pure Soft Organza Silk",
    "work": "Digital Rose Floral Print with Cutwork Zari Border",
    "length": "5.5 Mtr Saree + Unstitched Satin Blouse",
    "catalogWeight": "4.2 KG",
    "rating": 4.8,
    "reviewsCount": 29,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_saree_004",
    "sku": "AUR-S-1004",
    "title": "Banarasi Brocade Silk Bridal Saree Edition",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "Kadwa Jaal Gold Zari Weaving",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Kadwa Jaal Gold Zari Weaving",
    "price": 1450,
    "pricePerPiece": 1450,
    "mrp": 2610,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": false,
    "singlesPrice": 1550,
    "fabric": "Pure Banarasi Soft Silk",
    "work": "Kadwa Jaal Gold Zari Weaving",
    "length": "5.5 Mtr + Brocade Blouse",
    "catalogWeight": "5.8 KG",
    "rating": 4.9,
    "reviewsCount": 31,
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_saree_005",
    "sku": "AUR-S-1105",
    "title": "Georgette Sequins Work Party Wear Saree Set",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "Multi-Color 9mm Sequins & Dori Embroidery",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Multi-Color 9mm Sequins & Dori Embroidery",
    "price": 980,
    "pricePerPiece": 980,
    "mrp": 1764,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1080,
    "fabric": "Faux Georgette",
    "work": "Multi-Color 9mm Sequins & Dori Embroidery",
    "length": "5.5 Mtr + Designer Blouse",
    "catalogWeight": "4.8 KG",
    "rating": 4.7,
    "reviewsCount": 22,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_saree_006",
    "sku": "AUR-S-1206",
    "title": "Tussar Silk Hand Block Print Traditional Saree",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "Authentic Ajrakh & Bagru Handblock Print",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Authentic Ajrakh & Bagru Handblock Print",
    "price": 890,
    "pricePerPiece": 890,
    "mrp": 1602,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 990,
    "fabric": "Pure Tussar Silk",
    "work": "Authentic Ajrakh & Bagru Handblock Print",
    "length": "5.5 Mtr + Printed Blouse",
    "catalogWeight": "4.5 KG",
    "rating": 4.8,
    "reviewsCount": 19,
    "images": [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_saree_007",
    "sku": "AUR-S-1307",
    "title": "Chanderi Silk Gotta Patti Festive Saree Collection",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "Handcrafted Gotta Patti & Mirror Borders",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Handcrafted Gotta Patti & Mirror Borders",
    "price": 790,
    "pricePerPiece": 790,
    "mrp": 1422,
    "discount": 45,
    "pcsInSet": 8,
    "singlesAvailable": true,
    "singlesPrice": 890,
    "fabric": "Chanderi Cotton Silk",
    "work": "Handcrafted Gotta Patti & Mirror Borders",
    "length": "5.5 Mtr + Blouse Piece",
    "catalogWeight": "5.0 KG",
    "rating": 4.9,
    "reviewsCount": 27,
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_saree_008",
    "sku": "AUR-S-1408",
    "title": "Paithani Peacock Motif Silk Saree Collection",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "Zari Weaved Peacock Pallu & Border",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Zari Weaved Peacock Pallu & Border",
    "price": 1290,
    "pricePerPiece": 1290,
    "mrp": 2322,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": false,
    "singlesPrice": 1390,
    "fabric": "Yeola Paithani Silk",
    "work": "Zari Weaved Peacock Pallu & Border",
    "length": "5.5 Mtr + Silk Blouse",
    "catalogWeight": "5.6 KG",
    "rating": 5,
    "reviewsCount": 35,
    "images": [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_saree_009",
    "sku": "AUR-S-1509",
    "title": "Satin Silk Designer Ombre Gradient Saree Set",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "Dual Ombre Tone Shading with Silver Cut pipe Border",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Dual Ombre Tone Shading with Silver Cut pipe Border",
    "price": 940,
    "pricePerPiece": 940,
    "mrp": 1692,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1040,
    "fabric": "Heavy Japanese Satin Silk",
    "work": "Dual Ombre Tone Shading with Silver Cut pipe Border",
    "length": "5.5 Mtr + Velvet Blouse",
    "catalogWeight": "4.9 KG",
    "rating": 4.8,
    "reviewsCount": 24,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_saree_010",
    "sku": "AUR-S-1610",
    "title": "Patola Double Ikat Silk Traditional Saree Set",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "Traditional Geometrical Weaving Jaal",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Traditional Geometrical Weaving Jaal",
    "price": 1190,
    "pricePerPiece": 1190,
    "mrp": 2142,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1290,
    "fabric": "Rajnagar Patola Silk",
    "work": "Traditional Geometrical Weaving Jaal",
    "length": "5.5 Mtr + Contrast Blouse",
    "catalogWeight": "5.3 KG",
    "rating": 4.9,
    "reviewsCount": 33,
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_saree_011",
    "sku": "AUR-S-1711",
    "title": "Digital Organza Floral Mirror Work Saree Collection",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "Real Glass Mirror Embroidery & Cutwork Border",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Real Glass Mirror Embroidery & Cutwork Border",
    "price": 880,
    "pricePerPiece": 880,
    "mrp": 1584,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 980,
    "fabric": "Pure Soft Organza",
    "work": "Real Glass Mirror Embroidery & Cutwork Border",
    "length": "5.5 Mtr + Unstitched Satin Blouse",
    "catalogWeight": "4.4 KG",
    "rating": 4.9,
    "reviewsCount": 36,
    "images": [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_saree_012",
    "sku": "AUR-S-1812",
    "title": "Heavy Dupion Silk Bandhani Zari Weaving Saree Set",
    "brand": "Aura Weaves Noida",
    "category": "sarees",
    "description": "Gold Zari Temple Weaving & Bandhej Print",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Gold Zari Temple Weaving & Bandhej Print",
    "price": 1050,
    "pricePerPiece": 1050,
    "mrp": 1890,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1150,
    "fabric": "Raw Dupion Silk",
    "work": "Gold Zari Temple Weaving & Bandhej Print",
    "length": "5.5 Mtr + Silk Blouse",
    "catalogWeight": "5.2 KG",
    "rating": 4.8,
    "reviewsCount": 29,
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_001",
    "sku": "AUR-M-1001",
    "title": "Royal Velvet Groom & Groomsmen Wedding Sherwani Set",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "Handcrafted Zardozi, Sequins & Thread Embroidery",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Handcrafted Zardozi, Sequins & Thread Embroidery",
    "price": 2450,
    "pricePerPiece": 2450,
    "mrp": 4410,
    "discount": 45,
    "pcsInSet": 4,
    "singlesAvailable": true,
    "singlesPrice": 2650,
    "fabric": "Micro Velvet 9000 & Dupion Silk",
    "work": "Handcrafted Zardozi, Sequins & Thread Embroidery",
    "length": "Full Length Sherwani + Churidar Pyjama + Stole dupatta",
    "catalogWeight": "7.8 KG",
    "rating": 5,
    "reviewsCount": 45,
    "images": [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_002",
    "sku": "AUR-M-1002",
    "title": "Dupion Silk Designer Kurta Pyjama & Nehru Jacket 3-Piece",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "Mandarin Collar Weaved Woven Waiscoat Jacket",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Mandarin Collar Weaved Woven Waiscoat Jacket",
    "price": 1250,
    "pricePerPiece": 1250,
    "mrp": 2250,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1350,
    "fabric": "Raw Dupion Silk & Silk Jacquard",
    "work": "Mandarin Collar Weaved Woven Waiscoat Jacket",
    "length": "Knee Length Kurta + Silk Pyjama + Jacket",
    "catalogWeight": "5.2 KG",
    "rating": 4.9,
    "reviewsCount": 31,
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_003",
    "sku": "AUR-M-1003",
    "title": "Indo-Western Asymmetric Embroidered Groom Suit Set",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "Cut-Dana Hand Embroidery & Asymmetric Buttoning",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Cut-Dana Hand Embroidery & Asymmetric Buttoning",
    "price": 2890,
    "pricePerPiece": 2890,
    "mrp": 5202,
    "discount": 45,
    "pcsInSet": 4,
    "singlesAvailable": true,
    "singlesPrice": 3090,
    "fabric": "Matka Silk Blend",
    "work": "Cut-Dana Hand Embroidery & Asymmetric Buttoning",
    "length": "Short Sherwani + Tapered Pants",
    "catalogWeight": "6.5 KG",
    "rating": 4.8,
    "reviewsCount": 18,
    "images": [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_004",
    "sku": "AUR-M-1004",
    "title": "Brocade Jacquard Groom Jodhpuri Bandhgala Suit",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "Metal Crest Buttons & Velvet Piping",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Metal Crest Buttons & Velvet Piping",
    "price": 2650,
    "pricePerPiece": 2650,
    "mrp": 4770,
    "discount": 45,
    "pcsInSet": 4,
    "singlesAvailable": true,
    "singlesPrice": 2850,
    "fabric": "Banarasi Brocade Silk",
    "work": "Metal Crest Buttons & Velvet Piping",
    "length": "Bandhgala Jacket + Trousers",
    "catalogWeight": "6.8 KG",
    "rating": 4.9,
    "reviewsCount": 26,
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_005",
    "sku": "AUR-M-1005",
    "title": "Cotton Silk Lucknowi Chikankari Kurta Pyjama Set",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "All-over Lucknowi Chikankari Thread & Sequins Work",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "All-over Lucknowi Chikankari Thread & Sequins Work",
    "price": 980,
    "pricePerPiece": 980,
    "mrp": 1764,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1080,
    "fabric": "Pure Cotton Silk",
    "work": "All-over Lucknowi Chikankari Thread & Sequins Work",
    "length": "Long Kurta + White Aligarhi Pyjama",
    "catalogWeight": "4.4 KG",
    "rating": 4.7,
    "reviewsCount": 20,
    "images": [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_006",
    "sku": "AUR-M-1006",
    "title": "Pathani Suit Set with Heavy Gold Collar & Cuff Work",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "Zari Thread Collar & Epaulettes",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Zari Thread Collar & Epaulettes",
    "price": 890,
    "pricePerPiece": 890,
    "mrp": 1602,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 990,
    "fabric": "Linen Cotton",
    "work": "Zari Thread Collar & Epaulettes",
    "length": "Long Pathani Shirt + Salwar",
    "catalogWeight": "4.8 KG",
    "rating": 4.8,
    "reviewsCount": 24,
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_007",
    "sku": "AUR-M-1007",
    "title": "Mirror Work Georgette Designer Festival Kurta",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "Foil Mirror Stitching & Resham Embroidery",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Foil Mirror Stitching & Resham Embroidery",
    "price": 1120,
    "pricePerPiece": 1120,
    "mrp": 2016,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1220,
    "fabric": "Faux Georgette with Cotton Lining",
    "work": "Foil Mirror Stitching & Resham Embroidery",
    "length": "Long Kurta + Silk Pants",
    "catalogWeight": "4.6 KG",
    "rating": 4.9,
    "reviewsCount": 28,
    "images": [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_008",
    "sku": "AUR-M-1008",
    "title": "Velvet Shawl & Sherwani Accessory Combo Set",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "Heavy Zardozi Border & Corner Motif Embroidery",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Heavy Zardozi Border & Corner Motif Embroidery",
    "price": 1850,
    "pricePerPiece": 1850,
    "mrp": 3330,
    "discount": 45,
    "pcsInSet": 4,
    "singlesAvailable": true,
    "singlesPrice": 1950,
    "fabric": "Micro Velvet 9000",
    "work": "Heavy Zardozi Border & Corner Motif Embroidery",
    "length": "Royal Groom Stole / Dupatta (2.5 Mtr)",
    "catalogWeight": "5.5 KG",
    "rating": 5,
    "reviewsCount": 30,
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_009",
    "sku": "AUR-M-1009",
    "title": "Tussar Silk Printed Haldi Special Kurta Set",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "Traditional Bandhani Print & Gold Piping",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Traditional Bandhani Print & Gold Piping",
    "price": 820,
    "pricePerPiece": 820,
    "mrp": 1476,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 920,
    "fabric": "Tussar Art Silk",
    "work": "Traditional Bandhani Print & Gold Piping",
    "length": "Kurta + White Pyjama",
    "catalogWeight": "4.0 KG",
    "rating": 4.8,
    "reviewsCount": 16,
    "images": [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_010",
    "sku": "AUR-M-1010",
    "title": "Indo-Western Tuxedo Style Sherwani Jacket Set",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "Satin Lapel Collar & Cutdana Embroidery",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Satin Lapel Collar & Cutdana Embroidery",
    "price": 2350,
    "pricePerPiece": 2350,
    "mrp": 4230,
    "discount": 45,
    "pcsInSet": 4,
    "singlesAvailable": true,
    "singlesPrice": 2550,
    "fabric": "Italian Velvet & Jacquard Silk",
    "work": "Satin Lapel Collar & Cutdana Embroidery",
    "length": "Sherwani Jacket + Fitted Trousers",
    "catalogWeight": "6.2 KG",
    "rating": 4.9,
    "reviewsCount": 22,
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_011",
    "sku": "AUR-M-1011",
    "title": "Royal Jacquard Kurta Pyjamas with Embroidered Waistcoat",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "Zari Weaving with Metal Brooch",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Zari Weaving with Metal Brooch",
    "price": 1350,
    "pricePerPiece": 1350,
    "mrp": 2430,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1450,
    "fabric": "Art Jacquard Silk & Velvet Jacket",
    "work": "Zari Weaving with Metal Brooch",
    "length": "Knee Length Kurta + Silk Pyjama + Waistcoat",
    "catalogWeight": "5.5 KG",
    "rating": 4.9,
    "reviewsCount": 28,
    "images": [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_men_012",
    "sku": "AUR-M-1012",
    "title": "Hand-Embroidered Velvet Sherwani Stole & Trouser Combo",
    "brand": "Aura Heritage Men",
    "category": "men_sherwanis",
    "description": "Heavy Zardozi Dori Work & Resham Embroidery",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Heavy Zardozi Dori Work & Resham Embroidery",
    "price": 2150,
    "pricePerPiece": 2150,
    "mrp": 3870,
    "discount": 45,
    "pcsInSet": 4,
    "singlesAvailable": true,
    "singlesPrice": 2350,
    "fabric": "Micro Velvet 9000 & Dupion Silk",
    "work": "Heavy Zardozi Dori Work & Resham Embroidery",
    "length": "Sherwani Jacket + Fitted Trousers + Royal Stole",
    "catalogWeight": "6.8 KG",
    "rating": 5,
    "reviewsCount": 35,
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_001",
    "sku": "AUR-L-3001",
    "title": "Heavy Velvet Zardozi Bridal Lehenga Choli Collection",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "Handcrafted Zardozi, Cut-Dana, Dori & Sequins Embroidery",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Handcrafted Zardozi, Cut-Dana, Dori & Sequins Embroidery",
    "price": 3200,
    "pricePerPiece": 3200,
    "mrp": 5760,
    "discount": 45,
    "pcsInSet": 4,
    "singlesAvailable": true,
    "singlesPrice": 3450,
    "fabric": "Heavy Micro Velvet 9000 & Net Dupatta",
    "work": "Handcrafted Zardozi, Cut-Dana, Dori & Sequins Embroidery",
    "length": "Semi-Stitched (Flair 3.8 Mtr) + Double Dupatta",
    "catalogWeight": "9.2 KG",
    "rating": 5,
    "reviewsCount": 52,
    "images": [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_002",
    "sku": "AUR-L-3002",
    "title": "Faux Georgette 9mm Mirror Sequins Party Lehenga Set",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "Real Glass Mirror Work & Thread Kali Stitching",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Real Glass Mirror Work & Thread Kali Stitching",
    "price": 1950,
    "pricePerPiece": 1950,
    "mrp": 3510,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 2100,
    "fabric": "Heavy Faux Georgette",
    "work": "Real Glass Mirror Work & Thread Kali Stitching",
    "length": "Semi-Stitched (Flair 4.2 Mtr) + Unstitched Blouse",
    "catalogWeight": "6.8 KG",
    "rating": 4.9,
    "reviewsCount": 39,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_003",
    "sku": "AUR-L-3003",
    "title": "Organza Digital Floral Print Lehenga Choli Edition",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "Digital Print with Gotapatti Lace Border",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Digital Print with Gotapatti Lace Border",
    "price": 1450,
    "pricePerPiece": 1450,
    "mrp": 2610,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1550,
    "fabric": "Pure Soft Organza Silk",
    "work": "Digital Print with Gotapatti Lace Border",
    "length": "Semi-Stitched (Flair 4.5 Mtr)",
    "catalogWeight": "5.0 KG",
    "rating": 4.8,
    "reviewsCount": 26,
    "images": [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_004",
    "sku": "AUR-L-3004",
    "title": "Raw Silk Multi-Thread Floral Embroidered Lehenga",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "Resham Thread & Gold Zari Handwork",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Resham Thread & Gold Zari Handwork",
    "price": 2850,
    "pricePerPiece": 2850,
    "mrp": 5130,
    "discount": 45,
    "pcsInSet": 4,
    "singlesAvailable": true,
    "singlesPrice": 3050,
    "fabric": "Raw Silk & Net Dupatta",
    "work": "Resham Thread & Gold Zari Handwork",
    "length": "Semi-Stitched (Flair 3.5 Mtr)",
    "catalogWeight": "7.5 KG",
    "rating": 4.9,
    "reviewsCount": 34,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_005",
    "sku": "AUR-L-3005",
    "title": "Sequined Satin Silk Cocktail Saree Lehenga Fusion",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "Tone-on-Tone Sequins Work",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Tone-on-Tone Sequins Work",
    "price": 1750,
    "pricePerPiece": 1750,
    "mrp": 3150,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1850,
    "fabric": "Japanese Satin Silk",
    "work": "Tone-on-Tone Sequins Work",
    "length": "Readymade Stitched Saree Lehenga",
    "catalogWeight": "5.8 KG",
    "rating": 4.7,
    "reviewsCount": 21,
    "images": [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_006",
    "sku": "AUR-L-3006",
    "title": "Banarasi Brocade Silk Flared Lehenga Set",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "Gold Zari Weaved Flared Kalis",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Gold Zari Weaved Flared Kalis",
    "price": 1650,
    "pricePerPiece": 1650,
    "mrp": 2970,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1750,
    "fabric": "Banarasi Art Silk Brocade",
    "work": "Gold Zari Weaved Flared Kalis",
    "length": "Semi-Stitched (Flair 3.5 Mtr)",
    "catalogWeight": "6.2 KG",
    "rating": 4.8,
    "reviewsCount": 28,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_007",
    "sku": "AUR-L-3007",
    "title": "Net Cut-Work Designer Sangeet Lehenga Choli",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "Multi-Color Thread & Pearl Handwork",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Multi-Color Thread & Pearl Handwork",
    "price": 1890,
    "pricePerPiece": 1890,
    "mrp": 3402,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1990,
    "fabric": "Heavy Soft Net",
    "work": "Multi-Color Thread & Pearl Handwork",
    "length": "Semi-Stitched (Flair 4.0 Mtr)",
    "catalogWeight": "6.0 KG",
    "rating": 4.9,
    "reviewsCount": 30,
    "images": [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_008",
    "sku": "AUR-L-3008",
    "title": "Chanderi Silk Printed Festive Lehenga Collection",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "Foil Print with Gotta Patti Borders",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Foil Print with Gotta Patti Borders",
    "price": 1350,
    "pricePerPiece": 1350,
    "mrp": 2430,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1450,
    "fabric": "Chanderi Silk",
    "work": "Foil Print with Gotta Patti Borders",
    "length": "Semi-Stitched (Flair 3.8 Mtr)",
    "catalogWeight": "5.2 KG",
    "rating": 4.7,
    "reviewsCount": 19,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_009",
    "sku": "AUR-L-3009",
    "title": "Velvet Maroon Royal Dulhan Wedding Lehenga Set",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "Heavy Zardozi, Dabka & Dori Handwork",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Heavy Zardozi, Dabka & Dori Handwork",
    "price": 3450,
    "pricePerPiece": 3450,
    "mrp": 6210,
    "discount": 45,
    "pcsInSet": 4,
    "singlesAvailable": true,
    "singlesPrice": 3650,
    "fabric": "Micro Velvet 9000 & Double Net Dupatta",
    "work": "Heavy Zardozi, Dabka & Dori Handwork",
    "length": "Semi-Stitched (Flair 4.0 Mtr)",
    "catalogWeight": "10.5 KG",
    "rating": 5,
    "reviewsCount": 48,
    "images": [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_010",
    "sku": "AUR-L-3010",
    "title": "Shimmer Satin Pleated Designer Indo-Western Lehenga",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "Crushed Pleated Skirt with Designer Crop Top",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Crushed Pleated Skirt with Designer Crop Top",
    "price": 1590,
    "pricePerPiece": 1590,
    "mrp": 2862,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1690,
    "fabric": "Shimmer Satin",
    "work": "Crushed Pleated Skirt with Designer Crop Top",
    "length": "Stitched Skirt + Unstitched Blouse",
    "catalogWeight": "5.4 KG",
    "rating": 4.8,
    "reviewsCount": 23,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_011",
    "sku": "AUR-L-3011",
    "title": "Sequined Net Designer Sangeet Lehenga Choli",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "9mm Sequins Work & Hand Cutwork Border",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "9mm Sequins Work & Hand Cutwork Border",
    "price": 2100,
    "pricePerPiece": 2100,
    "mrp": 3780,
    "discount": 45,
    "pcsInSet": 4,
    "singlesAvailable": true,
    "singlesPrice": 2250,
    "fabric": "Heavy Soft Net & Satin Lining",
    "work": "9mm Sequins Work & Hand Cutwork Border",
    "length": "Semi-Stitched (Flair 4.0 Mtr) + Stitched Blouse",
    "catalogWeight": "6.5 KG",
    "rating": 4.9,
    "reviewsCount": 32,
    "images": [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_lehenga_012",
    "sku": "AUR-L-3012",
    "title": "Heavy Satin Ombre Bridal Lehenga Edition",
    "brand": "Aura Couture Noida",
    "category": "lehengas",
    "description": "Zardozi Dori Embroidery & Cutdana Work",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Zardozi Dori Embroidery & Cutdana Work",
    "price": 2750,
    "pricePerPiece": 2750,
    "mrp": 4950,
    "discount": 45,
    "pcsInSet": 4,
    "singlesAvailable": true,
    "singlesPrice": 2950,
    "fabric": "Heavy Japanese Satin & Net Dupatta",
    "work": "Zardozi Dori Embroidery & Cutdana Work",
    "length": "Semi-Stitched (Flair 4.2 Mtr) + Unstitched Blouse",
    "catalogWeight": "8.0 KG",
    "rating": 5,
    "reviewsCount": 41,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_001",
    "sku": "AUR-SU-2001",
    "title": "Heavy Georgette Thread & Mirror Work Anarkali Suit Set",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "Heavy Resham Thread & Foil Mirror Work",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Heavy Resham Thread & Foil Mirror Work",
    "price": 1250,
    "pricePerPiece": 1250,
    "mrp": 2250,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1350,
    "fabric": "Faux Georgette & Nazneen Dupatta",
    "work": "Heavy Resham Thread & Foil Mirror Work",
    "length": "Top 52 Inch Flared Anarkali + Santoon Bottom",
    "catalogWeight": "5.8 KG",
    "rating": 4.9,
    "reviewsCount": 41,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_002",
    "sku": "AUR-SU-2002",
    "title": "Pure Cotton Printed Straight Punjabi Salwar Suit Set",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "Sanganeri Print with Hand Work Neckline",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Sanganeri Print with Hand Work Neckline",
    "price": 650,
    "pricePerPiece": 650,
    "mrp": 1170,
    "discount": 45,
    "pcsInSet": 8,
    "singlesAvailable": true,
    "singlesPrice": 720,
    "fabric": "100% Pure Jaipuri Cotton",
    "work": "Sanganeri Print with Hand Work Neckline",
    "length": "Top 2.5 Mtr + Salwar 2.5 Mtr + Dupatta 2.25 Mtr",
    "catalogWeight": "4.8 KG",
    "rating": 4.8,
    "reviewsCount": 33,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_003",
    "sku": "AUR-SU-2003",
    "title": "Pashmina Woolen Embroidered Winter Suit Collection",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "Kashmiri Aari Thread Embroidery",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Kashmiri Aari Thread Embroidery",
    "price": 890,
    "pricePerPiece": 890,
    "mrp": 1602,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 990,
    "fabric": "Pure Pashmina Wool & Woolen Shawl",
    "work": "Kashmiri Aari Thread Embroidery",
    "length": "Unstitched 3-Piece Warm Suit",
    "catalogWeight": "6.5 KG",
    "rating": 4.9,
    "reviewsCount": 29,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_004",
    "sku": "AUR-SU-2004",
    "title": "Silk Chanderi Embroidered Straight Pakistani Suit",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "Heavy Pakistani Style Zari & Lace Borders",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Heavy Pakistani Style Zari & Lace Borders",
    "price": 1150,
    "pricePerPiece": 1150,
    "mrp": 2070,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1250,
    "fabric": "Chanderi Silk & Organza Dupatta",
    "work": "Heavy Pakistani Style Zari & Lace Borders",
    "length": "Unstitched Top 2.5 Mtr",
    "catalogWeight": "5.2 KG",
    "rating": 4.8,
    "reviewsCount": 27,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_005",
    "sku": "AUR-SU-2005",
    "title": "Velvet Embroidered Winter Party Suit Collection",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "Gold Zari & Sequins Neck Motif Work",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Gold Zari & Sequins Neck Motif Work",
    "price": 1550,
    "pricePerPiece": 1550,
    "mrp": 2790,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1650,
    "fabric": "Micro Velvet 9000 & Velvet Stole",
    "work": "Gold Zari & Sequins Neck Motif Work",
    "length": "Unstitched Suit Set",
    "catalogWeight": "7.2 KG",
    "rating": 5,
    "reviewsCount": 36,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_006",
    "sku": "AUR-SU-2006",
    "title": "Sharara Garara Georgette Party Wear 3-Piece Set",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "Multi-Kali Flared Sharara with Sequins Kurti",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Multi-Kali Flared Sharara with Sequins Kurti",
    "price": 1390,
    "pricePerPiece": 1390,
    "mrp": 2502,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1490,
    "fabric": "Faux Georgette",
    "work": "Multi-Kali Flared Sharara with Sequins Kurti",
    "length": "Stitched Sharara + Unstitched Top",
    "catalogWeight": "5.6 KG",
    "rating": 4.9,
    "reviewsCount": 31,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_007",
    "sku": "AUR-SU-2007",
    "title": "Rayon Printed Daily Wear Salwar Kameez Collection",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "Foil Gold Print with Button Embellishment",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Foil Gold Print with Button Embellishment",
    "price": 580,
    "pricePerPiece": 580,
    "mrp": 1044,
    "discount": 45,
    "pcsInSet": 8,
    "singlesAvailable": true,
    "singlesPrice": 650,
    "fabric": "Heavy 14KG Rayon Slub",
    "work": "Foil Gold Print with Button Embellishment",
    "length": "Unstitched 3-Piece Suit",
    "catalogWeight": "4.5 KG",
    "rating": 4.7,
    "reviewsCount": 22,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_008",
    "sku": "AUR-SU-2008",
    "title": "Organza Embroidered Designer Palazzo Suit Edition",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "Cutwork Border & Handwork Neck Embroidery",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Cutwork Border & Handwork Neck Embroidery",
    "price": 1290,
    "pricePerPiece": 1290,
    "mrp": 2322,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1390,
    "fabric": "Pure Soft Organza",
    "work": "Cutwork Border & Handwork Neck Embroidery",
    "length": "Top 46 Inch + Flared Palazzo",
    "catalogWeight": "5.0 KG",
    "rating": 4.8,
    "reviewsCount": 25,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_009",
    "sku": "AUR-SU-2009",
    "title": "Chikankari Georgette Flared Floor Length Suit",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "All-over Lucknowi Chikankari & Mukaish Work",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "All-over Lucknowi Chikankari & Mukaish Work",
    "price": 1450,
    "pricePerPiece": 1450,
    "mrp": 2610,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1550,
    "fabric": "Faux Georgette",
    "work": "All-over Lucknowi Chikankari & Mukaish Work",
    "length": "Floor Length Top 54 Inch",
    "catalogWeight": "6.0 KG",
    "rating": 4.9,
    "reviewsCount": 38,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_010",
    "sku": "AUR-SU-2010",
    "title": "Bandhani Silk Heavy Gota Patti Suit Collection",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "Traditional Gota Patti & Mirror Lace",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Traditional Gota Patti & Mirror Lace",
    "price": 990,
    "pricePerPiece": 990,
    "mrp": 1782,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1090,
    "fabric": "Art Silk Bandhej",
    "work": "Traditional Gota Patti & Mirror Lace",
    "length": "Unstitched Suit Set",
    "catalogWeight": "4.9 KG",
    "rating": 4.8,
    "reviewsCount": 20,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_011",
    "sku": "AUR-SU-2011",
    "title": "Lucknowi Chikankari Georgette Flared Anarkali Suit Set",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "All-over Lucknowi Chikankari & Mukaish Mirror Work",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "All-over Lucknowi Chikankari & Mukaish Mirror Work",
    "price": 1380,
    "pricePerPiece": 1380,
    "mrp": 2484,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1480,
    "fabric": "Faux Georgette & Nazneen Dupatta",
    "work": "All-over Lucknowi Chikankari & Mukaish Mirror Work",
    "length": "Flared Top 52 Inch + Santoon Bottom",
    "catalogWeight": "5.9 KG",
    "rating": 4.9,
    "reviewsCount": 34,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_suit_012",
    "sku": "AUR-SU-2012",
    "title": "Silk Chanderi Digital Print Palazzo Suit Collection",
    "brand": "Aura Fashion Noida",
    "category": "salwar_suits",
    "description": "Digital Floral Print with Gotta Border",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Digital Floral Print with Gotta Border",
    "price": 1090,
    "pricePerPiece": 1090,
    "mrp": 1962,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1190,
    "fabric": "Chanderi Silk & Organza Dupatta",
    "work": "Digital Floral Print with Gotta Border",
    "length": "Straight Top 46 Inch + Stitched Palazzo",
    "catalogWeight": "5.1 KG",
    "rating": 4.8,
    "reviewsCount": 26,
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_001",
    "sku": "AUR-K-4001",
    "title": "Cotton Silk Straight Kurti & Pant 2-Piece Boutique Set",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Hand Block Print with Thread Neck Work",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Hand Block Print with Thread Neck Work",
    "price": 450,
    "pricePerPiece": 450,
    "mrp": 810,
    "discount": 45,
    "pcsInSet": 8,
    "singlesAvailable": true,
    "singlesPrice": 520,
    "fabric": "Cotton Silk Blend",
    "work": "Hand Block Print with Thread Neck Work",
    "length": "Kurta 44 Inch + Stitched Pant",
    "catalogWeight": "3.8 KG",
    "rating": 4.8,
    "reviewsCount": 28,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_002",
    "sku": "AUR-K-4002",
    "title": "Rayon Printed Flared Anarkali Kurti Collection",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Gold Foil Print with Dori Tassels",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Gold Foil Print with Dori Tassels",
    "price": 520,
    "pricePerPiece": 520,
    "mrp": 936,
    "discount": 45,
    "pcsInSet": 8,
    "singlesAvailable": true,
    "singlesPrice": 590,
    "fabric": "Heavy 14KG Rayon",
    "work": "Gold Foil Print with Dori Tassels",
    "length": "Flared Kurti 48 Inch",
    "catalogWeight": "4.2 KG",
    "rating": 4.7,
    "reviewsCount": 24,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_003",
    "sku": "AUR-K-4003",
    "title": "Muslin Silk Designer Indo-Western Tunic Set",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Digital Print with Cutdana Handwork",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Digital Print with Cutdana Handwork",
    "price": 690,
    "pricePerPiece": 690,
    "mrp": 1242,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 780,
    "fabric": "Pure Muslin Silk",
    "work": "Digital Print with Cutdana Handwork",
    "length": "Asymmetric Tunic Length",
    "catalogWeight": "3.5 KG",
    "rating": 4.9,
    "reviewsCount": 30,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_004",
    "sku": "AUR-K-4004",
    "title": "Georgette Tiered Layered Indo-Western Gown Kurti",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Sequins Embroidery & Ruffle Hem",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Sequins Embroidery & Ruffle Hem",
    "price": 850,
    "pricePerPiece": 850,
    "mrp": 1530,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 950,
    "fabric": "Faux Georgette",
    "work": "Sequins Embroidery & Ruffle Hem",
    "length": "Floor Length 52 Inch",
    "catalogWeight": "4.6 KG",
    "rating": 4.8,
    "reviewsCount": 19,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_005",
    "sku": "AUR-K-4005",
    "title": "Linen Cotton Office Wear Straight Kurti Set",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Schiffli Lace Neckline & Pockets",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Schiffli Lace Neckline & Pockets",
    "price": 480,
    "pricePerPiece": 480,
    "mrp": 864,
    "discount": 45,
    "pcsInSet": 8,
    "singlesAvailable": true,
    "singlesPrice": 550,
    "fabric": "Pure Organic Linen Cotton",
    "work": "Schiffli Lace Neckline & Pockets",
    "length": "Kurti 44 Inch + Trousers",
    "catalogWeight": "3.6 KG",
    "rating": 4.7,
    "reviewsCount": 17,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_006",
    "sku": "AUR-K-4006",
    "title": "Chanderi Silk Festive Kurti & Dupatta Set",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Zari Thread Border & Gotapatti",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Zari Thread Border & Gotapatti",
    "price": 750,
    "pricePerPiece": 750,
    "mrp": 1350,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 850,
    "fabric": "Chanderi Silk & Organza Dupatta",
    "work": "Zari Thread Border & Gotapatti",
    "length": "Kurti 46 Inch",
    "catalogWeight": "4.0 KG",
    "rating": 4.9,
    "reviewsCount": 22,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_007",
    "sku": "AUR-K-4007",
    "title": "Short Cotton Kaftan Tunic Set for Boutique Export",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Digital Abstract Print & Fringe Tassels",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Digital Abstract Print & Fringe Tassels",
    "price": 390,
    "pricePerPiece": 390,
    "mrp": 702,
    "discount": 45,
    "pcsInSet": 8,
    "singlesAvailable": true,
    "singlesPrice": 450,
    "fabric": "Pure Cambric Cotton",
    "work": "Digital Abstract Print & Fringe Tassels",
    "length": "Kaftan Tunic 36 Inch",
    "catalogWeight": "3.0 KG",
    "rating": 4.6,
    "reviewsCount": 15,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_008",
    "sku": "AUR-K-4008",
    "title": "Jacquard Silk Kurti & Palazzo 2-Piece Festival Suit",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Woven Floral Motifs with Button Stitching",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Woven Floral Motifs with Button Stitching",
    "price": 790,
    "pricePerPiece": 790,
    "mrp": 1422,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 890,
    "fabric": "Art Silk Jacquard",
    "work": "Woven Floral Motifs with Button Stitching",
    "length": "Kurti 45 Inch + Wide Palazzo",
    "catalogWeight": "4.3 KG",
    "rating": 4.8,
    "reviewsCount": 21,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_009",
    "sku": "AUR-K-4009",
    "title": "Embroidered Velvet Short Kurti & Sharara Set",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Dori & Sequins Yoke Embroidery",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Dori & Sequins Yoke Embroidery",
    "price": 1150,
    "pricePerPiece": 1150,
    "mrp": 2070,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 1250,
    "fabric": "Micro Velvet 9000",
    "work": "Dori & Sequins Yoke Embroidery",
    "length": "Short Kurti + Stitched Sharara",
    "catalogWeight": "5.5 KG",
    "rating": 4.9,
    "reviewsCount": 26,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_010",
    "sku": "AUR-K-4010",
    "title": "Denim Cotton Western Fusion Tunic Dress",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Front Pocket Embroidery & Fabric Belt",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Front Pocket Embroidery & Fabric Belt",
    "price": 550,
    "pricePerPiece": 550,
    "mrp": 990,
    "discount": 45,
    "pcsInSet": 8,
    "singlesAvailable": true,
    "singlesPrice": 620,
    "fabric": "Soft Denim Cotton",
    "work": "Front Pocket Embroidery & Fabric Belt",
    "length": "Midi Dress Length 44 Inch",
    "catalogWeight": "4.0 KG",
    "rating": 4.7,
    "reviewsCount": 18,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_011",
    "sku": "AUR-K-4011",
    "title": "Muslin Silk Digital Printed Tunic & Pant Set",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Digital Print & Pearl Neck Work",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Digital Print & Pearl Neck Work",
    "price": 740,
    "pricePerPiece": 740,
    "mrp": 1332,
    "discount": 45,
    "pcsInSet": 6,
    "singlesAvailable": true,
    "singlesPrice": 840,
    "fabric": "Pure Muslin Silk",
    "work": "Digital Print & Pearl Neck Work",
    "length": "Tunic Length 42 Inch + Pants",
    "catalogWeight": "3.7 KG",
    "rating": 4.9,
    "reviewsCount": 31,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
  },
  {
    "id": "cat_kurti_012",
    "sku": "AUR-K-4012",
    "title": "Schiffli Lace Cotton Straight Kurti Collection",
    "brand": "Aura Dailywear Noida",
    "category": "western_kurtis",
    "description": "Schiffli Embroidery & Fabric Buttoning",
    "tags": [
      "b2b-export",
      "wholesale",
      "new-arrival"
    ],
    "careInstructions": "Dry clean only for export quality fabrics",
    "highlights": "Schiffli Embroidery & Fabric Buttoning",
    "price": 590,
    "pricePerPiece": 590,
    "mrp": 1062,
    "discount": 45,
    "pcsInSet": 8,
    "singlesAvailable": true,
    "singlesPrice": 680,
    "fabric": "100% Pure Organic Cotton",
    "work": "Schiffli Embroidery & Fabric Buttoning",
    "length": "Straight Kurti 44 Inch",
    "catalogWeight": "3.8 KG",
    "rating": 4.8,
    "reviewsCount": 25,
    "images": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=1000&auto=format&fit=crop&q=80"
    ],
    "videos": [],
    "colors": [
      {
        "name": "Royal Gold",
        "hex": "#D4AF37"
      }
    ],
    "sizes": [
      {
        "size": "Free Size",
        "stock": 10
      }
    ]
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

const defaultQuoteFields = [
  {
    id: 'field_fabric',
    label: 'Fabric',
    key: 'fabric',
    type: 'select',
    options: ['100% Combed Cotton (180 GSM)', 'Heavy Super Cotton (220 GSM)', 'Polyester Blend', 'Spun Silk', 'Rayon', 'Heavy Canvas'],
    required: true,
    placeholder: 'Select Fabric Type',
    order: 1,
    active: true
  },
  {
    id: 'field_quantity',
    label: 'Quantity',
    key: 'quantity',
    type: 'number',
    options: [],
    required: true,
    placeholder: 'e.g., 500 Pcs',
    order: 2,
    active: true
  },
  {
    id: 'field_colour',
    label: 'Colour',
    key: 'colour',
    type: 'text',
    options: [],
    required: false,
    placeholder: 'e.g., Navy Blue, Jet Black, Maroon',
    order: 3,
    active: true
  },
  {
    id: 'field_customization',
    label: 'Printing / Embroidery',
    key: 'customization',
    type: 'select',
    options: ['Screen Printing', 'DTF Digital Print', 'Zari Embroidery', 'Sublimation', 'Plain / Unbranded'],
    required: false,
    placeholder: 'Select Customization Method',
    order: 4,
    active: true
  },
  {
    id: 'field_notes',
    label: 'Additional Instructions',
    key: 'notes',
    type: 'textarea',
    options: [],
    required: false,
    placeholder: 'Size breakdown (S-XXL), target delivery city, or specific requirements...',
    order: 5,
    active: true
  }
];

const defaultQuoteRequests = [
  {
    id: 'qreq_1001',
    name: 'Vikram Mehta',
    phone: '+91 98200 12345',
    email: 'vikram.mehta@boutique.com',
    fieldsData: {
      fabric: '100% Combed Cotton (180 GSM)',
      quantity: '1000 Pcs',
      colour: 'Jet Black & Royal Blue',
      customization: 'DTF Digital Print',
      notes: 'Need 500 S, 300 M, 200 L delivered to Mumbai by 25th August.'
    },
    status: 'Pending',
    createdAt: new Date('2026-08-08T10:00:00.000Z')
  }
];

// In-Memory Database Objects
let categories = [...categoriesData];
let products = [...productsData];
let users = [defaultUser];
let orders = [...defaultOrders];
let quoteFields = [...defaultQuoteFields];
let quoteRequests = [...defaultQuoteRequests];

module.exports = {
  categories,
  products,
  users,
  orders,
  quoteFields,
  quoteRequests,
  defaultQuoteFields,
  defaultQuoteRequests
};

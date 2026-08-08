// Mock Categories Data for Threads & Co.

export const categories = [
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
      { id: 'men_jackets', name: 'Jackets', icon: 'snow' },
    ],
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
      { id: 'women_gowns', name: 'Gowns', icon: 'diamond' },
    ],
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
      { id: 'kids_nightwear', name: 'Nightwear', icon: 'moon' },
    ],
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
      { id: 'beauty_haircare', name: 'Haircare', icon: 'water' },
    ],
  },
];

/**
 * Get category by ID
 * @param {string} id - Category ID
 */
export const getCategoryById = (id) => {
  return categories.find((c) => c.id === id) || null;
};

/**
 * Get all subcategories for a given category
 * @param {string} categoryId - Category ID
 */
export const getSubcategories = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.subcategories : [];
};

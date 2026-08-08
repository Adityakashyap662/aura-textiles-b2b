import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { products } from '@/data/products';
import ProductCard from '@/components/common/ProductCard';
import AmazonFilterSheet from '@/components/common/AmazonFilterSheet';
import EmptyState from '@/components/common/EmptyState';

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'men', name: 'Men' },
  { id: 'women', name: 'Women' },
  { id: 'kids', name: 'Kids' },
  { id: 'beauty', name: 'Beauty' },
];

const ProductListingScreen = () => {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();

  // Route configurations
  const tag = params.tag || (params.category ? 'category' : 'trending');
  const screenTitle = useMemo(() => {
    if (params.title) return params.title;
    if (tag === 'trending') return 'Trending Now';
    if (tag === 'newest') return 'Just In';
    if (params.category) return params.category.charAt(0).toUpperCase() + params.category.slice(1);
    return 'Products';
  }, [params.title, tag, params.category]);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(params.category || 'all');

  // Sync category if parameters change
  useEffect(() => {
    if (params.category) {
      setSelectedCategory(params.category);
    } else if (params.tag) {
      setSelectedCategory('all');
    }
  }, [params.category, params.tag]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    sort: 'demanding',
    brands: [],
    minRating: 0,
    inStockOnly: false, // Show all by default so user sees out-of-stock items for notify demo
    priceMin: undefined,
    priceMax: undefined,
  });

  const filterBtnAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(filterBtnAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Tag Filtering (Trending, Just In, or Deals)
    if (tag === 'trending') {
      result = result.filter((p) => p.tags?.includes('trending'));
    } else if (tag === 'newest') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      result = result.filter((p) => new Date(p.created_at) >= thirtyDaysAgo);
    } else if (tag === 'deal') {
      result = result
        .filter((p) => p.discount && p.discount >= 45)
        .map((p) => {
          const charSum = p.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const hours = (charSum % 8) + 1;
          const minutes = charSum % 60;
          const dealEndsAt = Date.now() + (hours * 60 + minutes) * 60 * 1000;
          return { ...p, dealEndsAt };
        })
        .sort((a, b) => a.dealEndsAt - b.dealEndsAt);
    }

    // 2. Horizontal Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 3. Brands Multi-select Filter
    if (activeFilters.brands && activeFilters.brands.length > 0) {
      result = result.filter((p) => activeFilters.brands.includes(p.brand));
    }

    // 4. Rating Stars Filter
    if (activeFilters.minRating > 0) {
      result = result.filter((p) => p.rating >= activeFilters.minRating);
    }

    // 5. In Stock Only Filter
    if (activeFilters.inStockOnly) {
      result = result.filter((p) =>
        p.sizes.some((s) => s.stock > 0)
      );
    }

    // 6. Price Range Filter
    if (activeFilters.priceMin) {
      result = result.filter((p) => p.price >= activeFilters.priceMin);
    }
    if (activeFilters.priceMax) {
      result = result.filter((p) => p.price <= activeFilters.priceMax);
    }

    // 7. Sort Logic
    switch (activeFilters.sort) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'demanding' / popularity: Sort by reviewCount (most demanded/purchased)
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [tag, selectedCategory, activeFilters]);

  const handleProductPress = useCallback(
    (product) => {
      router.push(`/product/${product.id}`);
    },
    [router]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeFilters.sort !== 'demanding') count++;
    if (activeFilters.brands?.length > 0) count++;
    if (activeFilters.minRating > 0) count++;
    if (activeFilters.inStockOnly) count++;
    if (activeFilters.priceMin) count++;
    if (activeFilters.priceMax) count++;
    return count;
  }, [activeFilters]);

  // Render product item
  const renderProductItem = useCallback(
    ({ item }) => (
      <ProductCard
        product={item}
        onPress={handleProductPress}
        fullWidth={false}
        style={{
          width: (Dimensions.get('window').width - Spacing.lg * 3) / 2,
          marginRight: 0,
          marginBottom: Spacing.md,
        }}
      />
    ),
    [handleProductPress]
  );

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.surface,
            borderBottomColor: theme.borderLight,
            ...Shadow.sm,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {screenTitle}
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/search')}
          style={styles.searchButton}
        >
          <Ionicons name="search" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Category Horizontal Filter Bar */}
      <View
        style={[
          styles.categoryBar,
          {
            backgroundColor: theme.surface,
            borderBottomColor: theme.borderLight,
          },
        ]}
      >
        <FlatList
          horizontal
          data={CATEGORIES}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const active = selectedCategory === item.id;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item.id)}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: active ? theme.accent : theme.inputBg,
                    borderColor: active ? theme.accent : theme.border,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: active ? '#FFF' : theme.text },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Products list */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon="options-outline"
          title="No products match"
          subtitle="Try adjusting your filter settings or selected category to see items."
          actionLabel="Clear Filters"
          onAction={() =>
            setActiveFilters({
              sort: 'demanding',
              brands: [],
              minRating: 0,
              inStockOnly: false,
              priceMin: undefined,
              priceMax: undefined,
            })
          }
        />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          windowSize={5}
        />
      )}

      {/* Floating Filter FAB */}
      <Animated.View
        style={[
          styles.filterFabContainer,
          {
            transform: [
              {
                scale: filterBtnAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
            opacity: filterBtnAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.filterFab}
          onPress={() => setFilterVisible(true)}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[theme.accent, theme.accentOrange]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.filterFabGradient}
          >
            <Ionicons name="options" size={22} color="#FFFFFF" />
            {activeFilterCount > 0 && (
              <View style={styles.filterFabBadge}>
                <Text style={styles.filterFabBadgeText}>
                  {activeFilterCount}
                </Text>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Amazon style Filter Sheet */}
      <AmazonFilterSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(filters) => setActiveFilters(filters)}
        initialFilters={activeFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 56 : StatusBar.currentHeight + Spacing.sm,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...Typography.h3,
    fontSize: 18,
    textAlign: 'center',
  },
  categoryBar: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  categoryList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
  },
  categoryText: {
    ...Typography.bodySmMedium,
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: 100,
  },
  productCard: {
    marginRight: 0,
    width: '100%',
  },
  filterFabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  filterFab: {
    borderRadius: BorderRadius.round,
    ...Shadow.lg,
    shadowColor: '#E94560',
    shadowOpacity: 0.35,
  },
  filterFabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterFabBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterFabBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#E94560',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ProductListingScreen;

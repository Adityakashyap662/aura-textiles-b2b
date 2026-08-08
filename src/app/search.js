import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  Keyboard,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { products } from '@/data/products';
import { trendingSearches, recentSearches as defaultRecents } from '@/data/trendingSearches';
import { debounce } from '@/utils/debounce';
import ProductCard from '@/components/common/ProductCard';
import FilterSheet from '@/components/common/FilterSheet';
import EmptyState from '@/components/common/EmptyState';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SearchScreen = () => {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const inputRef = useRef(null);

  // State
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentList, setRecentList] = useState(defaultRecents.slice(0, 5));
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    sort: 'relevance',
    sizes: [],
    priceMin: undefined,
    priceMax: undefined,
  });

  // Animations
  const filterBtnAnim = useRef(new Animated.Value(0)).current;

  // Pre-filter from category param
  const categoryFilter = params.category || '';

  // Auto-focus search bar
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Animate filter button in
  useEffect(() => {
    Animated.spring(filterBtnAnim, {
      toValue: 1,
      useNativeDriver: true,
      delay: 600,
      tension: 50,
      friction: 8,
    }).start();
  }, []);

  // Apply initial sort/tag/category from params
  useEffect(() => {
    let initialFilters = { ...activeFilters };
    if (params.sort) {
      initialFilters.sort = params.sort;
      setActiveFilters(initialFilters);
    }
    
    if (params.tag) {
      setQuery(params.tag === 'trending' ? 'Trending Now' : 'Just In');
      performSearch('', initialFilters, params.tag);
    } else if (categoryFilter) {
      setQuery(categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1));
      performSearch('', initialFilters);
    }
  }, [params.tag, categoryFilter]);

  const performSearch = useCallback(
    (searchQuery, filters = activeFilters, overrideTag = null) => {
      const activeTag = overrideTag || params.tag;
      const q = searchQuery.toLowerCase().trim();
      
      // If we don't have enough query length AND we don't have a tag/category filter active
      if (q.length < 3 && !activeTag && !categoryFilter) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setHasSearched(true);

      let filtered = products.filter((p) => {
        // Tag filter (Trending or Just In/Newest)
        if (activeTag === 'trending') {
          if (!p.tags || !p.tags.includes('trending')) return false;
        } else if (activeTag === 'newest') {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          if (new Date(p.created_at) < thirtyDaysAgo) return false;
        }

        // Category filter
        const matchesCategory = categoryFilter
          ? p.category.toLowerCase() === categoryFilter.toLowerCase()
          : true;
        if (!matchesCategory) return false;

        // Query search matching (only if typed 3+ chars)
        if (q.length >= 3) {
          const matchesQuery =
            p.title.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)));
          if (!matchesQuery) return false;
        }

        return true;
      });

      // Apply size filter
      if (filters.sizes && filters.sizes.length > 0) {
        filtered = filtered.filter((p) =>
          p.sizes.some(
            (s) => filters.sizes.includes(s.size) && s.stock > 0
          )
        );
      }

      // Apply price filter
      if (filters.priceMin) {
        filtered = filtered.filter((p) => p.price >= filters.priceMin);
      }
      if (filters.priceMax) {
        filtered = filtered.filter((p) => p.price <= filters.priceMax);
      }

      // Sort
      switch (filters.sort) {
        case 'price_low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filtered.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          break;
        default:
          // relevance — sort by popularity (or rating)
          filtered.sort((a, b) => b.rating - a.rating);
          break;
      }

      setResults(filtered);
    },
    [activeFilters, categoryFilter, params.tag]
  );

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((q) => {
        performSearch(q);
      }, 500),
    [performSearch]
  );

  const handleChangeText = useCallback(
    (text) => {
      setQuery(text);
      if (text.trim().length >= 3) {
        debouncedSearch(text);
      } else {
        if (params.tag || categoryFilter) {
          performSearch('', activeFilters);
        } else {
          setResults([]);
          setHasSearched(false);
        }
      }
    },
    [debouncedSearch, performSearch, activeFilters, params.tag, categoryFilter]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    if (params.tag || categoryFilter) {
      performSearch('', activeFilters);
    } else {
      setResults([]);
      setHasSearched(false);
    }
    inputRef.current?.focus();
  }, [params.tag, categoryFilter, performSearch, activeFilters]);

  const handleSearchSubmit = useCallback(() => {
    if (query.trim().length >= 3) {
      debouncedSearch.cancel();
      performSearch(query);
      // Add to recent
      setRecentList((prev) => {
        const filtered = prev.filter(
          (r) => r.toLowerCase() !== query.trim().toLowerCase()
        );
        return [query.trim(), ...filtered].slice(0, 5);
      });
      Keyboard.dismiss();
    }
  }, [query, performSearch, debouncedSearch]);

  const handleRecentTap = useCallback(
    (term) => {
      setQuery(term);
      performSearch(term);
      Keyboard.dismiss();
    },
    [performSearch]
  );

  const removeRecent = useCallback((term) => {
    setRecentList((prev) => prev.filter((r) => r !== term));
  }, []);

  const handleTrendingTap = useCallback(
    (term) => {
      setQuery(term);
      performSearch(term);
      Keyboard.dismiss();
    },
    [performSearch]
  );

  const handleProductPress = useCallback(
    (product) => {
      router.push('/product/' + product.id);
    },
    [router]
  );

  const handleApplyFilters = useCallback(
    (filters) => {
      setActiveFilters(filters);
      performSearch(query, filters);
    },
    [query, performSearch]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeFilters.sort !== 'relevance') count++;
    if (activeFilters.sizes?.length > 0) count++;
    if (activeFilters.priceMin) count++;
    if (activeFilters.priceMax) count++;
    return count;
  }, [activeFilters]);

  const showSuggestions = !hasSearched && results.length === 0;

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

  const keyExtractor = useCallback((item) => item.id, []);

  // Render suggestions view
  const renderSuggestions = () => (
    <View style={styles.suggestionsContainer}>
      {/* Recent Searches */}
      {recentList.length > 0 && (
        <View style={styles.suggestSection}>
          <View style={styles.suggestHeader}>
            <View style={styles.suggestHeaderLeft}>
              <Ionicons
                name="time-outline"
                size={18}
                color={theme.textSecondary}
              />
              <Text
                style={[styles.suggestTitle, { color: theme.text }]}
              >
                Recent Searches
              </Text>
            </View>
          </View>
          {recentList.map((item, idx) => (
            <TouchableOpacity
              key={`recent-${idx}`}
              style={[
                styles.recentRow,
                { borderBottomColor: theme.borderLight },
              ]}
              onPress={() => handleRecentTap(item)}
              activeOpacity={0.7}
            >
              <View style={styles.recentLeft}>
                <Ionicons
                  name="arrow-up-outline"
                  size={16}
                  color={theme.textTertiary}
                  style={{
                    transform: [{ rotate: '45deg' }],
                    marginRight: Spacing.md,
                  }}
                />
                <Text
                  style={[styles.recentText, { color: theme.text }]}
                  numberOfLines={1}
                >
                  {item}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => removeRecent(item)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name="close"
                  size={16}
                  color={theme.textTertiary}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Trending Searches */}
      <View style={styles.suggestSection}>
        <View style={styles.suggestHeader}>
          <View style={styles.suggestHeaderLeft}>
            <Ionicons
              name="trending-up"
              size={18}
              color={theme.accent}
            />
            <Text
              style={[styles.suggestTitle, { color: theme.text }]}
            >
              Trending Searches
            </Text>
          </View>
        </View>
        <View style={styles.trendingGrid}>
          {trendingSearches.map((item, idx) => (
            <TouchableOpacity
              key={`trending-${idx}`}
              style={[
                styles.trendingChip,
                {
                  backgroundColor: isDark
                    ? 'rgba(233,69,96,0.1)'
                    : 'rgba(233,69,96,0.06)',
                  borderColor: isDark
                    ? 'rgba(233,69,96,0.25)'
                    : 'rgba(233,69,96,0.15)',
                },
              ]}
              onPress={() => handleTrendingTap(item)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="flame"
                size={12}
                color={theme.accent}
                style={{ marginRight: Spacing.xs }}
              />
              <Text
                style={[
                  styles.trendingChipText,
                  { color: theme.text },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Search Header */}
      <View
        style={[
          styles.searchHeader,
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
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>

        <View
          style={[
            styles.searchInputContainer,
            {
              backgroundColor: theme.inputBg,
              borderColor: query ? theme.accent : 'transparent',
            },
          ]}
        >
          <Ionicons
            name="search"
            size={18}
            color={theme.textTertiary}
            style={{ marginRight: Spacing.sm }}
          />
          <TextInput
            ref={inputRef}
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search for brands, products..."
            placeholderTextColor={theme.textTertiary}
            value={query}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={handleClear}
              style={styles.clearButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <View
                style={[
                  styles.clearIcon,
                  { backgroundColor: theme.textTertiary },
                ]}
              >
                <Ionicons name="close" size={12} color={theme.surface} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results count bar */}
      {hasSearched && results.length > 0 && (
        <View
          style={[
            styles.resultsBar,
            {
              backgroundColor: theme.surface,
              borderBottomColor: theme.borderLight,
            },
          ]}
        >
          <Text
            style={[styles.resultsCount, { color: theme.textSecondary }]}
          >
            {results.length} result{results.length !== 1 ? 's' : ''} for "
            {query}"
          </Text>
          {activeFilterCount > 0 && (
            <View
              style={[
                styles.activeFilterBadge,
                { backgroundColor: theme.accent },
              ]}
            >
              <Ionicons name="funnel" size={10} color="#FFF" />
              <Text style={styles.activeFilterBadgeText}>
                {activeFilterCount}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Content */}
      {showSuggestions ? (
        renderSuggestions()
      ) : hasSearched && results.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title={`No results for "${query}"`}
          subtitle="We couldn't find anything matching your search. Try checking your spelling or using different keywords."
          actionLabel="Clear Search"
          onAction={handleClear}
        />
      ) : (
        <FlatList
          data={results}
          renderItem={renderProductItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          windowSize={5}
        />
      )}

      {/* Floating Filter Button */}
      {hasSearched && (
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
            style={[styles.filterFab]}
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
      )}

      {/* Filter Sheet */}
      <FilterSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={handleApplyFilters}
        initialFilters={activeFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 56 : StatusBar.currentHeight + Spacing.sm,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    gap: Spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1.5,
  },
  searchInput: {
    flex: 1,
    ...Typography.bodySm,
    padding: 0,
    height: '100%',
  },
  clearButton: {
    marginLeft: Spacing.sm,
  },
  clearIcon: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  resultsCount: {
    ...Typography.caption,
  },
  activeFilterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.round,
    gap: 3,
  },
  activeFilterBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  suggestionsContainer: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  suggestSection: {
    marginBottom: Spacing.xxl,
  },
  suggestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  suggestHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  suggestTitle: {
    ...Typography.bodyMedium,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  recentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.md,
  },
  recentText: {
    ...Typography.bodySm,
    flex: 1,
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  trendingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
  },
  trendingChipText: {
    ...Typography.captionMedium,
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

export default SearchScreen;

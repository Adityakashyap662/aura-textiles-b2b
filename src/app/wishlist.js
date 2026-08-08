import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { products } from '@/data/products';
import { selectWishlist } from '@/store/userSlice';
import ProductCard from '@/components/common/ProductCard';
import EmptyState from '@/components/common/EmptyState';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const WishlistScreen = () => {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  
  // Get wishlisted IDs from Redux
  const wishlistIds = useSelector(selectWishlist) || [];

  // Filter products matching wishlisted IDs
  const wishlistedProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const handleProductPress = (product) => {
    router.push(`/product/${product.id}`);
  };

  const renderProductItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={handleProductPress}
      fullWidth={false}
      style={{
        width: (SCREEN_WIDTH - Spacing.lg * 3) / 2,
        marginRight: 0,
        marginBottom: Spacing.md,
      }}
    />
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
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          My Wishlist ({wishlistedProducts.length})
        </Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Wishlisted Grid List */}
      {wishlistedProducts.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="Your Wishlist is Empty"
          subtitle="Keep track of items you love. Click the heart icon on any product to save it here."
          actionLabel="Go Shopping"
          onAction={() => router.replace('/')}
        />
      ) : (
        <FlatList
          data={wishlistedProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
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
    borderBottomWidth: 1,
  },
  backButton: {
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
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default WishlistScreen;

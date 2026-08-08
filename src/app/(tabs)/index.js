import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { products } from '@/data/products';
import { selectCity, selectIsOnline, selectPincode } from '@/store/appSlice';
import { selectIsLoggedIn, selectDefaultAddress } from '@/store/userSlice';
import BannerCarousel from '@/components/common/BannerCarousel';
import CategoryGrid from '@/components/common/CategoryGrid';
import HorizontalProductList from '@/components/common/HorizontalProductList';
import PincodeModal from '@/components/common/PincodeModal';
import ErrorBanner from '@/components/common/ErrorBanner';
import SkeletonLoader, {
  SkeletonCard,
  SkeletonBanner,
  SkeletonCategory,
} from '@/components/common/SkeletonLoader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = Dimensions.get('window').height * 0.4;

// ── Skeleton Loading Screens ──
const SkeletonDashboard = ({ theme }) => (
  <View>
    {/* Banner Skeleton */}
    <View style={{ height: BANNER_HEIGHT }}>
      <SkeletonBanner />
    </View>

    {/* Category Skeleton */}
    <View style={skeletonStyles.categorySection}>
      <SkeletonLoader
        width={160}
        height={20}
        borderRadius={4}
        style={{ marginBottom: Spacing.lg, marginLeft: Spacing.lg }}
      />
      <View style={skeletonStyles.categoryRow}>
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCategory key={i} />
        ))}
      </View>
    </View>

    {/* Product Section Skeleton */}
    {[1, 2].map((section) => (
      <View key={section} style={skeletonStyles.productSection}>
        <SkeletonLoader
          width={140}
          height={20}
          borderRadius={4}
          style={{ marginBottom: Spacing.lg, marginLeft: Spacing.lg }}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: Spacing.lg }}
        >
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </ScrollView>
      </View>
    ))}
  </View>
);

// ── Main Dashboard Component ──
export default function DashboardScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const city = useSelector(selectCity);
  const pincode = useSelector(selectPincode);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const defaultAddress = useSelector(selectDefaultAddress);
  const isOnline = useSelector(selectIsOnline);

  const displayAddress = useMemo(() => {
    if (isLoggedIn && defaultAddress) {
      const parts = [];
      if (defaultAddress.street) parts.push(defaultAddress.street);
      if (defaultAddress.landmark) parts.push(defaultAddress.landmark);
      if (defaultAddress.city) parts.push(defaultAddress.city);
      if (defaultAddress.pincode) parts.push(defaultAddress.pincode);
      return parts.join(', ');
    }
    return `${city || 'Mumbai'} - ${pincode || '400001'}`;
  }, [isLoggedIn, defaultAddress, city, pincode]);

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pincodeModalVisible, setPincodeModalVisible] = useState(false);
  const [showErrorBanner, setShowErrorBanner] = useState(false);

  // Initial loading skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Monitor online status
  useEffect(() => {
    setShowErrorBanner(!isOnline);
  }, [isOnline]);

  // Trigger welcoming in-app push notification
  useEffect(() => {
    const pushTimer = setTimeout(() => {
      Toast.show({
        type: 'info',
        text1: 'Luxaen Club Privilege 👑',
        text2: 'Enjoy 15% off your first order! Use code LUXAEN15 at checkout.',
        position: 'top',
        visibilityTime: 4500,
      });
    }, 2000);

    return () => clearTimeout(pushTimer);
  }, []);

  // Filter products for "Trending Now"
  const trendingProducts = useMemo(
    () => products.filter((p) => p.tags?.includes('trending')).slice(0, 12),
    []
  );

  // Filter products for "Just In" (created in last 30 days)
  const justInProducts = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return products
      .filter((p) => new Date(p.created_at) >= thirtyDaysAgo)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 12);
  }, []);

  // Filter products for "Deals" (discount >= 45%) with stable ascending countdown timers
  const dealProducts = useMemo(() => {
    return products
      .filter((p) => p.discount && p.discount >= 45)
      .map((p) => {
        const charSum = p.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hours = (charSum % 8) + 1;
        const minutes = charSum % 60;
        const dealEndsAt = Date.now() + (hours * 60 + minutes) * 60 * 1000;
        return { ...p, dealEndsAt };
      })
      .sort((a, b) => a.dealEndsAt - b.dealEndsAt)
      .slice(0, 12);
  }, []);

  // Pull to refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Navigation handlers
  const handleProductPress = useCallback(
    (product) => {
      router.push(`/product/${product.id}`);
    },
    [router]
  );

  const handleSearchPress = useCallback(() => {
    router.push('/search');
  }, [router]);

  const handleTrendingViewAll = useCallback(() => {
    router.push({
      pathname: '/plp',
      params: { tag: 'trending', title: 'Trending Now' },
    });
  }, [router]);

  const handleJustInViewAll = useCallback(() => {
    router.push({
      pathname: '/plp',
      params: { tag: 'newest', title: 'Just In' },
    });
  }, [router]);

  const handleDealsViewAll = useCallback(() => {
    router.push({
      pathname: '/plp',
      params: { tag: 'deal', title: 'Deal of the Day' },
    });
  }, [router]);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* ── Sticky Top App Bar ── */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: theme.surface }}>
        <View
          style={[
            styles.appBar,
            {
              backgroundColor: theme.surface,
              borderBottomColor: theme.borderLight,
              ...Shadow.sm,
              shadowColor: theme.shadow,
            },
          ]}
        >
          {/* Luxaen Brand Logo */}
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="crown" size={18} color="#D4AF37" style={{ marginRight: 6 }} />
            <Text style={[styles.logoText, { color: theme.text }]}>L U X A E N</Text>
          </View>

          {/* Right actions */}
          <View style={styles.appBarActions}>
            {/* Search Icon */}
            <TouchableOpacity
              style={[
                styles.iconButton,
                { backgroundColor: theme.borderLight },
              ]}
              activeOpacity={0.7}
              onPress={handleSearchPress}
            >
              <Ionicons name="search" size={20} color={theme.text} />
            </TouchableOpacity>

            {/* Wishlist Heart Icon (Marked products) */}
            <TouchableOpacity
              style={[
                styles.iconButton,
                { backgroundColor: theme.borderLight },
              ]}
              activeOpacity={0.7}
              onPress={() => router.push('/wishlist')}
            >
              <Ionicons name="heart" size={20} color="#E94560" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Sub-Bar */}
        <TouchableOpacity
          style={[
            styles.locationSubBar,
            {
              backgroundColor: theme.inputBg,
              borderBottomColor: theme.borderLight,
            },
          ]}
          activeOpacity={0.75}
          onPress={() => setPincodeModalVisible(true)}
        >
          <Ionicons name="location-outline" size={14} color={theme.accent} style={{ marginRight: 6 }} />
          <View style={styles.locationTextContainer}>
            <Text style={[styles.locationSubBarText, { color: theme.textSecondary }]} numberOfLines={2}>
              Deliver to {displayAddress}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={12} color={theme.textTertiary} style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* ── Error Banner ── */}
      <ErrorBanner
        visible={showErrorBanner}
        onDismiss={() => setShowErrorBanner(false)}
      />

      {/* ── Scrollable Content ── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.accent}
            colors={[theme.accent]}
          />
        }
      >
        {isLoading ? (
          <SkeletonDashboard theme={theme} />
        ) : (
          <>
            {/* Banner Carousel */}
            <BannerCarousel />

            {/* Category Grid */}
            <CategoryGrid />

            {/* Divider */}
            <View
              style={[styles.divider, { backgroundColor: theme.borderLight }]}
            />

            {/* Deal of the Day */}
            <HorizontalProductList
              title="Deal of the Day"
              products={dealProducts}
              onViewAll={handleDealsViewAll}
              onProductPress={handleProductPress}
            />

            {/* Divider */}
            <View
              style={[styles.divider, { backgroundColor: theme.borderLight }]}
            />

            {/* Trending Now */}
            <HorizontalProductList
              title="Trending Now"
              subtitle="Most loved styles this week"
              products={trendingProducts}
              onViewAll={handleTrendingViewAll}
              onProductPress={handleProductPress}
            />

            {/* Divider */}
            <View
              style={[styles.divider, { backgroundColor: theme.borderLight }]}
            />

            {/* Just In */}
            <HorizontalProductList
              title="Just In"
              subtitle="Fresh arrivals you'll love"
              products={justInProducts}
              onViewAll={handleJustInViewAll}
              onProductPress={handleProductPress}
            />

            {/* Bottom spacer */}
            <View style={styles.bottomSpacer} />
          </>
        )}
      </ScrollView>

      {/* ── Pincode Modal ── */}
      <PincodeModal
        visible={pincodeModalVisible}
        onClose={() => setPincodeModalVisible(false)}
      />
    </View>
  );
}

// ── Styles ──
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 3,
  },
  locationSubBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  locationSubBarText: {
    ...Typography.bodySmMedium,
    fontSize: 12,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    ...Typography.tiny,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityText: {
    ...Typography.bodySmMedium,
    fontWeight: '600',
  },
  appBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  divider: {
    height: 8,
    marginHorizontal: 0,
  },
  bottomSpacer: {
    height: 100,
  },
});

// ── Skeleton Styles ──
const skeletonStyles = StyleSheet.create({
  categorySection: {
    paddingVertical: Spacing.xl,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
  },
  productSection: {
    paddingVertical: Spacing.xl,
  },
});

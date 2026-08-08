import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { getRecentOrders } from '@/data/orders';
import OrderCard from '@/components/common/OrderCard';

export default function OrdersScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();

  // Get orders list sorted by date (most recent first)
  const orders = useMemo(() => getRecentOrders(), []);

  const handleOrderPress = (order) => {
    router.push(`/order/${order.id}`);
  };

  const renderHeader = () => (
    <View style={[styles.header, { borderBottomColor: theme.borderLight }]}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.backButton, { backgroundColor: theme.surface }]}
        activeOpacity={0.7}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Ionicons name="arrow-back" size={22} color={theme.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: theme.text }]}>Your Orders</Text>
      <View style={{ width: 36 }} />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconCircle, { backgroundColor: theme.accent + '12' }]}>
        <Ionicons name="receipt-outline" size={48} color={theme.accent} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>No orders yet</Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        Once you place an order, it will appear here.
      </Text>
      <TouchableOpacity
        style={[styles.shopBtn, { backgroundColor: theme.accent }]}
        onPress={() => router.push('/(tabs)/')}
        activeOpacity={0.8}
      >
        <Text style={styles.shopBtnText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {renderHeader()}

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard order={item} onPress={handleOrderPress} />
        )}
        contentContainerStyle={orders.length === 0 ? styles.emptyListContent : styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    ...Shadow.sm,
  },
  headerTitle: {
    ...Typography.h4,
    fontWeight: '700',
  },
  listContent: {
    paddingVertical: Spacing.lg,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxxl,
    paddingBottom: 60,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  emptyTitle: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    ...Typography.bodySm,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    lineHeight: 20,
  },
  shopBtn: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Shadow.sm,
  },
  shopBtnText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
});

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { formatPrice } from '@/utils/formatPrice';

const STATUS_CONFIG = {
  Processing: { color: '#F59E0B', bg: '#FEF3C7', icon: 'time-outline', label: 'Processing' },
  Shipped: { color: '#3B82F6', bg: '#DBEAFE', icon: 'airplane-outline', label: 'Shipped' },
  Delivered: { color: '#10B981', bg: '#D1FAE5', icon: 'checkmark-circle-outline', label: 'Delivered' },
};

const OrderCard = ({ order, onPress }) => {
  const { theme, isDark } = useTheme();

  const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.Processing;

  const formattedDate = useMemo(() => {
    const d = new Date(order.date);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }, [order.date]);

  const itemCount = useMemo(
    () => order.items.reduce((sum, item) => sum + item.quantity, 0),
    [order.items]
  );

  const thumbnails = useMemo(() => order.items.slice(0, 3), [order.items]);

  return (
    <TouchableOpacity
      onPress={() => onPress?.(order)}
      activeOpacity={0.7}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.borderLight }, Shadow.md]}
    >
      {/* Header row */}
      <View style={styles.headerRow}>
        <View style={styles.orderInfo}>
          <Text style={[styles.orderId, { color: theme.text }]}>#{order.id}</Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>{formattedDate}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: isDark ? statusConfig.color + '20' : statusConfig.bg },
        ]}>
          <Ionicons name={statusConfig.icon} size={13} color={statusConfig.color} />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      {/* Items preview */}
      <View style={styles.itemsRow}>
        <View style={styles.thumbnailRow}>
          {thumbnails.map((item, index) => (
            <View
              key={index}
              style={[
                styles.thumbnail,
                { borderColor: theme.borderLight, backgroundColor: theme.background },
                index > 0 && { marginLeft: -8 },
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.thumbnailImage} />
            </View>
          ))}
          {order.items.length > 3 && (
            <View
              style={[
                styles.thumbnail,
                styles.moreBadge,
                { borderColor: theme.borderLight, backgroundColor: theme.surface },
                { marginLeft: -8 },
              ]}
            >
              <Text style={[styles.moreText, { color: theme.textSecondary }]}>
                +{order.items.length - 3}
              </Text>
            </View>
          )}
        </View>

        <Text style={[styles.itemCount, { color: theme.textSecondary }]}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </Text>
      </View>

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: theme.borderLight }]}>
        <Text style={[styles.totalLabel, { color: theme.textSecondary }]}>Total</Text>
        <View style={styles.footerRight}>
          <Text style={[styles.totalAmount, { color: theme.text }]}>
            {formatPrice(order.totalAmount)}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={theme.textTertiary}
            style={{ marginLeft: Spacing.sm }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    ...Typography.bodySmMedium,
    fontWeight: '700',
    marginBottom: Spacing.xxs,
  },
  date: {
    ...Typography.caption,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 1,
    borderRadius: BorderRadius.round,
    gap: Spacing.xs,
  },
  statusText: {
    ...Typography.captionMedium,
    fontWeight: '600',
  },
  itemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  thumbnailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  moreBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {
    ...Typography.captionMedium,
    fontSize: 11,
  },
  itemCount: {
    ...Typography.caption,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
  },
  totalLabel: {
    ...Typography.bodySm,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalAmount: {
    ...Typography.priceSm,
  },
});

export default React.memo(OrderCard);

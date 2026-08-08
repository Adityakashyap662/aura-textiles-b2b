import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { BorderRadius, Shadow, Spacing } from '@/theme/spacing';
import { formatPrice, calculateDiscount } from '@/utils/formatPrice';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 160;

const ProductCard = ({ product, onPress, style, fullWidth = false }) => {
  const { theme } = useTheme();
  const discount = useMemo(() => calculateDiscount(product.mrp, product.price), [product.mrp, product.price]);

  const cardWidth = fullWidth ? width - Spacing.lg * 2 : CARD_WIDTH;

  const isOutOfStock = useMemo(() => {
    return !product.sizes || product.sizes.every(s => s.stock === 0);
  }, [product.sizes]);

  const [timeLeft, setTimeLeft] = React.useState('');
  const [isPreviewVisible, setIsPreviewVisible] = React.useState(false);

  React.useEffect(() => {
    if (!product.dealEndsAt) return;

    const updateTimer = () => {
      const diff = product.dealEndsAt - Date.now();
      if (diff <= 0) {
        setTimeLeft('Ended');
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const hStr = hours.toString().padStart(2, '0');
      const mStr = minutes.toString().padStart(2, '0');
      const sStr = seconds.toString().padStart(2, '0');
      setTimeLeft(`${hStr}h ${mStr}m ${sStr}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [product.dealEndsAt]);

  const handleNotifyPress = (e) => {
    e.stopPropagation();
    Toast.show({
      type: 'info',
      text1: 'Notification Set! 🔔',
      text2: `We'll alert you when ${product.title} returns to stock.`,
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress && onPress(product)}
        onLongPress={() => setIsPreviewVisible(true)}
        onPressOut={() => setIsPreviewVisible(false)}
        delayLongPress={300}
        style={[
          styles.card,
          {
            width: cardWidth,
            backgroundColor: theme.card,
            ...Shadow.md,
            shadowColor: theme.shadow,
          },
          style,
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.images?.[0] || 'https://picsum.photos/seed/default/400/500' }}
            style={[styles.image, fullWidth && styles.fullWidthImage, isOutOfStock && { opacity: 0.6 }]}
            resizeMode="cover"
          />
          {discount > 0 && !isOutOfStock && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          )}
          {product.dealEndsAt && !isOutOfStock && timeLeft !== 'Ended' && (
            <View style={styles.dealTimerOverlay}>
              <Ionicons name="time" size={10} color="#FFFFFF" style={{ marginRight: 2 }} />
              <Text style={styles.dealTimerText}>{timeLeft}</Text>
            </View>
          )}
          {isOutOfStock && (
            <View style={styles.oosBadge}>
              <Text style={styles.oosText}>OUT OF STOCK</Text>
            </View>
          )}
          {isOutOfStock && (
            <TouchableOpacity
              style={styles.notifyBellBtn}
              onPress={handleNotifyPress}
              activeOpacity={0.8}
            >
              <Ionicons name="notifications-outline" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.info}>
          <Text style={[styles.brand, { color: theme.textSecondary }]} numberOfLines={1}>
            {product.brand}
          </Text>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {product.title}
          </Text>

          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Ionicons name="star" size={10} color="#FFD700" />
            </View>
            <Text style={[styles.reviewCount, { color: theme.textTertiary }]}>
              ({product.reviewCount})
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: theme.text }]}>
              {formatPrice(product.price)}
            </Text>
            {product.mrp > product.price && (
              <Text style={[styles.mrp, { color: theme.priceOriginal }]}>
                {formatPrice(product.mrp)}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isPreviewVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPreviewVisible(false)}
      >
        <View style={styles.previewBackdrop}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.previewDismissArea}
            onPressOut={() => setIsPreviewVisible(false)}
          >
            <View style={[styles.previewCard, { backgroundColor: theme.card }]}>
              {/* Product Variant Image */}
              <Image
                source={{ uri: product.images?.[0] }}
                style={styles.previewImage}
                contentFit="cover"
              />
              <View style={styles.previewInfo}>
                <Text style={[styles.previewBrand, { color: theme.accent }]} numberOfLines={1}>
                  {product.brand}
                </Text>
                <Text style={[styles.previewTitle, { color: theme.text }]} numberOfLines={1}>
                  {product.title}
                </Text>
                <View style={styles.previewPriceRow}>
                  <Text style={[styles.previewPrice, { color: theme.text }]}>
                    {formatPrice(product.price)}
                  </Text>
                  {product.mrp > product.price && (
                    <Text style={[styles.previewMrp, { color: theme.priceOriginal }]}>
                      {formatPrice(product.mrp)}
                    </Text>
                  )}
                  {discount > 0 && (
                    <Text style={[styles.previewDiscount, { color: theme.success }]}>
                      ({discount}% OFF)
                    </Text>
                  )}
                </View>
                <View style={styles.previewRatingRow}>
                  <Ionicons name="star" size={14} color="#FFD700" style={{ marginRight: 2 }} />
                  <Text style={[styles.previewRatingValue, { color: theme.text }]}>
                    {product.rating} ({product.reviewCount} reviews)
                  </Text>
                </View>
              </View>
              {/* Peek Hint/Footer */}
              <View style={[styles.previewFooter, { borderTopColor: theme.borderLight }]}>
                <Ionicons name="eye-outline" size={16} color={theme.textSecondary} />
                <Text style={[styles.previewFooterText, { color: theme.textSecondary }]}>
                  Release to close preview
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginRight: Spacing.md,
    marginBottom: Spacing.md,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 1.2,
  },
  fullWidthImage: {
    height: 220,
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: '#E94560',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.xs,
  },
  discountText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  info: {
    padding: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  brand: {
    ...Typography.captionMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    ...Typography.bodySmMedium,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: Spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(40, 167, 69, 0.1)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    gap: 2,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#28A745',
  },
  reviewCount: {
    ...Typography.tiny,
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    ...Typography.priceSm,
    fontSize: 15,
  },
  mrp: {
    ...Typography.caption,
    textDecorationLine: 'line-through',
  },
  oosBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.xs,
  },
  oosText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  notifyBellBtn: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: '#2196F3',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  dealTimerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(233, 69, 96, 0.85)',
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dealTimerText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  // Instagram Preview Peek
  previewBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewDismissArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewCard: {
    width: width * 0.85,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    elevation: 24,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  previewImage: {
    width: '100%',
    height: width * 0.85,
  },
  previewInfo: {
    padding: Spacing.md,
  },
  previewBrand: {
    ...Typography.captionMedium,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  previewTitle: {
    ...Typography.bodyMedium,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  previewPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 8,
  },
  previewPrice: {
    ...Typography.priceSm,
    fontSize: 17,
    fontWeight: '800',
  },
  previewMrp: {
    ...Typography.caption,
    textDecorationLine: 'line-through',
    fontSize: 13,
  },
  previewDiscount: {
    fontSize: 12,
    fontWeight: '700',
  },
  previewRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  previewRatingValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  previewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  previewFooterText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default ProductCard;

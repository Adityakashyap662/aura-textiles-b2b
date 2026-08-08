import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { addReview } from '@/store/reviewsSlice';

import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { formatPrice } from '@/utils/formatPrice';
import { getOrderById } from '@/data/orders';
import { addToCart } from '@/store/cartSlice';
import TrackingTimeline from '@/components/common/TrackingTimeline';

export default function OrderDetailScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();

  const userProfile = useSelector((state) => state.user.profile);

  // Review States
  const [isReviewModalVisible, setIsReviewModalVisible] = React.useState(false);
  const [reviewingItem, setReviewingItem] = React.useState(null);
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState('');

  const order = useMemo(() => getOrderById(id), [id]);

  const handleWriteReview = (item) => {
    setReviewingItem(item);
    setRating(5);
    setComment('');
    setIsReviewModalVisible(true);
  };

  const handleSubmitReview = () => {
    if (!comment.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Review Required',
        text2: 'Please write a brief comment about the product.',
        visibilityTime: 2000,
      });
      return;
    }

    dispatch(
      addReview({
        productId: reviewingItem.productId,
        rating: rating,
        comment: comment.trim(),
        userName: userProfile?.name || 'Verified Buyer',
      })
    );

    setIsReviewModalVisible(false);
    Toast.show({
      type: 'success',
      text1: 'Review Submitted! ★★★★★',
      text2: 'Thank you for your feedback!',
      visibilityTime: 2500,
    });
  };

  const formattedDate = useMemo(() => {
    if (!order) return '';
    const d = new Date(order.date);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }, [order]);

  const handleBuyAgain = (item) => {
    dispatch(
      addToCart({
        productId: item.productId,
        title: item.title,
        image: item.image,
        size: item.size,
        color: item.color,
        price: item.price,
        maxStock: item.maxStock || 10,
        quantity: 1,
      })
    );
    Toast.show({
      type: 'success',
      text1: 'Added to cart!',
      text2: `${item.title} added successfully.`,
      visibilityTime: 2000,
    });
  };

  if (!order) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={theme.error} />
          <Text style={[styles.errorTitle, { color: theme.text }]}>Order Not Found</Text>
          <Text style={[styles.errorSubtitle, { color: theme.textSecondary }]}>
            We couldn't retrieve the details for order ID: {id}
          </Text>
          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: theme.accent }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const statusColors = {
    Processing: { text: theme.warning, bg: theme.warning + '15' },
    Shipped: { text: theme.primary, bg: theme.primary + '15' },
    Delivered: { text: theme.success, bg: theme.success + '15' },
  };
  const statusColor = statusColors[order.status] || { text: theme.textSecondary, bg: theme.borderLight };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.borderLight }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.headerBtn, { backgroundColor: theme.surface }]}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Order Details</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Order Info Card */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.borderLight }]}>
          <View style={styles.orderIdRow}>
            <View>
              <Text style={[styles.orderIdLabel, { color: theme.textTertiary }]}>ORDER ID</Text>
              <Text style={[styles.orderIdText, { color: theme.text }]}>#{order.id}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
              <Text style={[styles.statusText, { color: statusColor.text }]}>{order.status}</Text>
            </View>
          </View>
          <Text style={[styles.orderDate, { color: theme.textSecondary }]}>Placed on {formattedDate}</Text>
        </View>

        {/* Tracking Timeline */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.borderLight }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Tracking Status</Text>
          <TrackingTimeline timeline={order.trackingTimeline} />
        </View>

        {/* Ordered Items & Buy Again */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.borderLight }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Items in this Order</Text>
          {order.items.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.itemRow,
                idx < order.items.length - 1 && { borderBottomColor: theme.borderLight },
              ]}
            >
              <TouchableOpacity
                style={styles.itemMeta}
                activeOpacity={0.7}
                onPress={() => router.push(`/product/${item.productId}`)}
              >
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={[styles.itemTitle, { color: theme.text }]} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={[styles.itemVariant, { color: theme.textSecondary }]}>
                    Size: {item.size} · Color: {item.color}
                  </Text>
                  <Text style={[styles.itemQtyPrice, { color: theme.textSecondary }]}>
                    Qty: {item.quantity} · {formatPrice(item.price)}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Actions Row */}
              <View style={styles.itemActionsRow}>
                <TouchableOpacity
                  onPress={() => handleBuyAgain(item)}
                  activeOpacity={0.8}
                  style={[styles.buyAgainBtn, { backgroundColor: theme.success }]}
                >
                  <Ionicons name="cart-outline" size={16} color="#FFFFFF" />
                  <Text style={styles.buyAgainText}>BUY AGAIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleWriteReview(item)}
                  activeOpacity={0.8}
                  style={[styles.writeReviewBtn, { borderColor: theme.borderLight }]}
                >
                  <Ionicons name="star-outline" size={16} color={theme.text} />
                  <Text style={[styles.writeReviewText, { color: theme.text }]}>WRITE REVIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Shipping Address */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.borderLight }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Shipping Address</Text>
          <View style={styles.addressContainer}>
            <Text style={[styles.addressName, { color: theme.text }]}>
              {order.shippingAddress.name}
            </Text>
            <Text style={[styles.addressText, { color: theme.textSecondary }]}>
              {order.shippingAddress.phone}
            </Text>
            <Text style={[styles.addressText, { color: theme.textSecondary }]}>
              {order.shippingAddress.addressLine1 || order.shippingAddress.street}
              {order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}
              {order.shippingAddress.landmark ? ` (${order.shippingAddress.landmark})` : ''}
            </Text>
            <Text style={[styles.addressText, { color: theme.textSecondary }]}>
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </Text>
          </View>
        </View>

        {/* Order Payment Summary */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.borderLight }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Payment Information</Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Payment Method</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>{order.paymentMethod || 'COD'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Subtotal</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              {formatPrice(order.totalAmount - (order.totalAmount > 999 ? 0 : 50))}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Delivery Charge</Text>
            <Text style={[styles.summaryValue, { color: order.totalAmount > 999 ? theme.success : theme.text }]}>
              {order.totalAmount > 999 ? 'FREE' : formatPrice(50)}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.borderLight }]} />
          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>Total Amount</Text>
            <Text style={[styles.totalValue, { color: theme.text }]}>{formatPrice(order.totalAmount)}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Review Submission Modal */}
      <Modal
        visible={isReviewModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsReviewModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsReviewModalVisible(false)}>
          <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[styles.modalContent, { backgroundColor: theme.card, borderColor: theme.borderLight }]}
              >
                <View style={[styles.modalDragIndicator, { backgroundColor: theme.borderLight }]} />
                
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: theme.text }]}>Write a Review</Text>
                  <TouchableOpacity onPress={() => setIsReviewModalVisible(false)} style={styles.modalCloseBtn}>
                    <Ionicons name="close" size={24} color={theme.textSecondary} />
                  </TouchableOpacity>
                </View>

                {reviewingItem && (
                  <View style={styles.modalProductInfo}>
                    <Image source={{ uri: reviewingItem.image }} style={styles.modalProductImage} />
                    <Text style={[styles.modalProductTitle, { color: theme.text }]} numberOfLines={2}>
                      {reviewingItem.title}
                    </Text>
                  </View>
                )}

                {/* Stars selector */}
                <Text style={[styles.modalLabel, { color: theme.textSecondary }]}>Product Rating</Text>
                <View style={styles.modalStarsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setRating(star)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={star <= rating ? 'star' : 'star-outline'}
                        size={36}
                        color="#F59E0B"
                        style={{ marginHorizontal: Spacing.xs }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Review Text comment */}
                <Text style={[styles.modalLabel, { color: theme.textSecondary, marginTop: Spacing.md }]}>
                  Your Review
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      backgroundColor: theme.inputBg || theme.background,
                      color: theme.text,
                      borderColor: theme.borderLight,
                    },
                  ]}
                  placeholder="Tell us what you liked or disliked about this product..."
                  placeholderTextColor={theme.textTertiary}
                  multiline
                  numberOfLines={4}
                  value={comment}
                  onChangeText={setComment}
                  textAlignVertical="top"
                />

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSubmitReview}
                  style={styles.modalSubmitBtn}
                >
                  <LinearGradient
                    colors={[theme.gradientStart, theme.gradientEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.modalSubmitGradient}
                  >
                    <Text style={styles.modalSubmitText}>Submit Review</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  headerBtn: {
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
  scrollContent: {
    paddingVertical: Spacing.lg,
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  orderIdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  orderIdLabel: {
    ...Typography.tiny,
    letterSpacing: 1,
    fontWeight: '600',
  },
  orderIdText: {
    ...Typography.h4,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round,
  },
  statusText: {
    ...Typography.captionMedium,
    fontWeight: '600',
  },
  orderDate: {
    ...Typography.caption,
  },
  sectionTitle: {
    ...Typography.bodyMedium,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  itemRow: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.md,
  },
  itemMeta: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 60,
    height: 76,
    borderRadius: BorderRadius.xs,
    marginRight: Spacing.md,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    ...Typography.bodySmMedium,
    marginBottom: Spacing.xxs,
  },
  itemVariant: {
    ...Typography.caption,
    marginBottom: Spacing.xxs,
  },
  itemQtyPrice: {
    ...Typography.captionMedium,
  },
  buyAgainBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    gap: Spacing.sm,
  },
  buyAgainText: {
    ...Typography.buttonSm,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  itemActionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  writeReviewBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    borderWidth: 1.5,
    gap: Spacing.sm,
  },
  writeReviewText: {
    ...Typography.buttonSm,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  modalDragIndicator: {
    width: 36,
    height: 4,
    borderRadius: BorderRadius.xs,
    alignSelf: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  modalTitle: {
    ...Typography.h4,
    fontWeight: '700',
  },
  modalCloseBtn: {
    padding: Spacing.xs,
  },
  modalProductInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    padding: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: BorderRadius.md,
  },
  modalProductImage: {
    width: 48,
    height: 60,
    borderRadius: BorderRadius.xs,
    marginRight: Spacing.md,
  },
  modalProductTitle: {
    flex: 1,
    ...Typography.bodySmMedium,
    fontSize: 13,
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  modalStarsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: Spacing.sm,
  },
  modalInput: {
    height: 100,
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Typography.bodySm,
    fontSize: 14,
    marginBottom: Spacing.lg,
  },
  modalSubmitBtn: {
    height: 48,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  modalSubmitGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubmitText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  addressContainer: {
    gap: Spacing.xs,
  },
  addressName: {
    ...Typography.bodySmMedium,
    fontWeight: '600',
  },
  addressText: {
    ...Typography.bodySm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    ...Typography.bodySm,
  },
  summaryValue: {
    ...Typography.bodySmMedium,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.sm,
  },
  totalLabel: {
    ...Typography.bodyMedium,
    fontWeight: '700',
  },
  totalValue: {
    ...Typography.price,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxxl,
  },
  errorTitle: {
    ...Typography.h3,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  errorSubtitle: {
    ...Typography.bodySm,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  backBtn: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  backBtnText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
});

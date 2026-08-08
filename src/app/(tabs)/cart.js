import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
  StatusBar,
  Switch,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { formatPrice } from '@/utils/formatPrice';
import {
  selectCartItems,
  selectCartItemCount,
  selectCartSubtotal,
  selectDeliveryCharge,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from '@/store/cartSlice';
import { selectIsLoggedIn, selectDefaultAddress, selectUserProfile, setCredits } from '@/store/userSlice';
import { checkDelivery } from '@/utils/validators';
import { api } from '@/utils/api';
import QuantityStepper from '@/components/common/QuantityStepper';

export default function CartScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);
  const subtotal = useSelector(selectCartSubtotal);
  const deliveryCharge = useSelector(selectDeliveryCharge);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const defaultAddress = useSelector(selectDefaultAddress);
  const profile = useSelector(selectUserProfile);

  const [useCredits, setUseCredits] = useState(false);

  const creditsDiscount = useMemo(() => {
    if (!useCredits || !isLoggedIn || !profile) return 0;
    return Math.min(profile.credits || 0, subtotal + deliveryCharge);
  }, [useCredits, isLoggedIn, profile, subtotal, deliveryCharge]);

  const payableTotal = useMemo(() => {
    return subtotal + deliveryCharge - creditsDiscount;
  }, [subtotal, deliveryCharge, creditsDiscount]);

  const deliveryEstimateDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3); // 3 days delivery window
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  }, []);

  const freeDelivery = deliveryCharge === 0;

  const handleRemoveItem = useCallback(
    (item) => {
      Alert.alert(
        'Remove Item',
        `Remove "${item.title}" from your cart?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => {
              dispatch(removeFromCart(item.id));
              Toast.show({
                type: 'info',
                text1: 'Item removed',
                text2: `${item.title} was removed from your cart`,
                visibilityTime: 2000,
              });
            },
          },
        ]
      );
    },
    [dispatch]
  );

  const completeOrder = useCallback(() => {
    const newOrder = {
      id: `ord_${Math.floor(1000 + Math.random() * 9000)}`,
      userEmail: profile.email,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
      total: payableTotal,
      status: 'Pending',
      items: items.map(i => ({
        id: i.id,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        selectedSize: i.size,
        selectedColor: i.color
      })),
      shippingAddress: defaultAddress,
      paymentMethod: { type: 'COD', details: 'Cash on Delivery' },
      discountApplied: creditsDiscount
    };

    api.placeOrder(newOrder).then(() => {
      api.getUser(profile.email).then(freshUser => {
        if (freshUser) dispatch(setCredits(freshUser.credits || 0));
      }).catch(() => {
        dispatch(setCredits(Math.max(0, (profile.credits || 0) - creditsDiscount)));
      });
    }).catch(() => {
      dispatch(setCredits(Math.max(0, (profile.credits || 0) - creditsDiscount)));
    });

    dispatch(clearCart());
    setUseCredits(false);
    Toast.show({
      type: 'success',
      text1: 'Order placed successfully! 🎉',
      text2: `Order ${newOrder.id} has been created.`,
      visibilityTime: 3000,
    });
    router.push('/(tabs)/');
  }, [dispatch, router, payableTotal, items, defaultAddress, creditsDiscount, profile]);

  const handlePlaceOrder = useCallback(() => {
    if (!isLoggedIn) {
      router.push({
        pathname: '/login',
        params: { redirect: 'cart' },
      });
      return;
    }

    if (defaultAddress) {
      const countryName = defaultAddress.state || 'India';
      const deliveryCheck = checkDelivery(defaultAddress.pincode, countryName);
      if (!deliveryCheck.available) {
        Toast.show({
          type: 'error',
          text1: 'Delivery Unavailable',
          text2: `Cannot deliver to ${defaultAddress.pincode} (${deliveryCheck.message}).`,
          visibilityTime: 4000,
        });
        return;
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Address Required',
        text2: 'Please add a shipping address in your Account screen first.',
        visibilityTime: 3500,
      });
      return;
    }

    completeOrder();
  }, [isLoggedIn, defaultAddress, router, completeOrder]);





  // Empty State
  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconCircle, { backgroundColor: theme.accent + '12' }]}>
            <Ionicons name="bag-outline" size={64} color={theme.accent} />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>Your Cart Empty</Text>
          <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
            Looks like you have not added anything to your cart yet.
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/')}
            activeOpacity={0.85}
            style={styles.startShoppingWrapper}
          >
            <LinearGradient
              colors={[theme.gradientStart, theme.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.startShoppingBtn}
            >
              <Ionicons name="storefront-outline" size={20} color="#FFF" style={{ marginRight: Spacing.sm }} />
              <Text style={styles.startShoppingText}>Start Shopping</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.borderLight }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Cart</Text>
        <Text style={[styles.headerBadge, { color: theme.accent }]}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </Text>
      </View>

      {/* Cart Items */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <View
            key={item.id}
            style={[styles.cartCard, { backgroundColor: theme.card, borderColor: theme.borderLight }, Shadow.sm]}
          >
            {/* Delete button */}
            <TouchableOpacity
              style={[styles.deleteBtn, { backgroundColor: theme.error + '12' }]}
              onPress={() => handleRemoveItem(item)}
              hitSlop={8}
            >
              <Ionicons name="trash-outline" size={14} color={theme.error} />
            </TouchableOpacity>

            {/* Thumbnail */}
            <View style={[styles.imageContainer, { backgroundColor: theme.background }]}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
            </View>

            {/* Info */}
            <View style={styles.itemInfo}>
              <Text style={[styles.itemTitle, { color: theme.text }]} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={[styles.itemVariant, { color: theme.textSecondary }]}>
                {[item.color, item.size].filter(Boolean).join(' · ')}
              </Text>
              <Text style={[styles.itemPrice, { color: theme.text }]}>
                {formatPrice(item.price)}
              </Text>

              {/* Quantity Stepper */}
              <View style={styles.stepperRow}>
                <QuantityStepper
                  quantity={item.quantity}
                  maxStock={item.maxStock || 10}
                  onIncrement={() => dispatch(incrementQuantity(item.id))}
                  onDecrement={() => dispatch(decrementQuantity(item.id))}
                  onRemove={() => handleRemoveItem(item)}
                />
                <Text style={[styles.lineTotal, { color: theme.textSecondary }]}>
                  {item.quantity > 1 ? formatPrice(item.price * item.quantity) : ''}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* Free delivery nudge */}
        {!freeDelivery && (
          <View style={[styles.nudge, { backgroundColor: theme.accent + '10', borderColor: theme.accent + '30' }]}>
            <Ionicons name="bicycle-outline" size={18} color={theme.accent} />
            <Text style={[styles.nudgeText, { color: theme.accent }]}>
              Add {formatPrice(999 - subtotal)} more for <Text style={{ fontWeight: '700' }}>FREE delivery</Text>
            </Text>
          </View>
        )}

        {/* Amazon-style Delivery Info Card */}
        <View style={[styles.deliveryCard, { backgroundColor: theme.card, borderColor: theme.borderLight }, Shadow.sm]}>
          {/* Address Section */}
          <View style={styles.deliveryRow}>
            <View style={[styles.deliveryIconCircle, { backgroundColor: theme.accent + '15' }]}>
              <Ionicons name="location-outline" size={20} color={theme.accent} />
            </View>
            <View style={styles.deliveryDetails}>
              <Text style={[styles.deliveryLabel, { color: theme.textSecondary }]}>Deliver to</Text>
              {isLoggedIn ? (
                defaultAddress ? (
                  <Text style={[styles.deliveryValue, { color: theme.text }]} numberOfLines={1}>
                    {defaultAddress.name} - {defaultAddress.street}, {defaultAddress.city} {defaultAddress.pincode}
                  </Text>
                ) : (
                  <Text style={[styles.deliveryValue, { color: theme.text }]}>No address added yet</Text>
                )
              ) : (
                <Text style={[styles.deliveryValue, { color: theme.textSecondary }]}>Sign in to add address</Text>
              )}
            </View>
            {isLoggedIn ? (
              <TouchableOpacity
                onPress={() => router.push('/addresses')}
                activeOpacity={0.7}
                style={styles.changeAddressBtn}
              >
                <Text style={[styles.changeAddressText, { color: theme.accent }]}>Change</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => router.push({ pathname: '/login', params: { redirect: 'cart' } })}
                activeOpacity={0.7}
                style={styles.changeAddressBtn}
              >
                <Text style={[styles.changeAddressText, { color: theme.accent }]}>Log In</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={[styles.cardDivider, { backgroundColor: theme.borderLight }]} />

          {/* Delivery Date Section */}
          <View style={styles.deliveryRow}>
            <View style={[styles.deliveryIconCircle, { backgroundColor: theme.success + '15' }]}>
              <Ionicons name="calendar-outline" size={20} color={theme.success} />
            </View>
            <View style={styles.deliveryDetails}>
              <Text style={[styles.deliveryLabel, { color: theme.textSecondary }]}>Expected Delivery</Text>
              <Text style={[styles.deliveryValue, { color: theme.text, fontWeight: '700' }]}>
                {deliveryEstimateDate}
              </Text>
            </View>
            <View style={styles.deliverySpeedBadge}>
              <Text style={styles.deliverySpeedText}>FASTEST</Text>
            </View>
          </View>
        </View>

        {/* Loyalty Credits Apply Card */}
        {isLoggedIn && (profile.credits || 0) > 0 && (
          <View style={[styles.deliveryCard, { backgroundColor: theme.card, borderColor: theme.borderLight, marginTop: 12 }, Shadow.sm]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
                <View style={[styles.deliveryIconCircle, { backgroundColor: '#D4AF3715' }]}>
                  <Ionicons name="gift-outline" size={20} color="#D4AF37" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.deliveryLabel, { color: theme.textSecondary }]}>Loyalty Discount</Text>
                  <Text style={[styles.deliveryValue, { color: theme.text }]} numberOfLines={1}>
                    Apply {profile.credits} credits to save ₹{Math.min(profile.credits, subtotal + deliveryCharge)}
                  </Text>
                </View>
              </View>
              <Switch 
                value={useCredits}
                onValueChange={setUseCredits}
                trackColor={{ false: theme.border, true: '#D4AF37' }}
                thumbColor="#FFF"
              />
            </View>
          </View>
        )}

        {/* Spacer for sticky bottom */}
        <View style={{ height: 220 }} />
      </ScrollView>

      {/* Sticky Bottom Summary */}
      <View style={[styles.summaryContainer, { backgroundColor: theme.card, borderTopColor: theme.borderLight }, Shadow.lg]}>
        {/* Summary rows */}
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>{formatPrice(subtotal)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Delivery Charges</Text>
          {freeDelivery ? (
            <View style={styles.freeDeliveryRow}>
              <Text style={[styles.strikeThrough, { color: theme.textTertiary }]}>₹50</Text>
              <Text style={[styles.freeText, { color: theme.success }]}>FREE</Text>
            </View>
          ) : (
            <Text style={[styles.summaryValue, { color: theme.text }]}>{formatPrice(deliveryCharge)}</Text>
          )}
        </View>

        {useCredits && creditsDiscount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: '#D4AF37', fontWeight: '600' }]}>Credits Applied</Text>
            <Text style={[styles.summaryValue, { color: '#D4AF37', fontWeight: '600' }]}>-{formatPrice(creditsDiscount)}</Text>
          </View>
        )}

        <View style={[styles.divider, { backgroundColor: theme.borderLight }]} />

        <View style={styles.summaryRow}>
          <Text style={[styles.totalLabel, { color: theme.text }]}>Total Payable</Text>
          <Text style={[styles.totalValue, { color: theme.text }]}>{formatPrice(payableTotal)}</Text>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity onPress={handlePlaceOrder} activeOpacity={0.85} style={styles.placeOrderWrapper}>
          <LinearGradient
            colors={[theme.gradientStart, theme.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.placeOrderBtn}
          >
            <Ionicons name="shield-checkmark-outline" size={18} color="#FFFFFF" style={{ marginRight: Spacing.sm }} />
            <Text style={styles.placeOrderText}>Place Order  ·  {formatPrice(payableTotal)}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
  },
  headerTitle: {
    ...Typography.h3,
  },
  headerBadge: {
    ...Typography.bodySmMedium,
  },
  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxxl,
  },
  emptyIconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  emptyTitle: {
    ...Typography.h3,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    ...Typography.bodySm,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xxxl,
  },
  startShoppingWrapper: {
    width: '100%',
  },
  startShoppingBtn: {
    flexDirection: 'row',
    height: 52,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startShoppingText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  // Cart Card
  cartCard: {
    flexDirection: 'row',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  deleteBtn: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    zIndex: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 80,
    height: 100,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemInfo: {
    flex: 1,
    paddingRight: Spacing.xl,
  },
  itemTitle: {
    ...Typography.bodySmMedium,
    marginBottom: Spacing.xxs,
  },
  itemVariant: {
    ...Typography.caption,
    marginBottom: Spacing.xs,
  },
  itemPrice: {
    ...Typography.priceSm,
    marginBottom: Spacing.sm,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineTotal: {
    ...Typography.caption,
    fontWeight: '500',
  },
  // Nudge
  nudge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  nudgeText: {
    ...Typography.bodySm,
    flex: 1,
  },
  // Summary
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? Spacing.xxxl : Spacing.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    ...Typography.bodySm,
  },
  summaryValue: {
    ...Typography.bodySmMedium,
  },
  freeDeliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  strikeThrough: {
    ...Typography.bodySm,
    textDecorationLine: 'line-through',
  },
  freeText: {
    ...Typography.bodySmMedium,
    fontWeight: '700',
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
    fontSize: 20,
  },
  placeOrderWrapper: {
    marginTop: Spacing.md,
  },
  placeOrderBtn: {
    flexDirection: 'row',
    height: 54,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  // Delivery Card
  deliveryCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  deliveryIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryDetails: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  deliveryValue: {
    fontSize: 13,
  },
  changeAddressBtn: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  changeAddressText: {
    fontSize: 13,
    fontWeight: '700',
  },
  cardDivider: {
    height: 1,
    marginVertical: Spacing.md,
  },
  deliverySpeedBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  deliverySpeedText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#D4AF37',
    letterSpacing: 1.2,
  },
});

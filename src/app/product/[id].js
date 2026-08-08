import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  Platform,
  StatusBar,
  Animated,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  PanResponder,
  Share,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { products } from '@/data/products';
import { formatPrice, calculateDiscount } from '@/utils/formatPrice';
import { checkDelivery } from '@/utils/validators';
import { addToCart } from '@/store/cartSlice';
import { toggleWishlist, selectIsWishlisted, selectDefaultAddress } from '@/store/userSlice';
import { selectReviewsForProduct } from '@/store/reviewsSlice';
import ProductCard from '@/components/common/ProductCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_WIDTH * 1.15;

const ZoomableImage = ({ uri, onZoomChange }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const lastScale = useRef(1);
  const lastPosition = useRef({ x: 0, y: 0 });
  const initialDistance = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      // Intercept 2-finger gestures instantly in capture phase
      onStartShouldSetPanResponderCapture: (evt) => evt.nativeEvent.touches.length === 2,
      onMoveShouldSetPanResponderCapture: (evt) => evt.nativeEvent.touches.length === 2,
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const touches = evt.nativeEvent.touches;
        if (touches.length === 2) {
          const dx = touches[0].pageX - touches[1].pageX;
          const dy = touches[0].pageY - touches[1].pageY;
          initialDistance.current = Math.sqrt(dx * dx + dy * dy);
          lastScale.current = scale._value || 1;
          onZoomChange && onZoomChange(true);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;
        
        if (touches.length === 2) {
          const dx = touches[0].pageX - touches[1].pageX;
          const dy = touches[0].pageY - touches[1].pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (!initialDistance.current) {
            initialDistance.current = distance;
            lastScale.current = scale._value || 1;
          } else {
            let newScale = (distance / initialDistance.current) * lastScale.current;
            if (newScale < 0.8) newScale = 0.8;
            if (newScale > 5) newScale = 5;
            scale.setValue(newScale);
            onZoomChange && onZoomChange(newScale > 1.05);
          }
        } else if (touches.length === 1) {
          initialDistance.current = null;
          if (scale._value > 1.05) {
            const newX = lastPosition.current.x + gestureState.dx;
            const newY = lastPosition.current.y + gestureState.dy;
            
            const maxPanX = (scale._value - 1) * (SCREEN_WIDTH / 2);
            const maxPanY = (scale._value - 1) * (Dimensions.get('window').height * 0.45);
            
            translateX.setValue(Math.max(-maxPanX, Math.min(maxPanX, newX)));
            translateY.setValue(Math.max(-maxPanY, Math.min(maxPanY, newY)));
          }
        }
      },
      onPanResponderRelease: () => {
        lastScale.current = scale._value;
        lastPosition.current = { x: translateX._value, y: translateY._value };
        initialDistance.current = null;
        
        if (scale._value < 1.05) {
          Animated.parallel([
            Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
            Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
          ]).start();
          lastScale.current = 1;
          lastPosition.current = { x: 0, y: 0 };
          onZoomChange && onZoomChange(false);
        } else if (scale._value > 4.5) {
          Animated.spring(scale, { toValue: 4.5, useNativeDriver: true }).start();
          lastScale.current = 4.5;
          onZoomChange && onZoomChange(true);
        } else {
          onZoomChange && onZoomChange(true);
        }
      },
    })
  ).current;

  // Wrapped Animated expo-image component
  const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

  return (
    <View 
      {...panResponder.panHandlers} 
      style={{
        width: SCREEN_WIDTH,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#000000',
      }}
    >
      <AnimatedExpoImage
        source={{ uri }}
        style={{
          width: SCREEN_WIDTH,
          height: Dimensions.get('window').height * 0.85,
          transform: [
            { scale: scale },
            { translateX: translateX },
            { translateY: translateY },
          ],
        }}
        contentFit="contain"
      />
    </View>
  );
};

const ProductDetailScreen = () => {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);
  const isWishlisted = useSelector(selectIsWishlisted(product?.id));
  const userReviews = useSelector(selectReviewsForProduct(product?.id)) || [];

  const displayRating = useMemo(() => {
    if (!product) return 0;
    const baseCount = product.reviewCount || 0;
    const baseRating = product.rating || 0;
    
    if (userReviews.length === 0) return baseRating;
    
    const totalCount = baseCount + userReviews.length;
    const totalRatingSum = (baseRating * baseCount) + userReviews.reduce((sum, r) => sum + r.rating, 0);
    return Math.round((totalRatingSum / totalCount) * 10) / 10;
  }, [product, userReviews]);

  const displayReviewCount = useMemo(() => {
    if (!product) return 0;
    return (product.reviewCount || 0) + userReviews.length;
  }, [product, userReviews]);

  const defaultAddress = useSelector(selectDefaultAddress);

  // State
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);

  useEffect(() => {
    if (defaultAddress?.pincode) {
      setPincode(defaultAddress.pincode);
      // Fallback state name if not mapped, default to selectedCountry or 'India'
      const countryName = defaultAddress.state || 'India';
      const result = checkDelivery(defaultAddress.pincode, countryName);
      setDeliveryResult(result);
    }
  }, [defaultAddress]);
  const [descExpanded, setDescExpanded] = useState(false);
  const [careExpanded, setCareExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addedBanner, setAddedBanner] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerImageIdx, setViewerImageIdx] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // Animations
  const heartScale = useRef(new Animated.Value(1)).current;
  const bannerAnim = useRef(new Animated.Value(-80)).current;
  const descAnim = useRef(new Animated.Value(0)).current;
  const careAnim = useRef(new Animated.Value(0)).current;

  // Image gallery ref
  const imageListRef = useRef(null);

  if (!product) {
    return (
      <View style={[styles.screen, { backgroundColor: theme.background }]}>
        <View style={styles.notFoundContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={theme.textTertiary} />
          <Text style={[styles.notFoundText, { color: theme.text }]}>
            Product not found
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.notFoundLink, { color: theme.accent }]}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const selectedColor = product.colors?.[selectedColorIdx];
  const currentPrice = selectedColor?.price || product.price + (selectedColorIdx * 100);
  const currentMrp = selectedColor?.mrp || product.mrp + (selectedColorIdx * 100);
  const discount = calculateDiscount(currentMrp, currentPrice);
  const displayImages = selectedColor?.images?.length > 0
    ? selectedColor.images
    : product.images;

  // Auto slideshow interval for product images
  useEffect(() => {
    if (!displayImages || displayImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIdx(prev => {
        const nextIdx = (prev + 1) % displayImages.length;
        try {
          imageListRef.current?.scrollToIndex({ index: nextIdx, animated: true });
        } catch (err) {
          // suppress scroll offset errors on layout updates
        }
        return nextIdx;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [displayImages]);

  const similarProducts = useMemo(
    () =>
      products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 10),
    [product]
  );

  const handleShare = useCallback(async () => {
    try {
      const shareUrl = `luxaen://product/${product.id}`;
      await Share.share({
        message: `Check out this amazing product on Luxaen: ${product.title} at ${formatPrice(product.price)}! ${shareUrl}`,
        title: product.title,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  }, [product]);

  // Handlers
  const handleImageScroll = useCallback(
    (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const idx = Math.round(offsetX / SCREEN_WIDTH);
      setActiveImageIdx(idx);
    },
    []
  );

  const handleSelectColor = useCallback(
    (idx) => {
      setSelectedColorIdx(idx);
      setActiveImageIdx(0);
      imageListRef.current?.scrollToOffset({ offset: 0, animated: true });
    },
    []
  );

  const handleCheckDelivery = useCallback(() => {
    const result = checkDelivery(pincode);
    setDeliveryResult(result);
  }, [pincode]);

  const handleToggleWishlist = useCallback(() => {
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    dispatch(toggleWishlist(product.id));
  }, [dispatch, product.id, heartScale]);

  const showAddedBanner = useCallback(() => {
    setAddedBanner(true);
    Animated.sequence([
      Animated.spring(bannerAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
      Animated.delay(3000),
      Animated.timing(bannerAnim, {
        toValue: -80,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setAddedBanner(false));
  }, [bannerAnim]);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      Toast.show({
        type: 'error',
        text1: 'Select a Size',
        text2: 'Please choose a size before adding to cart.',
        position: 'bottom',
        visibilityTime: 2500,
      });
      return;
    }

    const sizeObj = product.sizes.find((s) => s.size === selectedSize);
    if (!sizeObj || sizeObj.stock === 0) {
      Toast.show({
        type: 'error',
        text1: 'Out of Stock',
        text2: 'This size is currently unavailable.',
        position: 'bottom',
      });
      return;
    }

    setIsAdding(true);
    setTimeout(() => {
      dispatch(
        addToCart({
          productId: product.id,
          title: product.title,
          image: displayImages[0],
          size: selectedSize,
          color: selectedColor?.name || '',
          price: currentPrice,
          mrp: currentMrp,
          maxStock: sizeObj.stock,
        })
      );
      setIsAdding(false);
      showAddedBanner();
    }, 600);
  }, [selectedSize, product, selectedColor, dispatch, showAddedBanner, displayImages, currentPrice, currentMrp]);

  const handleBuyNow = useCallback(() => {
    if (!selectedSize) {
      Toast.show({
        type: 'error',
        text1: 'Select a Size',
        text2: 'Please choose a size before buying.',
        position: 'bottom',
        visibilityTime: 2500,
      });
      return;
    }

    const sizeObj = product.sizes.find((s) => s.size === selectedSize);
    if (!sizeObj || sizeObj.stock === 0) return;

    dispatch(
      addToCart({
        productId: product.id,
        title: product.title,
        image: displayImages[0],
        size: selectedSize,
        color: selectedColor?.name || '',
        price: currentPrice,
        mrp: currentMrp,
        maxStock: sizeObj.stock,
      })
    );
    router.push('/cart');
  }, [selectedSize, product, selectedColor, dispatch, router, displayImages, currentPrice, currentMrp]);

  const isProductOutOfStock = useMemo(() => {
    return !product.sizes || product.sizes.every((s) => s.stock === 0);
  }, [product.sizes]);

  const handleNotifyMeProduct = useCallback(() => {
    Toast.show({
      type: 'info',
      text1: 'Notification Set! 🔔',
      text2: `We'll alert you as soon as this item is back in stock.`,
      position: 'bottom',
      visibilityTime: 3000,
    });
  }, []);

  const handleSimilarProductPress = useCallback(
    (p) => {
      router.push('/product/' + p.id);
    },
    [router]
  );

  const toggleDesc = useCallback(() => {
    const toVal = descExpanded ? 0 : 1;
    Animated.timing(descAnim, {
      toValue: toVal,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setDescExpanded(!descExpanded);
  }, [descExpanded, descAnim]);

  const toggleCare = useCallback(() => {
    const toVal = careExpanded ? 0 : 1;
    Animated.timing(careAnim, {
      toValue: toVal,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setCareExpanded(!careExpanded);
  }, [careExpanded, careAnim]);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Ionicons key={i} name="star" size={14} color={theme.gold} />
        );
      } else if (i === fullStars && halfStar) {
        stars.push(
          <Ionicons key={i} name="star-half" size={14} color={theme.gold} />
        );
      } else {
        stars.push(
          <Ionicons
            key={i}
            name="star-outline"
            size={14}
            color={theme.textTertiary}
          />
        );
      }
    }
    return stars;
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Added to Cart Banner */}
      {addedBanner && (
        <Animated.View
          style={[
            styles.addedBanner,
            {
              transform: [{ translateY: bannerAnim }],
              backgroundColor: theme.success,
            },
          ]}
        >
          <View style={styles.addedBannerContent}>
            <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
            <Text style={styles.addedBannerText}>1 item added to cart</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/cart')}
            style={styles.viewCartLink}
          >
            <Text style={styles.viewCartText}>View Cart</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Top Header Bar */}
      <View
        style={[
          styles.floatingHeader,
          {
            backgroundColor: theme.background,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.borderLight,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.headerBtn,
            { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
          ]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[
              styles.headerBtn,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
            ]}
            onPress={handleShare}
          >
            <Ionicons name="share-social-outline" size={20} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.headerBtn,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
            ]}
            onPress={() => router.push('/search')}
          >
            <Ionicons name="search" size={20} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.headerBtn,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
            ]}
            onPress={() => router.push('/cart')}
          >
            <Ionicons name="bag-outline" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Amazon-style Brand & Title details */}
        <View style={styles.topBrandInfoContainer}>
          <Text style={[styles.topBrandText, { color: theme.accent }]}>
            Visit the {product.brand} Store
          </Text>
          <Text style={[styles.topTitleText, { color: theme.text }]}>
            {product.title}
          </Text>
          <View style={styles.topRatingRow}>
            <View style={styles.starsRow}>{renderStars(displayRating)}</View>
            <Text style={[styles.topRatingValue, { color: theme.text }]}>
              {displayRating}
            </Text>
            <Text style={[styles.topReviewCount, { color: theme.textSecondary }]}>
              ({displayReviewCount} reviews)
            </Text>
            {discount > 0 && (
              <View style={styles.topRatingDiscountBadge}>
                <LinearGradient
                  colors={['#E94560', '#FF6B35']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.topRatingDiscountGradient}
                >
                  <Text style={styles.topRatingDiscountText}>{discount}% OFF</Text>
                </LinearGradient>
              </View>
            )}
          </View>
        </View>

        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <FlatList
            ref={imageListRef}
            data={displayImages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleImageScroll}
            keyExtractor={(_, idx) => `img-${idx}`}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => {
                  setViewerImageIdx(index);
                  setIsViewerOpen(true);
                }}
              >
                <Image
                  source={{ uri: item }}
                  style={styles.galleryImage}
                  contentFit="cover"
                />
              </TouchableOpacity>
            )}
          />

          {/* Dot Indicators */}
          {displayImages.length > 1 && (
            <View style={styles.dotContainer}>
              <View
                style={[
                  styles.dotBg,
                  {
                    backgroundColor: isDark
                      ? 'rgba(0,0,0,0.6)'
                      : 'rgba(0,0,0,0.35)',
                  },
                ]}
              >
                {displayImages.map((_, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          idx === activeImageIdx ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                        width: idx === activeImageIdx ? 20 : 6,
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          )}


        </View>

        {/* Product Info */}
        <View
          style={[
            styles.infoContainer,
            {
              backgroundColor: theme.surface,
              ...Shadow.sm,
              shadowColor: theme.shadow,
            },
          ]}
        >

          {/* Price */}
          <View style={styles.priceSection}>
            <Text style={[styles.price, { color: theme.text }]}>
              {formatPrice(currentPrice)}
            </Text>
            {currentMrp > currentPrice && (
              <>
                <Text
                  style={[styles.mrp, { color: theme.priceOriginal }]}
                >
                  {formatPrice(currentMrp)}
                </Text>
                <View
                  style={[
                    styles.discountPill,
                    { backgroundColor: 'rgba(40,167,69,0.1)' },
                  ]}
                >
                  <Text
                    style={[
                      styles.discountPillText,
                      { color: theme.priceDiscount },
                    ]}
                  >
                    {discount}% off
                  </Text>
                </View>
              </>
            )}
          </View>
          <Text style={[styles.taxNote, { color: theme.textTertiary }]}>
            Inclusive of all taxes
          </Text>
        </View>

        {/* Size Selection */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.surface,
              ...Shadow.sm,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Select Size
            </Text>
            {selectedSize && (
              <View
                style={[styles.selectedTag, { backgroundColor: isDark ? 'rgba(233,69,96,0.15)' : 'rgba(233,69,96,0.08)' }]}
              >
                <Text style={[styles.selectedTagText, { color: theme.accent }]}>
                  {selectedSize}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.sizeGrid}>
            {product.sizes.map((sizeObj) => {
              const isSelected = selectedSize === sizeObj.size;
              const isOutOfStock = sizeObj.stock === 0;
              return (
                <TouchableOpacity
                  key={sizeObj.size}
                  style={[
                    styles.sizeButton,
                    {
                      backgroundColor: isSelected
                        ? theme.accent
                        : isOutOfStock
                        ? isDark
                          ? 'rgba(255,255,255,0.04)'
                          : 'rgba(0,0,0,0.03)'
                        : theme.inputBg,
                      borderColor: isSelected
                        ? theme.accent
                        : isOutOfStock
                        ? theme.borderLight
                        : theme.border,
                      opacity: isOutOfStock ? 0.5 : 1,
                    },
                  ]}
                  onPress={() => !isOutOfStock && setSelectedSize(sizeObj.size)}
                  disabled={isOutOfStock}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.sizeButtonText,
                      {
                        color: isSelected
                          ? '#FFFFFF'
                          : isOutOfStock
                          ? theme.textTertiary
                          : theme.text,
                      },
                    ]}
                  >
                    {sizeObj.size}
                  </Text>
                  {isOutOfStock && (
                    <View style={styles.sizeStrikethrough}>
                      <View
                        style={[
                          styles.strikeLine,
                          { backgroundColor: theme.textTertiary },
                        ]}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <View
            style={[
              styles.sectionCard,
              {
                backgroundColor: theme.surface,
                ...Shadow.sm,
                shadowColor: theme.shadow,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Color:{' '}
              <Text style={{ color: theme.textSecondary, fontWeight: '400' }}>
                {selectedColor?.name}
              </Text>
            </Text>
            <View style={styles.colorBoxContainer}>
              {product.colors.map((color, idx) => {
                const isSelected = selectedColorIdx === idx;
                const variantImage = color.images?.[0] || product.images?.[0];
                const variantPrice = color.price || product.price + (idx * 100);
                return (
                  <TouchableOpacity
                    key={color.name}
                    style={[
                      styles.variantBox,
                      {
                        borderColor: isSelected ? theme.accent : theme.border,
                        borderWidth: isSelected ? 2 : 1,
                        backgroundColor: theme.background,
                      },
                    ]}
                    onPress={() => handleSelectColor(idx)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={{ uri: variantImage }}
                      style={styles.variantImage}
                      contentFit="cover"
                    />
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.variantLabel,
                        {
                          color: isSelected ? theme.accent : theme.textSecondary,
                          fontWeight: isSelected ? '700' : '400',
                          marginBottom: 2,
                        },
                      ]}
                    >
                      {color.name}
                    </Text>
                    <Text
                      style={[
                        styles.variantPriceLabel,
                        {
                          color: isSelected ? theme.accent : theme.text,
                          fontWeight: '700',
                        },
                      ]}
                    >
                      {formatPrice(variantPrice)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Delivery Check */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.surface,
              ...Shadow.sm,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <View style={styles.sectionHeaderRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color={theme.accent}
            />
            <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: Spacing.sm }]}>
              Delivery Options
            </Text>
          </View>
          <View style={styles.deliveryRow}>
            <TextInput
              style={[
                styles.pincodeInput,
                {
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: deliveryResult
                    ? deliveryResult.available
                      ? theme.success
                      : theme.error
                    : theme.border,
                },
              ]}
              placeholder="Enter pincode"
              placeholderTextColor={theme.textTertiary}
              keyboardType="number-pad"
              maxLength={6}
              value={pincode}
              onChangeText={(text) => {
                setPincode(text.replace(/[^0-9]/g, ''));
                setDeliveryResult(null);
              }}
            />
            <TouchableOpacity
              style={[
                styles.checkButton,
                {
                  backgroundColor: pincode.length === 6
                    ? theme.accent
                    : theme.inputBg,
                },
              ]}
              onPress={handleCheckDelivery}
              disabled={pincode.length !== 6}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.checkButtonText,
                  {
                    color: pincode.length === 6 ? '#FFFFFF' : theme.textTertiary,
                  },
                ]}
              >
                Check
              </Text>
            </TouchableOpacity>
          </View>
          {deliveryResult && (
            <View style={styles.deliveryResult}>
              <Ionicons
                name={
                  deliveryResult.available
                    ? 'checkmark-circle'
                    : 'close-circle'
                }
                size={16}
                color={
                  deliveryResult.available ? theme.success : theme.error
                }
              />
              <Text
                style={[
                  styles.deliveryResultText,
                  {
                    color: deliveryResult.available
                      ? theme.success
                      : theme.error,
                  },
                ]}
              >
                {deliveryResult.message}
              </Text>
            </View>
          )}
        </View>

        {/* Description Accordion */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.surface,
              ...Shadow.sm,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={toggleDesc}
            activeOpacity={0.7}
          >
            <View style={styles.accordionLeft}>
              <Ionicons
                name="document-text-outline"
                size={18}
                color={theme.accent}
              />
              <Text
                style={[
                  styles.sectionTitle,
                  { color: theme.text, marginLeft: Spacing.sm },
                ]}
              >
                Product Description
              </Text>
            </View>
            <Ionicons
              name={descExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={theme.textTertiary}
            />
          </TouchableOpacity>
          {descExpanded && (
            <Text
              style={[
                styles.descriptionText,
                { color: theme.textSecondary },
              ]}
            >
              {product.description}
            </Text>
          )}
        </View>

        {/* Care Instructions Accordion */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.surface,
              ...Shadow.sm,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={toggleCare}
            activeOpacity={0.7}
          >
            <View style={styles.accordionLeft}>
              <Ionicons
                name="leaf-outline"
                size={18}
                color={theme.accent}
              />
              <Text
                style={[
                  styles.sectionTitle,
                  { color: theme.text, marginLeft: Spacing.sm },
                ]}
              >
                Care Instructions
              </Text>
            </View>
            <Ionicons
              name={careExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={theme.textTertiary}
            />
          </TouchableOpacity>
          {careExpanded && (
            <Text
              style={[
                styles.descriptionText,
                { color: theme.textSecondary },
              ]}
            >
              {product.careInstructions}
            </Text>
          )}
        </View>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <View style={styles.similarSection}>
            <Text
              style={[styles.similarTitle, { color: theme.text }]}
            >
              You May Also Like
            </Text>
            <FlatList
              data={similarProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.similarList}
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  onPress={handleSimilarProductPress}
                />
              )}
            />
          </View>
        )}

        {/* Customer Reviews Section */}
        <View style={[styles.reviewsSection, { borderTopWidth: 1, borderTopColor: theme.borderLight }]}>
          <Text style={[styles.sectionTitleText, { color: theme.text }]}>
            Customer Reviews
          </Text>

          {/* Average Rating Card */}
          <View style={[styles.ratingCard, { backgroundColor: theme.card, borderColor: theme.borderLight }]}>
            <View style={styles.ratingCardLeft}>
              <Text style={[styles.bigRatingText, { color: theme.text }]}>{displayRating}</Text>
              <Text style={[styles.outOfText, { color: theme.textSecondary }]}>out of 5</Text>
              <View style={styles.starsRowCompact}>
                {renderStars(displayRating)}
              </View>
              <Text style={[styles.totalRatingsLabel, { color: theme.textTertiary }]}>
                {displayReviewCount} global ratings
              </Text>
            </View>

            <View style={styles.ratingCardRight}>
              {/* Star Breakdown Progress Bars */}
              {(() => {
                const baseCount = product.reviewCount || 0;
                // Mock base counts for breakdown
                const counts = {
                  5: Math.round(baseCount * 0.6) + userReviews.filter(r => r.rating === 5).length,
                  4: Math.round(baseCount * 0.25) + userReviews.filter(r => r.rating === 4).length,
                  3: Math.round(baseCount * 0.1) + userReviews.filter(r => r.rating === 3).length,
                  2: Math.round(baseCount * 0.03) + userReviews.filter(r => r.rating === 2).length,
                  1: Math.round(baseCount * 0.02) + userReviews.filter(r => r.rating === 1).length,
                };
                const total = Object.values(counts).reduce((a, b) => a + b, 0);

                return [5, 4, 3, 2, 1].map((star) => {
                  const pct = total > 0 ? Math.round((counts[star] / total) * 100) : 0;
                  return (
                    <View key={star} style={styles.breakdownRow}>
                      <Text style={[styles.breakdownStarLabel, { color: theme.textSecondary }]}>
                        {star} star
                      </Text>
                      <View style={[styles.progressTrack, { backgroundColor: theme.borderLight }]}>
                        <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: '#F59E0B' }]} />
                      </View>
                      <Text style={[styles.breakdownPctLabel, { color: theme.textTertiary }]}>
                        {pct}%
                      </Text>
                    </View>
                  );
                });
              })()}
            </View>
          </View>

          {/* Reviews List */}
          <Text style={[styles.reviewsListTitle, { color: theme.text }]}>
            Top Reviews
          </Text>

          {userReviews.length === 0 ? (
            // Render generic mock reviews if no specific mock reviews exist in store
            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Ionicons name="person-circle" size={32} color={theme.textTertiary} />
                <View style={styles.reviewerInfo}>
                  <Text style={[styles.reviewerName, { color: theme.text }]}>Suresh Menon</Text>
                  <View style={styles.reviewerMeta}>
                    <View style={styles.starsRowCompact}>{renderStars(4)}</View>
                    <Text style={[styles.reviewDate, { color: theme.textTertiary }]}> · 12 July 2026</Text>
                  </View>
                </View>
              </View>
              <Text style={[styles.reviewComment, { color: theme.textSecondary }]}>
                Very nice product. The fabric feels premium and comfortable. I would buy it again.
              </Text>
            </View>
          ) : (
            // Render userReviews + filter from store items
            userReviews.map((rev, idx) => (
              <View key={idx} style={[styles.reviewItem, idx < userReviews.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.borderLight }]}>
                <View style={styles.reviewHeader}>
                  <Ionicons name="person-circle" size={32} color={theme.textTertiary} />
                  <View style={styles.reviewerInfo}>
                    <Text style={[styles.reviewerName, { color: theme.text }]}>{rev.userName}</Text>
                    <View style={styles.reviewerMeta}>
                      <View style={styles.starsRowCompact}>{renderStars(rev.rating)}</View>
                      <Text style={[styles.reviewDate, { color: theme.textTertiary }]}>
                        {' '}·{' '}
                        {new Date(rev.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.reviewComment, { color: theme.textSecondary }]}>
                  {rev.comment}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View
        style={[
          styles.stickyFooter,
          {
            backgroundColor: isDark
              ? 'rgba(15,15,26,0.95)'
              : 'rgba(255,255,255,0.97)',
            borderTopColor: theme.borderLight,
            ...Shadow.xl,
            shadowColor: theme.shadow,
          },
        ]}
      >
        {/* Wishlist Heart */}
        <Animated.View style={{ transform: [{ scale: heartScale }] }}>
          <TouchableOpacity
            style={[
              styles.wishlistBtn,
              {
                borderColor: isWishlisted ? theme.heart : theme.border,
                backgroundColor: isWishlisted
                  ? isDark
                    ? 'rgba(233,69,96,0.15)'
                    : 'rgba(233,69,96,0.06)'
                  : theme.inputBg,
              },
            ]}
            onPress={handleToggleWishlist}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={22}
              color={isWishlisted ? theme.heart : theme.textSecondary}
            />
          </TouchableOpacity>
        </Animated.View>

        {isProductOutOfStock ? (
          <TouchableOpacity
            style={[styles.notifyMeBtn, { backgroundColor: '#2196F3' }]}
            onPress={handleNotifyMeProduct}
            activeOpacity={0.85}
          >
            <Ionicons
              name="notifications-outline"
              size={18}
              color="#FFFFFF"
              style={{ marginRight: Spacing.sm }}
            />
            <Text style={styles.cartBtnText}>Notify Me When Available</Text>
          </TouchableOpacity>
        ) : (
          <>
            {/* Add to Cart */}
            <TouchableOpacity
              style={[styles.addToCartBtn, { backgroundColor: theme.accent }]}
              onPress={handleAddToCart}
              activeOpacity={0.85}
              disabled={isAdding}
            >
              {isAdding ? (
                <>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.cartBtnText}>Adding...</Text>
                </>
              ) : (
                <>
                  <Ionicons
                    name="bag-add-outline"
                    size={18}
                    color="#FFFFFF"
                    style={{ marginRight: Spacing.sm }}
                  />
                  <Text style={styles.cartBtnText}>Add to Cart</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Buy Now */}
            <TouchableOpacity
              style={[
                styles.buyNowBtn,
                {
                  borderColor: theme.accent,
                },
              ]}
              onPress={handleBuyNow}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[theme.gradientStart, theme.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buyNowGradient}
              >
                <Ionicons
                  name="flash"
                  size={16}
                  color="#FFFFFF"
                  style={{ marginRight: Spacing.xs }}
                />
                <Text style={styles.buyNowBtnText}>Buy Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Fullscreen Image Viewer Modal with Zoom Support */}
      <Modal
        visible={isViewerOpen}
        transparent={false}
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={() => setIsViewerOpen(false)}
      >
        <View style={styles.viewerContainer}>
          <StatusBar hidden={true} />
          
          {/* Viewer Header */}
          <View style={styles.viewerHeader}>
            <Text style={styles.viewerIndicator}>
              {viewerImageIdx + 1} / {displayImages.length}
            </Text>
            <TouchableOpacity
              onPress={() => setIsViewerOpen(false)}
              style={styles.viewerCloseBtn}
              hitSlop={12}
            >
              <Ionicons name="close" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Fullscreen Image Swiper */}
          <FlatList
            data={displayImages}
            horizontal
            pagingEnabled
            scrollEnabled={scrollEnabled}
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={viewerImageIdx}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            onMomentumScrollEnd={(e) => {
              const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
              setViewerImageIdx(idx);
            }}
            keyExtractor={(_, idx) => `viewer-img-${idx}`}
            renderItem={({ item }) => (
              <ZoomableImage
                uri={item}
                onZoomChange={(zoomed) => setScrollEnabled(!zoomed)}
              />
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  notFoundText: {
    ...Typography.h3,
  },
  notFoundLink: {
    ...Typography.bodyMedium,
  },
  scrollView: {
    flex: 1,
  },

  // Floating Header
  floatingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 52 : (StatusBar.currentHeight || 0) + Spacing.sm,
    paddingBottom: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  headerRight: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Image Gallery
  imageGallery: {
    position: 'relative',
  },
  galleryImage: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
  },
  dotContainer: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  dotBg: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    gap: Spacing.xs,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  discountBadge: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 100 : 80,
    right: Spacing.lg,
  },
  discountGradient: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Product Info
  infoContainer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    marginTop: Spacing.md,
  },
  topBrandInfoContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  topBrandText: {
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginBottom: Spacing.xxs,
  },
  topTitleText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: Spacing.sm,
  },
  topRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  topRatingValue: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 2,
  },
  topRatingDiscountBadge: {
    marginLeft: Spacing.sm,
    borderRadius: BorderRadius.xs,
    overflow: 'hidden',
  },
  topRatingDiscountGradient: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRatingDiscountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  topReviewCount: {
    fontSize: 12,
  },
  brand: {
    ...Typography.captionMedium,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: Spacing.xs,
  },
  title: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.xs,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginRight: Spacing.xs,
  },
  ratingValue: {
    ...Typography.bodySmMedium,
  },
  reviewCount: {
    ...Typography.caption,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  price: {
    ...Typography.price,
  },
  mrp: {
    ...Typography.body,
    textDecorationLine: 'line-through',
  },
  discountPill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.xs,
  },
  discountPillText: {
    ...Typography.captionMedium,
    fontWeight: '700',
  },
  taxNote: {
    ...Typography.caption,
  },

  // Section Cards
  sectionCard: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.bodyMedium,
  },
  selectedTag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.round,
  },
  selectedTagText: {
    ...Typography.captionMedium,
    fontWeight: '700',
  },

  // Size Grid
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  sizeButton: {
    width: (SCREEN_WIDTH - Spacing.xl * 2 - Spacing.sm * 3) / 4,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  sizeButtonText: {
    ...Typography.bodySmMedium,
    fontWeight: '600',
  },
  sizeStrikethrough: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  strikeLine: {
    width: '70%',
    height: 1,
    transform: [{ rotate: '-15deg' }],
  },

  // Color Swatches
  colorBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  variantBox: {
    width: 86,
    borderRadius: BorderRadius.md,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  variantImage: {
    width: 74,
    height: 74,
    borderRadius: BorderRadius.sm,
    marginBottom: 4,
  },
  variantLabel: {
    fontSize: 10,
    textAlign: 'center',
    width: '100%',
  },
  variantPriceLabel: {
    fontSize: 10,
    textAlign: 'center',
  },

  // Delivery
  deliveryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  pincodeInput: {
    flex: 1,
    height: 46,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    paddingHorizontal: Spacing.lg,
    ...Typography.bodySm,
  },
  checkButton: {
    height: 46,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonText: {
    ...Typography.buttonSm,
  },
  deliveryResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  deliveryResultText: {
    ...Typography.bodySm,
    flex: 1,
  },

  // Accordion
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accordionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  descriptionText: {
    ...Typography.bodySm,
    lineHeight: 22,
    marginTop: Spacing.md,
  },

  // Similar Products
  similarSection: {
    marginTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  similarTitle: {
    ...Typography.h4,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  similarList: {
    paddingHorizontal: Spacing.xl,
  },

  // Sticky Footer
  stickyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? Spacing.xxl : Spacing.md,
    borderTopWidth: 1,
    gap: Spacing.sm,
  },
  wishlistBtn: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartBtn: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  notifyMeBtn: {
    flex: 1.8,
    height: 48,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  cartBtnText: {
    ...Typography.buttonSm,
    color: '#FFFFFF',
    marginLeft: Spacing.xs,
  },
  buyNowBtn: {
    flex: 0.8,
    height: 48,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  buyNowGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowBtnText: {
    ...Typography.buttonSm,
    color: '#FFFFFF',
  },

  // Added Banner
  addedBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight || 0) + Spacing.sm,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  addedBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  addedBannerText: {
    ...Typography.bodySmMedium,
    color: '#FFFFFF',
  },
  viewCartLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  viewCartText: {
    ...Typography.bodySmMedium,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  // Fullscreen Viewer Styles
  viewerContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  viewerHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Platform.OS === 'ios' ? 56 : 36,
    paddingBottom: Spacing.md,
    zIndex: 200,
    backgroundColor: 'transparent',
  },
  viewerIndicator: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  viewerCloseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomScrollContent: {
    width: SCREEN_WIDTH,
    height: Dimensions.get('window').height - 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  // Customer Reviews Styles
  reviewsSection: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxxl,
    marginTop: Spacing.xl,
  },
  sectionTitleText: {
    ...Typography.bodyMedium,
    fontWeight: '700',
    marginBottom: Spacing.md,
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ratingCard: {
    flexDirection: 'row',
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  ratingCardLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.08)',
    paddingRight: Spacing.md,
  },
  bigRatingText: {
    fontSize: 36,
    fontWeight: '800',
  },
  outOfText: {
    fontSize: 12,
    marginBottom: Spacing.xs,
  },
  starsRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: Spacing.xs,
  },
  totalRatingsLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  ratingCardRight: {
    flex: 1.4,
    justifyContent: 'center',
    paddingLeft: Spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  breakdownStarLabel: {
    fontSize: 11,
    width: 36,
    textAlign: 'right',
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: Spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  breakdownPctLabel: {
    fontSize: 11,
    width: 28,
  },
  reviewsListTitle: {
    ...Typography.bodySmMedium,
    fontWeight: '700',
    fontSize: 14,
    marginBottom: Spacing.md,
  },
  reviewItem: {
    paddingVertical: Spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  reviewerInfo: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  reviewerName: {
    ...Typography.bodySmMedium,
    fontWeight: '600',
    fontSize: 13,
  },
  reviewerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 11,
  },
  reviewComment: {
    ...Typography.bodySm,
    lineHeight: 18,
    marginTop: Spacing.xxs,
  },
});

export default ProductDetailScreen;

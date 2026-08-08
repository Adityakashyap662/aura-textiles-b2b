import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { banners } from '@/data/banners';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CAROUSEL_HEIGHT = SCREEN_HEIGHT * 0.32;

const BannerCarousel = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [activeIndex]);

  const startAutoPlay = () => {
    stopAutoPlay();
    if (banners.length <= 1) return;
    timerRef.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 3500);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleBannerPress = (banner) => {
    router.push({
      pathname: '/plp',
      params: { category: banner.categoryFilter, title: banner.title },
    });
  };

  const onMomentumScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    if (viewSize <= 0) return;
    const index = Math.round(contentOffset / viewSize);
    setActiveIndex(index);
  };

  const onScrollBeginDrag = () => {
    stopAutoPlay();
  };

  const renderItem = ({ item }) => {
    // Soft transparent vignette gradient covering only the bottom half of the image
    const colors = ['transparent', 'rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0.75)'];

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleBannerPress(item)}
        style={[styles.bannerContainer, { backgroundColor: theme.card }]}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={colors}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.ctaButton}>
              <Text style={styles.ctaText}>{item.ctaText || 'Shop Now'}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={startAutoPlay}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
      <View style={styles.indicatorContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: activeIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                width: activeIndex === index ? 16 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: CAROUSEL_HEIGHT,
    position: 'relative',
  },
  bannerContainer: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_HEIGHT,
  },
  image: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_HEIGHT,
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%', // Only cover bottom half to leave top half of image fully clean and bright
    justifyContent: 'flex-end',
    padding: Spacing.lg,
    paddingBottom: Spacing.xl + 8,
  },
  contentContainer: {
    alignItems: 'flex-start',
    gap: Spacing.xs,
  },
  subtitle: {
    ...Typography.captionMedium,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    ...Typography.h2,
    color: '#FFFFFF',
    fontWeight: '800',
    marginBottom: Spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaText: {
    ...Typography.buttonSm,
    color: '#000000',
    fontWeight: '700',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: Spacing.sm,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: Spacing.xs,
  },
  indicator: {
    height: 8,
    borderRadius: BorderRadius.round,
  },
});

export default BannerCarousel;

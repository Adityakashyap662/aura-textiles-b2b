import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/ThemeContext';

const SkeletonLoader = ({ width = '100%', height = 20, borderRadius = 4, style }) => {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [layoutWidth, setLayoutWidth] = useState(typeof width === 'number' ? width : 200);

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    shimmerAnimation.start();
    return () => shimmerAnimation.stop();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-layoutWidth, layoutWidth],
  });

  const onLayout = (event) => {
    if (typeof width !== 'number') {
      setLayoutWidth(event.nativeEvent.layout.width);
    }
  };

  return (
    <View
      onLayout={onLayout}
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.skeleton || '#E1E9EE',
          overflow: 'hidden',
          position: 'relative',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            'transparent',
            theme.shimmerHighlight || 'rgba(255, 255, 255, 0.2)',
            'transparent',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
    </View>
  );
};

export const SkeletonBanner = () => {
  return <SkeletonLoader width="100%" height="100%" borderRadius={0} />;
};

export const SkeletonCategory = () => {
  return (
    <View style={styles.categoryItem}>
      <SkeletonLoader width={68} height={68} borderRadius={34} style={styles.categoryIcon} />
      <SkeletonLoader width={56} height={12} borderRadius={4} />
    </View>
  );
};

export const SkeletonCard = () => {
  return (
    <View style={styles.cardContainer}>
      <SkeletonLoader width={160} height={192} borderRadius={8} style={styles.cardImage} />
      <SkeletonLoader width={100} height={12} borderRadius={4} style={styles.textSpacing} />
      <SkeletonLoader width={140} height={14} borderRadius={4} style={styles.textSpacing} />
      <SkeletonLoader width={60} height={14} borderRadius={4} />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    width: 80,
  },
  categoryIcon: {
    marginBottom: 8,
  },
  cardContainer: {
    marginRight: 16,
    width: 160,
  },
  cardImage: {
    marginBottom: 8,
  },
  textSpacing: {
    marginBottom: 6,
  },
});

export default SkeletonLoader;

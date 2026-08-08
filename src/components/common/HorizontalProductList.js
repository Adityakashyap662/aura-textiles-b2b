import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import ProductCard from './ProductCard';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Count down to end of today
    const target = new Date();
    target.setHours(23, 59, 59, 999);

    const updateTimer = () => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft('00h 00m 00s');
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
  }, []);

  return (
    <View style={styles.timerContainer}>
      <Ionicons name="time" size={13} color="#E94560" style={{ marginRight: 3 }} />
      <Text style={styles.timerText}>{timeLeft}</Text>
    </View>
  );
};

const HorizontalProductList = ({ title, products = [], onViewAll, onProductPress, showTimer = false }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {title}
          </Text>
          {showTimer && <CountdownTimer />}
        </View>
        {onViewAll && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onViewAll}
            style={styles.viewAllButton}
          >
            <Text style={[styles.viewAllText, { color: theme.primary || theme.accent }]}>
              View All
            </Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color={theme.primary || theme.accent}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={onProductPress}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.xs,
    borderWidth: 0.5,
    borderColor: 'rgba(233, 69, 96, 0.2)',
  },
  timerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E94560',
    fontVariant: ['tabular-nums'],
  },
  title: {
    ...Typography.h3,
    fontWeight: '700',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
  },
  viewAllText: {
    ...Typography.bodySmMedium,
    fontSize: 13,
  },
  listContent: {
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.sm,
  },
});

export default HorizontalProductList;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { categories } from '@/data/categories';

const CategoryGrid = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const categoryStyles = {
    men: {
      bg: 'rgba(33, 150, 243, 0.08)',
      icon: '#2196F3',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    },
    women: {
      bg: 'rgba(233, 69, 96, 0.08)',
      icon: '#E94560',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    kids: {
      bg: 'rgba(255, 107, 53, 0.08)',
      icon: '#FF6B35',
      img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=150&auto=format&fit=crop&q=80',
    },
    beauty: {
      bg: 'rgba(138, 43, 226, 0.08)',
      icon: '#8A2BE2',
      img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=80',
    },
  };

  const handlePress = (categoryId) => {
    router.push({
      pathname: '/plp',
      params: { category: categoryId },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {categories.map((cat) => {
        const stylesSet = categoryStyles[cat.id] || { bg: theme.card, icon: theme.accent, img: '' };
        return (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.75}
            onPress={() => handlePress(cat.id)}
            style={styles.gridItem}
          >
            <View
              style={[
                styles.iconWrapper,
                {
                  backgroundColor: stylesSet.bg,
                  borderColor: stylesSet.icon,
                  borderWidth: 1.5,
                  shadowColor: theme.shadow,
                  ...Shadow.sm,
                },
              ]}
            >
              {stylesSet.img ? (
                <Image
                  source={{ uri: stylesSet.img }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
              ) : null}
            </View>
            <Text style={[styles.label, { color: theme.text }]} numberOfLines={1}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  gridItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    padding: 2,
    overflow: 'hidden',
  },
  categoryImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  label: {
    ...Typography.bodySmMedium,
    fontSize: 12,
    letterSpacing: 0.3,
  },
});

export default CategoryGrid;

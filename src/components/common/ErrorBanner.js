import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing } from '@/theme/spacing';

const ErrorBanner = ({ visible = false, onDismiss }) => {
  const { theme } = useTheme();
  const slideAnim = useRef(new Animated.Value(-120)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -120,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          backgroundColor: theme.warning || '#D4AF37',
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons name="wifi-outline" size={20} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.text} numberOfLines={2}>
          No Internet Connection. Showing cached data.
        </Text>
      </View>
      <TouchableOpacity onPress={onDismiss} style={styles.closeBtn} activeOpacity={0.7}>
        <Ionicons name="close" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'ios' ? Spacing.xl + 20 : Spacing.md,
    paddingBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.md,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  text: {
    ...Typography.bodySmMedium,
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  closeBtn: {
    padding: Spacing.xs,
  },
});

export default ErrorBanner;

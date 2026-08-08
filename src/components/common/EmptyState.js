import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { LinearGradient } from 'expo-linear-gradient';

const EmptyState = ({ icon, title, subtitle, actionLabel, onAction }) => {
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.illustrationContainer,
          {
            backgroundColor: isDark
              ? 'rgba(233,69,96,0.08)'
              : 'rgba(233,69,96,0.05)',
          },
        ]}
      >
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: isDark
                ? 'rgba(233,69,96,0.15)'
                : 'rgba(233,69,96,0.1)',
            },
          ]}
        >
          <Ionicons
            name={icon || 'alert-circle-outline'}
            size={48}
            color={theme.accent}
          />
        </View>
      </View>

      <Text style={[styles.title, { color: theme.text }]}>
        {title || 'Nothing here'}
      </Text>

      {subtitle ? (
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {subtitle}
        </Text>
      ) : null}

      {actionLabel && onAction ? (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onAction}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[theme.gradientStart, theme.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBtn}
          >
            <Text style={styles.actionButtonText}>{actionLabel}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxxl,
    paddingVertical: Spacing.giant,
  },
  illustrationContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.h3,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.bodySm,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xxl,
    maxWidth: 280,
  },
  actionButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadow.md,
  },
  gradientBtn: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
});

export default EmptyState;

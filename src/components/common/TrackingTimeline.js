import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';

const TrackingTimeline = ({ timeline = [] }) => {
  const { theme } = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Find first incomplete step (current step)
  const currentIndex = useMemo(() => {
    const idx = timeline.findIndex((step) => !step.completed);
    return idx === -1 ? timeline.length : idx;
  }, [timeline]);

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.4,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [pulseAnim]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <View style={styles.container}>
      {timeline.map((step, index) => {
        const isCompleted = step.completed;
        const isCurrent = index === currentIndex;
        const isPending = !isCompleted && !isCurrent;
        const isLast = index === timeline.length - 1;

        return (
          <View key={index} style={styles.stepRow}>
            {/* Dot and line column */}
            <View style={styles.dotColumn}>
              {/* Dot */}
              {isCurrent ? (
                <View style={styles.currentDotContainer}>
                  <Animated.View
                    style={[
                      styles.pulseRing,
                      { backgroundColor: theme.accent + '30', transform: [{ scale: pulseAnim }] },
                    ]}
                  />
                  <View style={[styles.dot, styles.currentDot, { backgroundColor: theme.accent }]} />
                </View>
              ) : (
                <View
                  style={[
                    styles.dot,
                    isCompleted && { backgroundColor: theme.success },
                    isPending && { backgroundColor: theme.border, borderColor: theme.border },
                  ]}
                >
                  {isCompleted && (
                    <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                  )}
                </View>
              )}

              {/* Connecting line */}
              {!isLast && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor: index < currentIndex ? theme.success : theme.border,
                    },
                  ]}
                />
              )}
            </View>

            {/* Content column */}
            <View style={[styles.content, !isLast && { paddingBottom: Spacing.xxl }]}>
              <Text
                style={[
                  styles.stepLabel,
                  { color: isCompleted || isCurrent ? theme.text : theme.textTertiary },
                  (isCompleted || isCurrent) && { fontWeight: '600' },
                ]}
              >
                {step.status}
              </Text>
              {step.date && isCompleted && (
                <Text style={[styles.stepDate, { color: theme.textSecondary }]}>
                  {formatDate(step.date)}
                </Text>
              )}
              {isCurrent && !step.date && (
                <Text style={[styles.stepDate, { color: theme.accent }]}>In Progress</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
  },
  stepRow: {
    flexDirection: 'row',
  },
  dotColumn: {
    width: 32,
    alignItems: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  currentDotContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  currentDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
  },
  pulseRing: {
    width: 28,
    height: 28,
    borderRadius: 14,
    position: 'absolute',
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 24,
    zIndex: 1,
  },
  content: {
    flex: 1,
    marginLeft: Spacing.md,
    paddingTop: 1,
  },
  stepLabel: {
    ...Typography.bodySm,
  },
  stepDate: {
    ...Typography.caption,
    marginTop: Spacing.xxs,
  },
});

export default React.memo(TrackingTimeline);

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';

const GuestCheckoutModal = ({ visible, onClose, onSignIn, onContinueAsGuest }) => {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={[styles.overlay, { backgroundColor: theme.overlay }]} onPress={onClose}>
        <Pressable style={[styles.sheet, { backgroundColor: theme.surface }]} onPress={() => {}}>
          {/* Handle bar */}
          <View style={[styles.handle, { backgroundColor: theme.border }]} />

          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={24} color={theme.textSecondary} />
          </TouchableOpacity>

          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: theme.accent + '15' }]}>
            <Ionicons name="person-outline" size={36} color={theme.accent} />
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: theme.text }]}>
            Sign In Required
          </Text>

          {/* Subtitle */}
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Please log in to place your order. Signing in enables secure checkout, delivery address management, and order tracking.
          </Text>

          {/* Sign In Button */}
          <TouchableOpacity onPress={onSignIn} activeOpacity={0.85} style={styles.signInWrapper}>
            <LinearGradient
              colors={[theme.gradientStart, theme.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInButton}
            >
              <Ionicons name="log-in-outline" size={20} color="#FFFFFF" style={{ marginRight: Spacing.sm }} />
              <Text style={styles.signInText}>Sign In to Complete Purchase</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Bottom padding */}
          <View style={{ height: Platform.OS === 'ios' ? Spacing.xxxl : Spacing.lg }} />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.md,
    ...Shadow.xl,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.xl,
  },
  closeBtn: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.xl,
    zIndex: 10,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h3,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.bodySm,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    lineHeight: 20,
    paddingHorizontal: Spacing.lg,
  },
  signInWrapper: {
    marginBottom: Spacing.xl,
  },
  signInButton: {
    flexDirection: 'row',
    height: 52,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    ...Typography.captionMedium,
    marginHorizontal: Spacing.lg,
  },
  guestButton: {
    flexDirection: 'row',
    height: 52,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  guestText: {
    ...Typography.button,
  },
});

export default React.memo(GuestCheckoutModal);

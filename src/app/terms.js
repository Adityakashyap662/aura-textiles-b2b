import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';

export default function TermsScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#000000' }]} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={12}
        >
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.bodyText}>
          By creating an account on Luxaen, you agree to follow and be bound by these Terms & Conditions. If you do not agree, please do not register.
        </Text>

        <Text style={styles.sectionTitle}>2. Account Security</Text>
        <Text style={styles.bodyText}>
          You are responsible for maintaining the confidentiality of your login credentials and are fully responsible for all activities that occur under your account. You agree to immediately notify us of any unauthorized use.
        </Text>

        <Text style={styles.sectionTitle}>3. User Behavior & Responsibilities</Text>
        <Text style={styles.bodyText}>
          You must provide accurate, current, and complete information during registration. You agree not to upload false information, impersonate others, or engage in malicious behavior on the platform.
        </Text>

        <Text style={styles.sectionTitle}>4. Premium Services & Purchases</Text>
        <Text style={styles.bodyText}>
          Luxaen provides high-end premium clothing and beauty products. All orders are subject to availability and acceptance by our system. Deliveries are subject to local address availability checks.
        </Text>

        <Text style={styles.sectionTitle}>5. Modifications to Terms</Text>
        <Text style={styles.bodyText}>
          We reserve the right to modify these terms at any time. Changes will be updated on this page and your continued use of the platform constitutes agreement to the updated terms.
        </Text>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  headerTitle: {
    ...Typography.bodyMedium,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#D4AF37',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
    letterSpacing: 0.5,
  },
  bodyText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
});

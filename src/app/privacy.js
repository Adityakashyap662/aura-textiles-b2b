import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';

export default function PrivacyScreen() {
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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.bodyText}>
          We collect your name, email address, phone number, password, and location address (country, city, zip code) during registration to provide a secure and customized shopping experience.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.bodyText}>
          We use your account details to handle orders, authenticate logins via credentials and OTP, verify delivery availability for your zip code, and display your personalized dashboard profile.
        </Text>

        <Text style={styles.sectionTitle}>3. Storage & Security</Text>
        <Text style={styles.bodyText}>
          Your credentials and profile are saved securely on the local device Redux store storage. We use strict mock verification methods to validate OTP codes and block incorrect credentials.
        </Text>

        <Text style={styles.sectionTitle}>4. Sharing Your Data</Text>
        <Text style={styles.bodyText}>
          Luxaen values your privacy. We do not sell or trade your personal profile data to third-party advertisers. All location data is strictly used to evaluate shipping availability.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.bodyText}>
          You have the right to update your profile data, edit your default addresses, or delete your account at any time from your account settings menu.
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

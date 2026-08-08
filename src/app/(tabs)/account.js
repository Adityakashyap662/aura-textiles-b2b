import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import {
  selectIsLoggedIn,
  selectUserProfile,
  selectSavedCards,
  selectUpiIds,
  logout,
  deleteAccount,
  setCredits,
} from '@/store/userSlice';
import { api } from '@/utils/api';
import { clearCart } from '@/store/cartSlice';

const FAQ_DATA = [
  {
    q: 'What is the return policy?',
    a: 'We accept returns within 15 days of delivery. Items must be unused, unwashed, and in original packaging with tags attached. Refunds are processed within 5–7 business days after we receive the returned item.',
  },
  {
    q: 'How do I cancel an order?',
    a: 'You can cancel an order before it ships from "Your Orders" section. Once shipped, you\'ll need to wait for delivery and then initiate a return. Cancellation refunds are processed within 2–3 business days.',
  },
  {
    q: 'When will I receive my refund?',
    a: 'Refunds for cancelled orders are processed within 2–3 business days. For returned items, refunds are initiated within 5–7 business days after the item is received at our warehouse. The amount reflects in your account based on your bank\'s processing time.',
  },
];

// Menu item component
const MenuItem = ({ icon, label, subtitle, onPress, trailing, theme, danger }) => (
  <TouchableOpacity
    style={[styles.menuItem, { borderBottomColor: theme.borderLight }]}
    onPress={onPress}
    activeOpacity={0.6}
  >
    <View style={[styles.menuIcon, { backgroundColor: danger ? theme.error + '12' : theme.accent + '10' }]}>
      <Ionicons name={icon} size={20} color={danger ? theme.error : theme.accent} />
    </View>
    <View style={styles.menuContent}>
      <Text style={[styles.menuLabel, { color: danger ? theme.error : theme.text }]}>{label}</Text>
      {subtitle ? (
        <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]} numberOfLines={1}>
          {subtitle}
        </Text>
      ) : null}
    </View>
    {trailing || (
      <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} />
    )}
  </TouchableOpacity>
);

// FAQ Accordion Item
const FAQItem = ({ item, expanded, onToggle, theme }) => (
  <View style={[styles.faqItem, { borderBottomColor: theme.borderLight }]}>
    <TouchableOpacity onPress={onToggle} style={styles.faqHeader} activeOpacity={0.6}>
      <Text style={[styles.faqQuestion, { color: theme.text }]}>{item.q}</Text>
      <Ionicons
        name={expanded ? 'chevron-up' : 'chevron-down'}
        size={18}
        color={theme.textTertiary}
      />
    </TouchableOpacity>
    {expanded && (
      <Text style={[styles.faqAnswer, { color: theme.textSecondary }]}>{item.a}</Text>
    )}
  </View>
);

export default function AccountScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const profile = useSelector(selectUserProfile);
  const savedCards = useSelector(selectSavedCards);
  const upiIds = useSelector(selectUpiIds);

  // Sync profile/credits with backend on mount/focus
  useEffect(() => {
    if (isLoggedIn && profile?.email) {
      api.getUser(profile.email)
        .then(freshUser => {
          if (freshUser) {
            dispatch(setCredits(freshUser.credits || 0));
          }
        })
        .catch(err => console.log('Mobile API: Error syncing user profile', err));
    }
  }, [isLoggedIn, profile?.email, dispatch]);

  const [paymentExpanded, setPaymentExpanded] = useState(false);
  const [helpExpanded, setHelpExpanded] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out? Your cart will be cleared.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            dispatch(clearCart());
            Toast.show({
              type: 'info',
              text1: 'Logged out',
              text2: 'You have been successfully logged out.',
              visibilityTime: 2000,
            });
            router.replace('/(tabs)/');
          },
        },
      ]
    );
  }, [dispatch, router]);

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      'Delete Account',
      'Warning: This action is permanent and cannot be undone. All your orders, saved addresses, and profile details will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteAccount());
            dispatch(clearCart());
            Toast.show({
              type: 'error',
              text1: 'Account Deleted',
              text2: 'Your account has been permanently removed.',
              visibilityTime: 2500,
            });
            router.replace('/(tabs)/');
          },
        },
      ]
    );
  }, [dispatch, router]);

  const avatarColor = isDark ? theme.accent : theme.gradientStart;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={[styles.profileSection, { backgroundColor: theme.card }]}>
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
              <Text style={styles.avatarText}>
                {isLoggedIn ? (profile.initials || (profile.name ? profile.name.substring(0, 2).toUpperCase() : 'GU')) : 'GU'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: theme.text }]}>
                {isLoggedIn ? (profile.name || 'User') : 'Guest User'}
              </Text>
              {isLoggedIn && profile.email ? (
                <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>
                  {profile.email}
                </Text>
              ) : null}
              {isLoggedIn && profile.phone ? (
                <Text style={[styles.profilePhone, { color: theme.textTertiary }]}>
                  +91 {profile.phone}
                </Text>
              ) : null}
              {isLoggedIn ? (
                <Text style={{ color: '#D4AF37', fontWeight: '700', fontSize: 12, marginTop: 4 }}>
                  👑 Credits: {profile.credits || 0}
                </Text>
              ) : null}
            </View>
            {isLoggedIn ? (
              <TouchableOpacity
                style={[styles.editProfileBtn, { borderColor: theme.border }]}
                onPress={() => router.push('/edit-profile')}
                activeOpacity={0.7}
              >
                <Ionicons name="create-outline" size={16} color={theme.accent} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => router.push('/login')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[theme.gradientStart, theme.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientBtn}
                >
                  <Text style={styles.loginBtnText}>Log In</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* My Account Section */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>MY ACCOUNT</Text>
          <MenuItem
            icon="receipt-outline"
            label="Your Orders"
            subtitle="Track, return, or review orders"
            onPress={() => {
              if (isLoggedIn) {
                router.push('/orders');
              } else {
                router.push('/login');
              }
            }}
            theme={theme}
          />
          <MenuItem
            icon="location-outline"
            label="Manage Addresses"
            subtitle="Add or edit delivery addresses"
            onPress={() => {
              if (isLoggedIn) {
                router.push('/addresses');
              } else {
                router.push('/login');
              }
            }}
            theme={theme}
          />

          {/* Payment Methods (expandable) */}
          <TouchableOpacity
            style={[styles.menuItem, { borderBottomColor: theme.borderLight }]}
            onPress={() => setPaymentExpanded(!paymentExpanded)}
            activeOpacity={0.6}
          >
            <View style={[styles.menuIcon, { backgroundColor: theme.accent + '10' }]}>
              <Ionicons name="card-outline" size={20} color={theme.accent} />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuLabel, { color: theme.text }]}>Payment Methods</Text>
              <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]} numberOfLines={1}>
                {savedCards.length} card{savedCards.length !== 1 ? 's' : ''} · {upiIds.length} UPI
              </Text>
            </View>
            <Ionicons
              name={paymentExpanded ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={theme.textTertiary}
            />
          </TouchableOpacity>

          {paymentExpanded && (
            <View style={[styles.paymentExpanded, { backgroundColor: theme.background }]}>
              {savedCards.length > 0 && (
                <View style={styles.paymentGroup}>
                  <Text style={[styles.paymentGroupTitle, { color: theme.textTertiary }]}>
                    SAVED CARDS
                  </Text>
                  {savedCards.map((card) => (
                    <View key={card.id} style={[styles.paymentRow, { borderBottomColor: theme.borderLight }]}>
                      <Ionicons
                        name={card.type === 'VISA' ? 'card' : 'card-outline'}
                        size={20}
                        color={theme.accent}
                      />
                      <Text style={[styles.paymentLabel, { color: theme.text }]}>
                        {card.type} •••• {card.last4}
                      </Text>
                      <Text style={[styles.paymentMeta, { color: theme.textTertiary }]}>
                        {card.expiry}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
              {upiIds.length > 0 && (
                <View style={styles.paymentGroup}>
                  <Text style={[styles.paymentGroupTitle, { color: theme.textTertiary }]}>
                    UPI IDs
                  </Text>
                  {upiIds.map((upi, idx) => (
                    <View key={idx} style={[styles.paymentRow, { borderBottomColor: theme.borderLight }]}>
                      <Ionicons name="phone-portrait-outline" size={20} color={theme.accent} />
                      <Text style={[styles.paymentLabel, { color: theme.text }]}>{upi}</Text>
                    </View>
                  ))}
                </View>
              )}
              {savedCards.length === 0 && upiIds.length === 0 && (
                <Text style={[styles.noPayment, { color: theme.textTertiary }]}>
                  No payment methods saved yet.
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Help & Support Section */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>SUPPORT</Text>

          <TouchableOpacity
            style={[styles.menuItem, { borderBottomColor: theme.borderLight }]}
            onPress={() => setHelpExpanded(!helpExpanded)}
            activeOpacity={0.6}
          >
            <View style={[styles.menuIcon, { backgroundColor: theme.accent + '10' }]}>
              <Ionicons name="help-circle-outline" size={20} color={theme.accent} />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuLabel, { color: theme.text }]}>Help & Support</Text>
              <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]} numberOfLines={1}>
                FAQs, returns & refund policy
              </Text>
            </View>
            <Ionicons
              name={helpExpanded ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={theme.textTertiary}
            />
          </TouchableOpacity>

          {helpExpanded && (
            <View style={[styles.faqContainer, { backgroundColor: theme.background }]}>
              {FAQ_DATA.map((item, idx) => (
                <FAQItem
                  key={idx}
                  item={item}
                  expanded={expandedFaq === idx}
                  onToggle={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  theme={theme}
                />
              ))}
            </View>
          )}
        </View>

        {/* Preferences Section */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>PREFERENCES</Text>
          <MenuItem
            icon={isDark ? 'moon' : 'moon-outline'}
            label="Dark Mode"
            subtitle={isDark ? 'On' : 'Off'}
            onPress={toggleTheme}
            theme={theme}
            trailing={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.border, true: theme.accent + '50' }}
                thumbColor={isDark ? theme.accent : '#f4f3f4'}
                ios_backgroundColor={theme.border}
              />
            }
          />
        </View>

        {/* Danger Zone */}
        {isLoggedIn && (
          <View style={[styles.section, { backgroundColor: theme.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.error }]}>DANGER ZONE</Text>
            <MenuItem
              icon="log-out-outline"
              label="Log Out"
              onPress={handleLogout}
              theme={theme}
              danger
              trailing={null}
            />
            <MenuItem
              icon="trash-outline"
              label="Delete Account"
              onPress={handleDeleteAccount}
              theme={theme}
              danger
              trailing={null}
            />
          </View>
        )}

        {/* App version footer */}
        <Text style={[styles.versionText, { color: theme.textTertiary }]}>
          Luxaen v1.0.0
        </Text>

        <View style={{ height: Spacing.huge }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  // Profile
  profileSection: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadow.md,
    overflow: 'hidden',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  avatarText: {
    ...Typography.h4,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...Typography.h4,
    marginBottom: Spacing.xxs,
  },
  profileEmail: {
    ...Typography.bodySm,
    marginBottom: Spacing.xxs,
  },
  profilePhone: {
    ...Typography.caption,
  },
  editProfileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Sections
  section: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadow.sm,
    overflow: 'hidden',
  },
  sectionTitle: {
    ...Typography.tag,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  // Menu Item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    ...Typography.bodySmMedium,
  },
  menuSubtitle: {
    ...Typography.caption,
    marginTop: Spacing.xxs,
  },
  // Payment expanded
  paymentExpanded: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  paymentGroup: {
    marginBottom: Spacing.md,
  },
  paymentGroupTitle: {
    ...Typography.tag,
    marginBottom: Spacing.sm,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: Spacing.md,
  },
  paymentLabel: {
    ...Typography.bodySm,
    flex: 1,
  },
  paymentMeta: {
    ...Typography.caption,
  },
  noPayment: {
    ...Typography.bodySm,
    textAlign: 'center',
    paddingVertical: Spacing.xl,
  },
  // FAQ
  faqContainer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
  },
  faqItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  faqQuestion: {
    ...Typography.bodySmMedium,
    flex: 1,
    paddingRight: Spacing.md,
  },
  faqAnswer: {
    ...Typography.bodySm,
    lineHeight: 22,
    paddingBottom: Spacing.md,
  },
  // Version
  versionText: {
    ...Typography.caption,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
  signInCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  signInIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  signInTitle: {
    ...Typography.h4,
    fontWeight: '700',
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  signInSubtitle: {
    ...Typography.bodySm,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  signInBtn: {
    width: '100%',
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  signInBtnText: {
    ...Typography.buttonSm,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  loginBtn: {
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    ...Typography.buttonSm,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

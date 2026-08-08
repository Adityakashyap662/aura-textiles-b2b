import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme/ThemeContext';
import { selectCartItemCount } from '@/store/cartSlice';
import { selectUserProfile, selectIsLoggedIn } from '@/store/userSlice';
import { Typography } from '@/theme/typography';
import { BorderRadius, Shadow } from '@/theme/spacing';

export default function TabLayout() {
  const { theme } = useTheme();
  const cartItemCount = useSelector(selectCartItemCount);
  const userProfile = useSelector(selectUserProfile);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.tabBarBorder,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
          ...Shadow.md,
          shadowColor: theme.shadow,
          elevation: 8,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textTertiary,
        tabBarLabelStyle: {
          ...Typography.tiny,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <Ionicons
                name={focused ? 'bag' : 'bag-outline'}
                size={24}
                color={color}
              />
              {cartItemCount > 0 && (
                <View style={[styles.badge, { backgroundColor: theme.badge }]}>
                  <Text style={styles.badgeText}>
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused, color, size }) => {
            if (isLoggedIn && userProfile.initials) {
              return (
                <View
                  style={[
                    styles.avatarCircle,
                    {
                      backgroundColor: focused ? theme.accent : theme.inputBg,
                      borderColor: focused ? theme.accent : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.avatarInitials,
                      { color: focused ? '#FFFFFF' : theme.textSecondary },
                    ]}
                  >
                    {userProfile.initials}
                  </Text>
                </View>
              );
            }
            return (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={24}
                color={color}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -8,
    top: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  avatarInitials: {
    fontSize: 11,
    fontWeight: '700',
  },
});

import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, StatusBar, Animated, Dimensions, Text, Image } from 'react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';

import store from '@/store/index';
import { ThemeProvider, useTheme } from '@/theme/ThemeContext';

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

// Animated Splash Overlay
const AnimatedSplashOverlay = ({ onFinish }) => {
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const logoScale = React.useRef(new Animated.Value(0.7)).current;
  const logoOpacity = React.useRef(new Animated.Value(0)).current;
  const subtitleOpacity = React.useRef(new Animated.Value(0)).current;
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Logo entrance
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Subtitle fade in
    setTimeout(() => {
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 250);

    // Progress bar
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Hide splash overlay after 1.3s
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        onFinish && onFinish();
      });
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.4],
  });

  return (
    <Animated.View style={[styles.splashOverlay, { opacity: fadeAnim }]}>
      <View style={styles.splashContentContainer}>
        <StatusBar hidden />
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          {/* Gold logo circle matching login screen */}
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>👑</Text>
          </View>
          <Text style={styles.brandName}>LUXAEN</Text>
          <Animated.Text style={[styles.brandSubtitle, { opacity: subtitleOpacity }]}>
            EXPERIENCE LUXURY SHOPPING
          </Animated.Text>
        </Animated.View>

        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
      </View>
    </Animated.View>
  );
};

// Toast configuration
const toastConfig = {
  success: ({ text1, text2, ...rest }) => (
    <View style={styles.toastSuccess}>
      <Text style={styles.toastText1}>{text1}</Text>
      {text2 && <Text style={styles.toastText2}>{text2}</Text>}
    </View>
  ),
  error: ({ text1, text2, ...rest }) => (
    <View style={styles.toastError}>
      <Text style={styles.toastText1}>{text1}</Text>
      {text2 && <Text style={styles.toastText2}>{text2}</Text>}
    </View>
  ),
  info: ({ text1, text2, ...rest }) => (
    <View style={styles.toastInfo}>
      <Text style={styles.toastText1}>{text1}</Text>
      {text2 && <Text style={styles.toastText2}>{text2}</Text>}
    </View>
  ),
};

// Inner layout that can access theme
const InnerLayout = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.background}
        translucent={false}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ animation: 'fade' }} />
        <Stack.Screen name="plp" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="orders" />
        <Stack.Screen name="order/[id]" />
        <Stack.Screen name="addresses" />
        <Stack.Screen name="edit-profile" />
        <Stack.Screen name="login" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="signup" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="forgot-password" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="terms" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="privacy" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </View>
  );
};

// Root Layout
export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    // Hide the native splash screen immediately so our animated splash overlay takes over
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <InnerLayout />
        {!splashDone && <AnimatedSplashOverlay onFinish={() => setSplashDone(true)} />}
        <Toast config={toastConfig} />
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Splash
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    backgroundColor: '#000000',
  },
  splashContentContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.35)',
  },
  logoEmoji: {
    fontSize: 34,
  },
  brandName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 10,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  brandSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.45)',
    letterSpacing: 3,
    textAlign: 'center',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.4,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 2,
  },
  // Toast
  toastSuccess: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#28A745',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  toastError: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#DC3545',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  toastInfo: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#E94560',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  toastText1: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  toastText2: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
});

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { login, selectRegisteredUsers } from '@/store/userSlice';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const redirect = params.redirect;

  const registeredUsers = useSelector(selectRegisteredUsers);

  // Auth States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Focus email input automatically on mount
  useEffect(() => {
    if (emailInputRef.current) {
      setTimeout(() => emailInputRef.current?.focus(), 150);
    }
  }, []);

  const handleLogin = useCallback(() => {
    if (!email.trim() || !email.includes('@')) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter a valid email address.',
        visibilityTime: 2000,
      });
      return;
    }
    if (password.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Password must be at least 8 characters.',
        visibilityTime: 2000,
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      const matchedUser = registeredUsers.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );

      if (matchedUser) {
        dispatch(login(matchedUser));
        Toast.show({
          type: 'success',
          text1: 'Login Successful! 🎉',
          text2: `Welcome back, ${matchedUser.profile?.name || 'User'}!`,
          visibilityTime: 3000,
        });

        if (redirect === 'cart') {
          router.replace('/(tabs)/cart');
        } else {
          router.replace('/(tabs)/');
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Incorrect email id or password.',
          visibilityTime: 3000,
        });
      }
    }, 1200);
  }, [email, password, registeredUsers, redirect, dispatch, router]);

  const handleGoogleLogin = useCallback(() => {
    setIsSocialLoading(true);
    setTimeout(() => {
      setIsSocialLoading(false);
      
      // Load or simulate Google user login
      const googleUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === 'sneha@example.com'
      ) || {
        email: 'googleuser@example.com',
        profile: {
          name: 'Google User',
          phone: '9876543210',
          avatar: null,
          initials: 'GU'
        }
      };

      dispatch(login(googleUser));
      Toast.show({
        type: 'success',
        text1: 'Google Login Success 👑',
        text2: 'Logged in successfully with Google account.',
        visibilityTime: 2500,
      });

      if (redirect === 'cart') {
        router.replace('/(tabs)/cart');
      } else {
        router.replace('/(tabs)/');
      }
    }, 1200);
  }, [registeredUsers, redirect, dispatch, router]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: '#000000' }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <View style={styles.content}>
          {/* Header Branding */}
          <View style={styles.brandHeader}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>👑</Text>
            </View>
            <Text style={styles.brandName}>LUXAEN</Text>
            <Text style={styles.brandSubtitle}>Sign in to your premium account</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={emailInputRef}
                  style={styles.input}
                  placeholder="Enter your registered email"
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <Text style={[styles.inputLabel, { marginTop: Spacing.md }]}>PASSWORD</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={passwordInputRef}
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  hitSlop={8}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="rgba(255, 255, 255, 0.45)"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => router.push('/forgot-password')}
                activeOpacity={0.7}
                style={styles.forgotPasswordBtn}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.8}
                style={styles.actionBtn}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={[theme.gradientStart, theme.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientBtn}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={styles.btnText}>Login</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Social Separator */}
            <View style={styles.separatorRow}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>OR CONNECT WITH</Text>
              <View style={styles.line} />
            </View>

            {/* Google Sign-In Button */}
            <TouchableOpacity
              onPress={handleGoogleLogin}
              activeOpacity={0.8}
              style={styles.socialBtn}
              disabled={isSocialLoading}
            >
              {isSocialLoading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <Ionicons name="logo-google" size={18} color="#EA4335" style={{ marginRight: Spacing.sm }} />
                  <Text style={styles.socialBtnText}>Continue with Gmail</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity
              onPress={() => router.push('/signup')}
              activeOpacity={0.7}
              style={styles.signupLinkContainer}
            >
              <Text style={styles.signupLinkText}>
                Don't have an account? <Text style={styles.signupLinkHighlight}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    justifyContent: 'center',
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  logoEmoji: {
    fontSize: 30,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 8,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
  },
  brandSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.45)',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#D4AF37',
    letterSpacing: 1.5,
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 15,
  },
  forgotPasswordBtn: {
    alignSelf: 'flex-end',
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  forgotPasswordText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  actionBtn: {
    height: 52,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginTop: Spacing.md,
    ...Shadow.md,
  },
  gradientBtn: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xxl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  separatorText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: Spacing.md,
    letterSpacing: 1.5,
  },
  socialBtn: {
    flexDirection: 'row',
    height: 52,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  socialBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  signupLinkContainer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    paddingVertical: Spacing.xs,
  },
  signupLinkText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
  },
  signupLinkHighlight: {
    color: '#D4AF37',
    fontWeight: '700',
  },
});

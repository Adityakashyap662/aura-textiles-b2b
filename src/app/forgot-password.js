import React, { useState, useEffect, useRef } from 'react';
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
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { selectRegisteredUsers, updateUserPassword } from '@/store/userSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { ApiService } from '@/services/api';

export default function ForgotPasswordScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const registeredUsers = useSelector(selectRegisteredUsers);

  // Flow State
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP, 3 = Reset Password

  // Data States
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status States
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  // Focus OTP box automatically
  useEffect(() => {
    if (step === 2 && inputRefs.current[0]) {
      setTimeout(() => inputRefs.current[0]?.focus(), 150);
    }
  }, [step]);

  // Password Strength Calculator
  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', score: 0, pct: 0, color: 'rgba(255,255,255,0.1)' };
    const hasAlpha = /[a-zA-Z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    let score = 0;
    if (isLongEnough) score += 1;
    if (hasAlpha && hasNumeric) score += 1;
    if (hasSpecial) score += 1;

    if (!isLongEnough) {
      return { label: 'Weak', score: 0, pct: 20, color: '#EF4444' };
    }

    if (score === 1) {
      return { label: 'Weak', score, pct: 33, color: '#EF4444' };
    } else if (score === 2) {
      return { label: 'Medium', score, pct: 66, color: '#F59E0B' };
    } else if (score >= 3) {
      return { label: 'Strong', score, pct: 100, color: '#10B981' };
    }
    return { label: 'Weak', score: 0, pct: 20, color: '#EF4444' };
  };

  const strength = getPasswordStrength();

  const handleSendOtp = () => {
    if (!email.trim() || !email.includes('@')) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please enter a valid email address.' });
      return;
    }

    // Verify account exists
    const exists = registeredUsers.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!exists) {
      Toast.show({ type: 'error', text1: 'Account Error', text2: 'No account found with this email ID.' });
      return;
    }

    setIsLoading(true);
    ApiService.sendOtp(email.trim().toLowerCase(), 'forgot')
      .then((res) => {
        setIsLoading(false);
        setStep(2);
        setTimer(30);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        
        let msg = 'Verification code sent to your email outbox.';
        if (res.previewUrl) {
          msg = `[Ethereal Sandbox] OTP sent. Check logs or preview link: ${res.previewUrl}`;
        }

        Toast.show({
          type: 'success',
          text1: 'Verification Code Sent! 📧',
          text2: msg,
          visibilityTime: 6000,
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.show({ type: 'error', text1: 'OTP Dispatch Failed', text2: err.message });
      });
  };

  const handleOtpChange = (val, index) => {
    const cleanVal = val.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleanVal.substring(cleanVal.length - 1);
    setOtp(newOtp);

    if (cleanVal) {
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      Toast.show({ type: 'error', text1: 'Invalid Code', text2: 'Please enter 6 verification digits.' });
      return;
    }

    setIsLoading(true);
    ApiService.verifyOtp(email.trim().toLowerCase(), otpCode)
      .then(() => {
        setIsLoading(false);
        setStep(3);
        Toast.show({
          type: 'success',
          text1: 'OTP Verified ✓',
          text2: 'Please enter your new password.',
          visibilityTime: 2000,
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.show({ type: 'error', text1: 'Verification Failed', text2: err.message });
      });
  };

  const handleResendOtp = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();

    ApiService.sendOtp(email.trim().toLowerCase(), 'forgot')
      .then((res) => {
        let msg = 'Verification code resent to your email.';
        if (res.previewUrl) {
          msg = `Check console logs or preview link: ${res.previewUrl}`;
        }
        Toast.show({
          type: 'info',
          text1: 'Verification Resent 📧',
          text2: msg,
          visibilityTime: 5000,
        });
      })
      .catch((err) => {
        Toast.show({ type: 'error', text1: 'Resend Failed', text2: err.message });
      });
  };

  const handleResetPassword = () => {
    if (password.length < 8) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Password must be at least 8 characters long.' });
      return;
    }
    if (strength.label === 'Weak') {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please enter a stronger password.' });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Passwords do not match.' });
      return;
    }

    setIsLoading(true);
    ApiService.updateUserDetails(email.trim().toLowerCase(), { password })
      .then(() => {
        setIsLoading(false);
        dispatch(updateUserPassword({ email: email.trim().toLowerCase(), password }));
        Toast.show({
          type: 'success',
          text1: 'Password Reset Successful! 🎉',
          text2: 'You can now log in with your new password.',
          visibilityTime: 3000,
        });
        router.replace('/login');
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.show({ type: 'error', text1: 'Password Reset Failed', text2: err.message });
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: '#000000' }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => {
            if (step === 3) setStep(2);
            else if (step === 2) setStep(1);
            else router.back();
          }}
          style={[styles.backButton, { backgroundColor: 'rgba(255, 255, 255, 0.08)' }]}
          hitSlop={12}
        >
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.content}>
          {step === 1 && (
            /* Step 1: Email Input */
            <>
              <View style={styles.brandHeader}>
                <Text style={styles.brandName}>RESET</Text>
                <Text style={styles.brandSubtitle}>Enter your email to receive verification code</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your registered email"
                      placeholderTextColor="rgba(255, 255, 255, 0.3)"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleSendOtp}
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
                      <Text style={styles.btnText}>Send Code</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 2 && (
            /* Step 2: OTP Verification */
            <>
              <View style={styles.brandHeader}>
                <Text style={styles.brandName}>VERIFY</Text>
                <Text style={styles.brandSubtitle}>Enter the 6-digit OTP code sent to your email</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.otpContainer}>
                  {otp.map((digit, idx) => (
                    <TextInput
                      key={idx}
                      ref={(ref) => (inputRefs.current[idx] = ref)}
                      style={[
                        styles.otpBox,
                        { borderColor: digit ? '#D4AF37' : 'rgba(255, 255, 255, 0.15)' }
                      ]}
                      placeholder="-"
                      placeholderTextColor="rgba(255, 255, 255, 0.2)"
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={(val) => handleOtpChange(val, idx)}
                      textAlign="center"
                    />
                  ))}
                </View>

                <View style={styles.timerRow}>
                  {canResend ? (
                    <TouchableOpacity onPress={handleResendOtp}>
                      <Text style={styles.resendText}>Resend OTP Code</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.timerText}>Resend in {timer}s</Text>
                  )}
                  <TouchableOpacity onPress={() => setStep(1)}>
                    <Text style={styles.changePhoneText}>Edit Email</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={handleVerifyOtp}
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
                      <Text style={styles.btnText}>Verify Code</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 3 && (
            /* Step 3: New Password Input */
            <>
              <View style={styles.brandHeader}>
                <Text style={styles.brandName}>NEW PASSWORD</Text>
                <Text style={styles.brandSubtitle}>Create your secure new password</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>NEW PASSWORD *</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="At least 8 characters"
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

                  {/* Password Strength Meter */}
                  {password.length > 0 && (
                    <View style={styles.strengthMeterContainer}>
                      <View style={styles.strengthTrack}>
                        <View style={[styles.strengthFill, { width: `${strength.pct}%`, backgroundColor: strength.color }]} />
                      </View>
                      <Text style={[styles.strengthLabelText, { color: strength.color }]}>
                        Strength: {strength.label}
                      </Text>
                      <Text style={styles.strengthTip}>
                        Tip: Use alphanumeric characters for a strong password.
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>CONFIRM PASSWORD *</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm new password"
                      placeholderTextColor="rgba(255, 255, 255, 0.3)"
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      activeOpacity={0.7}
                      hitSlop={8}
                    >
                      <Ionicons
                        name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="rgba(255, 255, 255, 0.45)"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Password Match Indicator */}
                  {confirmPassword.length > 0 && (
                    <Text style={{
                      fontSize: 11,
                      fontWeight: '700',
                      marginTop: 6,
                      color: password === confirmPassword ? '#10B981' : '#EF4444',
                      paddingHorizontal: 2,
                    }}>
                      {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={handleResetPassword}
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
                      <Text style={styles.btnText}>Reset Password</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    justifyContent: 'center',
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
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
    paddingHorizontal: Spacing.lg,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.md,
    gap: Spacing.xs,
  },
  otpBox: {
    width: '13%',
    height: 50,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
    paddingHorizontal: 4,
  },
  timerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.45)',
  },
  resendText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D4AF37',
  },
  changePhoneText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.45)',
    textDecorationLine: 'underline',
  },
  // Password Strength Meter
  strengthMeterContainer: {
    marginTop: Spacing.xs,
    paddingHorizontal: 2,
  },
  strengthTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    marginBottom: 4,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthLabelText: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  strengthTip: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.4)',
  },
});

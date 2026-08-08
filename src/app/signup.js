import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { registerUser, selectRegisteredUsers } from '@/store/userSlice';
import { countries } from '@/data/countries';
import { validatePincode, verifyZipCodeWithCity } from '@/utils/validators';
import { LinearGradient } from 'expo-linear-gradient';
import { ApiService } from '@/services/api';

export default function SignupScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const registeredUsers = useSelector(selectRegisteredUsers);

  // Sign Up Form States
  const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default India
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Picker States
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState('country'); // country | state | city | phoneCode
  const [pickerOptions, setPickerOptions] = useState([]);
  const [pickerTitle, setPickerTitle] = useState('');

  // Verification States
  const [step, setStep] = useState(1); // 1 = Form, 2 = Email OTP Verification
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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
      return { label: 'Weak', score, pct: 33, color: '#EF4444' }; // Red
    } else if (score === 2) {
      return { label: 'Medium', score, pct: 66, color: '#F59E0B' }; // Orange/Yellow
    } else if (score >= 3) {
      return { label: 'Strong', score, pct: 100, color: '#10B981' }; // Green
    }
    return { label: 'Weak', score: 0, pct: 20, color: '#EF4444' };
  };

  const strength = getPasswordStrength();

  const handlePhotoSelect = () => {
    setPhoto('https://picsum.photos/seed/useravatar/200/200');
    Toast.show({
      type: 'info',
      text1: 'Photo selected 📸',
      text2: 'Mock profile photo uploaded successfully.',
      visibilityTime: 1500,
    });
  };

  const handleOpenPicker = (type) => {
    setPickerType(type);
    if (type === 'country' || type === 'phoneCode') {
      setPickerOptions(countries);
      setPickerTitle(type === 'country' ? 'Select Country' : 'Select Phone Prefix');
      setPickerVisible(true);
    } else if (type === 'state') {
      if (!selectedCountry) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Please select a country first.' });
        return;
      }
      setPickerOptions(selectedCountry.states || []);
      setPickerTitle('Select State');
      setPickerVisible(true);
    } else if (type === 'city') {
      if (!selectedState) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Please select a state first.' });
        return;
      }
      setPickerOptions(selectedState.cities.map(c => ({ name: c })) || []);
      setPickerTitle('Select City');
      setPickerVisible(true);
    }
  };

  const handleSelectItem = (item) => {
    setPickerVisible(false);
    if (pickerType === 'country') {
      setSelectedCountry(item);
      setSelectedState(null);
      setSelectedCity(null);
      setZipCode('');
    } else if (pickerType === 'phoneCode') {
      setSelectedCountry(item); // Selecting prefix aligns selected country too
    } else if (pickerType === 'state') {
      setSelectedState(item);
      setSelectedCity(null);
    } else if (pickerType === 'city') {
      setSelectedCity(item);
    }
  };

  const handleRegisterPress = () => {
    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'First and Last name are mandatory.' });
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please enter a valid email address.' });
      return;
    }
    const emailExists = registeredUsers.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (emailExists) {
      Toast.show({ type: 'error', text1: 'Registration Warning', text2: 'Account already exists' });
      return;
    }
    if (password.length < 8) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Password must be at least 8 characters long.' });
      return;
    }
    if (strength.label === 'Weak') {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please enter a stronger password (must contain letters & numbers).' });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Passwords do not match.' });
      return;
    }
    if (!selectedCountry) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Country is mandatory.' });
      return;
    }
    if (!selectedState) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'State is mandatory.' });
      return;
    }
    if (!selectedCity) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'City is mandatory.' });
      return;
    }

    // Zip code pattern validation
    const zipValidation = validatePincode(zipCode, selectedCountry.name);
    if (!zipValidation.valid) {
      Toast.show({ type: 'error', text1: 'Zip Code Error', text2: zipValidation.message });
      return;
    }

    // Zip code matching city check
    const zipCityCheck = verifyZipCodeWithCity(zipCode, selectedCity.name, selectedCountry.name);
    if (!zipCityCheck.valid) {
      Toast.show({ type: 'error', text1: 'Location Match Error', text2: zipCityCheck.message });
      return;
    }

    if (!termsAccepted) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'You must accept the Terms and Conditions.' });
      return;
    }
    if (!privacyAccepted) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'You must accept the Privacy Policy.' });
      return;
    }

    // OTP verification request via Express backend
    setIsLoading(true);
    ApiService.sendOtp(email.trim().toLowerCase(), 'signup')
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

  // Cross-platform safe OTP focus navigation (on text changes)
  const handleOtpChange = (val, index) => {
    const cleanVal = val.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleanVal.substring(cleanVal.length - 1);
    setOtp(newOtp);

    if (cleanVal) {
      // Input entered -> move forward
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      // Input deleted -> move backward
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
        const fullName = `${firstName.trim()} ${lastName.trim()}`;
        const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
        
        const payload = {
          email: email.trim().toLowerCase(),
          password: password,
          profile: {
            name: fullName,
            email: email.trim().toLowerCase(),
            phone: `${selectedCountry.phoneCode} ${phone.trim()}`,
            avatar: photo,
            initials: initials,
          },
          addresses: [
            {
              id: `addr_${Date.now()}`,
              name: fullName,
              phone: `${selectedCountry.phoneCode} ${phone.trim()}`,
              pincode: zipCode.trim(),
              city: selectedCity.name,
              state: selectedState.name,
              street: 'Provided at Registration',
              isDefault: true,
            },
          ],
          savedCards: [],
          upiIds: [],
        };

        // Register in Express / MongoDB backend
        return ApiService.registerUser(payload.email, payload.password, payload.profile)
          .then((backendUser) => {
            setIsLoading(false);
            dispatch(registerUser(payload));
            Toast.show({
              type: 'success',
              text1: 'Registration Complete! 🎉',
              text2: 'Account created. You can now log in.',
              visibilityTime: 3000,
            });
            router.replace('/login');
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
    
    ApiService.sendOtp(email.trim().toLowerCase(), 'signup')
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: '#000000' }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => (step === 2 ? setStep(1) : router.back())}
          style={[styles.backButton, { backgroundColor: 'rgba(255, 255, 255, 0.08)' }]}
          hitSlop={12}
        >
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {step === 1 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header */}
            <View style={styles.brandHeader}>
              <Text style={styles.brandName}>LUXAEN</Text>
              <Text style={styles.brandSubtitle}>Create your premium account</Text>
            </View>

            {/* Avatar Photo Selector */}
            <View style={styles.avatarSection}>
              <TouchableOpacity
                onPress={handlePhotoSelect}
                activeOpacity={0.8}
                style={styles.avatarWrapper}
              >
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.avatarImage} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="camera-outline" size={32} color="#D4AF37" />
                    <Text style={styles.avatarLabel}>Add Photo</Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text style={styles.photoTip}>Mock upload (optional)</Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              <View style={styles.rowFields}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing.sm }]}>
                  <Text style={styles.inputLabel}>FIRST NAME *</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      placeholderTextColor="rgba(255, 255, 255, 0.3)"
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: Spacing.sm }]}>
                  <Text style={styles.inputLabel}>LAST NAME *</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      placeholderTextColor="rgba(255, 255, 255, 0.3)"
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>EMAIL ID *</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="example@email.com"
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>PHONE NUMBER</Text>
                <View style={styles.inputContainer}>
                  <TouchableOpacity
                    onPress={() => handleOpenPicker('phoneCode')}
                    style={styles.phonePrefixBtn}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.phonePrefixText}>
                      {selectedCountry ? `${selectedCountry.flag}  ${selectedCountry.phoneCode}` : '🇮🇳  +91'}
                    </Text>
                    <Ionicons name="chevron-down" size={12} color="rgba(255, 255, 255, 0.5)" style={{ marginLeft: 6 }} />
                  </TouchableOpacity>
                  <View style={styles.prefixSeparator} />
                  <TextInput
                    style={styles.input}
                    placeholder="Mobile number"
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
              </View>

              {/* Password Inputs */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>PASSWORD *</Text>
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
                    placeholder="Re-enter password"
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

              {/* Dynamic Pickers for Country, State, City */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>COUNTRY *</Text>
                <TouchableOpacity
                  onPress={() => handleOpenPicker('country')}
                  activeOpacity={0.8}
                  style={styles.inputContainer}
                >
                  <Text style={[styles.pickerValueText, { color: selectedCountry ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)' }]}>
                    {selectedCountry ? `${selectedCountry.flag}   ${selectedCountry.name}` : 'Select Country'}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#D4AF37" />
                </TouchableOpacity>
              </View>

              <View style={styles.rowFields}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing.sm }]}>
                  <Text style={styles.inputLabel}>STATE *</Text>
                  <TouchableOpacity
                    onPress={() => handleOpenPicker('state')}
                    activeOpacity={0.8}
                    style={styles.inputContainer}
                  >
                    <Text style={[styles.pickerValueText, { color: selectedState ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)' }]} numberOfLines={1}>
                      {selectedState ? selectedState.name : 'Select State'}
                    </Text>
                    <Ionicons name="chevron-down" size={14} color="#D4AF37" />
                  </TouchableOpacity>
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: Spacing.sm }]}>
                  <Text style={styles.inputLabel}>CITY *</Text>
                  <TouchableOpacity
                    onPress={() => handleOpenPicker('city')}
                    activeOpacity={0.8}
                    style={styles.inputContainer}
                  >
                    <Text style={[styles.pickerValueText, { color: selectedCity ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)' }]} numberOfLines={1}>
                      {selectedCity ? selectedCity.name : 'Select City'}
                    </Text>
                    <Ionicons name="chevron-down" size={14} color="#D4AF37" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  ZIP CODE / PINCODE * {selectedCountry && `(${selectedCountry.zipFormatHelp})`}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Zip/Pincode"
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={zipCode}
                    onChangeText={setZipCode}
                  />
                </View>
              </View>

              {/* Checkboxes */}
              <View style={styles.checkboxGroup}>
                <View style={styles.checkboxRow}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setTermsAccepted(!termsAccepted)}
                    style={[
                      styles.checkbox,
                      { borderColor: termsAccepted ? '#D4AF37' : 'rgba(255, 255, 255, 0.3)' },
                      termsAccepted && { backgroundColor: '#D4AF37' }
                    ]}
                  >
                    {termsAccepted && <Ionicons name="checkmark" size={14} color="#000000" />}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>
                    I agree to the{' '}
                    <Text onPress={() => router.push('/terms')} style={styles.linkText}>
                      Terms & Conditions
                    </Text>{' '}
                    *
                  </Text>
                </View>

                <View style={styles.checkboxRow}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPrivacyAccepted(!privacyAccepted)}
                    style={[
                      styles.checkbox,
                      { borderColor: privacyAccepted ? '#D4AF37' : 'rgba(255, 255, 255, 0.3)' },
                      privacyAccepted && { backgroundColor: '#D4AF37' }
                    ]}
                  >
                    {privacyAccepted && <Ionicons name="checkmark" size={14} color="#000000" />}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>
                    I agree to the{' '}
                    <Text onPress={() => router.push('/privacy')} style={styles.linkText}>
                      Privacy Policy
                    </Text>{' '}
                    *
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleRegisterPress}
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
                    <Text style={styles.btnText}>Register & Verify</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.replace('/login')}
                activeOpacity={0.7}
                style={styles.loginLink}
              >
                <Text style={styles.loginLinkText}>
                  Already have an account? <Text style={styles.loginLinkHighlight}>Log In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          /* Step 2: OTP Verification Screen */
          <View style={styles.otpContent}>
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
                  <Text style={styles.changePhoneText}>Edit Profile Details</Text>
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
                    <Text style={styles.btnText}>Verify & Register</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Dynamic Selection Overlay Modal */}
        <Modal
          visible={pickerVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setPickerVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setPickerVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={[styles.modalContent, { backgroundColor: theme.card, borderColor: theme.borderLight }]}>
                  <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, { color: theme.text }]}>{pickerTitle}</Text>
                    <TouchableOpacity onPress={() => setPickerVisible(false)}>
                      <Ionicons name="close" size={24} color={theme.textSecondary} />
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    data={pickerOptions}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.optionsList}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleSelectItem(item)}
                        style={[styles.optionItem, { borderBottomColor: theme.borderLight }]}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.optionItemText, { color: theme.text }]}>
                          {item.flag ? `${item.flag}   ` : ''}
                          {item.name || item} 
                          {pickerType === 'phoneCode' && item.phoneCode ? ` (${item.phoneCode})` : ''}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
  scrollContent: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
    paddingBottom: 60,
  },
  otpContent: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    justifyContent: 'center',
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D4AF37',
    marginTop: 2,
  },
  photoTip: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  formContainer: {
    width: '100%',
  },
  rowFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  phonePrefixBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingRight: Spacing.xs,
  },
  phonePrefixText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  prefixSeparator: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: Spacing.sm,
  },
  pickerValueText: {
    flex: 1,
    fontSize: 15,
  },
  checkboxGroup: {
    marginVertical: Spacing.md,
    gap: Spacing.sm,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.xs,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  checkboxLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  linkText: {
    color: '#D4AF37',
    textDecorationLine: 'underline',
    fontWeight: '600',
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
  loginLink: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    paddingVertical: Spacing.xs,
  },
  loginLinkText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
  },
  loginLinkHighlight: {
    color: '#D4AF37',
    fontWeight: '700',
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
  // Selection Modal overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    maxHeight: '65%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  optionsList: {
    paddingHorizontal: Spacing.lg,
  },
  optionItem: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  optionItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

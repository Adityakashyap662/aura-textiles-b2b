import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { validatePincode, getCityFromPincode } from '@/utils/validators';
import { setPincode, selectPincode } from '@/store/appSlice';
import { LinearGradient } from 'expo-linear-gradient';

const PincodeModal = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const currentPincode = useSelector(selectPincode);
  const [pincodeVal, setPincodeVal] = useState(currentPincode || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setPincodeVal(currentPincode || '');
      setError('');
    }
  }, [visible, currentPincode]);

  const handleConfirm = () => {
    const valResult = validatePincode(pincodeVal);
    if (!valResult.valid) {
      setError('We do not deliver to this area yet.');
      return;
    }

    // Mock check for certain undeliverable codes as seen in validators.js checkDelivery
    const noDelivery = ['100000', '200000', '800000'];
    if (noDelivery.includes(pincodeVal)) {
      setError('We do not deliver to this area yet.');
      return;
    }

    setError('');
    const cityInfo = getCityFromPincode(pincodeVal);
    dispatch(setPincode({ pincode: pincodeVal, city: cityInfo.city }));
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.overlay, { backgroundColor: theme.overlay || 'rgba(0,0,0,0.5)' }]}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={[
                styles.bottomSheet,
                {
                  backgroundColor: theme.card,
                  borderTopLeftRadius: BorderRadius.xl,
                  borderTopRightRadius: BorderRadius.xl,
                },
              ]}
            >
              <View style={[styles.dragIndicator, { backgroundColor: theme.borderLight }]} />

              <View style={styles.header}>
                <Text style={[styles.title, { color: theme.text }]}>Enter Delivery Pincode</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
                  <Ionicons name="close" size={24} color={theme.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.content}>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                  Enter your pincode to check delivery availability and options.
                </Text>

                <TextInput
                  value={pincodeVal}
                  onChangeText={(text) => {
                    setPincodeVal(text.replace(/[^0-9]/g, '').slice(0, 6));
                    setError('');
                  }}
                  keyboardType="number-pad"
                  placeholder="6-digit pincode"
                  placeholderTextColor={theme.textTertiary}
                  maxLength={6}
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBg || theme.background,
                      color: theme.text,
                      borderColor: error ? (theme.error || '#FF3B30') : (theme.border || '#E0E0E0'),
                    },
                  ]}
                />

                {error ? (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={16} color={theme.error || '#FF3B30'} />
                    <Text style={[styles.errorText, { color: theme.error || '#FF3B30' }]}>
                      {error}
                    </Text>
                  </View>
                ) : null}

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleConfirm}
                  style={styles.confirmBtn}
                >
                  <LinearGradient
                    colors={[theme.gradientStart, theme.gradientEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientBtn}
                  >
                    <Text style={styles.confirmBtnText}>Confirm</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  dragIndicator: {
    width: 36,
    height: 4,
    borderRadius: BorderRadius.xs,
    alignSelf: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  title: {
    ...Typography.h4,
    fontWeight: '700',
  },
  closeBtn: {
    padding: Spacing.xs,
  },
  content: {
    paddingHorizontal: Spacing.xl,
  },
  subtitle: {
    ...Typography.bodySm,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    ...Typography.body,
    fontSize: 16,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
    marginTop: Spacing.xxs,
  },
  errorText: {
    ...Typography.bodySmMedium,
    fontSize: 13,
  },
  confirmBtn: {
    height: 48,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginTop: Spacing.xs,
  },
  gradientBtn: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default PincodeModal;

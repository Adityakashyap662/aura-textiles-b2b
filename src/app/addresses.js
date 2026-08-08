import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  TextInput,
  Switch,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import {
  selectAddresses,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
} from '@/store/userSlice';
import {
  validatePincode,
  validatePhone,
  validateName,
  getCityFromPincode,
} from '@/utils/validators';

export default function AddressesScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const addresses = useSelector(selectAddresses);

  // Form Modal state
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  // Autofill City and State based on Pincode
  const handlePincodeChange = (text) => {
    const cleaned = text.replace(/\D/g, '').substring(0, 6);
    setPincode(cleaned);
    if (cleaned.length === 6) {
      const valid = validatePincode(cleaned);
      if (valid.valid) {
        const lookup = getCityFromPincode(cleaned);
        if (lookup) {
          setCity(lookup.city);
          setState(lookup.state);
        }
      }
    }
  };

  const openAddForm = () => {
    setEditingAddressId(null);
    setName('');
    setPhone('');
    setPincode('');
    setCity('');
    setState('');
    setStreet('');
    setLandmark('');
    setIsDefault(addresses.length === 0); // Force default if it's the first address
    setFormModalVisible(true);
  };

  const openEditForm = (addr) => {
    setEditingAddressId(addr.id);
    setName(addr.name);
    setPhone(addr.phone);
    setPincode(addr.pincode);
    setCity(addr.city);
    setState(addr.state);
    setStreet(addr.street);
    setLandmark(addr.landmark || '');
    setIsDefault(addr.isDefault);
    setFormModalVisible(true);
  };

  const handleSave = () => {
    // Validate inputs
    const nameValid = validateName(name);
    if (!nameValid.valid) {
      Toast.show({ type: 'error', text1: 'Invalid Name', text2: nameValid.message });
      return;
    }

    const phoneValid = validatePhone(phone);
    if (!phoneValid.valid) {
      Toast.show({ type: 'error', text1: 'Invalid Phone Number', text2: phoneValid.message });
      return;
    }

    const pincodeValid = validatePincode(pincode);
    if (!pincodeValid.valid) {
      Toast.show({ type: 'error', text1: 'Invalid Pincode', text2: pincodeValid.message });
      return;
    }

    if (!street.trim()) {
      Toast.show({ type: 'error', text1: 'Invalid Address', text2: 'Street/Landmark is required.' });
      return;
    }

    if (!city.trim() || !state.trim()) {
      Toast.show({ type: 'error', text1: 'Invalid Location', text2: 'City and State are required.' });
      return;
    }

    const addressData = {
      name: name.trim(),
      phone: phone.trim(),
      pincode: pincode.trim(),
      city: city.trim(),
      state: state.trim(),
      street: street.trim(),
      landmark: landmark.trim(),
      isDefault,
    };

    if (editingAddressId) {
      dispatch(updateAddress({ id: editingAddressId, ...addressData }));
      Toast.show({ type: 'success', text1: 'Address updated successfully!' });
    } else {
      dispatch(addAddress(addressData));
      Toast.show({ type: 'success', text1: 'Address added successfully!' });
    }

    setFormModalVisible(false);
  };

  const handleDelete = (addr) => {
    Alert.alert(
      'Delete Address',
      `Are you sure you want to remove the address for "${addr.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(removeAddress(addr.id));
            Toast.show({ type: 'info', text1: 'Address deleted' });
          },
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={[styles.header, { borderBottomColor: theme.borderLight }]}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.headerBtn, { backgroundColor: theme.surface }]}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={22} color={theme.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: theme.text }]}>Manage Addresses</Text>
      <TouchableOpacity
        onPress={openAddForm}
        style={[styles.headerBtn, { backgroundColor: theme.surface }]}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={22} color={theme.accent} />
      </TouchableOpacity>
    </View>
  );

  const renderAddressCard = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.borderLight }]}>
      <View style={styles.cardHeader}>
        <View style={styles.nameRow}>
          <Text style={[styles.cardName, { color: theme.text }]}>{item.name}</Text>
          {item.isDefault && (
            <View style={[styles.defaultBadge, { backgroundColor: theme.gold + '20' }]}>
              <Text style={[styles.defaultBadgeText, { color: theme.gold }]}>Default</Text>
            </View>
          )}
        </View>
        {!item.isDefault && (
          <TouchableOpacity
            style={styles.makeDefaultBtn}
            onPress={() => dispatch(setDefaultAddress(item.id))}
          >
            <Text style={[styles.makeDefaultText, { color: theme.accent }]}>Set as Default</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.cardAddressText, { color: theme.textSecondary }]}>
        {item.street}
        {item.landmark ? `, ${item.landmark}` : ''}
      </Text>
      <Text style={[styles.cardAddressText, { color: theme.textSecondary }]}>
        {item.city}, {item.state} - {item.pincode}
      </Text>
      <Text style={[styles.cardPhoneText, { color: theme.textTertiary }]}>
        Phone: +91 {item.phone}
      </Text>

      <View style={[styles.cardActions, { borderTopColor: theme.borderLight }]}>
        <TouchableOpacity style={styles.actionButton} onPress={() => openEditForm(item)}>
          <Ionicons name="create-outline" size={16} color={theme.accent} />
          <Text style={[styles.actionButtonText, { color: theme.accent }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(item)}>
          <Ionicons name="trash-outline" size={16} color={theme.error} />
          <Text style={[styles.actionButtonText, { color: theme.error }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {renderHeader()}

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderAddressCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={64} color={theme.textTertiary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>No addresses saved</Text>
            <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
              Please add a delivery address to place orders.
            </Text>
            <TouchableOpacity
              style={[styles.addBtn, { backgroundColor: theme.accent }]}
              onPress={openAddForm}
            >
              <Text style={styles.addBtnText}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Floating Add Button at the bottom (if addresses exist) */}
      {addresses.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.floatingAddBtn, { backgroundColor: theme.accent }]}
            onPress={openAddForm}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: Spacing.sm }} />
            <Text style={styles.floatingAddText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add / Edit Form Modal */}
      <Modal
        visible={formModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFormModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: theme.overlay }]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.modalContent, { backgroundColor: theme.surface }]}
          >
            <View style={[styles.modalHeader, { borderBottomColor: theme.borderLight }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {editingAddressId ? 'Edit Address' : 'New Address'}
              </Text>
              <TouchableOpacity onPress={() => setFormModalVisible(false)} hitSlop={12}>
                <Ionicons name="close" size={24} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>FULL NAME *</Text>
                <TextInput
                  style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.background }]}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name"
                  placeholderTextColor={theme.textTertiary}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>PHONE NUMBER *</Text>
                <TextInput
                  style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.background }]}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="10-digit mobile number"
                  placeholderTextColor={theme.textTertiary}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>PINCODE *</Text>
                <TextInput
                  style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.background }]}
                  value={pincode}
                  onChangeText={handlePincodeChange}
                  placeholder="6-digit pincode (auto-fills city/state)"
                  placeholderTextColor={theme.textTertiary}
                  keyboardType="numeric"
                  maxLength={6}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing.sm }]}>
                  <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>CITY *</Text>
                  <TextInput
                    style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.background }]}
                    value={city}
                    onChangeText={setCity}
                    placeholder="City"
                    placeholderTextColor={theme.textTertiary}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: Spacing.sm }]}>
                  <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>STATE *</Text>
                  <TextInput
                    style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.background }]}
                    value={state}
                    onChangeText={setState}
                    placeholder="State"
                    placeholderTextColor={theme.textTertiary}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>STREET / LANDMARK / HOUSE NO *</Text>
                <TextInput
                  style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.background }]}
                  value={street}
                  onChangeText={setStreet}
                  placeholder="Flat No, Building Name, Street Name"
                  placeholderTextColor={theme.textTertiary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>LANDMARK (OPTIONAL)</Text>
                <TextInput
                  style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.background }]}
                  value={landmark}
                  onChangeText={setLandmark}
                  placeholder="E.g. Near Apollo Hospital"
                  placeholderTextColor={theme.textTertiary}
                />
              </View>

              {/* Set Default Toggle */}
              {!(editingAddressId && addresses.find(a => a.id === editingAddressId)?.isDefault) && (
                <View style={styles.defaultToggleRow}>
                  <View style={{ flex: 1, marginRight: Spacing.md }}>
                    <Text style={[styles.toggleLabel, { color: theme.text }]}>Set as Default Address</Text>
                    <Text style={[styles.toggleSubtitle, { color: theme.textSecondary }]}>
                      This address will be selected by default during checkout.
                    </Text>
                  </View>
                  <Switch
                    value={isDefault}
                    onValueChange={setIsDefault}
                    trackColor={{ false: theme.border, true: theme.accent + '50' }}
                    thumbColor={isDefault ? theme.accent : '#f4f3f4'}
                  />
                </View>
              )}

              {/* Save Button */}
              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: theme.accent }]}
                onPress={handleSave}
                activeOpacity={0.85}
              >
                <Text style={styles.saveBtnText}>Save Address</Text>
              </TouchableOpacity>

              <View style={{ height: Spacing.huge }} />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
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
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    ...Shadow.sm,
  },
  headerTitle: {
    ...Typography.h4,
    fontWeight: '700',
  },
  listContent: {
    paddingVertical: Spacing.lg,
    paddingBottom: 100, // account for floating footer
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  cardName: {
    ...Typography.bodyMedium,
    fontWeight: '700',
  },
  defaultBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  defaultBadgeText: {
    ...Typography.tiny,
    fontWeight: '700',
  },
  makeDefaultBtn: {
    padding: Spacing.xs,
  },
  makeDefaultText: {
    ...Typography.captionMedium,
  },
  cardAddressText: {
    ...Typography.bodySm,
    lineHeight: 18,
    marginBottom: 4,
  },
  cardPhoneText: {
    ...Typography.caption,
    marginTop: Spacing.sm,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    gap: Spacing.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  actionButtonText: {
    ...Typography.captionMedium,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxxl,
    paddingTop: 100,
  },
  emptyTitle: {
    ...Typography.h3,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    ...Typography.bodySm,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  addBtn: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  addBtnText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  floatingAddBtn: {
    flexDirection: 'row',
    height: 52,
    width: '100%',
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.lg,
  },
  floatingAddText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
  // Modal Style
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    height: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
  },
  modalTitle: {
    ...Typography.h4,
    fontWeight: '700',
  },
  formContainer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    ...Typography.tiny,
    fontWeight: '600',
    marginBottom: Spacing.xs,
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    height: 48,
    ...Typography.bodySm,
  },
  row: {
    flexDirection: 'row',
  },
  defaultToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  toggleLabel: {
    ...Typography.bodySmMedium,
    fontWeight: '600',
  },
  toggleSubtitle: {
    ...Typography.caption,
    marginTop: 2,
    lineHeight: 16,
  },
  saveBtn: {
    height: 52,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  saveBtnText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
});

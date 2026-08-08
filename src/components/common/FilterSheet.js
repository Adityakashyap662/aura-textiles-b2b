import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.75;

const SORT_OPTIONS = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'price_low', label: 'Price: Low → High' },
  { key: 'price_high', label: 'Price: High → Low' },
  { key: 'newest', label: 'Newest First' },
];

const SIZE_OPTIONS = ['S', 'M', 'L', 'XL', 'XXL'];

const DEFAULT_FILTERS = {
  sort: 'relevance',
  sizes: [],
  priceMin: '',
  priceMax: '',
};

const FilterSheet = ({ visible, onClose, onApply, initialFilters }) => {
  const { theme, isDark } = useTheme();
  const [sort, setSort] = useState(DEFAULT_FILTERS.sort);
  const [sizes, setSizes] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [slideAnim] = useState(new Animated.Value(SHEET_HEIGHT));

  useEffect(() => {
    if (visible) {
      const filters = initialFilters || DEFAULT_FILTERS;
      setSort(filters.sort || 'relevance');
      setSizes(filters.sizes || []);
      setPriceMin(filters.priceMin ? String(filters.priceMin) : '');
      setPriceMax(filters.priceMax ? String(filters.priceMax) : '');
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      slideAnim.setValue(SHEET_HEIGHT);
    }
  }, [visible, initialFilters]);

  const toggleSize = useCallback((size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }, []);

  const handleReset = useCallback(() => {
    setSort('relevance');
    setSizes([]);
    setPriceMin('');
    setPriceMax('');
  }, []);

  const handleApply = useCallback(() => {
    onApply({
      sort,
      sizes,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
    });
    onClose();
  }, [sort, sizes, priceMin, priceMax, onApply, onClose]);

  const hasActiveFilters =
    sort !== 'relevance' || sizes.length > 0 || priceMin || priceMax;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalWrapper}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />

        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: theme.surface,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Handle Bar */}
          <View style={styles.handleBarContainer}>
            <View style={[styles.handleBar, { backgroundColor: theme.border }]} />
          </View>

          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.borderLight }]}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              Filters & Sort
            </Text>
            <View style={styles.headerActions}>
              {hasActiveFilters && (
                <TouchableOpacity
                  onPress={handleReset}
                  style={styles.resetButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={[styles.resetText, { color: theme.accent }]}>
                    Reset All
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={onClose}
                style={[styles.closeButton, { backgroundColor: theme.inputBg }]}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="close" size={18} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollContent}
            contentContainerStyle={styles.scrollContentInner}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Sort By Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="swap-vertical"
                  size={18}
                  color={theme.accent}
                />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Sort By
                </Text>
              </View>
              <View style={styles.optionsList}>
                {SORT_OPTIONS.map((option) => {
                  const isSelected = sort === option.key;
                  return (
                    <TouchableOpacity
                      key={option.key}
                      style={[
                        styles.radioRow,
                        {
                          backgroundColor: isSelected
                            ? isDark
                              ? 'rgba(233,69,96,0.12)'
                              : 'rgba(233,69,96,0.06)'
                            : 'transparent',
                          borderColor: isSelected
                            ? theme.accent
                            : theme.borderLight,
                        },
                      ]}
                      onPress={() => setSort(option.key)}
                      activeOpacity={0.7}
                    >
                      <View
                        style={[
                          styles.radioOuter,
                          {
                            borderColor: isSelected
                              ? theme.accent
                              : theme.textTertiary,
                          },
                        ]}
                      >
                        {isSelected && (
                          <View
                            style={[
                              styles.radioInner,
                              { backgroundColor: theme.accent },
                            ]}
                          />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.radioLabel,
                          {
                            color: isSelected ? theme.text : theme.textSecondary,
                            fontWeight: isSelected ? '600' : '400',
                          },
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Size Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="resize" size={18} color={theme.accent} />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Size
                </Text>
                {sizes.length > 0 && (
                  <View
                    style={[styles.countBadge, { backgroundColor: theme.accent }]}
                  >
                    <Text style={styles.countBadgeText}>{sizes.length}</Text>
                  </View>
                )}
              </View>
              <View style={styles.sizeGrid}>
                {SIZE_OPTIONS.map((size) => {
                  const isSelected = sizes.includes(size);
                  return (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.sizeChip,
                        {
                          backgroundColor: isSelected
                            ? theme.accent
                            : theme.inputBg,
                          borderColor: isSelected
                            ? theme.accent
                            : theme.border,
                        },
                      ]}
                      onPress={() => toggleSize(size)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.sizeChipText,
                          {
                            color: isSelected ? '#FFFFFF' : theme.text,
                          },
                        ]}
                      >
                        {size}
                      </Text>
                      {isSelected && (
                        <Ionicons
                          name="checkmark"
                          size={14}
                          color="#FFFFFF"
                          style={{ marginLeft: 2 }}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Price Range Section */}
            <View style={[styles.section, { marginBottom: Spacing.massive }]}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="pricetag-outline"
                  size={18}
                  color={theme.accent}
                />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Price Range
                </Text>
              </View>
              <View style={styles.priceRow}>
                <View style={styles.priceInputContainer}>
                  <Text
                    style={[styles.pricePrefix, { color: theme.textTertiary }]}
                  >
                    ₹
                  </Text>
                  <TextInput
                    style={[
                      styles.priceInput,
                      {
                        backgroundColor: theme.inputBg,
                        color: theme.text,
                        borderColor: priceMin
                          ? theme.accent
                          : theme.border,
                      },
                    ]}
                    placeholder="100"
                    placeholderTextColor={theme.textTertiary}
                    keyboardType="number-pad"
                    value={priceMin}
                    onChangeText={(text) =>
                      setPriceMin(text.replace(/[^0-9]/g, ''))
                    }
                    maxLength={6}
                  />
                  <Text
                    style={[styles.priceLabel, { color: theme.textTertiary }]}
                  >
                    Min
                  </Text>
                </View>

                <View style={styles.priceSeparator}>
                  <View
                    style={[
                      styles.priceDash,
                      { backgroundColor: theme.textTertiary },
                    ]}
                  />
                </View>

                <View style={styles.priceInputContainer}>
                  <Text
                    style={[styles.pricePrefix, { color: theme.textTertiary }]}
                  >
                    ₹
                  </Text>
                  <TextInput
                    style={[
                      styles.priceInput,
                      {
                        backgroundColor: theme.inputBg,
                        color: theme.text,
                        borderColor: priceMax
                          ? theme.accent
                          : theme.border,
                      },
                    ]}
                    placeholder="10,000"
                    placeholderTextColor={theme.textTertiary}
                    keyboardType="number-pad"
                    value={priceMax}
                    onChangeText={(text) =>
                      setPriceMax(text.replace(/[^0-9]/g, ''))
                    }
                    maxLength={6}
                  />
                  <Text
                    style={[styles.priceLabel, { color: theme.textTertiary }]}
                  >
                    Max
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Sticky Apply Button */}
          <View
            style={[
              styles.footer,
              {
                backgroundColor: theme.surface,
                borderTopColor: theme.borderLight,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApply}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[theme.gradientStart, theme.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBtn}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#FFFFFF"
                  style={{ marginRight: Spacing.sm }}
                />
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    height: SHEET_HEIGHT,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    overflow: 'hidden',
    ...Shadow.xl,
  },
  handleBarContainer: {
    alignItems: 'center',
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: BorderRadius.round,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  headerTitle: {
    ...Typography.h4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  resetButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  resetText: {
    ...Typography.bodySmMedium,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentInner: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.bodyMedium,
  },
  countBadge: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  optionsList: {
    gap: Spacing.sm,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.round,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: BorderRadius.round,
  },
  radioLabel: {
    ...Typography.bodySm,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  sizeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1.5,
    minWidth: 56,
  },
  sizeChipText: {
    ...Typography.bodySmMedium,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInputContainer: {
    flex: 1,
    position: 'relative',
  },
  pricePrefix: {
    position: 'absolute',
    left: Spacing.md,
    top: 14,
    zIndex: 1,
    ...Typography.bodyMedium,
  },
  priceInput: {
    ...Typography.bodySm,
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingLeft: Spacing.xxxl,
    paddingRight: Spacing.md,
    height: 48,
  },
  priceLabel: {
    ...Typography.caption,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  priceSeparator: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  priceDash: {
    width: 16,
    height: 2,
    borderRadius: 1,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    ...Shadow.md,
  },
  applyButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadow.md,
  },
  gradientBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
  },
  applyButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
});

export default FilterSheet;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius, Shadow } from '@/theme/spacing';
import { LinearGradient } from 'expo-linear-gradient';

const BRANDS = [
  'Allen Solly',
  'Peter England',
  "Levi's",
  'H&M',
  'Manyavar',
  'Raymond',
  'Zara',
  'Fabindia',
  'W',
  'Biba',
];

const AmazonFilterSheet = ({
  visible,
  onClose,
  onApply,
  initialFilters,
}) => {
  const { theme, isDark } = useTheme();

  // Local state
  const [sort, setSort] = useState('demanding');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  // Sync initial filters
  useEffect(() => {
    if (initialFilters) {
      setSort(initialFilters.sort || 'demanding');
      setSelectedBrands(initialFilters.brands || []);
      setMinRating(initialFilters.minRating || 0);
      setInStockOnly(initialFilters.inStockOnly !== false);
      setPriceMin(initialFilters.priceMin ? initialFilters.priceMin.toString() : '');
      setPriceMax(initialFilters.priceMax ? initialFilters.priceMax.toString() : '');
    }
  }, [initialFilters, visible]);

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handleReset = () => {
    setSort('demanding');
    setSelectedBrands([]);
    setMinRating(0);
    setInStockOnly(true);
    setPriceMin('');
    setPriceMax('');
  };

  const handleApply = () => {
    onApply({
      sort,
      brands: selectedBrands,
      minRating,
      inStockOnly,
      priceMin: priceMin ? parseInt(priceMin) : undefined,
      priceMax: priceMax ? parseInt(priceMax) : undefined,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>
        <View style={[styles.sheet, { backgroundColor: theme.surface }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.borderLight }]}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Filters</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={[styles.resetText, { color: theme.accent }]}>Reset All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Sort Options */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Sort By</Text>
              <View style={styles.sortGrid}>
                {[
                  { id: 'demanding', label: 'Most Demanding 🔥' },
                  { id: 'price_low', label: 'Price: Low to High' },
                  { id: 'price_high', label: 'Price: High to Low' },
                  { id: 'rating', label: 'Customer Rating' },
                ].map((item) => {
                  const active = sort === item.id;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.chip,
                        {
                          backgroundColor: active
                            ? theme.accent
                            : theme.inputBg,
                          borderColor: active ? theme.accent : theme.border,
                        },
                      ]}
                      onPress={() => setSort(item.id)}
                    >
                      <Text
                        style={[
                          styles.chipLabel,
                          { color: active ? '#FFF' : theme.text },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Brands Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Brands</Text>
              <View style={styles.brandsContainer}>
                {BRANDS.map((brand) => {
                  const selected = selectedBrands.includes(brand);
                  return (
                    <TouchableOpacity
                      key={brand}
                      style={[
                        styles.brandOption,
                        { borderBottomColor: theme.borderLight },
                      ]}
                      onPress={() => handleBrandToggle(brand)}
                    >
                      <Text style={[styles.brandText, { color: theme.text }]}>
                        {brand}
                      </Text>
                      <View
                        style={[
                          styles.checkbox,
                          {
                            borderColor: selected ? theme.accent : theme.textTertiary,
                            backgroundColor: selected ? theme.accent : 'transparent',
                          },
                        ]}
                      >
                        {selected && (
                          <Ionicons name="checkmark" size={14} color="#FFF" />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Customer Rating Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Customer Reviews
              </Text>
              <View style={styles.ratingList}>
                {[4, 3, 2].map((stars) => {
                  const active = minRating === stars;
                  return (
                    <TouchableOpacity
                      key={stars}
                      style={styles.ratingOption}
                      onPress={() => setMinRating(stars)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.ratingStarsRow}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Ionicons
                            key={i}
                            name={i <= stars ? 'star' : 'star-outline'}
                            size={18}
                            color={i <= stars ? '#FFD700' : theme.textTertiary}
                            style={{ marginRight: 2 }}
                          />
                        ))}
                        <Text style={[styles.ratingOptionLabel, { color: theme.text }]}>
                          & Up
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.radioCircle,
                          {
                            borderColor: active ? theme.accent : theme.textTertiary,
                          },
                        ]}
                      >
                        {active && (
                          <View
                            style={[
                              styles.radioInner,
                              { backgroundColor: theme.accent },
                            ]}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Availability Section */}
            <View style={[styles.section, styles.switchSection]}>
              <View>
                <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 2 }]}>
                  In Stock Only
                </Text>
                <Text style={[styles.sectionDesc, { color: theme.textSecondary }]}>
                  Exclude items that are currently out of stock
                </Text>
              </View>
              <Switch
                value={inStockOnly}
                onValueChange={setInStockOnly}
                trackColor={{ false: theme.border, true: theme.accent }}
                thumbColor={Platform.OS === 'android' ? '#FFF' : undefined}
              />
            </View>

            {/* Price Range Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Price Range
              </Text>
              <View style={styles.priceInputsRow}>
                <View style={styles.priceInputWrapper}>
                  <Text style={[styles.currencySymbol, { color: theme.textSecondary }]}>
                    ₹
                  </Text>
                  <TextInput
                    style={[
                      styles.priceInput,
                      {
                        backgroundColor: theme.inputBg,
                        color: theme.text,
                        borderColor: theme.border,
                      },
                    ]}
                    placeholder="Min"
                    placeholderTextColor={theme.textTertiary}
                    keyboardType="number-pad"
                    value={priceMin}
                    onChangeText={setPriceMin}
                  />
                </View>
                <View style={[styles.priceSeparator, { backgroundColor: theme.border }]} />
                <View style={styles.priceInputWrapper}>
                  <Text style={[styles.currencySymbol, { color: theme.textSecondary }]}>
                    ₹
                  </Text>
                  <TextInput
                    style={[
                      styles.priceInput,
                      {
                        backgroundColor: theme.inputBg,
                        color: theme.text,
                        borderColor: theme.border,
                      },
                    ]}
                    placeholder="Max"
                    placeholderTextColor={theme.textTertiary}
                    keyboardType="number-pad"
                    value={priceMax}
                    onChangeText={setPriceMax}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={[styles.footer, { borderTopColor: theme.borderLight }]}>
            <TouchableOpacity
              style={styles.applyBtn}
              onPress={handleApply}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[theme.gradientStart, theme.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBtn}
              >
                <Text style={styles.applyBtnLabel}>Apply Filters</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    height: '80%',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    ...Shadow.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    ...Typography.h3,
    fontSize: 18,
  },
  closeBtn: {
    padding: Spacing.xs,
  },
  resetText: {
    ...Typography.bodySmMedium,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    ...Typography.bodyMedium,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  sectionDesc: {
    ...Typography.tiny,
  },
  sortGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
  },
  chipLabel: {
    ...Typography.bodySmMedium,
    fontSize: 13,
  },
  brandsContainer: {
    marginTop: Spacing.xs,
  },
  brandOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  brandText: {
    ...Typography.bodySm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.xs,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingList: {
    gap: Spacing.md,
  },
  ratingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingOptionLabel: {
    ...Typography.bodySmMedium,
    marginLeft: Spacing.md,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  switchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  priceInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
    ...Typography.bodySmMedium,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    paddingLeft: 24,
    paddingRight: Spacing.sm,
    ...Typography.bodySm,
  },
  priceSeparator: {
    width: 16,
    height: 2,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  applyBtn: {
    height: 48,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadow.md,
  },
  gradientBtn: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnLabel: {
    color: '#FFF',
    ...Typography.button,
  },
});

export default AmazonFilterSheet;

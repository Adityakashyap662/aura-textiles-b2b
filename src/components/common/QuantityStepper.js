import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { Typography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';

const QuantityStepper = ({ quantity = 1, maxStock = 10, onIncrement, onDecrement, onRemove }) => {
  const { theme } = useTheme();

  const handleDecrement = useCallback(() => {
    if (quantity <= 1) {
      onRemove?.();
    } else {
      onDecrement?.();
    }
  }, [quantity, onRemove, onDecrement]);

  const handleIncrement = useCallback(() => {
    if (quantity < maxStock) {
      onIncrement?.();
    }
  }, [quantity, maxStock, onIncrement]);

  const isMaxed = quantity >= maxStock;

  return (
    <View style={[styles.container, { borderColor: theme.border, backgroundColor: theme.surface }]}>
      <TouchableOpacity
        onPress={handleDecrement}
        style={[styles.button, { borderRightColor: theme.borderLight }]}
        activeOpacity={0.6}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}
      >
        <Ionicons
          name={quantity <= 1 ? 'trash-outline' : 'remove'}
          size={quantity <= 1 ? 15 : 18}
          color={quantity <= 1 ? theme.error : theme.text}
        />
      </TouchableOpacity>

      <View style={[styles.quantityBox, { backgroundColor: theme.background }]}>
        <Text style={[styles.quantityText, { color: theme.text }]}>{quantity}</Text>
      </View>

      <TouchableOpacity
        onPress={handleIncrement}
        style={[styles.button, { borderLeftColor: theme.borderLight, opacity: isMaxed ? 0.35 : 1 }]}
        activeOpacity={0.6}
        disabled={isMaxed}
        hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
      >
        <Ionicons name="add" size={18} color={isMaxed ? theme.textTertiary : theme.accent} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  button: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBox: {
    width: 38,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    ...Typography.bodySmMedium,
    fontWeight: '700',
  },
});

export default React.memo(QuantityStepper);

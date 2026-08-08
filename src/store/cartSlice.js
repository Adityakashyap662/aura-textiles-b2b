import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  deliveryCharge: 50,
  freeDeliveryThreshold: 999,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, size, color } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.productId === productId &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        if (existingItem.quantity < existingItem.maxStock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({
          id: `${productId}_${size}_${color}_${Date.now()}`,
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < item.maxStock) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      // If quantity would become 0, keep it at 1 — UI handles removal dialog
    },

    clearCart: (state) => {
      state.items = [];
    },

    removeOutOfStock: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
  },
});

// Actions
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  removeOutOfStock,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartItemCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const selectDeliveryCharge = (state) => {
  const subtotal = state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return subtotal >= state.cart.freeDeliveryThreshold
    ? 0
    : state.cart.deliveryCharge;
};

export const selectCartTotal = (state) => {
  const subtotal = state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const delivery =
    subtotal >= state.cart.freeDeliveryThreshold
      ? 0
      : state.cart.deliveryCharge;
  return subtotal + delivery;
};

export const selectIsInCart = (productId, size, color) => (state) =>
  state.cart.items.some(
    (item) =>
      item.productId === productId &&
      item.size === size &&
      item.color === color
  );

export default cartSlice.reducer;

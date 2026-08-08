import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isGuest: true,
  profile: {
    name: 'Sneha Sharma',
    email: 'sneha@example.com',
    phone: '9876543210',
    avatar: null,
    initials: 'SS',
    credits: 500,
  },
  addresses: [
    {
      id: '1',
      name: 'Sneha Sharma',
      phone: '9876543210',
      pincode: '400001',
      city: 'Mumbai',
      state: 'Maharashtra',
      street: '42, Marine Drive, Churchgate',
      landmark: 'Near NCPA',
      isDefault: true,
    },
  ],
  wishlist: [],
  savedCards: [
    {
      id: 'card_1',
      type: 'VISA',
      last4: '4242',
      expiry: '12/27',
    },
  ],
  upiIds: ['sneha@upi'],
  registeredUsers: [
    {
      email: 'sneha@example.com',
      password: 'Password123',
      profile: {
        name: 'Sneha Sharma',
        email: 'sneha@example.com',
        phone: '9876543210',
        avatar: null,
        initials: 'SS',
        credits: 500,
      },
      addresses: [
        {
          id: '1',
          name: 'Sneha Sharma',
          phone: '9876543210',
          pincode: '400001',
          city: 'Mumbai',
          state: 'Maharashtra',
          street: '42, Marine Drive, Churchgate',
          landmark: 'Near NCPA',
          isDefault: true,
        },
      ],
      savedCards: [
        {
          id: 'card_1',
          type: 'VISA',
          last4: '4242',
          expiry: '12/27',
        },
      ],
      upiIds: ['sneha@upi'],
    }
  ],
};

const guestState = {
  isLoggedIn: false,
  isGuest: true,
  profile: {
    name: '',
    email: '',
    phone: '',
    avatar: null,
    initials: '',
    credits: 0,
  },
  addresses: [],
  wishlist: [],
  savedCards: [],
  upiIds: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.isGuest = false;
      const user = action.payload;
      const nameVal = user?.profile?.name || 'Sneha Sharma';
      const emailVal = user?.email || 'sneha@example.com';
      const phoneVal = user?.profile?.phone || '9876543210';
      const avatarVal = user?.profile?.avatar || null;
      const creditsVal = user?.credits !== undefined ? user.credits : 500;
      
      state.profile = {
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        avatar: avatarVal,
        credits: creditsVal,
        initials: nameVal
          .trim()
          .split(/\s+/)
          .map((n) => n[0])
          .join('')
          .substring(0, 2)
          .toUpperCase() || 'SS',
      };
      
      state.addresses = user?.addresses || [
        {
          id: '1',
          name: nameVal,
          phone: phoneVal,
          pincode: '400001',
          city: 'Mumbai',
          state: 'Maharashtra',
          street: '42, Marine Drive, Churchgate',
          landmark: 'Near NCPA',
          isDefault: true,
        },
      ];
      
      state.savedCards = user?.savedCards || [
        {
          id: 'card_1',
          type: 'VISA',
          last4: '4242',
          expiry: '12/27',
        },
      ];
      
      state.upiIds = user?.upiIds || [`${nameVal.toLowerCase().replace(/\s+/g, '')}@upi`];
    },

    logout: (state) => {
      const savedUsers = state.registeredUsers;
      Object.assign(state, guestState);
      state.registeredUsers = savedUsers;
    },

    deleteAccount: (state) => {
      const currentEmail = state.profile.email;
      const savedUsers = state.registeredUsers.filter(
        (u) => u.email.toLowerCase() !== currentEmail.toLowerCase()
      );
      Object.assign(state, guestState);
      state.registeredUsers = savedUsers;
    },

    registerUser: (state, action) => {
      const newUser = action.payload;
      const exists = state.registeredUsers.some(
        (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
      );
      if (!exists) {
        state.registeredUsers.push(newUser);
      }
    },
    updateUserPassword: (state, action) => {
      const { email, password } = action.payload;
      const user = state.registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (user) {
        user.password = password;
      }
    },

    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
      // Recalculate initials if name changed
      if (action.payload.name) {
        const parts = action.payload.name.trim().split(/\s+/);
        state.profile.initials =
          parts.length >= 2
            ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
            : parts[0].substring(0, 2).toUpperCase();
      }
    },

    addAddress: (state, action) => {
      const newAddress = {
        ...action.payload,
        id: action.payload.id || `addr_${Date.now()}`,
        isDefault: state.addresses.length === 0 ? true : !!action.payload.isDefault,
      };
      // If new address is default, unset others
      if (newAddress.isDefault) {
        state.addresses.forEach((addr) => {
          addr.isDefault = false;
        });
      }
      state.addresses.push(newAddress);
    },

    updateAddress: (state, action) => {
      const index = state.addresses.findIndex(
        (addr) => addr.id === action.payload.id
      );
      if (index !== -1) {
        // If updated address is being set as default, unset others
        if (action.payload.isDefault) {
          state.addresses.forEach((addr) => {
            addr.isDefault = false;
          });
        }
        state.addresses[index] = { ...state.addresses[index], ...action.payload };
      }
    },

    removeAddress: (state, action) => {
      const removedAddress = state.addresses.find(
        (addr) => addr.id === action.payload
      );
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload
      );
      // If removed address was default and there are remaining addresses, set the first one as default
      if (
        removedAddress?.isDefault &&
        state.addresses.length > 0
      ) {
        state.addresses[0].isDefault = true;
      }
    },

    setDefaultAddress: (state, action) => {
      state.addresses.forEach((addr) => {
        addr.isDefault = addr.id === action.payload;
      });
    },

    toggleWishlist: (state, action) => {
      const productId = action.payload;
      const index = state.wishlist.indexOf(productId);
      if (index === -1) {
        state.wishlist.push(productId);
      } else {
        state.wishlist.splice(index, 1);
      }
    },

    addCard: (state, action) => {
      state.savedCards.push({
        ...action.payload,
        id: action.payload.id || `card_${Date.now()}`,
      });
    },

    removeCard: (state, action) => {
      state.savedCards = state.savedCards.filter(
        (card) => card.id !== action.payload
      );
    },

    addUpiId: (state, action) => {
      if (!state.upiIds.includes(action.payload)) {
        state.upiIds.push(action.payload);
      }
    },

    removeUpiId: (state, action) => {
      state.upiIds = state.upiIds.filter((id) => id !== action.payload);
    },

    setCredits: (state, action) => {
      if (state.profile) {
        state.profile.credits = Number(action.payload);
      }
    },
  },
});

// Actions
export const {
  login,
  logout,
  deleteAccount,
  updateProfile,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
  toggleWishlist,
  addCard,
  removeCard,
  addUpiId,
  removeUpiId,
  registerUser,
  updateUserPassword,
  setCredits,
} = userSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const selectUserProfile = (state) => state.user.profile;

export const selectAddresses = (state) => state.user.addresses;

export const selectDefaultAddress = (state) =>
  state.user.addresses.find((addr) => addr.isDefault) || state.user.addresses[0] || null;

export const selectWishlist = (state) => state.user.wishlist;

export const selectIsWishlisted = (productId) => (state) =>
  state.user.wishlist.includes(productId);

export const selectSavedCards = (state) => state.user.savedCards;

export const selectUpiIds = (state) => state.user.upiIds;

export const selectRegisteredUsers = (state) => state.user.registeredUsers;

export default userSlice.reducer;

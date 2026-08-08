import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pincode: '400001',
  city: 'Mumbai',
  isOnline: true,
  hasLoadedDashboard: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPincode: (state, action) => {
      state.pincode = action.payload.pincode;
      state.city = action.payload.city;
    },

    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },

    setDashboardLoaded: (state) => {
      state.hasLoadedDashboard = true;
    },
  },
});

// Actions
export const { setPincode, setOnlineStatus, setDashboardLoaded } =
  appSlice.actions;

// Selectors
export const selectPincode = (state) => state.app.pincode;

export const selectCity = (state) => state.app.city;

export const selectIsOnline = (state) => state.app.isOnline;

export const selectHasLoadedDashboard = (state) => state.app.hasLoadedDashboard;

export default appSlice.reducer;

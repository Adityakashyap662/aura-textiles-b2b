import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import appReducer from './appSlice';
import reviewsReducer from './reviewsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    app: appReducer,
    reviews: reviewsReducer,
  },
});

export default store;

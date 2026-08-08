import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 'rev_101',
      productId: 'prod_001',
      rating: 5,
      userName: 'Amit Patel',
      comment: 'Superb quality fabric. It fits perfectly and feels very premium. Highly recommend!',
      date: '2026-07-02T10:30:00.000Z'
    },
    {
      id: 'rev_102',
      productId: 'prod_001',
      rating: 4,
      userName: 'Neha Gupta',
      comment: 'Really nice shirt. The colour is exactly as shown. Slightly long in length but overall great.',
      date: '2026-07-05T14:20:00.000Z'
    },
    {
      id: 'rev_103',
      productId: 'prod_002',
      rating: 5,
      userName: 'Rajesh Kumar',
      comment: 'Extremely comfortable! The fabric is soft and breathable, perfect for summer wear.',
      date: '2026-07-08T09:15:00.000Z'
    },
    {
      id: 'rev_104',
      productId: 'prod_003',
      rating: 3,
      userName: 'Anjali Sharma',
      comment: 'The fit is good but the material is a bit stiff. Hopefully it gets softer after a few washes.',
      date: '2026-07-09T18:45:00.000Z'
    },
    {
      id: 'rev_105',
      productId: 'prod_016',
      rating: 5,
      userName: 'Deepa Rao',
      comment: 'Absolutely beautiful Kurti! The floral print is elegant and the fit is perfect.',
      date: '2026-07-11T12:00:00.000Z'
    }
  ]
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      const { productId, rating, comment, userName } = action.payload;
      state.items.unshift({
        id: `rev_${Date.now()}`,
        productId,
        rating,
        comment,
        userName: userName || 'Verified Buyer',
        date: new Date().toISOString()
      });
    }
  }
});

export const { addReview } = reviewsSlice.actions;

export const selectReviewsForProduct = (productId) => (state) =>
  state.reviews.items.filter((item) => item.productId === productId);

export default reviewsSlice.reducer;

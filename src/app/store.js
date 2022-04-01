import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/Products/productsSlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

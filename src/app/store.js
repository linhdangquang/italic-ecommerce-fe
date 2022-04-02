import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/Products/productsSlice.js';
import categoriesReducer from '../features/Categories/categoriesSlice.js';
import categoryReducer from '../features/Categories/categorySlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    category: categoryReducer,
  },
});

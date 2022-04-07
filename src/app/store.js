import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/Products/productsSlice.js';
import categoriesReducer from '../features/Categories/categoriesSlice.js';
import categoryReducer from '../features/Categories/categorySlice.js';
import authReducer from '../features/Auth/authSlice.js';
import messageReducer from '../features/Messages/messageSlice.js';
import usersReducer from '../features/Users/usersSlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    auth: authReducer,
    message: messageReducer,
    users: usersReducer,
  },
});

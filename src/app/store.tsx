import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import productsReducer from '../features/Products/productsSlice.js';
import categoriesReducer from '../features/Categories/categoriesSlice.js';
import categoryReducer from '../features/Categories/categorySlice.js';
import authReducer from '../features/Auth/authSlice.js';
import messageReducer from '../features/Messages/messageSlice.js';
import usersReducer from '../features/Users/usersSlice.js';
import cartReducer from '../features/Cart/cartSlice.js';
import bannerReducer from '../features/HeroBanner/bannerSlice.js';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const reducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  category: categoryReducer,
  auth: authReducer,
  message: messageReducer,
  users: usersReducer,
  cart: cartReducer,
  banner: bannerReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

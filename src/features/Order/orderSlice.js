import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllOrders } from '../../api/order';

const initialStateValue = {
  orders: [],
  loading: false,
  status: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const { data } = await getAllOrders();
  return data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialStateValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
      state.status = 'error';
    });
  },
});

export default ordersSlice.reducer;

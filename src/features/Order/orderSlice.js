import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllOrders, add } from '../../api/order';

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

export const addOrder = createAsyncThunk('orders/addOrder', async (order) => {
  const { data } = await add(order);
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
    builder.addCase(addOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload.order);
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
      state.status = 'error';
    });
  },
});

export default ordersSlice.reducer;

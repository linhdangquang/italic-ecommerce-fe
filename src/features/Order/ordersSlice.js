import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { getAllOrders, add, update, del } from '../../api/order';

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
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your order has been successfully placed!',
    showConfirmButton: true,
  });
  return data;
});

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (order) => {
    try {
      const { data } = await update(order);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId) => {
    try {
      const { data } = await del(orderId);
      return data;
    } catch (error) {
      return error;
    }
  }
);

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
    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      const updateOrder = action.payload.order;
      const index = state.orders.findIndex(
        (order) => order._id === updateOrder._id
      );
      state.orders[index] = updateOrder;
      state.loading = false;
      state.status = 'success';
      toast.success('Order updated successfully');
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
      state.status = 'error';
    });
    builder.addCase(deleteOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      const { _id } = action.payload.order;
      const index = state.orders.findIndex((order) => order._id === _id);
      state.orders.splice(index, 1);
      state.loading = false;
      state.status = 'success';
    });
  },
});

export const getOrderByID = (state, id) =>
  state.orders.orders.find((order) => order._id === id);

export default ordersSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUser } from '../../api/user';

const initialStateValue = {
  users: [],
  isLoading: false,
  error: null,
  status: 'idle',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const data = await getAllUser();
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: initialStateValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.status = 'success';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
      state.status = 'error';
    });
  },
});

export default usersSlice.reducer;

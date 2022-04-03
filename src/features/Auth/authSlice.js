import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInUser, signUpUser } from '../../api/user';

const initialStateValue = {
  isLoggedIn: false,
  user: null,
  error: null,
};

export const signIn = createAsyncThunk('auth/signIn', async (user) => {
  try {
    const { data } = await signInUser(user);
    return data;
  } catch (error) {
    return error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;

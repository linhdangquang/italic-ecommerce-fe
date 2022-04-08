import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInUser, signUpUser, logOutUser } from '../../api/user';
import { setMessage } from '../Messages/messageSlice.js';

const user = JSON.parse(localStorage.getItem('user'));

const initialStateValue = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await signUpUser(userData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data.message;
      thunkAPI.dispatch(setMessage(errorMessage));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (user, thunkAPI) => {
    try {
      const data = await signInUser(user);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk('auth/logOut', async () => {
  await logOutUser();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoggedIn = false;
    });
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
    builder.addCase(logOut.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export default authSlice.reducer;

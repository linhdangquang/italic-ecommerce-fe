import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInUser, signUpUser, logOutUser } from '../../api/user';
import { setMessage } from '../Messages/messageSlice.js';

const user = JSON.parse(localStorage.getItem('user'));

const initialStateValue = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

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
  try {
    const { data } = await logOutUser();
    localStorage.removeItem('user');
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
      console.log(action);
      state.user = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;

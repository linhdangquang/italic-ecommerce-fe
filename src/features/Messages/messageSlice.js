import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {};

const messageSlice = createSlice({
  name: 'message',
  initialState: initialStateValue,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: '' };
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;

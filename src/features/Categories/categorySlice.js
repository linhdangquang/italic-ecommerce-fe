import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDetail } from '../../api/categories';

const initialStateValue = {
  category: [],
  loading: false,
  status: 'idle',
};

export const getCategoryDetails = createAsyncThunk(
  'category/getCategoryDetails',
  async (id) => {
    const { data } = await getDetail(id);
    return data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: initialStateValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoryDetails.fulfilled, (state, action) => {
      state.category = action.payload;
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(getCategoryDetails.rejected, (state) => {
      state.loading = false;
      state.status = 'error';
    });
  },
});

export default categorySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBanner, add, remove, update } from '../../api/herobanner';

const initialStateValue = {
  banner: [],
  loading: false,
  status: 'idle',
  error: null,
};

export const fetchBanners = createAsyncThunk(
  'banner/fetchBanners',
  async () => {
    const { data } = await getAllBanner();
    return data;
  }
);

export const createBanner = createAsyncThunk(
  'banner/createBanner',
  async (banner) => {
    const { data } = await add(banner);
    return data;
  }
);

export const updateBanner = createAsyncThunk(
  'banner/updateBanner',
  async (banner) => {
    const { data } = await update(banner);
    return data;
  }
);

export const removeBanner = createAsyncThunk(
  'banner/removeBanner',
  async (id) => {
    const { data } = await remove(id);
    return data;
  }
);

const bannersSlice = createSlice({
  name: 'banner',
  initialState: initialStateValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBanners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBanners.fulfilled, (state, action) => {
      state.banner = action.payload;
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(fetchBanners.rejected, (state, action) => {
      state.loading = false;
      state.status = 'error';
      state.error = action.error.message;
    });
    builder.addCase(createBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBanner.fulfilled, (state, action) => {
      state.banner.push(action.payload);
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(createBanner.rejected, (state, action) => {
      state.loading = false;
      state.status = 'error';
      state.error = action.error.message;
    });
    builder.addCase(updateBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBanner.fulfilled, (state, action) => {
      const index = state.banner.findIndex(
        (item) => item.id === action.payload.id
      );
      state.banner[index] = action.payload;
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(updateBanner.rejected, (state, action) => {
      state.loading = false;
      state.status = 'error';
      state.error = action.error.message;
    });
    builder.addCase(removeBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeBanner.fulfilled, (state, action) => {
      const { _id } = action.payload;
      const index = state.banner.findIndex((item) => item._id === _id);
      state.banner.splice(index, 1);
      state.loading = false;
      state.status = 'success';
    });
  },
});

export const selectBannerById = (state, id) => {
  return state.banner.banner.find((item) => item._id === id);
};

export default bannersSlice.reducer;

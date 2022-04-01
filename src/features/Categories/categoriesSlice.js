import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategories } from '../../api/categories';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const { data } = await getAllCategories();
    return data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    status: null,
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    editCategory(state, action) {
      const { id, name } = action.payload;
      const category = state.categories.find((category) => category.id === id);
      category.name = name;
    },
    removeCategory(state, action) {
      const { id } = action.payload;
      const category = state.categories.find((category) => category.id === id);
      state.categories.splice(state.categories.indexOf(category), 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
      state.status = 'error';
    });
  },
});

export const { editCategory, removeCategory, addCategory } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;

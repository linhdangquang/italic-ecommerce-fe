import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategories, edit, add, delCategory } from '../../api/categories';

const initialStateValue = {
  categories: [],
  loading: false,
  status: 'idle',
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const { data } = await getAllCategories();
    return data;
  }
);

// export const deleteCategory = createAsyncThunk()
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (category) => {
    const { data } = await add(category);
    return data;
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (category) => {
    const { data } = await edit(category);
    return data;
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id) => {
    const { data } = await delCategory(id);
    return data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialStateValue,
  reducers: {},
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
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.loading = false;
      state.status = 'error';
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const { _id, name } = action.payload;
      const category = state.categories.find(
        (category) => category._id === _id
      );
      category.name = name;
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(updateCategory.rejected, (state) => {
      state.loading = false;
      state.status = 'error';
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const { _id } = action.payload;
      const category = state.categories.find(
        (category) => category._id === _id
      );
      state.categories.splice(state.categories.indexOf(category), 1);
      state.loading = false;
      state.status = 'success';
    });
  },
});

export const selectAllCategories = (state) => state.categories.categories;

export const selectCategoryById = (state, id) => {
  const category = state.categories.categories.find(
    (category) => category._id === id
  );
  return category;
};

export default categoriesSlice.reducer;

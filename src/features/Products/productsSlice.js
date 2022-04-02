import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllProducts,
  add,
  putProduct,
  delProduct,
} from '../../api/products';

const initialStateValue = {
  products: [],
  loading: false,
  status: 'idle',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data } = await getAllProducts();
    return data;
  }
);

export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  async (product) => {
    const { data } = await add(product);
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product) => {
    const { data } = await putProduct(product);
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    const { data } = await delProduct(id);
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: initialStateValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
      state.status = 'error';
    });
    builder.addCase(addNewProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(addNewProduct.rejected, (state) => {
      state.loading = false;
      state.status = 'error';
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const { _id, name, price, description, category } = action.payload;
      const product = state.products.find((product) => product._id === _id);
      product.name = name;
      product.price = price;
      product.description = description;
      product.category = category;
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.loading = false;
      state.status = 'error';
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const { _id } = action.payload;
      const product = state.products.find((product) => product._id === _id);
      state.products.splice(state.products.indexOf(product), 1);
      state.loading = false;
      state.status = 'success';
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.loading = false;
      state.status = 'error';
    });
  },
});

export const selectProductById = (state, id) => {
  return state.products.products.find((product) => product._id === id);
};

export default productsSlice.reducer;

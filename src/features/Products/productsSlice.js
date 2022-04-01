import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts, updateProduct } from '../../api/products';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data } = await getAllProducts();
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    status: null,
  },
  reducers: {
    editProduct(state, action) {
      const { id, name, price, description, image } = action.payload;
      const product = state.products.find((product) => product.id === id);
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
    },
    // removeProduct(state, action) {
    //   const { id } = action.payload;
    //   const product = state.products.find((product) => product.id === id);
    //   state.products.splice(state.products.indexOf(product), 1);
    // },
  },
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
  },
});

export const { editProduct } = productsSlice.actions;

export default productsSlice.reducer;

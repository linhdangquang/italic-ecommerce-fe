import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  items: [],
  totalAmount: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialStateValue,
  reducers: {
    getCartTotal: (state) => {
      const { totalAmount, totalCount } = state.items.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.totalAmount += itemTotal;
          return cartTotal;
        },
        { totalAmount: 0, totalCount: 0 }
      );
      state.totalAmount = parseInt(totalAmount.toFixed(2), 10);
      state.totalCount = totalCount;
    },
    addToCart: (state, action) => {
      const { _id, name, price, image, imageName, category } = action.payload;
      if (state.items.find((item) => item._id === _id)) {
        const item = state.items.find((item) => item._id === _id);
        item.amount += 1;
        item.total = item.price * item.amount;
      } else {
        state.items.push({
          _id,
          name,
          price,
          image,
          imageName,
          category,
          amount: 1,
          total: price,
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    increaseAmount: (state, action) => {
      state.items = state.items.map((item) => {
        if (item._id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
    },
    decreaseAmount: (state, action) => {
      state.items = state.items
        .map((item) => {
          if (item._id === action.payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount > 0);
    },
    clearCart: (state, action) => {
      state.items = [];
    },
    // getCartItems: (state, action) => {
    //   state.items = state.items;
    // },
  },
});

export const {
  getCartTotal,
  addToCart,
  increaseAmount,
  removeItem,
  decreaseAmount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

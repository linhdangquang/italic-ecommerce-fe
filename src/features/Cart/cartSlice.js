import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  items: [
    {
      id: 1,
      name: 'iPhone X',
      price: 1000,
      amount: 3,
    },
    {
      id: 2,
      name: 'Samsung X',
      price: 1000,
      amount: 2,
    },
  ],
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
          console.log(price, amount);
          const itemTotal = price * amount;
          console.log(itemTotal);
          cartTotal.totalAmount += itemTotal;
          return cartTotal;
        },
        { totalAmount: 0, totalCount: 0 }
      );
      state.totalAmount = parseInt(totalAmount.toFixed(2), 10);
      state.totalCount = totalCount;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseAmount: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
    },
    decreaseAmount: (state, action) => {
      state.items = state.items
        .map((item) => {
          if (item.id === action.payload) {
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
  increaseAmount,
  removeItem,
  decreaseAmount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

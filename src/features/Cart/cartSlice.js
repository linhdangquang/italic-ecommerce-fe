import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
        toast(`💚 Increase Success!, Total ${item.amount}`, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
        toast('✌ Add to Cart Success! ', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      toast('😢 Remove from Cart!', {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      toast('✔ Clear cart successfully', {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
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

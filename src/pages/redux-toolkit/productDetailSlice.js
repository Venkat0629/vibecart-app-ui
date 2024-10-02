import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProduct: null,
  backgroundPosition: '50% 50%',
  cart: JSON.parse(localStorage.getItem('cart')) || [], // Initialize cart from localStorage
};

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setBackgroundPosition: (state, action) => {
      state.backgroundPosition = action.payload;
    },
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(item => item.itemID === action.payload.itemID);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { setSelectedProduct, setBackgroundPosition, addToCart } = productDetailSlice.actions;

export default productDetailSlice.reducer;

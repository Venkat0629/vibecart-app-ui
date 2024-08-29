import { createSlice } from '@reduxjs/toolkit';
import productData from '../components/Homepage/productData'; // Update the path accordingly

const initialState = {
  products: productData,
  filteredProducts: productData,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    resetFilteredProducts: (state) => {
      state.filteredProducts = state.products;
    },
  },
});

export const { setFilteredProducts, resetFilteredProducts } = homeSlice.actions;

export default homeSlice.reducer;

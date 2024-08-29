// redux-toolkit/productPageSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterCategories: [],
  filterColors: [],
  filterPriceRanges: [],
  sortOption: '',
  showFilters: false,
};

const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  reducers: {
    toggleFilterVisibility: (state) => {
      state.showFilters = !state.showFilters;
    },
    setFilterCategories: (state, action) => {
      state.filterCategories = action.payload;
    },
    setFilterColors: (state, action) => {
      state.filterColors = action.payload;
    },
    setFilterPriceRanges: (state, action) => {
      state.filterPriceRanges = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    clearFilters: (state) => {
      state.filterCategories = [];
      state.filterColors = [];
      state.filterPriceRanges = [];
    },
  },
});

export const {
  toggleFilterVisibility,
  setFilterCategories,
  setFilterColors,
  setFilterPriceRanges,
  setSortOption,
  clearFilters,
} = productPageSlice.actions;

export default productPageSlice.reducer;

// productPageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterCategories: [],
  filterColors: [],
  filterPriceRanges: [],
  sortOption: '',
  showFilters: true,
};

const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  reducers: {
    setFilterCategories(state, action) {
      state.filterCategories = action.payload;
    },
    setFilterColors(state, action) {
      state.filterColors = action.payload;
    },
    setFilterPriceRanges(state, action) {
      state.filterPriceRanges = action.payload;
    },
    setSortOption(state, action) {
      state.sortOption = action.payload;
    },
    toggleFilterVisibility(state) {
      state.showFilters = !state.showFilters;
    },
  },
});

export const {
  setFilterCategories,
  setFilterColors,
  setFilterPriceRanges,
  setSortOption,
  toggleFilterVisibility,
} = productPageSlice.actions;

export default productPageSlice.reducer;

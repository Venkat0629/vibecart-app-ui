// redux-toolkit/store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import homeReducer from './homeSlice';
import productDetailReducer from './productDetailSlice';
import productPageReducer from './productPageSlice'; 

export default configureStore({
  reducer: {
    cart: cartReducer,
    home: homeReducer,
    productDetail: productDetailReducer,
    productPage: productPageReducer, 
  },
});

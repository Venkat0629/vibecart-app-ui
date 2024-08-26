import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartData: [],
        cartBillData: {
            totalBill: 0
        }
    },
    reducers: {
        updateCartData: (state, action) => {
            state.cartData = action.payload
        },
        updatecartBillData: (state, action) => {
            state.cartBillData.totalBill = action.payload
        }
    }
});

export const { updateCartData,updatecartBillData } = cartSlice.actions
export default cartSlice.reducer
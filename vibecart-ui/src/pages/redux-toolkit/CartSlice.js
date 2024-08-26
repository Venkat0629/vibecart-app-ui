import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartData: [],
        address:{},
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
        },
        updateAddressData :(state,action)=> {
            state.address = action.payload
        }
    }
});

export const { updateCartData,updatecartBillData ,updateAddressData} = cartSlice.actions
export default cartSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartData: [
            {
                productName: 'Classic T-Shirt',
                id: 1,
                description: 'A comfortable and stylish t-shirt made from 100% cotton.',
                quantity: 100,
                size: 'M',
                requestedQuantity: 1,
                price: 19.99,
                image: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?cs=srgb&dl=pexels-goumbik-292999.jpg&fm=jpg'
            },
            {
                productName: 'Classic T-Shirt',
                id: 2,
                description: 'A comfortable and stylish t-shirt made from 100% cotton.',
                quantity: 15,
                size: 'M',
                requestedQuantity: 1,
                price: 19.99,
                image: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?cs=srgb&dl=pexels-goumbik-292999.jpg&fm=jpg'
            },
            {
                productName: 'Classic T-Shirt',
                id: 3,
                description: 'A comfortable and stylish t-shirt made from 100% cotton.',
                quantity: 1,
                requestedQuantity: 1,
                size: 'M',
                price: 19.99,
                image: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?cs=srgb&dl=pexels-goumbik-292999.jpg&fm=jpg'
            }

        ],
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
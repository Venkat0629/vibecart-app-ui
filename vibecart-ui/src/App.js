import React, { useEffect } from 'react';
import {Routing} from './pages/routing/Routing'
import { useDispatch, useSelector } from 'react-redux';
import { updatecartBillData, updateCartData } from './pages/redux-toolkit/CartSlice';
import { calculateTotalBill } from './pages/commoncomponents/CommonFunctions';
const App = () => {
    const dispatch = useDispatch()
    const { cartData,cartBillData:{totalBill},cartBillData } = useSelector((state) => state.cart);

    const getCartData = () => {
        const cartData = localStorage.getItem("cartData");
        return cartData?.length > 0 ? JSON.parse(cartData) : []
      }
    useEffect(() => {
        const cartData = getCartData();
        dispatch(updateCartData(cartData));
        dispatch(updatecartBillData((calculateTotalBill(cartData))));
      }, []);
    
      useEffect(()=> {
        localStorage.setItem("cartBillData", JSON.stringify(cartBillData));
      },[totalBill]);
    return (
        
        
        <Routing />
        
            
        
    );
};

export default App;



import React, { useEffect } from 'react'
import './checkout.css'
import Shipping from './Shipping'
import Payment from './Payment'
import OrderSummary from './OrderSummary'
import { useDispatch, useSelector } from 'react-redux'
import { updateAddressData, updatecartBillData, updateCartData } from '../../../redux-toolkit/CartSlice'
import { calculateTotalBill } from '../../../commoncomponents/CommonFunctions'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {

  const dispatch = useDispatch()
  const { cartData, cartBillData: { totalBill }, cartBillData ,address} = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  }
  const getCartData = () => {
    const cartData = localStorage.getItem("cartData");
    const shippingAddress = localStorage.getItem("shippingAddress");

    return {
      cartData: cartData?.length > 0 ? JSON.parse(cartData) : [],
      address: shippingAddress ? JSON.parse(shippingAddress) : {}
    }
  }

  useEffect(() => {
    const {cartData, address} = getCartData();
     dispatch(updateCartData(cartData));
     dispatch(updateAddressData(address));
    dispatch(updatecartBillData((calculateTotalBill(cartData))));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartBillData", JSON.stringify(cartBillData));
  }, [totalBill]);

  return (
    <div class="checkout-container">
      <div class="checkout-component-layout">
        <div class="checkout-item "><Shipping address={address}/></div>
        <div class="checkout-item ">Delivery & Gift Options</div>
        <div class="checkout-item "><Payment address={address}/></div>
      </div>
      <div class="checkout-order-container"><OrderSummary cartData={cartData} cartBillData={cartBillData} navigateTo={navigateTo}/></div>
    </div>
  )
}

export default Checkout;
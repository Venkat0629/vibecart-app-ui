import React from 'react'
import './checkout.css'
import Shipping from './Shipping'
import Payment from './Payment'
import OrderSummary from './OrderSummary'
import { useSelector } from 'react-redux'

const Checkout = () => {
  const { cartData,cartBillData:{totalBill},cartBillData } = useSelector((state) => state.cart);

  return (
    <div class="checkout-container">
        <div class="checkout-component-layout">
            <div class="checkout-item "><Shipping></Shipping></div>
            <div class="checkout-item ">Delivery & Gift Options</div>
            <div class="checkout-item "><Payment/></div>
        </div>
        <div class="checkout-order-container"><OrderSummary cartData={cartData} cartBillData={cartBillData}/></div>
    </div>
  )
}

export default Checkout;
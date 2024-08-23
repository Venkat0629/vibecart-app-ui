import React from 'react'
import './checkout.css'
import Shipping from './Shipping'

const Checkout = () => {
  return (
    <div class="checkout-container">
        <div class="checkout-component-layout">
            <div class="checkout-item"><Shipping></Shipping></div>
            <div class="checkout-item">Delivery & Gift Options</div>
            <div class="checkout-item">Payment</div>
        </div>
        <div class="checkout-order-container">Order Summary</div>
    </div>
  )
}

export default Checkout
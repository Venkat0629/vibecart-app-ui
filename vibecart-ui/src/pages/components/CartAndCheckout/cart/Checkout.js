import React from 'react'
import './checkout.css'
import Shipping from '../../checkout/Shipping'

const Checkout = () => {
  return (
    <div class="grid-container">
        <div class="main">
            <div class="row"><Shipping></Shipping></div>
            <div class="row">Delivery & Gift Options</div>
            <div class="row">Payment</div>
        </div>
        <div class="order">Order Summary</div>
    </div>
  )
}

export default Checkout
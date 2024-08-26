import React from 'react'
import CartProducts from '../cart/CartProducts'
import './ordersummary.css'

const OrderSummary = ({ cartData, cartBillData, navigateTo }) => {
  return (
    <div className='ordersummary-checkout-container'>
      <h4>Order Summary</h4>
      <p><b>Your order ({cartData?.length} items)</b></p>
      <CartProducts cartData={cartData} navigateTo={navigateTo} />
      <hr></hr>
      <div className='ordersummary-bill-layout'>
        <p>Sub Total</p>
        <p><b>{cartBillData?.totalBill}</b></p>
      </div>
      <div className='ordersummary-bill-layout'>
        <p>Shipping Charges</p>
        <p><b>0</b></p>
      </div>
      <div className='ordersummary-bill-layout'>
        <p>Offers</p>
        <p><b>NA</b></p>
      </div>
      <hr></hr>
      <div className='ordersummary-bill-layout'>
        <p>Total</p>
       <p> <b>{cartBillData?.totalBill}</b></p>
      </div>
    </div>
  )
}

export default OrderSummary
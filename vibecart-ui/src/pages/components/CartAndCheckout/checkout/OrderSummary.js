import React from 'react'
import CartProducts from '../cart/CartProducts'

const OrderSummary = ({cartData,cartBillData}) => {
  return (
    <div className='ordersummary-checkout-container'>
           <h4>Order Summary</h4>
           <p><b> - Your order ({cartData?.length} items)</b></p>
           <CartProducts cartData={cartData}/>
    </div>
  )
}

export default OrderSummary
import React from 'react'
import CartProducts from '../cart/CartProducts'
import './checkoutcomponents.css'

const OrderSummary = ({ cartData, cartBillData, navigateTo }) => {

  const totalItems = cartData.reduce((total, product) => {
    return total + Number(product.requestedQuantity);
}, 0);  
return (
    <div className='ordersummary-checkout-container'>
      <h5>Order Summary</h5>
      <p><b>Items ({totalItems})</b></p>
      <CartProducts cartData={cartData} navigateTo={navigateTo} />
      <hr></hr>
      <div className='ordersummary-bill-layout'>
        <p>Sub Total</p>
        <p><b>${cartBillData?.totalBill}</b></p>
      </div>
      <div className='ordersummary-bill-layout'>
        <p>Shipping Charges</p>
        <p><b>$0</b></p>
      </div>
      <div className='ordersummary-bill-layout'>
        <p>Offers</p>
        <p><b>NA</b></p>
      </div>
      <hr></hr>
      <div className='ordersummary-bill-layout'>
        <p>Total</p>
       <p> <b>${cartBillData?.totalBill}</b></p>
      </div>
     
    </div>
  )
}

export default OrderSummary
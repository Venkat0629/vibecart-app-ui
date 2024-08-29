import React from 'react'
import CartProducts from '../cart/CartProducts'
import './ordersummary.css'
import ReusableButton from '../../../commoncomponents/ReusableButton'

const OrderSummary = ({ cartData, cartBillData, navigateTo }) => {

  const totalItems = cartData.reduce((total, product) => {
    return total + product.requestedQuantity;
  }, 0);
  return (
    <div className='ordersummary-checkout-container'>
      <h4>Order Summary</h4>
      <p><b>Your order ({totalItems} items)</b></p>
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
      <div className="place-order">
        <p><strong>By placing an order, you are agreeing to our Privacy Policy and Terms of Use</strong></p>
        <ReusableButton buttonName="Place Order with Cash" />
      </div>
    </div>
  )
}

export default OrderSummary
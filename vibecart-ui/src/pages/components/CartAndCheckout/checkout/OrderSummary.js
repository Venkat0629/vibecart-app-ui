import React from 'react'
import CartProducts from '../cart/CartProducts'
import './checkoutcomponents.css'
import { formatAmount } from '../../../commoncomponents/CommonFunctions';

const OrderSummary = ({ cartData, cartBillData, navigateTo }) => {

  const totalItems = cartData.reduce((total, product) => {
    return total + Number(product.requestedQuantity);
}, 0);  
const formattedPrice = formatAmount(cartBillData?.total);
const formattedTotalBill = formatAmount(cartBillData?.totalBill);
const formattedpromo = formatAmount(cartBillData?.promo);

return (
    <div className='ordersummary-checkout-container'>
      <h5>Order Summary</h5>
      <p><b>Items ({totalItems})</b></p>
      <CartProducts cartData={cartData} navigateTo={navigateTo} />
      {/* <hr></hr> */}
      <div className='ordersummary-bill-layout'>
        <p>Sub Total</p>
        <p><b>{formattedTotalBill}</b></p>
      </div>
      <div className='ordersummary-bill-layout'>
        <p>Promo applied</p>
        <p><b>{formattedpromo}</b></p>
      </div>
      <div className='ordersummary-bill-layout'>
        <p>Offers</p>
        <p><b>NA</b></p>
      </div>
      <hr></hr>
      <div className='ordersummary-bill-layout'>
        <p>Total</p>
       <p> <b>{formattedPrice}</b></p>
      </div>
     
    </div>
  )
}

export default OrderSummary
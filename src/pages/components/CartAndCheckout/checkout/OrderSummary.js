import React from 'react'
import CartProducts from '../cart/CartProducts'
import './checkoutcomponents.css'
import { formatAmount } from '../../../commoncomponents/CommonFunctions';

const OrderSummary = ({ cartData, cartBillData, navigateTo }) => {

  const totalItems = cartData?.reduce((total, product) => {
    return total + Number(product.requestedQuantity);
  }, 0);
  const formattedPrice = formatAmount(cartBillData?.total);
  const formattedTotalBill = formatAmount(cartBillData?.totalBill);
  const formattedpromo = formatAmount(cartBillData?.promo);
  const formattedCartOffer = formatAmount(cartBillData?.cartOffer);
  const cartOffers = JSON.parse(localStorage.getItem("cartOffers"));
  const promoCode = localStorage.getItem("promoCode");

  return (
    <div className='ordersummary-checkout-container'>
      <span style={{color:"grey"}}>ORDER SUMMARY</span>
      <p><b>Items ({totalItems})</b></p>
      {cartData?.map((product) => (

        <CartProducts key={product.skuID} product={product} cartData={cartData} navigateTo={navigateTo} />
      ))}
      {/* <hr></hr> */}
      <div className='ordersummary-bill-layout'>
        <p>Sub Total</p>
        <p style={{ fontSize: "20px", color: "#333333" }}><b>{formattedTotalBill}</b></p>
      </div>
      <div className='ordersummary-bill-layout'>
        {promoCode ?
          <>
            <p style={{ color: "#28A745" }}>{promoCode}</p>
            <p style={{ color: "#28A745" }}><b>{formattedpromo}</b></p>
          </>
          :
          <>
            <p>Promo applied</p>
            <p><b>{formattedpromo}</b></p>
          </>
        }
      </div>
      <div className='ordersummary-bill-layout'>
        {cartOffers ?
          <>
            <p style={{ color: "#28A745" }}>{cartOffers[0]?.offerName}</p>
            <p style={{ color: "#28A745" }}><b>{formattedCartOffer}</b></p>
          </>
          :
          <>
            <p>Offers</p>
            <p><b>{formattedCartOffer}</b></p>
          </>
        }
      </div>
      <hr></hr>
      <div className='ordersummary-bill-layout'>
        <p style={{fontSize:"20px"}}><b>Total</b></p>
        <p style={{ fontSize: "25px",color:"#FF5733" }}>  <b>{formattedPrice}</b></p>
      </div>

    </div>
  )
}

export default OrderSummary
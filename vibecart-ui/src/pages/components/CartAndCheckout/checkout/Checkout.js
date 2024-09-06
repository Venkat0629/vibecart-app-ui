import React, { useEffect, useState } from 'react'
import './checkout.css'
import Shipping from './Shipping'
import Payment from './Payment'
import OrderSummary from './OrderSummary'
import { useDispatch, useSelector } from 'react-redux'
import { updateAddressData, updatecartBillData, updateCartData } from '../../../redux-toolkit/CartSlice'
import { getCartData } from '../../../commoncomponents/CommonFunctions'
import { useNavigate } from 'react-router-dom'
import Accordion from './Accordian'
import DeliveryAndGiftOptions from './CheckoutOffers'

const Checkout = () => {

  const [openSection, setOpenSection] = useState(['shipping']);

  const toggleAccordion = (type) => {
    if (openSection.includes(type)) {
      setOpenSection(prevOpenSection =>
        prevOpenSection.filter(x => x !== type)
      );
    } else {
      setOpenSection(prevOpenSection =>
        [...prevOpenSection, type]
      );
    }
  };


  const toggleAccordionOnContinue = () => {
    setOpenSection(prevOpenSection =>
      [prevOpenSection.filter(x => x !== "shipping"), "offers"]
    );
  };
  const dispatch = useDispatch()
  const { cartData, cartBillData, address } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  }

  const calculateTotalBill = (cartData) => {
    const billing = { ...cartBillData, totalBill: 0, total: 0, promo: 0 }
    localStorage.setItem("billingData", JSON.stringify(billing));
    const localBillingObject = JSON.parse(localStorage.getItem("billingData"));
    const totalCartBill = cartData.reduce((total, product) => {
      return total + (product.price * product.requestedQuantity);
    }, 0);

    const billingObject = { ...cartBillData, totalBill: Math.floor(totalCartBill), total: Math.floor(totalCartBill - localBillingObject?.promo), promo: localBillingObject?.promo }
    dispatch(updatecartBillData(billingObject));
    localStorage.setItem("billingData", JSON.stringify(billingObject))

  }
  useEffect(() => {
    const { cartData, address } = getCartData();
    dispatch(updateCartData(cartData));
    dispatch(updateAddressData(address));
    calculateTotalBill(cartData);
  }, []);

  return (
    <div className="checkout-container">
      <div className="checkout-component-layout">
        <div style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
          <Accordion toggleAccordian={() => toggleAccordion("shipping")} isOpen={openSection.includes('shipping')} title="Shipping Address" >
            <Shipping address={address} toggleAccordionOnContinue={toggleAccordionOnContinue} />
          </Accordion>
        </div>
        <div style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
          <Accordion toggleAccordian={() => toggleAccordion("offers")} isOpen={openSection.includes('offers')} title="Offers">
            <DeliveryAndGiftOptions />
          </Accordion>
        </div>
        <div >
          <Accordion toggleAccordian={() => toggleAccordion("payment")} isOpen={openSection.includes('payment')} title="Payment" >
            <Payment address={address} cartBillData={cartBillData} />
          </Accordion>
        </div>
      </div>
      <div className="checkout-order-container"><OrderSummary cartData={cartData} cartBillData={cartBillData} navigateTo={navigateTo} /></div>
    </div>
  )
}

export default Checkout;
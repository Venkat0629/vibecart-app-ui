import React, { useEffect, useState } from 'react'
import './checkout.css'
import Shipping from './Shipping'
import Payment from './Payment'
import OrderSummary from './OrderSummary'
import { useDispatch, useSelector } from 'react-redux'
import { updateAddressData, updatecartBillData, updateCartData } from '../../../redux-toolkit/CartSlice'
import { calculateTotalBill, getCartData } from '../../../commoncomponents/CommonFunctions'
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
      [prevOpenSection.filter(x => x !== "shipping"),"offers"]
    );
  };
  const dispatch = useDispatch()
  const { cartData, cartBillData: { totalBill }, cartBillData, address } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  }


  useEffect(() => {
    const { cartData, address } = getCartData();
    dispatch(updateCartData(cartData));
    dispatch(updateAddressData(address));
    dispatch(updatecartBillData((calculateTotalBill(cartData))));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartBillData", JSON.stringify(cartBillData));
  }, [totalBill]);

  return (
    <div class="checkout-container">
      <div class="checkout-component-layout">
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
            <Payment address={address} />
          </Accordion>
        </div>
      </div>
      <div class="checkout-order-container"><OrderSummary cartData={cartData} cartBillData={cartBillData} navigateTo={navigateTo} /></div>
    </div>
  )
}

export default Checkout;
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
 
  const [openSection, setOpenSection] = useState('shipping'); 
  const toggleAccordion = (type) => {
    setOpenSection(openSection ? "" :type);
  };



  const toggleAccordionOnContinue = (currentSection) => {
    if (currentSection === 'shipping') {
      setOpenSection('offers');
    } else if (currentSection === 'offers') {
      setOpenSection('payment');
    }
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
        <div >
          <Accordion toggleAccordian={()=>toggleAccordion("shipping")} isOpen={openSection === 'shipping'}  title="Shipping Address" >
            <Shipping address={address} handleAccordian={()=>toggleAccordionOnContinue("shipping")} />
          </Accordion>
        </div>
        <div >
          <Accordion toggleAccordian={()=>toggleAccordion("offers")} isOpen={openSection === 'offers'}  title="Offers">
            <DeliveryAndGiftOptions handleAccordian={()=>toggleAccordionOnContinue("offers")}/>
          </Accordion>
        </div>
        <div >
          <Accordion toggleAccordian={()=>toggleAccordion("payment")} isOpen={openSection === 'payment'} title="Payment" >
            <Payment address={address} handleAccordian={()=>toggleAccordionOnContinue("payment")}/>
          </Accordion>
        </div>
      </div>
      <div class="checkout-order-container"><OrderSummary cartData={cartData} cartBillData={cartBillData} navigateTo={navigateTo} /></div>
    </div>
  )
}

export default Checkout;
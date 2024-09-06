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
  const [flag, setFlag] = useState(false);
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
    // const getShippinaddress = JSON.parse(localStorage.getItem("shippingAddress"));
    const getbillingdata = JSON.parse(localStorage.getItem("billingData"));
console.log(getbillingdata)
    if (getbillingdata && Object.keys(getbillingdata).length > 0) {
      console.log("fhghgyv")
      setFlag(true);
    }
    else {
      console.log("else")
      const billing = { ...cartBillData, totalBill: 0, total: 0, promo: 0, cartOffer: 0 }
      const totalCartBill = cartData.reduce((total, product) => {
        return total + (product.price * product.requestedQuantity);
      }, 0);
      const billingObject = { ...cartBillData, totalBill: Math.floor(totalCartBill), total: Math.floor(totalCartBill - billing?.promo - billing?.cartOffer), promo: billing?.promo, cartOffer: billing?.cartOffer }
      dispatch(updatecartBillData(billingObject));
      localStorage.setItem("billingData", JSON.stringify(billingObject))
      console.log(billingObject)
      setFlag(true);
    }
  }

  const fetchAndStoreDiscount = async () => {
    try {
      const response = await fetch('http://localhost:5501/api/v1/vibe-cart/offers/bill');
      if (response.ok) {
        const offers = await response.json();
        const storedData = JSON.parse(localStorage.getItem('billingData'));
        console.log(storedData)
          
        
        const totalBill = storedData.totalBill;
        const filterCorrectCartOffer = offers?.filter((x) => x.billAmount < totalBill);

        const closestOffer = filterCorrectCartOffer?.reduce((closest, offer) => {
          const distance = Math.abs(offer.billAmount - totalBill);
          return distance < Math.abs(closest.billAmount - totalBill) ? offer : closest;
        }, offers[0]);

        let discount = 0;
        if (closestOffer) {
          if (closestOffer.offerDiscountType === 'PERCENTAGE') {
            discount = (closestOffer.offerDiscountValue / 100) * totalBill;

          } else if (closestOffer.offerDiscountType === 'PRICE') {
            discount = closestOffer.offerDiscountValue;
          }
        }
        console.log(storedData)
        const newTotalBill = totalBill - discount - storedData.promo;
        // storedData.cartOffer = discount;
        // storedData.total = newTotalBill;
        const billingObject = { ...storedData, cartOffer: discount, total: newTotalBill }
        console.log(billingObject)
        dispatch(updatecartBillData(billingObject));
        localStorage.setItem("billingData", JSON.stringify(billingObject));
      }
    } catch (error) {
      console.error('Failed to update billing data:', error);
    }
  };


  useEffect(() => {


      const { cartData, address } = getCartData();
      calculateTotalBill(cartData);

      dispatch(updateCartData(cartData));
      dispatch(updateAddressData(address));

      // Await the result of calculateTotalBill

      // Once calculateTotalBill is done, call fetchAndStoreDiscount
      }, []);
  useEffect(() => {
    fetchAndStoreDiscount()
  }, [flag])

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
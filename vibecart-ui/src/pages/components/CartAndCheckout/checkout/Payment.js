
import React, { useState } from "react";
import './checkoutcomponents.css'
import ReusableButton from "../../../commoncomponents/ReusableButton";
import { useDispatch } from "react-redux";
import { updatecartBillData } from "../../../redux-toolkit/CartSlice";
import useToast from "../../../commoncomponents/ToastHook";
import Toaster from "../../../commoncomponents/Toaster";

const Payment = ({ address, cartBillData }) => {
  const [promoCode, setPromoCode] = useState('');
  const [message, setMessage] = useState('');
  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
    setMessage("")
  };
  const { toast, showToast, triggerToast } = useToast();

  const dispatch = useDispatch();
  const updateBillingwrtPromo = (data) => {
    const discountValue = data[0].offerDiscountValue || 0;
    const discountedValue = cartBillData?.totalBill - (cartBillData?.totalBill * discountValue) / 100;
    const updatedCartBillData = {
      ...data[0],
      ...cartBillData,
      total: discountedValue,
      promo:(cartBillData?.totalBill * discountValue) / 100
    }
    dispatch(updatecartBillData(updatedCartBillData));
    localStorage.setItem("billingData", JSON.stringify(updatedCartBillData))

  }
  const validatePromoCode = async () => {
    try {
      const apiUrl = `http://localhost:5501/api/v1/vibe-cart/offers/coupon/${promoCode}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        if (data && data.length > 0) {
          triggerToast("success", `Promo code applied successfully! Discount: ${data[0].offerDiscountValue}%`)

          updateBillingwrtPromo(data);
        } else {
          setMessage('Invalid promo code. Please try again.');
        }
      } else {
        setMessage('Error: Unable to fetch promo code details.');
      }
    } catch (error) {
      setMessage('There was an error applying the promo code. Please try again.');
    }
  };
  const handleApplyPromoCode = () => {
    if (promoCode.trim()) {
      validatePromoCode();
    } else {
      setMessage('Please enter a promo code.');
    }
  };

  return (
    <div className="payment-container">
                  {showToast && <Toaster toastType={toast.type} toastMessage={toast.message} />}

      {address && Object.keys(address).length > 0 &&
        <>
          <b>Delivery Address</b>
          <div>
            <p>{address.address}, {address.building}</p>
            <p>{address.city}, {address.state}, {address.zip}</p>
            <p>{address.phone}</p>
          </div>
        </>}
      <div>
        <h6>Promo Code</h6>
        <div className="promo-code">
          <input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={handlePromoCodeChange}
          />
          <ReusableButton buttonName="Apply" handleClick={handleApplyPromoCode} />
        </div>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </div>


      <div className="payment-option">
        <input type="checkbox" id="cod" defaultChecked />
        <h6>Cash on delivery</h6>
      </div>

      <div className="place-order">
        <p><strong>By placing an order, you are agreeing to our Privacy Policy and Terms of Use</strong></p>
        <ReusableButton buttonName="Place Order" />
      </div>
    </div>
  );
};

export default Payment;

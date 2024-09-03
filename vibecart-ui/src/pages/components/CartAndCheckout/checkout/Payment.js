
import React from "react";
import './checkoutcomponents.css'
import ReusableButton from "../../../commoncomponents/ReusableButton";

const Payment = ({ address }) => {

  return (
    <div className="payment-container">
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
          <input type="tel" placeholder="Promo code" />
          <ReusableButton buttonName="Apply" />
        </div>
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

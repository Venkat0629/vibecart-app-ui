
import React from "react";
import "./payment.css"
import ReusableButton from "../../../commoncomponents/ReusableButton";

const Payment = () => {
  return (
    <div className="payment-container">
      <div>
        <h4>Billing Address</h4>
        <p>Sneha</p>
        <p>2491 Benton Ln, Kissimmee, FL 34567</p>
        <p>(987) 654-3109</p>
      </div>

      <div>
        <h4>Promo Code</h4>
        <div className="promo-code">
          <input type="tel" placeholder="Promo code" />
          <ReusableButton buttonName="Apply"/>
        </div>
      </div>

    
      <div className="place-order">
      <p><strong>By placing an order, you are agreeing to our Privacy Policy and Terms of Use</strong></p>
      <ReusableButton buttonName="Place Order with Cash"/>
      </div>
    </div>
  );
};

export default Payment;

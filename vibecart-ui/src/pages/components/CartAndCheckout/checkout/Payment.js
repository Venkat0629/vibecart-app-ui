
import React from "react";
import "./payment.css"
import ReusableButton from "../../../commoncomponents/ReusableButton";

const Payment = ({ address }) => {

  return (
    <div className="payment-container">
      <h4>Payment</h4>
      <h6>Delivery Address</h6>
      {address ?
        <div>
          <p>{address.address}, {address.building}</p>
          <p>{address.city}, {address.state}, {address.zip}</p>
          <p>{address.phone}</p>
        </div> :
        <p>NA</p>}
      <div>
        <h4>Promo Code</h4>
        <div className="promo-code">
          <input type="tel" placeholder="Promo code" />
          <ReusableButton buttonName="Apply" />
        </div>
      </div>


      <div className="place-order">
        <p><strong>By placing an order, you are agreeing to our Privacy Policy and Terms of Use</strong></p>
        <ReusableButton buttonName="Place Order with Cash" />
      </div>
    </div>
  );
};

export default Payment;

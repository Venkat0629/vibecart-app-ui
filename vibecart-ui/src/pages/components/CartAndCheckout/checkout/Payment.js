
import React from "react";
import "./payment.css"

const Payment = () => {
  return (
    <div className="payment-container">
      <div className="section">
        <h2>Billing Address</h2>
        <p>Sneha</p>
        <p>2491 Benton Ln, Kissimmee, FL 34567</p>
        <p>(987) 654-3109</p>
      </div>

      <div className="section">
        <h2>Promo Code</h2>
        <div className="promo-input">
          <input type="text" placeholder="Promo code" />
          <button>Apply</button>
        </div>
      </div>

      <div className="section">
        <h2>Payment Options</h2>
        <div className="option">
          <input type="radio" id="cod" name="payment" value="cod" defaultChecked />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>
      </div >

      <p className="terms">
        By placing an order, you are agreeing to our Privacy Policy and Terms of Use.
      </p>
      {/* <button className="place-order">Place Order</button> */}
      <div className="place-order-wrapper">
        <button className="place-order">Place Order</button>
      </div>
    </div>
  );
};

export default Payment;

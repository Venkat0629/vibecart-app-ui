
import React, { useState, useEffect } from "react";
import './checkoutcomponents.css'
import ReusableButton from "../../../commoncomponents/ReusableButton";
import { useDispatch } from "react-redux";
import { updatecartBillData } from "../../../redux-toolkit/CartSlice";
import useToast from "../../../commoncomponents/ToastHook";
import Toaster from "../../../commoncomponents/Toaster";
import { useNavigate } from "react-router-dom";

const Payment = ({ address, cartBillData }) => {
  const [promoCode, setPromoCode] = useState('');
  const [message, setMessage] = useState('');
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
    setMessage("")
  };
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const { toast, showToast, triggerToast } = useToast();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const updateBillingwrtPromo = (data) => {
    const localbillingdata = JSON.parse(localStorage.getItem("billingData"));
    const discountValue = data[0].offerDiscountValue || 0;
    const discountedValue = cartBillData?.totalBill - localbillingdata?.cartOffer - (cartBillData?.totalBill * discountValue) / 100;
    const updatedCartBillData = {
      ...data[0],
      ...localbillingdata,
      total: discountedValue,
      promo: (cartBillData?.totalBill * discountValue) / 100
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
          localStorage.setItem('promoCode', promoCode);
          setPromoCodeApplied(true);
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

  const handlePlaceOrder = async () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"))
    const billingData = JSON.parse(localStorage.getItem("billingData"))
    const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
    const offerDetails = JSON.parse(localStorage.getItem("cartOffers"));
    if (shippingAddress && Object.keys(shippingAddress).length > 0) {
      setLoading(true);
      const now = new Date();
      const orderDate = now.toISOString();
      const totalItems = cartItems.reduce((total, product) => {
        return total + Number(product.requestedQuantity);
      }, 0);
      const finalObject = {
        customer: { customerName: shippingAddress?.fullname, email: shippingAddress?.email, phoneNumber: shippingAddress?.phone },
        orderItems: cartItems,
        orderDate: orderDate,
        createdDate: "",
        updatedDate: "",
        subTotal: billingData?.totalAmount,
        totalAmount: billingData?.total,
        discountPrice: billingData.cartOffer || 0 + billingData.promo | 0,
        offerId: offerDetails[0]?.offerId || "",
        totalQuantity: totalItems,
        estimated_delivery_date: cartItems[0]?.estimatedDeliveryDate,
        shippingAddress: { name: shippingAddress.fullname, email: shippingAddress.email, phoneNumber: shippingAddress.phone, address: shippingAddress.address, city: shippingAddress.city, state: shippingAddress.state, zipcode: shippingAddress?.zip },
        billingAddress: { name: shippingAddress.fullname, email: shippingAddress.email, phoneNumber: shippingAddress.phone, address: shippingAddress.address, city: shippingAddress.city, state: shippingAddress.state, zipcode: shippingAddress?.zip },
        shippingzipCode: shippingAddress?.zip,
        orderStatus: "CONFIRMED",
        paymentStatus: "PENDING",
        paymentMethod: "COD"
      }
      try {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        const filteredItemfields = cartItems?.map(item => ({ sku: item.skuID, orderQuantity: item.requestedQuantity }));
        const res = await fetch(`http://localhost:8090/vibe-cart/orders/stock-reservation-call?customerZipcode=${finalObject?.shippingzipCode}`, { method: "POST", headers: { 'content-type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(filteredItemfields) });
        if ([200, 201].includes(res.status)) {
          const resp = res.json;
          const response = await fetch('http://localhost:6060/vibecart/ecom/orders/createOrder', { method: "POST", headers: { 'content-type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(finalObject) });
          if ([200, 201].includes(response.status)) {
            const respp = response.json;
            setLoading(false)
            navigate('/orderConfirmation');
          }
        }
        setLoading(false);
      }
      catch (e) {
        setLoading(false)
        console.log(e)
      }
    }
    else {
      setLoading(false);
      triggerToast("error", "Please enter shipping address")
    }
  }


  useEffect(() => {
    const storedPromoCode = localStorage.getItem('promoCode');
    if (storedPromoCode) {
      setPromoCode(storedPromoCode);
      setPromoCodeApplied(true);
    }
  }, []);

  return (
    <div className="payment-container">
      {showToast && <Toaster toastType={toast.type} toastMessage={toast.message} />}

      {address && Object.keys(address).length > 0 &&
        <>
          <b>Billing Address</b>
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
            disabled={promoCodeApplied}
          />
          {!promoCodeApplied && (<ReusableButton buttonName="Apply" handleClick={handleApplyPromoCode} />)}
        </div>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </div>
      <div className="payment-option">
        <input type="checkbox" checked={isChecked} handleChange={() => setIsChecked(true)} />
        <p style={{ margin: 0, padding: 0 }}>Cash on delivery</p>
      </div>

      <div className="place-order">
        <p><strong>By placing an order, you are agreeing to our Privacy Policy and Terms of Use</strong></p>
        <ReusableButton buttonName="Place Order" handleClick={handlePlaceOrder} disabled={loading} />
      </div>
    </div>
  );
};

export default Payment;

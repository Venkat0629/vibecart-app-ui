import React from 'react';
import './orderConfirmation.css';
import { useDispatch, useSelector } from 'react-redux';
import ReusableButton from '../../../commoncomponents/ReusableButton';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../checkout/OrderSummary';
import { updateCartData } from '../../../redux-toolkit/CartSlice';
import ErrorBoundary from '../../../commoncomponents/ErrorBoundary';

const OrderConfirmation = () => {
  const { cartBillData } = useSelector((state) => state.cart);
  const navigate = useNavigate()
 
const dispatch = useDispatch()
  const navigateTo = (path) => {
    navigate(path);
  }
const cartItems = JSON.parse(localStorage.getItem("cartItems"));
const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));

  const handleClose = ()=> {
    localStorage.clear();
    navigate('/');
    dispatch(updateCartData([]));
  }
  return (
    <ErrorBoundary>
    <div className="orderConfirmation">
      <div className='orderConfirmation-col1'>
        <h4>Thank you for your purchase</h4>
        <p>We will notify you by email once your order has been shipped.</p>
        <div style={{ paddingTop: "30px"}}>
          <h5><b>Shipping Address</b></h5>
          {shippingAddress && (
            <div>
              <p><b>Name:</b> {shippingAddress.fullname}</p>
              <p><b>Address:</b> {shippingAddress.address}, {shippingAddress.building}</p>
              <p><b>City:</b> {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.zip}</p>
              <p><b>Email:</b> {shippingAddress.email}</p>
              <p><b>Phone:</b> {shippingAddress.phone}</p>
            </div>
          )}
                  <ReusableButton buttonName="CLOSE" handleClick={handleClose} />

        </div>

      </div>
      <div className='orderConfirmation-col2'>
        <OrderSummary cartData={cartItems} cartBillData={cartBillData} navigateTo={navigateTo} />  </div>
    </div >
    </ErrorBoundary>

  );
};

export default OrderConfirmation;

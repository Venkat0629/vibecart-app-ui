import React, { useEffect } from 'react'
import './cart.css';
import OrderSummary from './OrderSummary';
import CartProducts from './CartProducts';
import { useNavigate } from 'react-router-dom';
import ReusableButton from '../../../commoncomponents/ReusableButton';
import { calculateTotalBill, getCartData } from '../../../commoncomponents/CommonFunctions'
import { useDispatch, useSelector } from 'react-redux';
import { updateAddressData, updatecartBillData, updateCartData } from '../../../redux-toolkit/CartSlice';
import ErrorBoundary from './ErrorBoundary';

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData, cartBillData: { totalBill }, cartBillData } = useSelector((state) => state.cart);

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
  }, [totalBill])

  return (

    cartData?.length > 0 ?
      <div className='cartLayout'>
        <ErrorBoundary>
        <div className='cartproductslayout'>
          <CartProducts cartData={cartData} editQuantity="true" getcartData={getCartData} navigateTo={navigateTo} />
        </div>
        </ErrorBoundary>
        <ErrorBoundary>
        <div className='orderSummaryLayout'>
          <OrderSummary cartData={cartData} totalBill={totalBill} navigateTo={navigateTo} getcartData={getCartData} />
        </div>
        </ErrorBoundary>
      </div> :
      <div className='emptyCart'>
        <h2>Your cart is empty!</h2>
        <p>Browse our collection to find something you'll love.</p>
        <ReusableButton buttonName="Go to Homepage" handleClick={() => navigateTo('/')} />
      </div>
  );
};

export default Cart
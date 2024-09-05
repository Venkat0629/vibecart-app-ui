import React, { useEffect } from 'react'
import './cart.css';
import OrderSummary from './OrderSummary';
import CartProducts from './CartProducts';
import {  useNavigate } from 'react-router-dom';
import ReusableButton from '../../../commoncomponents/ReusableButton';
import { getCartData, getQuantitydetails } from '../../../commoncomponents/CommonFunctions'
import { useDispatch, useSelector } from 'react-redux';
import { updateAddressData, updatecartBillData, updateCartData } from '../../../redux-toolkit/CartSlice';
import ErrorBoundary from '../../../commoncomponents/ErrorBoundary';

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData, cartBillData: {  promo }, cartBillData } = useSelector((state) => state.cart);

  const navigateTo = (path) => {
    navigate(path);
  }

  const updateItemQuantityDetails = async (cartData) => {
    const res = await getQuantitydetails(cartData);
    const updatedCartData = cartData.map(cartItem => {
      const updatedItem = res.find(resItem => resItem.skuID === cartItem.skuID);
      return {
        ...cartItem,
        totalQuantity: updatedItem ? updatedItem.totalQuantity : 0
      };
    });
    dispatch(updateCartData(updatedCartData));
    localStorage.setItem("cartItems", JSON.stringify(updatedCartData))
  }

  const calculateTotalBill = (cartData) => {
    const totalCartBill = cartData.reduce((total, product) => {
      return total + (product.price * product.requestedQuantity);
    }, 0);
    
    const billingObject = { ...cartBillData, totalBill: Math.floor(totalCartBill), total: Math.floor(totalCartBill - promo) }
    dispatch(updatecartBillData(billingObject));
  }
  useEffect(() => {
    const { cartData, address } = getCartData();
    if (cartData?.length > 0) {
      updateItemQuantityDetails(cartData);
      calculateTotalBill(cartData);
    }
    if (Object.keys(address).length > 0) {
      dispatch(updateAddressData(address));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("billingData", JSON.stringify(cartBillData))
  }, [cartBillData]);

  return (

    cartData?.length > 0 ?
      <div className='cartLayout'>
        <ErrorBoundary>
        <div className='cartproductslayout'>
        {cartData?.map((product) => (
          <CartProducts product={product} cartData={cartData} editQuantity="true" getcartData={getCartData} navigateTo={navigateTo} calculateTotalBill={calculateTotalBill}/>
        ))}
        </div>
        </ErrorBoundary>
        <ErrorBoundary>
        <div className='orderSummaryLayout'>
          <OrderSummary cartData={cartData} cartBillData={cartBillData} navigateTo={navigateTo} getcartData={getCartData} />
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
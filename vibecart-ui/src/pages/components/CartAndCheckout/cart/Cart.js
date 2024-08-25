import React, { useEffect } from 'react'
import './cart.css';
import OrderSummary from './OrderSummary';
import CartProducts from './CartProducts';
import { useNavigate } from 'react-router-dom';
import ReusableButton from '../../../commoncomponents/ReusableButton';
import { calculateTotalBill } from '../../../commoncomponents/CommonFunctions'
import { useDispatch, useSelector } from 'react-redux';
import { updatecartBillData, updateCartData } from '../../../redux-toolkit/CartSlice';

const Cart = () => {

  const dispatch = useDispatch()
  const { cartData,cartBillData:{totalBill} } = useSelector((state) => state.cart);
  

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  }
  const getCartData = () => {
    const cartData = localStorage.getItem("cartData");
    return cartData?.length > 0 ? JSON.parse(cartData) : []
  }
  // localStorage.setItem("cartData", JSON.stringify(cartData));

  useEffect(() => {
    const cartData = getCartData();
    dispatch(updateCartData(cartData));
    dispatch(updatecartBillData((calculateTotalBill(cartData))));
  }, []);

  return (
    cartData?.length > 0 ?
      <div className='cartLayout'>
        <div className='cartproductslayout'>
          <CartProducts cartData={cartData} editQuantity="true" getcartData={getCartData} navigateTo={navigateTo} />
        </div>
        <div className='orderSummaryLayout'>
          <OrderSummary cartData={cartData} totalBill={Math.floor(totalBill)} navigateTo={navigateTo} getcartData={getCartData} />
        </div>
      </div> :
      <div className='emptyCart'>
        <h2>Your cart is empty!</h2>
        <p>Browse our collection to find something you'll love.</p>
        <ReusableButton buttonName="Go to Homepage" handleClick={() => navigateTo('/')} />
      </div>
  );
};

export default Cart
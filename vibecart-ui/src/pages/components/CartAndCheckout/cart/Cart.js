import React, { useEffect, useState } from 'react'
import './cart.css';
import OrderSummary from './OrderSummary';
import CartProducts from './CartProducts';
import { useNavigate } from 'react-router-dom';
import ReusableButton from '../../../commoncomponents/ReusableButton';
import { calculateBillPerProduct, getCartData, getQuantitydetails } from '../../../commoncomponents/CommonFunctions'
import { useDispatch, useSelector } from 'react-redux';
import { updateAddressData, updatecartBillData, updateCartData } from '../../../redux-toolkit/CartSlice';
import ErrorBoundary from '../../../commoncomponents/ErrorBoundary';
import Loader from '../../../commoncomponents/Loading';

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { cartData, cartBillData: { promo } , cartBillData:{cartOffer}, cartBillData } = useSelector((state) => state.cart);

  const navigateTo = (path) => {
    navigate(path);
  }

  const updateItemQuantityDetails = async (cartData) => {
    const res = await getQuantitydetails(cartData);
    const updatedCartData = cartData.map(cartItem => {
      const updatedItem = res?.find(resItem => resItem.skuID === cartItem.skuID);
      return {
        ...cartItem,
        stockQuantity: updatedItem ? updatedItem.totalQuantity : cartItem.stockQuantity
      };
    });
    dispatch(updateCartData(updatedCartData));
    localStorage.setItem("cartItems", JSON.stringify(updatedCartData))
  }

  const calculateTotalBill = (cartData) => {
    const totalCartBill = cartData.reduce((total, product) => {
      return total + (product.price * product.requestedQuantity);
    }, 0);

    const billingObject = { ...cartBillData, totalBill: Math.floor(totalCartBill), total: Math.floor(totalCartBill - promo - cartOffer) }
    dispatch(updatecartBillData(billingObject));

  }

  const applyItemOffer = async (cartData) => {
    const data = JSON.parse(localStorage.getItem("cartItems"));
   
    const updatedcartDatabyItemOffer = cartData?.map((x) => ({
      ...x,
      price:!x.oldPrice && x.offers[0] ? (x.price - x.offers[0]?.offerDiscountValue) : x.price,
      oldPrice: x.oldPrice ?? x.price
    }));
    const totalAmountPerProduct = updatedcartDatabyItemOffer?.map((data) => ({
      ...data,
      totalAmountPerProductAfterOffer: Math.floor(data.requestedQuantity * data.price),
      AmountPerProduct: Math.floor(data.requestedQuantity * data.oldPrice)
    }));
    dispatch(updateCartData(totalAmountPerProduct));
    calculateTotalBill(totalAmountPerProduct);
    localStorage.setItem("cartItems", JSON.stringify(totalAmountPerProduct));
  }
  useEffect(() => {
    const { cartData, address } = getCartData();
    if (cartData?.length > 0) {
      updateItemQuantityDetails(cartData);
      applyItemOffer(cartData);
      calculateTotalBill(cartData);
    }

    if (Object.keys(address).length > 0) {
      dispatch(updateAddressData(address));
    }
    setLoading(false);

  }, []);

  

  useEffect(() => {
    
  }, [cartBillData]);

  const handleEmptyCart = () => {
    dispatch(updateCartData([]));
    calculateTotalBill([]);
    localStorage.clear()
  }
  return (
    loading ? <Loader /> :
      cartData?.length > 0 ?
        <div className='cartLayout'>
          <ErrorBoundary>
            <div className='cartproductslayout'>
              {cartData?.map((product) => (
                <CartProducts product={product} cartData={cartData} editQuantity="true" getcartData={getCartData} navigateTo={navigateTo} calculateTotalBill={calculateTotalBill} />
              ))}
              <p className='removecartItemButton' onClick={handleEmptyCart}>EmptyCart</p>

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
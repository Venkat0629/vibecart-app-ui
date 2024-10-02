import React, { useState, useEffect } from 'react';
import './checkoutoffers.css';
import { useDispatch, useSelector } from 'react-redux';
import { updatecartBillData, updateCartData } from '../../../redux-toolkit/CartSlice';
import { calculateBillPerProduct } from '../../../commoncomponents/CommonFunctions';


function DeliveryAndGiftOptions({ onGiftWrapChange }) {
  const [isGiftWrap, setIsGiftWrap] = useState(() => {
    const savedGiftWrap = localStorage.getItem('isGiftWrap');
    return savedGiftWrap ? JSON.parse(savedGiftWrap) : false;
  });

  const giftWrapPrice = 20;
  const { cartData ,cartBillData,promo} = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  useEffect(() => {

    localStorage.setItem('isGiftWrap', JSON.stringify(isGiftWrap));
    localStorage.setItem('giftWrapPrice', JSON.stringify(isGiftWrap ? giftWrapPrice : 0));

    if (onGiftWrapChange) {
      onGiftWrapChange(isGiftWrap ? giftWrapPrice : 0);
    }
  }, [isGiftWrap, giftWrapPrice, onGiftWrapChange]);
  const calculateTotalBill = (data) => {
    const totalCartBill = data.reduce((total, product) => {
      return total + (product.price * product.requestedQuantity);
    }, 0);

    const billingObject = { ...cartBillData, totalBill: Math.floor(totalCartBill), total: Math.floor(totalCartBill - promo) }
    dispatch(updatecartBillData(billingObject));

  }
  const handleGiftWrapChange = () => {
    setIsGiftWrap(prevState => !prevState);
    if (isGiftWrap) {
      const data = cartData?.map((x) => ({ ...x, price: x.price + 20 }));
      calculateTotalBill(data);
      calculateBillPerProduct(data);
      dispatch(updateCartData(data));
      localStorage.setItem("cartItems", JSON.stringify(data));
    }
    else {
      const data = cartData?.map((x) => ({ ...x, price: x.price - 20 }));
      calculateTotalBill(data);
      calculateBillPerProduct(data);
      dispatch(updateCartData(data));
      localStorage.setItem("cartItems", JSON.stringify(data));
    }
  };

  return (
    <div className="delivery-gift-options">
      {/* <h4>Delivery & Gift Options</h4> */}
      <div className="gift-options">
        <input
          type="checkbox"
          id="giftWrap"
          name="giftWrap"
          checked={isGiftWrap}
          onChange={handleGiftWrapChange}
        />
        <label htmlFor="giftWrap">AddGiftWrap</label>
      </div>
      <div className="gift-wrap-description">
        Personalize the gifts with paying $20 per product extra only. Prices will be hidden on the order receipt.
      </div>
    </div>
  );
}

export default DeliveryAndGiftOptions;
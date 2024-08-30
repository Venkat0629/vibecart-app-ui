import React, { useState, useEffect } from 'react';
import './checkoutoffers.css';
 
 
function DeliveryAndGiftOptions({ onGiftWrapChange }) {
  const [isGiftWrap, setIsGiftWrap] = useState(() => {
    const savedGiftWrap = localStorage.getItem('isGiftWrap');
    return savedGiftWrap ? JSON.parse(savedGiftWrap) : false;
  });
 
  const giftWrapPrice = 20;
 
  useEffect(() => {
 
    localStorage.setItem('isGiftWrap', JSON.stringify(isGiftWrap));
    localStorage.setItem('giftWrapPrice', JSON.stringify(isGiftWrap ? giftWrapPrice : 0));
 
    if (onGiftWrapChange) {
      onGiftWrapChange(isGiftWrap ? giftWrapPrice : 0);
    }
  }, [isGiftWrap, giftWrapPrice, onGiftWrapChange]);
 
  const handleGiftWrapChange = () => {
    setIsGiftWrap(prevState => !prevState);
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
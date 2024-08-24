import React, { useEffect, useMemo, useState } from 'react'
import './cart.css';
import OrderSummary from './OrderSummary';
import CartProducts from './CartProducts';
import { useNavigate } from 'react-router-dom';
import ReusableButton from '../../../commoncomponents/ReusableButton';
import {calculateTotalBill} from '../../../commoncomponents/CommonFunctions'

const Cart = () => {

  const [totalBill, setTotalBill] = useState(null);
  const [cartData, setCartData] = useState([]);

  const navigate = useNavigate();
  const products = useMemo(() => [
    {
      productName: 'Classic T-Shirt',
      id: 1,
      description: 'A comfortable and stylish t-shirt made from 100% cotton.',
      quantity: 100,
      size: 'M',
      requestedQuantity: 1,
      price: 19.99,
      image: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?cs=srgb&dl=pexels-goumbik-292999.jpg&fm=jpg'
    },
    {
      productName: 'Classic T-Shirt',
      id: 2,
      description: 'A comfortable and stylish t-shirt made from 100% cotton.',
      quantity: 15,
      size: 'M',
      requestedQuantity: 1,
      price: 19.99,
      image: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?cs=srgb&dl=pexels-goumbik-292999.jpg&fm=jpg'
    },
    {
      productName: 'Classic T-Shirt',
      id: 3,
      description: 'A comfortable and stylish t-shirt made from 100% cotton.',
      quantity: 1,
      requestedQuantity: 1,
      size: 'M',
      price: 19.99,
      image: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?cs=srgb&dl=pexels-goumbik-292999.jpg&fm=jpg'
    }

  ], []);

  const navigateTo = (path)=> {
    navigate(path);
  }
  const getCartData = () => {
    const cartData = localStorage.getItem("cartData");
    return cartData?.length > 0 ? JSON.parse(cartData) : []
  }
  useEffect(() => {
    // localStorage.setItem("cartData", JSON.stringify(products));
    const cartData = getCartData();
    setCartData(cartData);
    setTotalBill(calculateTotalBill(cartData));

  }, []);
 
  return (
    cartData?.length > 0 ?
      <div className='cartLayout'>
        <div className='cartproductslayout'>
          <CartProducts products={cartData} editQuantity="true" setTotalBill={setTotalBill} getcartData={getCartData}/>
        </div>
        <div className='orderSummaryLayout'>
          <OrderSummary products={cartData} totalBill={Math.floor(totalBill)} navigateTo={navigateTo} getcartData={getCartData}/>
        </div>
      </div> :
      <div className='emptyCart'>
        <h2>Your cart is empty!</h2>
        <p>Browse our collection to find something you'll love.</p>
        <ReusableButton buttonName="Go to Homepage" handleClick={()=> navigateTo('/')} />
      </div>
  );
};

export default Cart
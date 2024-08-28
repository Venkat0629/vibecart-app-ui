import React, { useEffect } from 'react'
import './cart.css';
import OrderSummary from './OrderSummary';
import CartProducts from './CartProducts';
import { useNavigate } from 'react-router-dom';
import ReusableButton from '../../../commoncomponents/ReusableButton';
import { calculateTotalBill, getCartData } from '../../../commoncomponents/CommonFunctions'
import { useDispatch, useSelector } from 'react-redux';
import { updateAddressData, updatecartBillData, updateCartData } from '../../../redux-toolkit/CartSlice';

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData,cartBillData:{totalBill},cartBillData } = useSelector((state) => state.cart);
  
  const navigateTo = (path) => {
    navigate(path);
  }
  const data = [
    {
      "id": 1,
      "image": "https://media.istockphoto.com/id/1350560575/photo/pair-of-blue-running-sneakers-on-white-background-isolated.jpg?s=612x612&w=0&k=20&c=A3w_a9q3Gz-tWkQL6K00xu7UHdN5LLZefzPDp-wNkSU=",
      "productName": "Classic Leather Sneakers",
      "totalAmountPerProduct": 79.99,
      "price": 79.99,
      "quantity": 50,
      "requestedQuantity": 1,
      "description": "Stylish and comfortable leather sneakers perfect for everyday wear.",
      "color": "White"
    },
    {
      "id": 2,
      "image": "https://rukminim2.flixcart.com/image/450/500/xif0q/shoe/7/z/r/8-white-leaf-8-urbanbox-white-black-original-imagvgf4cuzs2hrw.jpeg?q=90&crop=true",
      "productName": "Running Shoes",
      "totalAmountPerProduct": 89.99,
      "price": 89.99,
      "quantity": 30,
      "requestedQuantity": 1,
      "description": "High-performance running shoes designed for comfort and durability.",
      "color": "Black"
    },
    {
      "id": 4,
      "image": "https://images-cdn.ubuy.co.in/653d06345111e1455a32d0b3-magcomsen-cotton-jacket-men-casual-stand.jpg",
      "productName": "Leather Biker Jacket",
      "totalAmountPerProduct": 199.99,
      "price": 199.99,
      "quantity": 15,
      "requestedQuantity": 1,
      "description": "A timeless leather biker jacket with a rugged style.",
      "color": "Black"
    },
    {
      "id": 5,
      "image": "https://images-cdn.ubuy.co.in/6538937984374c56f60a8e2e-junge-denim-jacket-men-fleece-jacket.jpg",
      "productName": "Windbreaker Jacket",
      "totalAmountPerProduct": 89.99,
      "price": 89.99,
      "quantity": 25,
      "requestedQuantity": 1,
      "description": "Lightweight windbreaker jacket perfect for windy or light rain conditions.",
      "color": "Navy Blue"
    }
  ];
  
  // localStorage.setItem("cartData", JSON.stringify(data));
  useEffect(() => {
    const {cartData, address} = getCartData();
     dispatch(updateCartData(cartData));
     dispatch(updateAddressData(address));
    dispatch(updatecartBillData((calculateTotalBill(cartData))));
  }, []);


  useEffect(()=> {
    localStorage.setItem("cartBillData", JSON.stringify(cartBillData));
  },[totalBill])

  return (
    
    cartData?.length > 0 ?
      <div className='cartLayout'>
        <div className='cartproductslayout'>
          <CartProducts cartData={cartData} editQuantity="true" getcartData={getCartData} navigateTo={navigateTo} />
        </div>
        <div className='orderSummaryLayout'>
          <OrderSummary cartData={cartData} totalBill={totalBill} navigateTo={navigateTo} getcartData={getCartData} />
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
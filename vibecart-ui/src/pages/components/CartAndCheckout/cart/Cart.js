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
 const data  = [
  {
    "skuID": 1,
    "color": "BLACK",
    "size": "SMALL",
    "itemID": 101,
    "itemName": "Running Shoes",
    "itemDescription": "Comfortable running shoes for all-day wear.",
    "price": 59.99,
    "imageURL": [
      "https://media.istockphoto.com/id/1350560575/photo/pair-of-blue-running-sneakers-on-white-background-isolated.jpg?s=612x612&w=0&k=20&c=A3w_a9q3Gz-tWkQL6K00xu7UHdN5LLZefzPDp-wNkSU=",
      "https://example.com/images/shoes_black_small_2.jpg"
    ],
    "categoryName": "Shoes",
    "availableColors": [
      "BLACK",
      "WHITE",
      "BLUE"
    ],
    "availableSizes": [
      "SMALL",
      "MEDIUM",
      "LARGE"
    ],
    "offerDetails": "10% off on first purchase",
    "stockQuantity": 25,
    "expectedDeliveryDate": "2024-09-05T10:30:00.000Z",
    "requestedQuantity": 1
  },
  {
    "skuID": 2,
    "color": "WHITE",
    "size": "MEDIUM",
    "itemID": 102,
    "itemName": "Casual Sneakers",
    "itemDescription": "Stylish casual sneakers for everyday use.",
    "price": 49.99,
    "imageURL": [
"https://rukminim2.flixcart.com/image/450/500/xif0q/shoe/7/z/r/8-white-leaf-8-urbanbox-white-black-original-imagvgf4cuzs2hrw.jpeg?q=90&crop=true",
      "https://example.com/images/sneakers_white_medium_2.jpg"
    ],
    "categoryName": "Shoes",
    "availableColors": [
      "WHITE",
      "BLACK"
    ],
    "availableSizes": [
      "MEDIUM",
      "LARGE"
    ],
    "offerDetails": "Buy one, get one 50% off",
    "stockQuantity": 40,
    "expectedDeliveryDate": "2024-09-10T14:00:00.000Z",
    "requestedQuantity": 1
  },
  {
    "skuID": 3,
    "color": "RED",
    "size": "LARGE",
    "itemID": 201,
    "itemName": "Winter Jacket",
    "itemDescription": "Warm and durable winter jacket perfect for cold weather.",
    "price": 129.99,
    "imageURL": [
      "https://images-cdn.ubuy.co.in/653d06345111e1455a32d0b3-magcomsen-cotton-jacket-men-casual-stand.jpg",
      "https://example.com/images/jacket_red_large_2.jpg"
    ],
    "categoryName": "Jackets",
    "availableColors": [
      "RED",
      "BLACK",
      "GREY"
    ],
    "availableSizes": [
      "LARGE",
      "XLARGE"
    ],
    "offerDetails": "20% off on all winter wear",
    "stockQuantity": 15,
    "expectedDeliveryDate": "2024-09-15T18:45:00.000Z",
    "requestedQuantity": 1
  },
  {
    "skuID": 4,
    "color": "BLACK",
    "size": "MEDIUM",
    "itemID": 202,
    "itemName": "Leather Jacket",
    "itemDescription": "Stylish leather jacket for a classic look.",
    "price": 199.99,
    "imageURL": [
      "https://images-cdn.ubuy.co.in/6538937984374c56f60a8e2e-junge-denim-jacket-men-fleece-jacket.jpg",
      "https://example.com/images/leather_jacket_black_medium_2.jpg"
    ],
    "categoryName": "Jackets",
    "availableColors": [
      "BLACK",
      "BROWN"
    ],
    "availableSizes": [
      "MEDIUM",
      "LARGE"
    ],
    "offerDetails": "Free shipping on orders over $100",
    "stockQuantity": 20,
    "expectedDeliveryDate": "2024-09-20T09:00:00.000Z",
    "requestedQuantity": 1
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
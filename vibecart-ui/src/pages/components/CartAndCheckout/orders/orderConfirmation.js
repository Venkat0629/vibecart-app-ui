import React from 'react';
import './orderConfirmation.css';
import CartProducts from '../cart/CartProducts';
import { useDispatch, useSelector } from 'react-redux';
import ReusableButton from '../../../commoncomponents/ReusableButton';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../checkout/OrderSummary';
import { updateCartData } from '../../../redux-toolkit/CartSlice';

const OrderConfirmation = () => {
  const { cartData, cartBillData, address } = useSelector((state) => state.cart);
  const navigate = useNavigate()
  const orderData = {
    cartItems: [
      {
        itemID: 345,
        itemName: "Energy Kicks",
        itemDescription:
          "Elevate your stability, making Energy Kicks perfect for running, training, or everyday wear.",
        price: 5000,
        imageURL:
          "http://localhost:8082/vibecart/ecom/items/images/energy-kicks-blue-shoe.jpeg",
        selectedColor: "BLUE",
        selectedSize: "SIX",
        requestedQuantity: 2,
        categoryID: 105,
        categoryName: "Sports",
        skuID: 1000,
        totalAmountPerProduct: 10000,
        stockQuantity: 48,
        zipcode: "500081",
        expectedDeliveryDate: "2024-09-10",
        offers: [],
      },
      {
        itemID: 345,
        itemName: "Energy Kicks",
        itemDescription:
          "Elevate your stability, making Energy Kicks perfect for running, training, or everyday wear.",
        price: 5000,
        imageURL:
          "http://localhost:8082/vibecart/ecom/items/images/energy-kicks-blue-shoe.jpeg",
        selectedColor: "BLUE",
        selectedSize: "SIX",
        requestedQuantity: 2,
        categoryID: 105,
        categoryName: "Sports",
        skuID: 1000,
        totalAmountPerProduct: 10000,
        stockQuantity: 48,
        zipcode: "500081",
        expectedDeliveryDate: "2024-09-10",
        offers: [],
      },
    ],
    shippingAddress: {
      fullname: "Naga Vishnu Miriyala",
      email: "nagavishnum1@gmail.com",
      address: "Hitec city",
      building: "Nisum building",
      city: "Hyderabad",
      state: "Arunachal Pradesh",
      zip: "500081",
      phone: "7702101478",
      totalBill: 10000,
      total: 10000,
      promo: null,
      offer: null,
    },
  };
const dispatch = useDispatch()
  const { cartItems, shippingAddress } = orderData;
  const navigateTo = (path) => {
    navigate(path);
  }

  const handleClose = ()=> {
    localStorage.clear();
    navigate('/');
    dispatch(updateCartData([]));
  }
  return (
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
        <OrderSummary cartData={cartData} cartBillData={cartBillData} navigateTo={navigateTo} />  </div>
      {/* <div className='orderConfirmation-col2'>
        {cartItems && cartItems.length > 0 && (
          cartItems.map((item, index) => (
            <div key={index} className="d-flex mb-3 border-bottom pb-3">
              <img src={item.imageURL} alt={item.itemName} className="img-fluid me-3" style={{ width: '100px', height: '100px' }} />
              <div>
                <p><b>{item.itemName}</b></p>
                <p>{item.itemDescription}</p>
                <p><b>Color:</b> {item.selectedColor}</p>
                <p><b>Size:</b> {item.selectedSize}</p>
                <p><b>Price:</b> ₹{item.price / 100}</p>
                <p><b>Quantity:</b> {item.requestedQuantity}</p>
                <p><b>Total:</b> ₹{item.totalAmountPerProduct / 100}</p>
                <p><b>Expected Delivery:</b> {item.expectedDeliveryDate}</p>
                {/* <p>Total Bill: ₹{shippingAddress.totalBill / 100}</p> */}
      {/* <p><b>Total Amount:</b> ₹{shippingAddress.total / 100}</p>
    </div>
            </div >
          ))
        )}
      </div >  */}
    </div >
  );
};

export default OrderConfirmation;

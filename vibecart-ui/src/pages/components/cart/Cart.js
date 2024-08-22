import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './cart.css';
import OrderSummary from './OrderSummary';
import CartProducts from './CartProducts';

const Cart = () => {

  const [totalBill, setTotalBill] = useState(null);

  const products = useMemo(() => [
    {
      productName: 'Classic T-Shirt',
      id: 1,
      description: 'A comfortable and stylish t-shirt made from 100% cotton.',
      quantity: 150,
      size: 'M',
      price: 19.99,
      image: 'https://example.com/images/classic-tshirt.jpg'
    },
    {
      productName: 'Classic T-Shirt',
      id: 1,
      description: 'A comfortable and stylish t-shirt made from 100% cotton.',
      quantity: 150,
      size: 'M',
      price: 19.99,
      image: 'https://example.com/images/classic-tshirt.jpg'
    },
    {
      productName: 'vishnu',
      id: 1,
      description: 'A comfortable and stylish t-shirt made from 100% cotton.',
      quantity: 150,
      size: 'M',
      price: 19.99,
      image: 'https://example.com/images/classic-tshirt.jpg'
    },
    
  ], []);


  const calculateTotalBill = useCallback(() => {
    const finalPrice = products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
    setTotalBill(finalPrice);
  }, [products]);

  useEffect(() => {
    calculateTotalBill();
  }, [calculateTotalBill]);

  return (
    <div className='cartLayout'>
      <div className='cartproductslayout'>
       <CartProducts products={products} editQuantity="true"/>
      </div>
      <div className='orderSummaryLayout'>
      <OrderSummary products={products} totalBill={Math.floor(totalBill)}/>
      </div>
    </div>
  );
};

export default Cart
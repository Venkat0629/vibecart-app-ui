import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './cart.css';

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
      productName: 'Running Shoes',
      id: 2,
      description: 'Lightweight running shoes designed for comfort and performance.',
      quantity: 80,
      size: '10',
      price: 89.99,
      image: 'https://example.com/images/running-shoes.jpg'
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
      <div className='cartproducts'>
        {products.map((product) => (
          <div key={product.id} className='productItem'>
            <img src={product.image} alt="image" className='productImage' />
            <div className='productDetails'>
              <h4>{product.productName}</h4>
              <p>{product.description}</p>
              <p>${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div >
        <h2>Order Summary</h2>
        <h4>Sub total ({products.length} items): ${totalBill}</h4>
      </div>
    </div>
  );
};

export default Cart
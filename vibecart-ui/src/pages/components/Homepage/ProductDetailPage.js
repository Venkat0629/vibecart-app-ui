import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import productData from '../Homepage/productData';
import '../Homepage/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = productData.find((p) => p.ItemID === parseInt(productId));

  const [backgroundPosition, setBackgroundPosition] = useState('50% 50%');

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div
                className="image-container"
                onMouseMove={handleMouseMove}
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundPosition: backgroundPosition,
                  cursor: 'zoom-in'
                }}
              >
                <img src={product.image} className="img-fluid" alt={product.ItemName} />
              </div>
            </div>
          </div>
          <div className="col-md-6 product-details">
            <h1>{product.ItemName}</h1>
            <p>{product.ItemDescription}</p>
            <p><strong>Price:</strong> ${product.Price.toFixed(2)}</p>
            <p><strong>Stock Quantity:</strong> {product.StockQuantity}</p>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

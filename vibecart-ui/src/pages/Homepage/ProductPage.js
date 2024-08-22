import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  // Fetch product details using id (not implemented here)
  return (
    <div>
      <h2>Product Details for {id}</h2>
      {/* Display product details and add to cart functionality */}
    </div>
  );
};

export default ProductPage;

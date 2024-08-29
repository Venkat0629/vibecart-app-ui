import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSelectedProduct, setBackgroundPosition, addToCart } from '../../redux-toolkit/productDetailSlice';
import '../Homepage/ProductDetailPage.css';
import ReusableButton from '../../commoncomponents/ReusableButton';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.productDetail.selectedProduct);
  const backgroundPosition = useSelector((state) => state.productDetail.backgroundPosition);

  useEffect(() => {
    // Fetch product details from the API
    axios.get(`http://localhost:8080/vibecart/items/item/${productId}`)
      .then(response => {
        dispatch(setSelectedProduct(response.data));
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productId, dispatch]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    dispatch(setBackgroundPosition(`${x}% ${y}%`));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`${product.itemName} has been added to your cart.`);
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
                  backgroundImage: `url(${product.imageURL[0]})`,
                  backgroundPosition: backgroundPosition,
                  cursor: 'zoom-in'
                }}
              >
                <img src={product.imageURL[0]} className="img-fluid" alt={product.itemName} />
              </div>
            </div>
          </div>
          <div className="col-md-6 product-details">
            <h1>{product.itemName}</h1>
            <p>{product.itemDescription}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            <div className="mb-8 avail">
              <label htmlFor="del" className="form-check-label mr-2">Delivery Availability</label>
              <input
                type="text"
                id="del"
                className="mt-2 mb-2"
                placeholder="Enter Pincode"
              />
            </div>
            <p><strong>Expected Delivery: 01st September 2024</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

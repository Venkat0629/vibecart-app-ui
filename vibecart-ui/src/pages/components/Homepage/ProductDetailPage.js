import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSelectedProduct, addToCart } from '../../redux-toolkit/productDetailSlice';
import '../Homepage/ProductDetailPage.css';
import ReusableButton from '../../commoncomponents/ReusableButton';

const defaultImage = 'https://via.placeholder.com/150';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.productDetail.selectedProduct);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [skuID, setSkuID] = useState('');
  const [currentImage, setCurrentImage] = useState(defaultImage);

  useEffect(() => {
    // Fetch product details from the API
    axios.get(`http://localhost:8082/vibecart/ecom/items/item/${productId}`)
      .then(response => {
        const productData = {
          ...response.data,
          imageURL: response.data.imageURLs // Map imageURLs to imageURL
        };
        dispatch(setSelectedProduct(productData));
        // Set default image from product details
        setCurrentImage(`http://${productData.imageURL[0]}` || defaultImage);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productId, dispatch]);

  useEffect(() => {
    if (selectedColor && selectedSize && product) {
      // Fetch specific image URL and SKU ID when color and size are selected
      axios.get(`http://localhost:8082/vibecart/ecom/products/product/item-id/${product.itemID}`, {
        params: {
          color: selectedColor,
          size: selectedSize
        }
      })
        .then(response => {
          setSkuID(response.data.skuID);
          setCurrentImage(`http://${response.data.imageURL}`); // Update with specific image URL
        })
        .catch(error => {
          console.error('Error fetching SKU ID and image URL:', error);
        });
    }
  }, [selectedColor, selectedSize, product]);

  const handleAddToCart = () => {
    if (selectedColor && selectedSize && product) {
      const cartItem = {
        itemID: product.itemID,
        itemName: product.itemName,
        itemDescription: product.itemDescription,
        price: product.price,
        imageURL: currentImage,
        selectedColor, // Add the selected color
        selectedSize,  // Add the selected size
        categoryID: product.categoryID, // Include categoryID
        categoryName: product.categoryName, // Include categoryName
        requestedQuantity:1,
        totalAmountPerProduct:product.price,
        skuID // Include SKU ID
      };

      // Get existing cart items from localStorage
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      // Check if the item with the same SKU ID already exists
      const itemExists = cartItems.some(item => 
        item.skuID === cartItem.skuID
      );

      if (itemExists) {
        alert('This item with the same SKU ID is already in your cart.');
      } else {
        // Add new item if it does not already exist
        cartItems.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Dispatch the action to update the cart state
        dispatch(addToCart(cartItem));
        alert(`${product.itemName} in ${selectedColor} color and ${selectedSize} size has been added to your cart.`);
      }
    } else {
      alert('Please select a color and size.');
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="imgcontent">
            <div className="image-gallery">
                {product.imageURLs.map((url, index) => (
                  <img
                    key={index}
                    src={`http://${url}`}
                    alt={`Thumbnail ${index}`}
                    className="thumbnail"
                    onClick={() => setCurrentImage(`http://${url}`)}
                  />
                ))}
              </div>
              <div
                className="image-container"
                style={{
                  backgroundImage: `url(${currentImage || defaultImage})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              >
                <img src={currentImage || defaultImage} className="img-fluid" alt={product.itemName} />
              </div>
            </div>
          </div>
          <div className="col-md-7 product-details">
            <h1>{product.itemName}</h1>
            {skuID && <p><strong>SKU ID:</strong> {skuID}</p>}
            <p>{product.itemDescription}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>

            <div className="product-options">
              <div className="option-group">
                <label><strong>Color:</strong></label>
                {product.availableColors.map((color, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="color"
                      id={`color-${index}`}
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                    />
                    <label className="form-check-label" htmlFor={`color-${index}`}>
                      {color}
                    </label>
                  </div>
                ))}
              </div>

              <div className="option-group">
                <label><strong>Size:</strong></label>
                {product.availableSizes.map((size, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="size"
                      id={`size-${index}`}
                      checked={selectedSize === size}
                      onChange={() => setSelectedSize(size)}
                    />
                    <label className="form-check-label" htmlFor={`size-${index}`}>
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button className="addToCart" onClick={handleAddToCart}>Add to Cart</button>

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

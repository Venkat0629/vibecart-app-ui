import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSelectedProduct, addToCart } from '../../redux-toolkit/productDetailSlice';
import '../Homepage/ProductDetailPage.css';
import { updateCartData } from '../../redux-toolkit/CartSlice';

const defaultImage = 'https://via.placeholder.com/600x400';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.productDetail.selectedProduct);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [skuID, setSkuID] = useState('');
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [offers, setOffers] = useState([]);
  const [zipcode, setZipcode] = useState('');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');
  const [stockQuantity, setStockQuantity] = useState(null);
  const [outOfStockMessage, setOutOfStockMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:6060/vibecart/ecom/items/item/${productId}`)
      .then((response) => {
        const productData = {
          ...response.data,
          imageURL: response.data.imageURLs,
        };
        dispatch(setSelectedProduct(productData));
        setCurrentImage(productData.imageURL?.[0] ? `http://${productData.imageURL[0]}` : defaultImage);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [productId, dispatch]);

  useEffect(() => {
    if (selectedColor && selectedSize && product) {
      axios.get(`http://localhost:6060/vibecart/ecom/products/product/item-id/${product.itemID}`, {
        params: { color: selectedColor, size: selectedSize }
      })
        .then(response => {
          setSkuID(response.data.skuID);
          setCurrentImage(`http://${response.data.imageURL}`);
          return axios.get(`http://localhost:8090/vibe-cart/inventory/quantity-by-sku?sku=${response.data.skuID}`);
        })
        .then(response => {
          setStockQuantity(response.data.data);
          setOutOfStockMessage(response.data <= 0 ? 'Out of stock' : '');
        })
        .catch(error => {
          console.error('Error fetching SKU ID and image URL:', error);
        });
    }
  }, [selectedColor, selectedSize, product]);

  useEffect(() => {
    if (skuID) {
      axios
        .get(`http://localhost:5501/api/v1/vibe-cart/offers/sku/${skuID}`)
        .then((response) => {
          setOffers(response.data || []);
        })
        .catch((error) => {
          console.error('Error fetching offers:', error);
          setOffers([]);
        });
    }
  }, [skuID]);

  const fetchExpectedDeliveryDate = () => {
    if (skuID && zipcode.length === 6) {
      axios
        .get(`http://localhost:8090/vibe-cart/inventory/expected-delivery-date`, {
          params: { sku: skuID, zipcode: zipcode },
        })
        .then((response) => {
          setExpectedDeliveryDate(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching expected delivery date:', error);
          setExpectedDeliveryDate('');
        });
    }
  };

  const handleZipcodeChange = (e) => {
    const value = e.target.value;
    setZipcode(value);

    if (value.length === 6) {
      fetchExpectedDeliveryDate();
    } else {
      setExpectedDeliveryDate('');
    }
  };

  // const handleAddToCart = () => {
  //   if (selectedColor && selectedSize && product) {
  //     if (stockQuantity === null || stockQuantity <= 0) {
  //       setOutOfStockMessage('Out of stock');
  //       return;
  //     }

  //     const cartItem = {
  //       itemID: product.itemID,
  //       itemName: product.itemName,
  //       itemDescription: product.itemDescription,
  //       price: product.price,
  //       imageURL: currentImage,
  //       selectedColor,
  //       selectedSize,
  //       categoryID: product.categoryID,
  //       categoryName: product.categoryName,
  //       skuID,
  //     };

  //     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  //     const itemExists = cartItems.some((item) => item.skuID === cartItem.skuID);

  //     if (itemExists) {
  //       alert('This item with the same SKU ID is already in your cart.');
  //     } else {
  //       cartItems.push(cartItem);
  //       localStorage.setItem('cartItems', JSON.stringify(cartItems));
  //       dispatch(addToCart(cartItem));
  //       alert(`${product.itemName} in ${selectedColor} color and ${selectedSize} size has been added to your cart.`);
  //     }
  //   } else {
  //     alert('Please select a color and size.');
  //   }
  // };

  const handleAddToCart = () => {
    if (selectedColor && selectedSize && product) {
      if (stockQuantity === null || stockQuantity <= 0) {
        setOutOfStockMessage('Out of stock');
        return;
      }

      // Create a list of offers with the required details
      const offerDetails = offers.map((offer) => ({
        offerId: offer.offerId,
        offerName: offer.offerName,
        offerDiscountType: offer.offerDiscountType,
        offerDiscountValue: offer.offerDiscountValue,
        offerType: offer.offerType,
      }));

      const cartItem = {
        itemID: product.itemID,
        itemName: product.itemName,
        itemDescription: product.itemDescription,
        price: product.price,
        imageURL: currentImage,
        selectedColor,
        selectedSize,
        requestedQuantity: 1,
        categoryID: product.categoryID,
        categoryName: product.categoryName,
        skuID,
        totalAmountPerProduct: product.price,
        stockQuantity,
        zipcode,
        expectedDeliveryDate,
        offers: offerDetails // Added offers
      };

      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      const itemExists = cartItems.some((item) => item.skuID === cartItem.skuID);

      if (itemExists) {
        alert('This item with the same SKU ID is already in your cart.');
      } else {
        cartItems.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        dispatch(addToCart(cartItem));
        dispatch(updateCartData(cartItems));
        alert(`${product.itemName} in ${selectedColor} color and ${selectedSize} size has been added to your cart.`);
      }
    } else {
      alert('Please select a color and size.');
    }
  };


  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found.</div>;
  }

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: product.itemName, path: `/product/${productId}` },
  ];

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="row">
          {/* Image Gallery and Main Image */}
          <div className="col-md-7 both_images">
            <div className="image-gallery">
              {product.imageURL?.map((url, index) => (
                <img
                  key={index}
                  src={`http://${url}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${currentImage === `http://${url}` ? 'active' : ''}`}
                  onClick={() => setCurrentImage(`http://${url}`)}
                />
              ))}
            </div>
            <div className="main-image">
              <img src={currentImage} alt={product.itemName} />
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-5 product-details">
            <h1>{product.itemName}</h1>
            {skuID && <h3 className="sku">SKU ID: {skuID}</h3>}
            <h4 className="category">Category: {product.categoryName}</h4>

            {/* Color Selection */}
            <div className="selection-group">
              <label htmlFor="color">Select Color:</label>
              <div className="color-options" id="color">
                {product.availableColors.map((color, index) => (
                  <button
                    key={index}
                    className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="selection-group">
              <label htmlFor="size">Select Size:</label>
              <div className="size-options" id="size">
                {product.availableSizes.map((size, index) => (
                  <button
                    key={index}
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <h2 className="price">${product.price.toFixed(2)}</h2>

            {outOfStockMessage && <p className="text-danger">{outOfStockMessage}</p>}

            <p className="description">{product.itemDescription}</p>

            {/* Offers Section */}
            {offers.length > 0 && (
              <div className="offers-section">
                <h3>Available Offers:</h3>
                <ul>
                  {offers.map((offer) => (
                    <li key={offer.offerId}>
                      {offer.offerName}: {offer.offerDiscountValue}
                      {offer.offerDiscountType === 'PERCENTAGE' ? '%' : '$'} off
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart Button */}
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>

            {/* Delivery Availability */}
            <div className="delivery-availability">
              <label htmlFor="zipcode">Delivery Availability:</label>
              <div>
                <div className="zipcode-input">
                  <input
                    type="text"
                    id="zipcode"
                    placeholder="Enter Zip Code"
                    value={zipcode}
                    onChange={handleZipcodeChange}
                  />

                  <button type="button" className="check-availability" onClick={fetchExpectedDeliveryDate}>
                    Check
                  </button>
                </div>
                {expectedDeliveryDate && (
                  <p className="expected-delivery" style={{ marginTop: '10px', color: 'green' }}>
                    Expected Delivery: {new Date(expectedDeliveryDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { MdTune } from "react-icons/md";
import axios from 'axios';
import {
  toggleFilterVisibility,
  setFilterCategories,
  setFilterColors,
  setFilterPriceRanges,
  setSortOption,
} from '../../redux-toolkit/productPageSlice';
import '../Homepage/ProductPage.css';

const defaultImage = 'https://via.placeholder.com/150';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';
  const category = searchParams.get('category');

  const {
    filterCategories,
    filterColors,
    filterPriceRanges,
    sortOption,
    showFilters,
  } = useSelector((state) => state.productPage);

  useEffect(() => {
    // Fetch products based on category or all products if no category is selected
    const fetchProducts = () => {
      const apiUrl = category
        ? `http://localhost:8082/vibecart/ecom/items/category/${category}`
        : 'http://localhost:8082/vibecart/ecom/items';

      axios
        .get(apiUrl)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchProducts();
  }, [category]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const updatedCategories = filterCategories.includes(value)
      ? filterCategories.filter((category) => category !== value)
      : [...filterCategories, value];
    dispatch(setFilterCategories(updatedCategories));
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    const updatedColors = filterColors.includes(value)
      ? filterColors.filter((color) => color !== value)
      : [...filterColors, value];
    dispatch(setFilterColors(updatedColors));
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    const updatedPriceRanges = filterPriceRanges.includes(value)
      ? filterPriceRanges.filter((priceRange) => priceRange !== value)
      : [...filterPriceRanges, value];
    dispatch(setFilterPriceRanges(updatedPriceRanges));
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.itemName.toLowerCase().includes(searchTerm) ||
        product.itemDescription.toLowerCase().includes(searchTerm)
    )
    .filter((product) =>
      filterCategories.length
        ? filterCategories.includes(product.categoryID.toString())
        : true
    )
    .filter((product) =>
      filterColors.length
        ? product.availableColors.some((color) =>
            filterColors.includes(color.toLowerCase())
          )
        : true
    )
    .filter((product) => {
      if (!filterPriceRanges.length) return true;
      return filterPriceRanges.some((range) => {
        if (range === '500-above') {
          return product.price >= 500;
        }
        const [min, max] = range.split('-').map(Number);
        return product.price >= min && (max ? product.price <= max : true);
      });
    })
    .sort((a, b) => {
      if (sortOption === 'priceLowToHigh') {
        return a.price - b.price;
      } else if (sortOption === 'priceHighToLow') {
        return b.price - a.price;
      } else if (sortOption === 'nameAtoZ') {
        return a.itemName.localeCompare(b.itemName);
      } else if (sortOption === 'nameZtoA') {
        return b.itemName.localeCompare(a.itemName);
      }
      return 0;
    });

  console.log('Filter Price Ranges:', filterPriceRanges);
  console.log('Filtered Products:', filteredProducts);

  return (
    <div className="product-page">
      <div className="hero-section">
        <h1 className="text-center my-4">Explore Our Products</h1>
      </div>
      <div className="container mb-4 mt-2 custom-class">
        <button
          className="btn filter-button"
          onClick={() => dispatch(toggleFilterVisibility())}
        >
          {showFilters ? 'Hide Filters' : 'Filters'}
          <MdTune/>
        </button>
        <div className="sort-section">
          <label htmlFor="sortOption" className="form-label">Sort by:</label>
          <select
            id="sortOption"
            className="form-select"
            value={sortOption}
            onChange={(e) => dispatch(setSortOption(e.target.value))}
          >
            <option value="">Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="nameAtoZ">Name: A to Z</option>
            <option value="nameZtoA">Name: Z to A</option>
          </select>
        </div>
      </div>
      <div className="row">
        {showFilters && (
          <div className="col-md-2 mb-4 filter-section">
            <div className="mb-3">
              <h5>Categories</h5>
              <h6>Jackets:</h6>
              {/* <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1"
                  onChange={handleCategoryChange}
                  checked={filterCategories.includes('1')}
                />
                <label className="form-check-label">Backpacks</label>
              </div> */}
              <div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    value="101" // Winter Jackets
    onChange={handleCategoryChange}
    checked={filterCategories.includes('101')}
  />
  <label className="form-check-label">Winter Jackets</label>
</div>
<div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    value="102" // Winter Jackets
    onChange={handleCategoryChange}
    checked={filterCategories.includes('102')}
  />
  <label className="form-check-label">Leather Jackets</label>
</div>
<div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    value="103" // Winter Jackets
    onChange={handleCategoryChange}
    checked={filterCategories.includes('103')}
  />
  <label className="form-check-label">Casual Jackets</label>
</div>
<div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    value="104" // Winter Jackets
    onChange={handleCategoryChange}
    checked={filterCategories.includes('104')}
  />
  <label className="form-check-label">Outdoor &Sports 
  Jackets</label>
</div>
<h6>shoes:</h6>
<div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    value="105" // Sports
    onChange={handleCategoryChange}
    checked={filterCategories.includes('105')}
  />
  <label className="form-check-label">Sports</label>
</div>

<div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    value="106" // Sports
    onChange={handleCategoryChange}
    checked={filterCategories.includes('106')}
  />
  <label className="form-check-label">Casual</label>
</div>


            </div>

            <div className="mb-3">
              <h5>Colors</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="black"
                  onChange={handleColorChange}
                  checked={filterColors.includes('black')}
                />
                <label className="form-check-label">Black</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="white"
                  onChange={handleColorChange}
                  checked={filterColors.includes('white')}
                />
                <label className="form-check-label">White</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="green"
                  onChange={handleColorChange}
                  checked={filterColors.includes('green')}
                />
                <label className="form-check-label">Green</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="yellow"
                  onChange={handleColorChange}
                  checked={filterColors.includes('yellow')}
                />
                <label className="form-check-label">Yellow</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="blue"
                  onChange={handleColorChange}
                  checked={filterColors.includes('blue')}
                />
                <label className="form-check-label">Blue</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="red"
                  onChange={handleColorChange}
                  checked={filterColors.includes('red')}
                />
                <label className="form-check-label">Red</label>
              </div>
            </div>

            <div className="mb-3">
              <h5>Price Range</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="0-200"
                  onChange={handlePriceRangeChange}
                  checked={filterPriceRanges.includes('0-200')}
                />
                <label className="form-check-label">$0 - $200</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="200-500"
                  onChange={handlePriceRangeChange}
                  checked={filterPriceRanges.includes('200-500')}
                />
                <label className="form-check-label">$200 - $500</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="500-above"
                  onChange={handlePriceRangeChange}
                  checked={filterPriceRanges.includes('500-above')}
                />
                <label className="form-check-label">$500 and above</label>
              </div>
            </div>
          </div>
        )}
        <div className="col-md-10">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="col mb-4" key={product.itemID}>
                  <div className="card product-card">
                    <div className="image-container">
                      <img
                      src={product.imageURLs.length > 0 ? `http://${product.imageURLs[0]}` : defaultImage} 
                      className="card-img-top" alt={product.itemName} />
                    </div>
                    <div className="products_body">
                      <h5 className="card-title">{product.itemName}</h5>
                      <p className="card-text">${product.price}</p>
                      <Link to={`/product/${product.itemID}`} className="viewDetails">View Details</Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-center">No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

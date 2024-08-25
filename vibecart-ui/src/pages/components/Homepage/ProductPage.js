import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import productData from '../Homepage/productData';
import '../Homepage/ProductPage.css';

const ProductPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search')?.toLowerCase() || '';

    const [filterCategory, setFilterCategory] = useState('');
    const [sortOption, setSortOption] = useState('');

    const filteredProducts = productData
        .filter(
            (product) =>
                product.ItemName.toLowerCase().includes(searchTerm) ||
                product.ItemDescription.toLowerCase().includes(searchTerm)
        )
        .filter((product) => (filterCategory ? product.CategoryID === filterCategory : true))
        .sort((a, b) => {
            if (sortOption === 'priceLowToHigh') {
                return a.Price - b.Price;
            } else if (sortOption === 'priceHighToLow') {
                return b.Price - a.Price;
            } else if (sortOption === 'nameAtoZ') {
                return a.ItemName.localeCompare(b.ItemName);
            } else if (sortOption === 'nameZtoA') {
                return b.ItemName.localeCompare(a.ItemName);
            }
            return 0;
        });

    return (
        <div className="product-page">
            <h1 className="text-center my-4">All Products</h1>
            <div className="container mb-4">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="filterCategory" className="form-label">Filter by Category:</label>
                        <select
                            id="filterCategory"
                            className="form-select"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="bags">Bags</option>
                            <option value="shoes">Shoes</option>
                            <option value="jackets">Jackets</option>
                            {/* Add more categories as needed */}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="sortOption" className="form-label">Sort by:</label>
                        <select
                            id="sortOption"
                            className="form-select"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
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
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.ItemID}>
                                <div className="card">
                                    <img src={product.image} className="card-img-top" alt={product.ItemName} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.ItemName}</h5>
                                        <p className="card-text">{product.ItemDescription}</p>
                                        <p className="card-text"><strong>Price:</strong> ${product.Price.toFixed(2)}</p>
                                        <Link to={`/product/${product.ItemID}`} className="btn btn-primary">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No products found for "{searchTerm}".</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;

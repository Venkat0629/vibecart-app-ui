import React, { useState, useEffect } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdChecklistRtl } from "react-icons/md";
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import './layout.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [productData, setProductData] = useState([]); // Ensure productData is defined
    const { cartData } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Fetch product data from API
        axios.get('http://localhost:8082/vibecart/ecom/items')
            .then((response) => {
                setProductData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if (searchTerm.trim()) {
            const filteredSuggestions = productData
                .filter(product =>
                    product.itemName.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 5); // Limit suggestions to 5
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, productData]); // Ensure productData is included here

    useEffect(() => {
        // Clear suggestions on route change
        setSuggestions([]);
    }, [location]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${searchTerm.trim()}`);
        }
    };

    const handleNavigate = (path, category = '') => {
        const url = category ? `${path}?category=${category}` : path;
        navigate(url);
    };

    const handleSuggestionClick = (itemID, itemName) => {
        setSearchTerm(itemName); // Set the search term to the selected product's name
        setSuggestions([]); // Clear the suggestions
        navigate(`/product/${itemID}`, { replace: true }); // Navigate to the product page
    };

    const defaultImage = 'https://via.placeholder.com/50'; // Fallback image

    return (
        <div>
            <div className='nav_head'>
                <header className="navbar-container d-flex justify-content-between align-items-center p-3">
                    <div className="navbar-title" onClick={() => handleNavigate('/')}>VibeCart</div>
                    <form className="navbar-search" onSubmit={handleSearch}>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
                            className="navbar-search-input"
                        />
                        {searchTerm && suggestions.length > 0 && (
                            <div className="suggestions-list">
                                {suggestions.map((suggestion) => (
                                    <div
                                        key={suggestion.itemID}
                                        onClick={() => handleSuggestionClick(suggestion.itemID, suggestion.itemName)}
                                        className="suggestion-item d-flex align-items-center"
                                    >
                                        <img
                                            src={suggestion.imageURLs.length > 0 ? `http://${suggestion.imageURLs[0]}` : defaultImage}
                                            alt={suggestion.itemName}
                                            className="suggestion-image"
                                        />
                                        <div className="suggestion-text">
                                            <div className="suggestion-name">{suggestion.itemName}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </form>
                    <div className="navbar-icons d-flex align-items-center">
                        <div className="navbar-icon" onClick={() => handleNavigate('/profile')}>
                            <FaUser size={22} />
                        </div>
                        <div className="navbar-icon cart-icon" onClick={() => handleNavigate('/cart')}>
                            <IoCartOutline size={28} />
                            {cartData?.length > 0 && (
                                <span className="cart-item-count">{cartData?.length}</span>
                            )}
                        </div>
                        <div className="navbar-icon" title='Orders' onClick={() => handleNavigate('/orders')}>
                            <MdChecklistRtl />
                        </div>
                    </div>
                </header>
            </div>
            <nav className="menuBorder">
                <div className="navbar__menu">
                    <p onClick={() => handleNavigate('/')}>Home</p>
                    <p onClick={() => handleNavigate('/products', 'jackets')}>Jackets</p>
                    <p onClick={() => handleNavigate('/products', 'shoes')}>Shoes</p>
                    <p className='sale' onClick={() => handleNavigate('/sale')}>Sale</p>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

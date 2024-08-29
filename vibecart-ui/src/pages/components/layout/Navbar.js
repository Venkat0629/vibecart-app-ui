import React, { useState, useEffect } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdChecklistRtl } from "react-icons/md";
import axios from 'axios';
import './layout.css';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [productData, setProductData] = useState([]); // Ensure productData is defined
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Fetch product data from API
        axios.get('http://localhost:8080/vibecart/items')
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
                .slice(0, 6); // Limit suggestions to 5
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

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleSuggestionClick = (itemID, itemName) => {
        setSearchTerm(itemName); // Set the search term to the selected product's name
        setSuggestions([]); // Clear the suggestions
        navigate(`/product/${itemID}`, { replace: true }); // Navigate to the product page
    };

    return (
        <div>
            <header className="navbar-container d-flex justify-content-between align-items-center p-3 shadow">
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
                                    <img src={suggestion.imageURL[0]} alt={suggestion.itemName} className="suggestion-image" />
                                    <div className="suggestion-text">
                                        <div className="suggestion-name">{suggestion.itemName}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </form>
                <div className="navbar-icons d-flex align-items-center">
                    <div className="navbar-icon" onClick={() => handleNavigate('/cart')}>
                        <IoCartOutline size={28} />
                    </div>
                    <div className="navbar-icon" title='Orders' onClick={() => handleNavigate('/orders')}>
                        <MdChecklistRtl />
                    </div>
                </div>
            </header>
            <nav className="bg-light py-2">
                <div className="navbar__menu">
                    <button onClick={() => handleNavigate('/')}>Home</button>
                    <button onClick={() => handleNavigate('/products?category=Bags')}>Bags</button>
                    <button onClick={() => handleNavigate('/products?category=Shoes')}>Shoes</button>
                    <button onClick={() => handleNavigate('/products?category=Jackets')}>Jackets</button>
                    <button onClick={() => handleNavigate('/sale')}>Sale</button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

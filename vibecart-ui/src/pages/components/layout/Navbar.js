import React, { useState, useEffect } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdChecklistRtl } from "react-icons/md";
import './layout.css';
import productData from '../Homepage/productData'

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${searchTerm.trim()}`);
        }
    };

    const handleNavigate = (path)=> {
        navigate(path);
    }

    const handleSuggestionClick = (itemID, itemName) => {
        setSearchTerm(itemName); // Set the search term to the selected product's name
        setSuggestions([]); // Clear the suggestions
        navigate(`/product/${itemID}`, { replace: true }); // Navigate to the product page
    };

    useEffect(() => {
        if (searchTerm.trim()) {
            const filteredSuggestions = productData
                .filter(product =>
                    product.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 5); // Limit suggestions to 5
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        // Clear suggestions on route change
        setSuggestions([]);
    }, [location]);

    return (
        <div>
            <header className="navbar-container d-flex justify-content-between align-items-center p-3 shadow">
                <div className="navbar-title" onClick={()=> handleNavigate('/')}>VibeCart</div>
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
                                    key={suggestion.ItemID}
                                    onClick={() => handleSuggestionClick(suggestion.ItemID, suggestion.ItemName)}
                                    className="suggestion-item d-flex align-items-center"
                                >
                                    <img src={suggestion.image} alt={suggestion.ItemName} className="suggestion-image" />
                                    <div className="suggestion-text">
                                        <div className="suggestion-name">{suggestion.ItemName}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </form>
                <div className="navbar-icons d-flex align-items-center">
                    <div className="navbar-icon" onClick={()=> handleNavigate('/cart')}>
                        <IoCartOutline size={28} />
                    </div>
                    <div className="navbar-icon" title='Orders' onClick={()=> handleNavigate('/orders')}>
                        <MdChecklistRtl />
                    </div>
                </div>
            </header>
            <nav className="bg-light py-2">
                <div className="navbar__menu">
                    <button onClick={()=> handleNavigate('/')}>Home</button>
                    <button>Bags</button>
                    <button>Shoes</button>
                    <button>Jacket</button>
                    <button>Sale</button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

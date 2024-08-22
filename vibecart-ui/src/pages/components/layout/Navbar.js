import React, { useCallback } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import '../Navbar.css';
import { useSearch } from '../../Homepage/SearchContext';

const Navbar = () => {
    const { handleSearch } = useSearch();
    const navigate = useNavigate();

    const debouncedHandleSearch = useCallback(
        debounce((query) => handleSearch(query), 300),
        [handleSearch]
    );

    const handleSearchChange = (event) => {
        const query = event.target.value;
        if (event.key === 'Enter') {
            handleSearch(query);
        } else {
            debouncedHandleSearch(query);
        }
    };

    const handleCartRoute = () => {
        navigate('/cart');
    };

    return (
        <header className="navbar-container d-flex justify-content-between align-items-center p-3 shadow">
            <div className="navbar-title">VibeCart</div>

            <div className="navbar-search">
                <input
                    type="search"
                    onKeyUp={handleSearchChange} // Listen for key press events
                    onChange={handleSearchChange} // Handle changes in input value
                    placeholder="Search"
                    className="navbar-search-input"
                />
            </div>

            <div className="navbar-icons d-flex align-items-center">
                <div className="navbar-icon" onClick={handleCartRoute} aria-label="Cart">
                    <IoCartOutline size={28} />
                </div>
                <div className="navbar-icon" aria-label="User Profile">
                    <FaUser />
                </div>
            </div>
        </header>
    );
};

export default Navbar;

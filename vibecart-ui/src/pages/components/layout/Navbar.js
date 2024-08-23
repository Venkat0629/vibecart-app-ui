import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import '../Navbar.css';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${searchTerm.trim()}`);
        }
    };

    const handleCartRoute = () => {
        navigate('/cart');
    };

    const handleHomeRoute = () => {
        navigate('/');
    };

    return (
        <div>
            <header className="navbar-container d-flex justify-content-between align-items-center p-3 shadow">
                <div className="navbar-title" onClick={handleHomeRoute}>VibeCart</div>
                <form className="navbar-search" onSubmit={handleSearch}>
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="navbar-search-input"
                    />
                </form>
                <div className="navbar-icons d-flex align-items-center">
                    <div className="navbar-icon" onClick={handleCartRoute} aria-label="Cart">
                        <IoCartOutline size={28} />
                    </div>
                    <div className="navbar-icon" aria-label="User Profile">
                        <FaUser />
                    </div>
                </div>
            </header>
            <nav className="bg-light py-2">
                <div className="navbar__menu">
                    <button onClick={handleHomeRoute}>Home</button>
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

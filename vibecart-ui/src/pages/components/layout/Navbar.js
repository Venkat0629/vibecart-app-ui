import React, { useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { MdChecklistRtl } from "react-icons/md";
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

    const handleNavigate = (path)=> {
        navigate(path);
    }

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

import React from 'react'
import { useNavigate } from 'react-router-dom';

import './components.css'
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {

  const navigate = useNavigate();

  const handleCartRoute =()=> {
    navigate('/cart');
  }
  return (
    <div className='navbar'><FaShoppingCart style={{cursor:"pointer"}} onClick={handleCartRoute}/></div>
  )
}

export default Navbar
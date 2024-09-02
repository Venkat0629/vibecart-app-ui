import React from 'react';
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";


const CustomLeftArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: '#fff',
      color: '#8c0e12',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      boxShadow: '0 4px 8px 0 rgba(56, 51, 46, 0.16)',
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <FaChevronLeft/>
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: '#fff',
      color: '#8c0e12',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      boxShadow: '0 4px 8px 0 rgba(56, 51, 46, 0.16)',
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <FaChevronRight />
    
  </button>
);

export { CustomLeftArrow, CustomRightArrow };

import React, { useState } from 'react';
import './accordian.css'; // Ensure correct path to your CSS

const Accordion = ({toggleAccordian,isOpen, title, children }) => {
  return (
    <div className="accordion-section">
      <div className="accordion-header" onClick={toggleAccordian}>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;

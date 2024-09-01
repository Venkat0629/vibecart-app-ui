import React from 'react';
import './accordian.css'; // Ensure correct path to your CSS

const Accordion = ({toggleAccordian,isOpen, title, children }) => {
  return (
    <div className="accordion-section">
      <div className="accordion-header" onClick={toggleAccordian}>
        <h5>{title}</h5>
        <span style={{fontSize:"30px"}}>{isOpen ? '-' : '+'}</span>
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;

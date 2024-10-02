// Breadcrumbs.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css'; // Add your custom styles

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <nav className="breadcrumbs container">
      <ol>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path}>
            {index < breadcrumbs.length - 1 ? (
              <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
            ) : (
              <span>{breadcrumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 }
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

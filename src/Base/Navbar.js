import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Base.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSignOut = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        aria-expanded={!isCollapsed}
        aria-label="Toggle navigation"
        onClick={handleToggle}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/"
              isActive={(match, location) => location.pathname === '/'}
            >
              URL
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashboard"
              isActive={(match, location) => location.pathname === '/userorder'}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link sign-out-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

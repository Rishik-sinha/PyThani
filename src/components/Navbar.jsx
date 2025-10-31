import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';
import AccountDrawer from './AccountDrawer';

// 1. Accept the new 'cartItemCount' prop
function Navbar({ currentUser, onLoginClick, onLogout, cartItemCount }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAccountClick = () => {
    if (currentUser) {
      setIsDrawerOpen(prev => !prev);
    } else {
      onLoginClick();
      setIsDrawerOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <Link to="/" className="navbar-logo">
          PyThani
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/search" className="nav-links">
              AI Search
            </Link>
          </li>
        </ul>
        
        <div className="nav-icons">
          {/* 2. Change the cart icon to a Link */}
          <Link to="/cart" className="nav-icon-link">
            <FaShoppingCart />
            {/* 3. Add the badge if items are in the cart */}
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
          
          <button onClick={handleAccountClick} className="nav-icon-button">
            <FaUserCircle />
          </button>

          {isDrawerOpen && currentUser && (
            <AccountDrawer 
              currentUser={currentUser} 
              onLogout={() => {
                onLogout();
                setIsDrawerOpen(false);
              }} 
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
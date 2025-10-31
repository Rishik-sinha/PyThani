import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './AuthModal.css';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

// 1. We MUST accept 'onLoginSuccess' here
function AuthModal({ show, onClose, onLoginSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true);

  if (!show) {
    return null;
  }
  
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const switchToSignup = () => {
    setIsLoginView(false);
  };
  
  const switchToLogin = () => {
    setIsLoginView(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {isLoginView ? (
          // 2. We MUST pass 'onLoginSuccess' down to LoginPage
          <LoginPage 
            onSwitchToSignup={switchToSignup} 
            onLoginSuccess={onLoginSuccess} 
          />
        ) : (
          // 3. We MUST also pass 'onLoginSuccess' down to SignupPage
          <SignupPage 
            onSwitchToLogin={switchToLogin} 
            onLoginSuccess={onLoginSuccess} 
          />
        )}

      </div>
    </div>
  );
}

export default AuthModal;
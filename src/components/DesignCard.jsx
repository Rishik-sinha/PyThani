import React from 'react';
import './DesignCard.css';

// 1. Accept the new 'setPendingCartItem' prop
function DesignCard({ imageUrl, isLoggedIn, onOpenLoginModal, onAddToCart, setPendingCartItem }) {

  const handleAddToCartClick = () => {
    if (isLoggedIn) {
      // 2. If logged in, just add to cart as normal
      onAddToCart(imageUrl); 
    } else {
      // 3. If NOT logged in:
      //    First, remember which item they clicked
      setPendingCartItem(imageUrl);
      //    Then, open the login modal
      onOpenLoginModal(); 
    }
  };

  return (
    <div className="design-card">
      <div className="card-image-container">
        <img 
          src={imageUrl || 'https://via.placeholder.com/400x400.png?text=Shree+Design'} 
          alt="AI Generated Shree Design" 
          className="card-image" 
        />
      </div>
      <div className="card-content">
        <div className="card-actions">
          <button className="card-btn btn-primary" onClick={handleAddToCartClick}>
            Add to Cart
          </button>
          <button className="card-btn btn-secondary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default DesignCard;
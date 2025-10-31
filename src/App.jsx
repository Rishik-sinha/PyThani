import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import AuthModal from './components/AuthModal';
import CartPage from './pages/CartPage';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  
  // 1. NEW STATE: To remember the item a user clicked BEFORE logging in
  const [pendingCartItem, setPendingCartItem] = useState(null);

  const handleLoginSuccess = (userEmail) => {
    setIsLoggedIn(true);
    setCurrentUser(userEmail);
    setIsModalOpen(false);

    // 2. NEW LOGIC: After logging in, check if there's a pending item
    if (pendingCartItem) {
      handleAddToCart(pendingCartItem); // Add it to the cart
      setPendingCartItem(null); // Clear the pending item
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCartItems([]);
  };

  const handleAddToCart = (itemUrl) => {
    setCartItems(prevItems => [...prevItems, itemUrl]);
    console.log('Item added to cart:', itemUrl);
  };

  return (
    <div>
      <Navbar 
        currentUser={currentUser}
        onLoginClick={() => setIsModalOpen(true)}
        onLogout={handleLogout}
        cartItemCount={cartItems.length}
      /> 
      
      <Routes>
        <Route 
          path="/" 
          element={
            <SearchPage 
              isLoggedIn={isLoggedIn} 
              onOpenLoginModal={() => setIsModalOpen(true)} 
              onAddToCart={handleAddToCart}
              // 3. NEW PROP: Pass the 'set' function down
              setPendingCartItem={setPendingCartItem}
            />
          } 
        /> 
        <Route 
          path="/search" 
          element={
            <SearchPage 
              isLoggedIn={isLoggedIn} 
              onOpenLoginModal={() => setIsModalOpen(true)}
              onAddToCart={handleAddToCart}
              // 3. NEW PROP: Pass the 'set' function down
              setPendingCartItem={setPendingCartItem}
            />
          } 
        />
        <Route 
          path="/cart" 
          element={<CartPage cartItems={cartItems} isLoggedIn={isLoggedIn} />} 
        />
      </Routes>
      
      <AuthModal 
        show={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}

export default App
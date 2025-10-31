import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchPage.css';
import DesignCard from '../components/DesignCard';

// 1. Accept the 'setPendingCartItem' prop
function SearchPage({ isLoggedIn, onOpenLoginModal, onAddToCart, setPendingCartItem }) {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 

  const handleSearch = async () => {
    // ... (Your existing API call logic is all perfect) ...
    // ... (No changes needed inside this function) ...
    if (!prompt) return; 
    setIsLoading(true);
    setResults([]);
    setError(null); 
    const apiKey = 'FPSX739894b56beff0a7d6c7e0835ce51b2d';
    const apiUrl = '/api/v1/ai/text-to-image';
    const requestBody = {
      prompt: `a beautiful traditional design of 'shree', ${prompt}`,
      num_images: 4, 
    };
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-freepik-api-key': apiKey,
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }
      const data = await response.json();
      const formattedResults = data.data.map(imgObject => {
        return `data:image/jpeg;base64,${imgObject.base64}`;
      });
      setResults(formattedResults);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="search-page-container">
      <div className="prompt-container">
        {/* ... (this part is the same) ... */}
        <h1>AI Design Search</h1>
        <p>Describe the "shree" design you want to see.</p>
        <div className="prompt-input-wrapper">
          <input
            type="text"
            className="prompt-input"
            placeholder="e.g., 'in a traditional floral style'..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="prompt-button" onClick={handleSearch} disabled={isLoading}>
            {isLoading ? <FaSearch className="loading-icon" /> : <FaSearch />}
          </button>
        </div>
      </div>

      <div className="results-grid">
        {isLoading && <p className="loading-message">Generating your designs...</p>}
        {error && <p className="error-message">{error}</p>}
        
        {!isLoading && !error && results.map((imageUrl, index) => (
          <DesignCard 
            key={index}
            imageUrl={imageUrl} 
            isLoggedIn={isLoggedIn} 
            onOpenLoginModal={onOpenLoginModal} 
            onAddToCart={onAddToCart}
            // 2. Pass the 'set' function down to the card
            setPendingCartItem={setPendingCartItem}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
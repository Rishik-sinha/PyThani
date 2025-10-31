import React, { useState } from 'react'; // Import useState
import './LoginPage.css';

// 1. Accept the 'onLoginSuccess' prop
function LoginPage({ onSwitchToSignup, onLoginSuccess }) {
  // 2. Add state for inputs and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 3. Prevent the <a> tag link from refreshing
  const handleSwitchClick = (e) => {
    e.preventDefault();
    onSwitchToSignup();
  };

  // 4. Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 

    // --- START OF DEBUG CODE ---
    // This will show us what we are checking
    console.log('--- LOGIN ATTEMPT ---');
    console.log('You are trying to log in with:', { email, password });
    // --- END OF DEBUG CODE ---

    const users = JSON.parse(localStorage.getItem('shree_users')) || [];

    // --- START OF DEBUG CODE ---
    // This shows us what's in the database
    console.log('Users in storage:', users);
    // --- END OF DEBUG CODE ---

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      console.log('SUCCESS: User found!', user);
      onLoginSuccess(user.email);
    } else {
      console.log('FAILURE: No user found with this email/password combo.');
      setError('Invalid email or password.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      
      <h2>Welcome Back!</h2> 
      <p className="subtitle">Please login to your account.</p>

      {/* 5. Show error message if it exists */}
      {error && <p className="auth-error">{error}</p>}

      <div className="input-group">
        <label htmlFor="email">Email Address</label>
        {/* 6. Connect input to state */}
        <input 
          type="email" 
          id="email" 
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
      </div>

      <div className="form-options">
        <a href="#" className="forgot-password">Forgot Password?</a>
      </div>

      <button type="submit" className="login-button">
        Login
      </button>

      <div className="signup-link">
        <p>Don't have an account? 
          <a href="#" onClick={handleSwitchClick}>Sign Up Now</a>
        </p>
      </div>

    </form>
  );
}

export default LoginPage;
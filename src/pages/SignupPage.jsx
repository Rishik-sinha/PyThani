import React, { useState } from 'react'; // Import useState
import './LoginPage.css'; 

// 1. Accept the 'onLoginSuccess' prop
function SignupPage({ onSwitchToLogin, onLoginSuccess }) {
  // 2. Add state for inputs and errors
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 3. Prevent the <a> tag link from refreshing
  const handleSwitchClick = (e) => {
    e.preventDefault();
    onSwitchToLogin();
  };

  // 4. Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    // Get existing users from localStorage, or create an empty array
    const users = JSON.parse(localStorage.getItem('shree_users')) || [];

    // Check if the email is already in use
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      setError('This email address is already in use.');
      return;
    }

    // Add the new user
    const newUser = { name, email, password };
    users.push(newUser);

    // Save the updated users array back to localStorage
    localStorage.setItem('shree_users', JSON.stringify(users));

    // Sign up was successful, now log them in!
    onLoginSuccess(email); 
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      
      <h2 style={{ color: 'var(--primary-orange)' }}>Create Account</h2>
      <p className="subtitle">Let's get you started!</p>

      {/* 5. Show error message if it exists */}
      {error && <p className="auth-error">{error}</p>}

      <div className="input-group">
        <label htmlFor="name">Full Name</label>
        {/* 6. Connect input to state */}
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email Address</label>
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

      <button type="submit" className="login-button">
        Create Account
      </button>

      <div className="signup-link">
        <p>Already have an account? 
          <a href="#" onClick={handleSwitchClick}>Login Now</a>
        </p>
      </div>

    </form>
  );
}

export default SignupPage;
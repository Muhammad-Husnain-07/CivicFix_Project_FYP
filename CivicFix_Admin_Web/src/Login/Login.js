import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setUserRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Logic to validate credentials and assign roles
    if (username === 'superAdmin' && password === 'superAdmin') {
      localStorage.setItem('userRole', 'superAdmin'); // Store role in localStorage
      setUserRole('superAdmin'); // Set role in the App component
      navigate('/dashboard'); // Navigate to the dashboard
    } else if (username === 'subAdmin' && password === 'subAdmin') {
      localStorage.setItem('userRole', 'subAdmin'); // Store role in localStorage
      setUserRole('subAdmin'); // Set role in the App component
      navigate('/complaint'); // Navigate to the complaint page
    } else {
      alert('Invalid username or password'); // Show error for invalid credentials
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <h1>CIVICFIX</h1>
      </div>
      <div className="right-side">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="formm">
            <div className="form-group">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

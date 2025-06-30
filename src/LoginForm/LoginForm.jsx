import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [redirectMsg, setRedirectMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setRedirectMsg('');

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    if (username === 'admin' && password === 'admin123') {
      setSuccess('Login successful!');
      setTimeout(() => {
        setRedirectMsg('Redirecting to dashboard...');
        if (onLogin) onLogin(); // Optional callback
      }, 1000);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember Me
        </label>
        <button className="submit-btn" type="submit">Login</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        {redirectMsg && <div className="redirect">{redirectMsg}</div>}
      </form>
    </div>
  );
};

export default LoginForm;

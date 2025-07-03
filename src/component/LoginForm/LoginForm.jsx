// src/components/LoginForm.jsx
import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onSubmit, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value) => {
    if (!value.trim()) return 'Email is required';
    if (!emailRegex.test(value.trim())) return 'Invalid email address';
    return '';
  };

  const validatePassword = (value) => {
    if (!value.trim()) return 'Password is required';
    if (value.trim().length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const isFormValid = !emailError && !passwordError;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({
        email: email.trim(),
        password: password.trim(),
        remember,
      });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} data-testid="login-form">
      <h2>Login</h2>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched({ ...touched, email: true })}
        data-testid="email-input"
      />
      {touched.email && emailError && <span className="error">{emailError}</span>}

      <label htmlFor="password">Password</label>
      <div className="password-wrapper">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched({ ...touched, password: true })}
          data-testid="password-input"
        />
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setShowPassword(!showPassword)}
          data-testid="toggle-password"
          aria-label="Toggle password visibility"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      {touched.password && passwordError && <span className="error">{passwordError}</span>}

      <div className="login-options">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            data-testid="remember-checkbox"
          />
          Remember me
        </label>

        <button
          type="button"
          className="forgot-password"
          onClick={onForgotPassword}
          data-testid="forgot-password-link"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        data-testid="submit-btn"
        className={isFormValid ? '' : 'disabled'}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;

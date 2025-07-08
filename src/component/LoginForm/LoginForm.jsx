// src/components/LoginForm.jsx
import React, { useState } from 'react';
import './LoginForm.css';

function getFirstName(email) {
  if (!email) return '';
  const name = email.split('@')[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const LoginForm = ({
  onSubmit,
  onForgotPassword,
  user: userProp,
  onLogout,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(userProp || null);

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
      const userObj = { email: email.trim() };
      setUser(userObj);
      if (onSubmit) {
        onSubmit({
          email: email.trim(),
          password: password.trim(),
          remember,
        });
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setRemember(false);
    setTouched({});
    if (onLogout) onLogout();
  };

  // Show welcome message if user is present
  if (user && user.email) {
    return (
      <div className="login-success" data-testid="login-success">
        <h2>Welcome, {getFirstName(user.email)}!</h2>
        <p>Your email: <strong>{user.email}</strong></p>
        <button
          type="button"
          className="logout-btn"
          data-testid="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
      data-testid="login-form"
      aria-label="Login form"
      autoComplete="on"
    >
      <h2>Login</h2>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched({ ...touched, email: true })}
        data-testid="email-input"
        aria-invalid={!!(touched.email && emailError)}
        aria-describedby="email-error"
        autoComplete="username"
      />
      {touched.email && emailError && (
        <span className="error" id="email-error" data-testid="email-error">
          {emailError}
        </span>
      )}

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
          aria-invalid={!!(touched.password && passwordError)}
          aria-describedby="password-error"
          autoComplete="current-password"
        />
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setShowPassword(!showPassword)}
          data-testid="toggle-password"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      {touched.password && passwordError && (
        <span className="error" id="password-error" data-testid="password-error">
          {passwordError}
        </span>
      )}

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
        aria-disabled={!isFormValid}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;


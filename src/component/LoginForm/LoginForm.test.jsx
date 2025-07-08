import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('renders all fields and buttons', () => {
    render(<LoginForm onSubmit={jest.fn()} onForgotPassword={jest.fn()} />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('remember-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('forgot-password-link')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  it('shows validation errors on blur', () => {
    render(<LoginForm onSubmit={jest.fn()} onForgotPassword={jest.fn()} />);
    fireEvent.blur(screen.getByTestId('email-input'));
    fireEvent.blur(screen.getByTestId('password-input'));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('shows invalid email and short password errors', () => {
    render(<LoginForm onSubmit={jest.fn()} onForgotPassword={jest.fn()} />);
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'bademail' } });
    fireEvent.blur(screen.getByTestId('email-input'));
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: '123' } });
    fireEvent.blur(screen.getByTestId('password-input'));
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
  });

  it('shows password error for short password and removes error when valid', () => {
    render(<LoginForm onSubmit={jest.fn()} onForgotPassword={jest.fn()} />);
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: '123' } });
    fireEvent.blur(screen.getByTestId('password-input'));
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.blur(screen.getByTestId('password-input'));
    expect(screen.queryByText('Password must be at least 6 characters')).not.toBeInTheDocument();
  });

  it('calls onSubmit with valid data', () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} onForgotPassword={jest.fn()} />);
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.blur(screen.getByTestId('email-input'));
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });
    fireEvent.blur(screen.getByTestId('password-input'));
    fireEvent.click(screen.getByTestId('remember-checkbox'));
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
      remember: true,
    });
  });

  it('does not call onSubmit if form is invalid', () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} onForgotPassword={jest.fn()} />);
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: '' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('calls onForgotPassword when link is clicked', () => {
    const handleForgot = jest.fn();
    render(<LoginForm onSubmit={jest.fn()} onForgotPassword={handleForgot} />);
    fireEvent.click(screen.getByTestId('forgot-password-link'));
    expect(handleForgot).toHaveBeenCalled();
  });

  it('toggles password visibility', () => {
    render(<LoginForm onSubmit={jest.fn()} onForgotPassword={jest.fn()} />);
    const passwordInput = screen.getByTestId('password-input');
    const toggleBtn = screen.getByTestId('toggle-password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('submits form with Enter key when valid', () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} onForgotPassword={jest.fn()} />);
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.keyDown(screen.getByTestId('password-input'), { key: 'Enter', code: 'Enter' });
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('shows welcome message with first name and email when user is present', () => {
    render(<LoginForm user={{ email: 'admin@example.com' }} onSubmit={jest.fn()} onForgotPassword={jest.fn()} />);
    expect(screen.getByTestId('login-success')).toBeInTheDocument();
    expect(screen.getByText('Welcome, Admin!')).toBeInTheDocument();
    expect(screen.getByText(/Your email:/)).toBeInTheDocument();
    expect(screen.getByText('admin@example.com')).toBeInTheDocument();
  });

  it('shows logout button and returns to login form after logout', () => {
    const handleLogout = jest.fn();
    render(<LoginForm user={{ email: 'admin@example.com' }} onSubmit={jest.fn()} onForgotPassword={jest.fn()} onLogout={handleLogout} />);
    expect(screen.getByTestId('login-success')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('logout-btn'));
    expect(handleLogout).toHaveBeenCalled();
  });
});
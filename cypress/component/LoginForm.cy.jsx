// cypress/component/LoginForm.cy.jsx
import React from 'react';
import LoginForm from '../../src/component/LoginForm/LoginForm';

describe('<LoginForm /> - UI Coverage', () => {
  const mountForm = (props = {}) => {
    const defaults = {
      onSubmit: cy.stub().as('submitHandler'),
      onForgotPassword: cy.stub().as('forgotHandler'),
      onLogout: cy.stub().as('logoutHandler'),
    };
    return cy.mount(<LoginForm {...{ ...defaults, ...props }} />);
  };

  // 1. Basic Rendering & UI
  it('renders all fields and buttons', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').should('exist');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.get('[data-testid="remember-checkbox"]').should('exist');
    cy.get('[data-testid="forgot-password-link"]').should('exist');
    cy.get('[data-testid="submit-btn"]').should('exist');
  });

  it('toggles the Remember me checkbox', () => {
    mountForm();
    cy.get('[data-testid="remember-checkbox"]').should('exist').and('not.be.checked');
    cy.get('[data-testid="remember-checkbox"]').click().should('be.checked');
    cy.get('[data-testid="remember-checkbox"]').click().should('not.be.checked');
  });

  it('toggles password visibility', () => {
    mountForm();
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'password');
    cy.get('[data-testid="toggle-password"]').click();
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'text');
    cy.get('[data-testid="toggle-password"]').click();
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'password');
  });

  // 2. Validation
  it('shows required field errors on blur', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').focus().blur();
    cy.get('[data-testid="email-error"]').should('contain', 'Email is required');
    cy.get('[data-testid="password-input"]').focus().blur();
    cy.get('[data-testid="password-error"]').should('contain', 'Password is required');
  });

  it('shows invalid email and short password errors', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').type('bademail').blur();
    cy.get('[data-testid="email-error"]').should('contain', 'Invalid email address');
    cy.get('[data-testid="password-input"]').type('123').blur();
    cy.get('[data-testid="password-error"]').should('contain', 'Password must be at least 6 characters');
  });

  // 3. Form State & Interactions
  it('enables submit when form is valid', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').type('user@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="submit-btn"]').should('not.be.disabled');
  });

  it('does not call onSubmit if form is invalid', () => {
    mountForm();
    cy.get('[data-testid="submit-btn"]').should('be.disabled');
    cy.get('@submitHandler').should('not.have.been.called');
  });

  it('calls onForgotPassword when link is clicked', () => {
    mountForm();
    cy.get('[data-testid="forgot-password-link"]').click();
    cy.get('@forgotHandler').should('have.been.called');
  });

  // 4. Submission & Data
  it('calls onSubmit with valid data', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').type('user@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="remember-checkbox"]').click();
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('@submitHandler').should('have.been.calledWith', {
      email: 'user@example.com',
      password: 'password123',
      remember: true,
    });
  });

  it('remembers user when checkbox is checked and logs in', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').type('rememberme@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="remember-checkbox"]').click().should('be.checked');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('@submitHandler').should('have.been.calledWith', {
      email: 'rememberme@example.com',
      password: 'password123',
      remember: true,
    });
  });

  it('submits form with Enter key when valid', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').type('user@example.com');
    cy.get('[data-testid="password-input"]').type('password123{enter}');
    cy.get('@submitHandler').should('have.been.called');
  });

  // 5. Post-login UI & Security
  it('shows welcome message with first name and email when user is present', () => {
    mountForm({ user: { email: 'admin@example.com' } });
    cy.get('[data-testid="login-success"]').should('exist');
    cy.contains('Welcome, Admin!').should('exist');
    cy.contains('Your email:').should('exist');
    cy.contains('admin@example.com').should('exist');
    cy.get('[data-testid="login-form"]').should('not.exist');
  });

  it('does not show password after login', () => {
    mountForm({ user: { email: 'admin@example.com' } });
    cy.get('[data-testid="login-success"]').should('exist');
    cy.get('[data-testid="login-success"]').should('not.contain', 'password');
    cy.get('[data-testid="login-success"]').should('not.contain', 'password123');
  });

  it('shows logout button and returns to login form after logout', () => {
    mountForm({ user: { email: 'admin@example.com' } });
    cy.get('[data-testid="login-success"]').should('exist');
    cy.get('[data-testid="logout-btn"]').click();
    cy.get('@logoutHandler').should('have.been.called');
  });
});

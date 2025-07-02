// cypress/component/LoginForm.cy.jsx
import React from 'react';
import LoginForm from '../../src/components/LoginForm';

describe('<LoginForm /> - FULL UI Coverage', () => {
  const mountForm = (props = {}) => {
    const defaults = {
      onSubmit: cy.stub().as('submitHandler'),
      onForgotPassword: cy.stub().as('forgotHandler'),
    };
    return cy.mount(<LoginForm {...{ ...defaults, ...props }} />);
  };

  it('shows required field errors on blur', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').focus().blur();
    cy.get('.error').should('contain', 'Email is required');
    cy.get('[data-testid="password-input"]').focus().blur();
    cy.get('.error').should('contain', 'Password is required');
  });

  it('shows invalid email and short password errors', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').type('invalidemail');
    cy.get('[data-testid="password-input"]').type('123');
    cy.get('.error').should('contain', 'Invalid email address');
    cy.get('.error').should('contain', 'Password must be at least 6 characters');
  });

  it('disables submit when only one field is valid', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').type('user@example.com');
    cy.get('[data-testid="submit-btn"]').should('be.disabled');
    cy.get('[data-testid="email-input"]').clear();
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="submit-btn"]').should('be.disabled');
  });

  it('submits trimmed input values', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').type('  user@example.com  ');
    cy.get('[data-testid="password-input"]').type('  password123  ');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('@submitHandler').should('have.been.calledWith', {
      email: 'user@example.com',
      password: 'password123',
      remember: false,
    });
  });

  it('submits with Remember Me unchecked', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').type('user@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="remember-checkbox"]').uncheck().should('not.be.checked');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('@submitHandler').should('have.been.calledWith', {
      email: 'user@example.com',
      password: 'password123',
      remember: false,
    });
  });

  it('toggles Remember Me on and off', () => {
    mountForm();
    cy.get('[data-testid="remember-checkbox"]').check().should('be.checked');
    cy.get('[data-testid="remember-checkbox"]').uncheck().should('not.be.checked');
  });

  it('submits form using Enter key', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').type('user@example.com');
    cy.get('[data-testid="password-input"]').type('password123{enter}');
    cy.get('@submitHandler').should('have.been.called');
  });

  it('toggles password visibility', () => {
    mountForm();
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'password');
    cy.get('[data-testid="toggle-password"]').click();
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'text');
    cy.get('[data-testid="toggle-password"]').click();
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'password');
  });

  it('calls forgot password handler', () => {
    mountForm();
    cy.get('[data-testid="forgot-password-link"]').click();
    cy.get('@forgotHandler').should('have.been.called');
  });

  it('error messages reset after fixing input', () => {
    mountForm();
    cy.get('[data-testid="email-input"]').type('wrong');
    cy.get('[data-testid="password-input"]').type('123');
    cy.get('.error').should('contain', 'Invalid email address');
    cy.get('[data-testid="email-input"]').clear().type('user@example.com');
    cy.get('[data-testid="password-input"]').clear().type('password123');
    cy.get('.error').should('not.exist');
    cy.get('[data-testid="submit-btn"]').should('not.be.disabled');
  });
});

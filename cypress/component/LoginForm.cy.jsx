import React from 'react';
import { mount } from 'cypress/react';
import LoginForm from '../../src/LoginForm/LoginForm';

describe('LoginForm Component (UI Test)', () => {
  it('shows error when fields are empty', () => {
    mount(<LoginForm />);
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('contain', 'Username and password are required.');
  });

  it('shows error for invalid credentials', () => {
    mount(<LoginForm />);
    cy.get('input[type="text"]').type('wrong');
    cy.get('input[type="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('contain', 'Invalid credentials');
  });

  it('logs in successfully with correct credentials', () => {
    mount(<LoginForm />);
    cy.get('input[type="text"]').type('admin');
    cy.get('input[type="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.success').should('contain', 'Login successful!');
    cy.get('.redirect').should('contain', 'Redirecting to dashboard...');
  });
});

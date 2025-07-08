import React from 'react';
import { Header } from '../../src/stories/Header';

describe('<Header /> - FULL UI Coverage', () => {
  it('renders with no user (logged out)', () => {
    cy.mount(<Header user={null} />);
    cy.contains('Log in').should('exist');
    cy.contains('Sign up').should('exist');
    cy.contains('Welcome,').should('not.exist');
    cy.get('button').should('have.length', 2);
  });

  it('renders with user (logged in)', () => {
    cy.mount(<Header user={{ name: 'Test User' }} />);
    cy.contains('Welcome, Test User').should('exist');
    cy.contains('Log out').should('exist');
    cy.contains('Log in').should('not.exist');
    cy.contains('Sign up').should('not.exist');
    cy.get('button').should('have.length', 1);
  });

  it('calls onLogin when Log in is clicked', () => {
    const onLogin = cy.stub().as('onLogin');
    cy.mount(<Header user={null} onLogin={onLogin} />);
    cy.contains('Log in').click();
    cy.get('@onLogin').should('have.been.called');
  });

  it('calls onLogout when Log out is clicked', () => {
    const onLogout = cy.stub().as('onLogout');
    cy.mount(<Header user={{ name: 'Test User' }} onLogout={onLogout} />);
    cy.contains('Log out').click();
    cy.get('@onLogout').should('have.been.called');
  });

  it('calls onCreateAccount when Sign up is clicked', () => {
    const onCreateAccount = cy.stub().as('onCreateAccount');
    cy.mount(<Header user={null} onCreateAccount={onCreateAccount} />);
    cy.contains('Sign up').click();
    cy.get('@onCreateAccount').should('have.been.called');
  });

  

  it('renders correctly with missing props', () => {
    cy.mount(<Header />);
    cy.contains('Log in').should('exist');
    cy.contains('Sign up').should('exist');
  });
});
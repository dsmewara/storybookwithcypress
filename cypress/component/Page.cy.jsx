import React from 'react';
import { Page } from '../../src/stories/Page';

describe('<Page /> - FULL UI Coverage', () => {
  it('renders logged out state', () => {
    cy.mount(<Page />);
    cy.contains('Log in').should('exist');
    cy.contains('Sign up').should('exist');
    cy.contains('Welcome,').should('not.exist');
    cy.contains('Log out').should('not.exist');
  });

  it('renders logged in state after login', () => {
    cy.mount(<Page />);
    cy.contains('Log in').click();
    cy.contains('Welcome,').should('exist');
    cy.contains('Log out').should('exist');
    cy.contains('Log in').should('not.exist');
    cy.contains('Sign up').should('not.exist');
  });

  it('logs out and returns to logged out state', () => {
    cy.mount(<Page />);
    cy.contains('Log in').click();
    cy.contains('Log out').click();
    cy.contains('Log in').should('exist');
    cy.contains('Sign up').should('exist');
    cy.contains('Welcome,').should('not.exist');
  });

  it('renders correctly with missing props', () => {
    cy.mount(<Page />);
    cy.contains('Log in').should('exist');
    cy.contains('Sign up').should('exist');
  });

})

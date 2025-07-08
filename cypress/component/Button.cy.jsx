import React from 'react';
import { Button } from '../../src/stories/Button';

describe('<Button /> - UI Coverage', () => {
  it('renders with required label', () => {
    cy.mount(<Button label="My Button" />);
    cy.contains('My Button').should('exist');
  });

  it('renders primary button', () => {
    cy.mount(<Button primary label="Primary" />);
    cy.get('button').should('have.class', 'storybook-button--primary');
    cy.contains('Primary').should('exist');
  });

  it('renders secondary button (default)', () => {
    cy.mount(<Button label="Secondary" />);
    cy.get('button').should('have.class', 'storybook-button--secondary');
    cy.contains('Secondary').should('exist');
  });

  it('renders with custom background color', () => {
    cy.mount(<Button label="Colored" backgroundColor="#4f2121" />);
    cy.get('button').should('have.css', 'background-color').and('match', /rgb\(79, 33, 33\)/);
  });

  it('renders with size small', () => {
    cy.mount(<Button label="Small" size="small" />);
    cy.get('button').should('have.class', 'storybook-button--small');
  });

  it('renders with size medium', () => {
    cy.mount(<Button label="Medium" size="medium" />);
    cy.get('button').should('have.class', 'storybook-button--medium');
  });

  it('renders with size large', () => {
    cy.mount(<Button label="Large" size="large" />);
    cy.get('button').should('have.class', 'storybook-button--large');
  });

  it('calls onClick when clicked', () => {
    const onClick = cy.stub().as('onClick');
    cy.mount(<Button label="Click me" onClick={onClick} />);
    cy.contains('Click me').click();
    cy.get('@onClick').should('have.been.called');
  });

  it('passes extra props to the button', () => {
    cy.mount(<Button label="Test" data-testid="my-btn" />);
    cy.get('[data-testid="my-btn"]').should('exist');
  });

});














// import React from 'react';
// import Button from "../../src/Button";
// import { mount } from '@cypress/react';

// describe('Button component', () => {
//   it('renders with label', () => {
//     mount(<Button label="Click Me" />);
//     cy.contains('Click Me').should('exist');
//   });
// });

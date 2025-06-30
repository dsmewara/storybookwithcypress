import React from 'react';
import Button from "../../src/Button";
import { mount } from '@cypress/react';

describe('Button component', () => {
  it('renders with label', () => {
    mount(<Button label="Click Me" />);
    cy.contains('Click Me').should('exist');
  });
});

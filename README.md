# 🚀 React + Vite + Storybook + Testing Setup

This project demonstrates how to set up Storybook with the latest version for a React + Vite app, including interaction testing, accessibility, and unit testing.

---

## 📦 Tech Stack

- React + Vite
- Storybook 9+
- @storybook/addon-interactions
- @storybook/test-runner
- @testing-library/react
- Vitest or Jest

---

## 📁 Folder Structure
src/ 
└── components/ 
|    └── LoginForm/ 
|    ├── LoginForm.jsx 
|    ├── LoginForm.stories.jsx 
|    └── LoginForm.test.js .storybook/ 
├── main.js 
└── preview.js


---

## 🧱 Setup Instructions

### 1. Create a Vite + React App

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install

2. Install Storybook

    npx storybook@latest init

Choose:
    - Framework: React
    - Builder: Vite
    - Config: Recommended


3. Install Addons & Testing Tools

    npm install --save-dev \
    @storybook/addon-interactions \
    @storybook/test \
    @storybook/test-runner \
    @storybook/addon-a11y \
    @storybook/addon-docs \
    @storybook/addon-vitest \
    @testing-library/react \
    vitest


⚙️ Storybook Configuration

        .storybook/main.js

        /** @type { import('@storybook/react-vite').StorybookConfig } */
        const config = {
        stories: [
            '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
            '../src/components/**/*.mdx',
        ],
        addons: [
            '@storybook/addon-docs',
            '@storybook/addon-a11y',
            '@storybook/addon-interactions',
            '@storybook/addon-vitest',
            '@storybook/addon-essentials',
        ],
        framework: {
            name: '@storybook/react-vite'

Testing
        
        Add to package.json:

        "scripts": {
            "storybook": "storybook dev -p 6006",
            "build-storybook": "storybook build",
            "test-storybook": "test-storybook"
        }

Run Tests
        npm run storybook         # Start Storybook
        npm run test-storybook    # Run interaction tests
        npm test                  # Run unit tests


1. What is Storybook?
    Storybook is a tool for developing, showcasing, and documenting UI components in isolation—outside of your main app.
    It lets you see and interact with each component (like a Button or LoginForm) by itself, and view different versions (states) such as a blue button, a large button, or a button with an icon.

    Outcome:
    You and your team can visually review, test, and approve UI pieces before they are integrated into your application, ensuring quality and consistency across your product.


2. What are Storybook Components?
    Storybook components are reusable UI pieces (e.g., Button, LoginForm) that you build and test independently.
    Each component can have multiple “stories” showing different states (e.g., primary, disabled, with icon).


3. What is Cypress Component Testing?

    Cypress component testing lets you test individual React components in isolation, just like Storybook, but with automated checks.
    You mount a component (e.g., <Button />) in a real browser, interact with it, and assert its behavior and appearance.
    This is faster and more focused than end-to-end testing, and is ideal for verifying UI logic, props, and styles.

    Outcome:
    You get confidence that your components are reliable and bug-free, because Cypress automatically checks that each component works as expected—by opening it in a real browser, simulating user actions (like clicks), checking its color, and making sure it behaves correctly.

4.  Plan: Button Component

    1. Show the Button Component in Storybook
    Open Storybook.
    Show the Button in different states (primary, secondary, different sizes, background colors).
    Explain: “This is how we visually develop and review our UI components.”

5. Show the Button Component Code
    Open Button.jsx.
    Briefly explain the props: label, primary, backgroundColor, size, onClick.
    Point out how background color and text color are set.


6. Show Cypress Component Test Code
    Open Button.cy.jsx and explain:

    Each it block is a test for a specific Button state or behavior.

        Example1: Testing background color and text color.
        it('renders with blue background and white text', () => {
        cy.mount(<Button label="Demo" backgroundColor="#007bff" />);
        cy.get('button')
            .should('have.css', 'background-color', 'rgb(0, 123, 255)')
            .and('have.css', 'color', 'rgb(255, 255, 255)');
        });


        Example2: Testing click handler.
        it('calls onClick when clicked', () => {
        const onClick = cy.stub().as('onClick');
        cy.mount(<Button label="Click me" onClick={onClick} />);
        cy.contains('Click me').click();
        cy.get('@onClick').should('have.been.called');
        });




7. Run Cypress Component Tests

    Open Cypress in component mode:
    npx cypress open --component

    Select Button.cy.jsx.
    Show the tests running and passing in the Cypress UI.
    Interact with the Button in the Cypress runner to show live feedback.



8.Summary for Your Client

    Storybook is for visual development and review.
    Cypress component testing is for automated, interactive checks of each component’s behavior and style.
    This approach ensures your UI is robust, accessible, and bug-free before integration.







    -------------------------------------------------------------------------


How Does This Work in Practice? (Button Demo)
    Storybook Demo
        Open Storybook and show the Button in different styles (blue, large, primary, etc.).
        You can interact with the Button and see how it looks and feels.
    Component Code
        Show the Button code: explain how you can change its color, size, and label with simple settings (props).
    Cypress Test Demo
        Open Cypress and run the Button tests.
        Show that Cypress checks the Button’s background color, text color, and that clicking the Button works.
        If something is wrong (for example, the text is not visible), Cypress will show a failure.

What Are the Outcomes?
    Visual confidence: You see every component in Storybook before it’s used in your app.
    Automated quality: Cypress tests make sure every component works and looks right, every time you make a change.
    Faster feedback: Problems are caught early, so your UI is always ready for your users.

In summary:
    Storybook helps you see and review your UI.
    Cypress component tests make sure it always works.
    Together, they give you a robust, reliable, and beautiful product.


    -------------------------------------------------------------------------

1. Button Component Code

    // src/stories/Button.jsx
    import React from 'react';

    // Button component definition
    export const Button = ({
    label,                // The text to display on the button
    primary = false,      // If true, use the primary style
    backgroundColor,      // Custom background color
    size = 'medium',      // Button size: 'small', 'medium', or 'large'
    onClick,              // Function to call when button is clicked
    ...props              // Any other props (like data-testid)
    }) => {
    // Choose the button style based on the 'primary' prop
    const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return (
        <button
        type="button"
        className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
        style={{
            backgroundColor: backgroundColor || (primary ? '#007bff' : '#eee'), // Set background color
            color: backgroundColor ? '#fff' : (primary ? '#fff' : '#333'),      // Set text color
        }}
        onClick={onClick}
        {...props}
        >
        {label}
        </button>
    );
    };


    Explanation (line by line):
    import React from 'react';
    Import React so we can use JSX.

    export const Button = ({ ... }) => { ... }
    Define a functional Button component that takes several props.

    label
    The text shown on the button.

    primary
    If true, the button uses a primary style (e.g., blue).

    backgroundColor
    Allows you to set a custom background color.

    size
    Controls the button size (small, medium, large).

    onClick
    Function to run when the button is clicked.

    ...props
    Any other props (like data-testid for testing).

    const mode = ...
    Chooses the CSS class for primary or secondary style.

    <button ...>
    Renders a button element with:

    Classes for styling
    Inline styles for background and text color
    The click handler
    Any extra props
    The label as its content

2. Cypress Component Test

    // cypress/component/Button.cy.jsx
    import React from 'react';
    import { Button } from '../../src/stories/Button';

    describe('<Button />', () => {
    it('renders with blue background and white text', () => {
        cy.mount(<Button label="Demo" backgroundColor="#007bff" />);
        cy.get('button')
        .should('have.css', 'background-color', 'rgb(0, 123, 255)')
        .and('have.css', 'color', 'rgb(255, 255, 255)');
    });

    it('calls onClick when clicked', () => {
        const onClick = cy.stub().as('onClick');
        cy.mount(<Button label="Click me" onClick={onClick} />);
        cy.contains('Click me').click();
        cy.get('@onClick').should('have.been.called');
    });
    });

    Explanation 
    import React from 'react';
    Import React for JSX.

    import { Button } from '../../src/stories/Button';
    Import the Button component to test.

    describe('<Button />', () => { ... })
    Group all Button tests together.

    it('renders with blue background and white text', ... )
    Test that the button renders with the correct background and text color:

    cy.mount(<Button ... />) mounts the Button in a real browser.
    cy.get('button') selects the button.
    .should('have.css', ...) checks the CSS for background and text color.
    it('calls onClick when clicked', ... )
    Test that clicking the button calls the onClick handler:

    cy.stub().as('onClick') creates a fake function to track clicks.
    cy.mount(<Button ... />) mounts the Button with the stub.
    cy.contains('Click me').click(); clicks the button.
    cy.get('@onClick').should('have.been.called'); checks the handler was called.

3. How to Run the Test
    Start Cypress in component mode:

    npx cypress open --component
    
    Select Button.cy.jsx in the Cypress UI.
    See the tests run in the browser:
    The first test checks the button’s color.
    The second test checks the click handler.
    
4. Summary 
    Button component is reusable and customizable via props.
    Cypress component tests automatically check how the Button looks and works.
    You can visually and automatically verify your UI is correct and reliable.git 
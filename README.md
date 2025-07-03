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





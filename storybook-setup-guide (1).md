
# Storybook Setup Guide for React + Vite Project

This guide explains how to integrate Storybook into your existing React + Vite codebase safely and cleanly.

---

## Prerequisites

- Node.js (v16+ recommended)
- pnpm (or npm/yarn) installed
- Existing React + Vite project structure

---

## Step 1: Create a Storybook folder (optional but recommended)

You can either add Storybook inside your app folder or create a separate folder like `storybook/`.

```bash
mkdir storybook
cd storybook
pnpm init
```

> If you want to keep Storybook isolated from app code, use this approach.

---

## Step 2: Initialize Storybook with Vite builder

```bash
npx storybook@latest init --builder vite
```

- When prompted, select:

  - **Configuration type:** Recommended (component dev, docs, testing)

  - **Manually choose project type:** Yes

  - **Project type:** react

Storybook will install dependencies and create config files.

---

## Step 3: Configure Storybook to use your app’s components

Edit `.storybook/main.ts` to include your component stories location, for example:

```ts
export default {
  stories: ['../apps/client/ui-app/src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}
```

---

## Step 4: Add sample story to your component

Create a story file for one of your components:

`apps/client/ui-app/src/components/Button.stories.tsx`

```tsx
import { Button } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
}

export const Default = {
  args: {
    label: 'Click Me',
  },
}
```

---

## Step 5: Run Storybook

Start Storybook server:

```bash
pnpm storybook
```

Open your browser at [http://localhost:6006](http://localhost:6006) to see your components rendered.

---

## Optional: Add scripts to your `package.json`

Add the following scripts under the relevant `package.json` (in `storybook/` or your app folder):

```json
"scripts": {
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

Now you can run:

```bash
pnpm storybook
```

---

## Troubleshooting

- If you get errors related to missing dependencies, run:

```bash
pnpm install
```

- Make sure your component paths in `.storybook/main.ts` match your project structure.

---

## Next Steps

- Integrate Cypress component testing (optional)
- Add Storybook Docs with MDX for component documentation
- Customize Storybook addons as needed

---

If you want help with **Cypress integration** or configuring **Storybook Docs**, just ask!

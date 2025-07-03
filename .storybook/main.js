/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-interactions', // ✅ Add this line
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    interactionsDebugger: true, // ✅ Enable the Interactions panel
  },
};

export default config;
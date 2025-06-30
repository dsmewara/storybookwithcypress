const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
specPattern: ['cypress/component/**/*.cy.{js,jsx,ts,tsx}', 'src/**/*.cy.{js,jsx,ts,tsx}']
  },
});

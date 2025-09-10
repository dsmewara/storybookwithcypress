const path = require("path");

// Helper to get absolute path of a package
function getAbsolutePath(value) {
  return path.dirname(require.resolve(path.join(value, "package.json")));
}

module.exports = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)", // all story files
  ],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: { transcludeMarkdown: true },
    },
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-webpack5-babel"), // if needed
    "@chromatic/storybook",
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  webpackFinal: async (config) => {
    // Support TSX / JSX
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              require.resolve("@babel/preset-env"),
              [
                require.resolve("@babel/preset-react"),
                { runtime: "automatic" },
              ],
              require.resolve("@babel/preset-typescript"),
            ],
          },
        },
      ],
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};

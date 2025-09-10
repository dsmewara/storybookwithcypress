webpackFinal: async (config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /\.d\.ts$/, // ✅ exclude type declarations
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            require.resolve("@babel/preset-env"),
            [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
            require.resolve("@babel/preset-typescript"),
          ],
        },
      },
    ],
  });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
},

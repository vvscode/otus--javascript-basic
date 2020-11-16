module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "defaults",
      },
    ],
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"],
    },
  },
};

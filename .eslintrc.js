module.exports = {
  parser: "babel-eslint",
  extends: "plugin:markdown/recommended",
  plugins: ["markdown"],
  overrides: [
    {
      files: ["**/*.md"],
      processor: "markdown/markdown",
    },
    {
      files: ["**/*.md/*.js"],
      rules: {},
    },
  ],
};

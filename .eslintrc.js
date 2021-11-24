module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    "requireConfigFile": false,
    "ecmaVersion": 8
  },
  extends: "plugin:markdown/recommended",
  plugins: ["markdown"],
  overrides: [
    {
      files: ["**/*.md"],
      processor: "markdown/markdown",
    },
    {
      files: ["**/*.md/*.js"],
      rules: {
        "comma-dangle": ["error", "only-multiline"],
      },
    },
  ],
};

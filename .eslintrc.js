module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:react/recommended", "plugin:markdown/recommended"],
  plugins: ["@typescript-eslint", "react", "markdown"],
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
  settings: {
    react: {
      version: "17.0.2",
    },
  },
};

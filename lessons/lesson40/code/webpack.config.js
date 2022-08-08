const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    clean: true,
  },
  mode: NODE_ENV,
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  devServer: {
    compress: true,
    port: 9000,
    watchFiles: ["public/index.html"],
  },
};

/* eslint-disable */
const path = require("path");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "src/main/webapp"),
  entry: "./app/main.js",
  stats: "minimal",
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: ["babel-loader", "eslint-loader"] },
      {
        test: /\.(png|jpg|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: "app/index.html",
      title: "Production"
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "static" }]
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      Actions: path.resolve(__dirname, "src/main/webapp", "app", "actions"),
      Components: path.resolve(__dirname, "src/main/webapp", "app", "components"),
      Constants: path.resolve(__dirname, "src/main/webapp", "app", "constants"),
      Helpers: path.resolve(__dirname, "src/main/webapp", "app", "helpers"),
      Reducers: path.resolve(__dirname, "src/main/webapp", "app", "reducers"),
      Services: path.resolve(__dirname, "src/main/webapp", "app", "services"),
      Types: path.resolve(__dirname, "src/main/webapp", "app", "types")
    }
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          }
        }
      }
    }
  }
};

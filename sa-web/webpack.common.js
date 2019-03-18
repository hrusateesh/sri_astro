/* eslint-disable */
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src/main/webapp'),
  entry: './app/main.js',
  stats: 'minimal',
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: ['babel-loader', 'eslint-loader']},
      {
        test: /\.(png|jpg|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
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
      template: 'app/index.html',
      title: 'Production'
    }),
    new CopyWebpackPlugin([{from: 'static'}])
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

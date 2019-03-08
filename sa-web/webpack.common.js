const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname, "src/main/webapp"),
    entry: "./app/main.js",
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: 'app/index.html',
            title: 'Production'
        }),
        new CopyWebpackPlugin([{ from: 'static' }])
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiBaseUrl: 'http://localhost:8080',
            apiUrl: 'http://localhost:8080/rest'
        })
    }
};
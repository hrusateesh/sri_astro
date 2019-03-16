/* eslint-disable */
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    optimization: {
        minimizer: [
            // new DedupePlugin(),
            // new OccurrenceOrderPlugin(),
            // new UglifyJsPlugin({ mangle: false, sourcemap: false })
        ]
    },
    output: {
        path: path.join(__dirname, '/src/main/resources/static'),
        filename: 'js/main.[hash].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css"
        })
    ]
});
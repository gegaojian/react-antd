const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

const publicConfig = {

    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }]
                }),
            },
            // {
            //     test: /\.scss$/,
            //     use: extractSass.extract({
            //         use: [{
            //             loader: "css-loader"
            //         }, {
            //             loader: "sass-loader"
            //         }],
            //         // use style-loader in development
            //         fallback: "style-loader"
            //     })
            // }
            // {
            //     test: /\.less$/,
            //     use: extractLess.extract({
            //         use: [{
            //             loader: "css-loader"
            //         }, {
            //             loader: "less-loader"
            //         }],
            //         // use style-loader in development
            //         fallback: "style-loader"
            //     })
            // }
        ]
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true
        }),
        // new ExtractTextPlugin({
        //     filename: "static/css/[name].[contenthash:5].css"
        // })
    ],
};

module.exports = merge(commonConfig, publicConfig);
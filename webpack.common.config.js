const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

commonConfig = {
    entry: {
        app: [path.join(__dirname, 'src/index.js')],
        vendor: [
            'react',
            'react-router-dom',
            'redux',
            'react-dom',
            'react-redux',
            'antd'
        ]
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            }, {
                test: [
                    /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/
                ],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //limit: 8192,
                            limit: 1,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        // new HtmlWebpackPlugin({     filename: './apps/app2/index.html',     template:
        // path.join(__dirname, 'src/apps/app2/index.html') }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack
            .optimize
            .CommonsChunkPlugin({name: 'vendor'}),
        new webpack
            .optimize
            .CommonsChunkPlugin({name: 'runtime'}),
        new CopyWebpackPlugin([
            {
                from: 'src/api',
                to: 'api'
            }
        ])
    ],

    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        }
    }
};

const glob = require("glob");
// CSS入口配置
var CSS_PATH = {
    css: {
        pattern: "src/**/index.css",
        src: path.join(__dirname, 'src'),
        dst: path.resolve(__dirname, 'static/build/webpack')
    }
}

// 遍历除所有需要打包的CSS文件路径
function getCSSEntries(config) {
    var fileList = glob.sync(config.pattern);
    return fileList.reduce(function (previous, current) {
        var filePath = path.parse(path.relative(config.src, current))
        var withoutSuffix = path.join(filePath.dir, filePath.name)
        previous[withoutSuffix] = path.resolve(__dirname, current)
        return previous
    }, {})
}

commonConfig.entry = Object.assign({}, commonConfig.entry, getCSSEntries(CSS_PATH.css));

// let newEntries = {}; // options is optional const files =
// glob.sync("src/apps/*/index.js"); files.forEach(function (f) {     const name
// = /.*\/(apps\/.*?\/index)\.js/.exec(f)[1]; //得到apps/question/index这样的文件名
// newEntries[name] = path.join(__dirname, f);     commonConfig.entry =
// Object.assign({}, commonConfig.entry, newEntries);     const
// htmlWebpackPlugin = new HtmlWebpackPlugin({         filename:
// path.resolve(__dirname, 'dist/' + name + '.html'),         chunks:
// ['runtime', 'vendor', name, 'components'],         template:
// path.resolve(__dirname, 'src/' + name + '.html'),         inject: true
// });     commonConfig.plugins.push(htmlWebpackPlugin); });

module.exports = commonConfig;
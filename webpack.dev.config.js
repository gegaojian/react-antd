const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

// var pathToBourbon = require('node-bourbon').includePaths;

const devConfig = {

  /*入口*/
  entry: {
    app: ['react-hot-loader/patch', path.join(__dirname, 'src/index.js')]
  },

  /*输出到dist文件夹，输出文件名字为bundle.js*/
  output: {
    filename: '[name].[hash].js'
  },
  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader', ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options: {
            strictMath: true,
            noIeCompat: true
          }
        }]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
  // scssLoader: {
  //   includePaths: [pathToBourbon]
  // }
};

module.exports = merge({
  customizeArray(a, b, key) {
    /*entry.app不合并，全替换*/
    if (key === 'entry.app') {
      return b;
    }
    return undefined;
  }
})(commonConfig, devConfig);
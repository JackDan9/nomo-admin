const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    host: 'localhost',
    port: 8888,
    open: true,
    hot: true,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            }
          },
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: [
          //       path.resolve(__dirname, '../src/assets/styles/variable.less'),
          //       path.resolve(__dirname, '../src/assets/styles/mixin.less')
          //     ]
          //   }
          // }
        ],
        exclude: [path.resolve(__dirname, '..', 'node_modules')]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          },
        ],
        include: [path.resolve(__dirname, '..', 'node_modules')]
      }
    ]
  }
})
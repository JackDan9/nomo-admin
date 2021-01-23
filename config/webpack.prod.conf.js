const path = require('path');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolve = (dir) => {
  return path.resolve(process.cwd(), dir);
}

module.exports = merge(baseWebpackConfig, {
  /**
   * @name mode
   * @description Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.
   * @type string
   * @example 'production'; 'none' | 'development' | 'production'
   * 
   */
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[contenthash:6].js',
    chunkFilename: 'js/[name].[contenthash:6].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
      chunkFilename: 'css/[name].[contenthash:6].css'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: 'static'
      }
    ])
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          enforce: true,
          priority: 10
        },
        common: {
          minChunks: 2,
          name: 'common',
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /\.(le|c)ss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          },
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: [
          //       resolve('src/assets/styles/variable.less'),
          //       resolve('src/assets/styles/mixin.less')
          //     ]
          //   }
          // }
        ]
      }
    ]
  }
})
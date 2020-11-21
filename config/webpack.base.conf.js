const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const resolve = (dir) => {
  return path.resolve(process.cwd(), dir);
};

module.exports = {
  stats: { children: false },
  entry: {
    app: resolve('src/index.tsx'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      filename: 'index.html',
      favicon: resolve('public/favicon.ico'),
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.ProvidePlugin({
      $request: [resolve('src/utils/request.ts'), 'default'],
      $message: [resolve('node_modules/antd/es/message/index.js'), 'default']
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: 'static'
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.jpg|png|gif|jpeg|bmp|svg$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name]-[hash:6].[ext]'
          }
        },
        exclude: resolve('src/assets/icons')
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        include: resolve('src/assets/icons')
      },
      {
        test: /\.ttf|eot|woff|woff2$/,
        use: 'url-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve('src')
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
}
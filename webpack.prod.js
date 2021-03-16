const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './src/client/index.js',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\,css$/i,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/views/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' })
  ],
  output: {
    libraryTarget: 'var',
    library: 'Client',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

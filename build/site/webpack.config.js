const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePath = path.resolve(__dirname, '../../');

module.exports = {
  entry: {
    site: path.join(basePath, 'site')
  },
  output: {
    path: path.resolve(basePath, 'dist/site'),
    chunkFilename: '[chunkhash:12].js',
    filename: '[chunkhash:12].js'
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[chunkhash:12].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: path.join(basePath, 'site/assets/favicon.ico')
    })
  ].concat(process.env.TRAVIS_CI ? [] : [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]),
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: [
        path.join(basePath, 'site'),
        path.join(basePath, 'src'),
        path.join(basePath, 'libs')
      ],
      options: { presets: ['@babel/preset-env','@babel/preset-react', '@babel/preset-flow'], plugins: ["@babel/plugin-transform-react-jsx"] }
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
      use: [{ loader: 'file-loader', options: { name:"[hash:12].[ext]" } }]
    }, {
      test: /\.(jpe?g|png|gif)(\?.+)?$/,
      use: [{ loader: 'url-loader', options: { name: "[hash:12].[ext]", limit: 25000 } }]
    }, {
      test: /\.md$/,
      use: [{ loader: 'raw-loader' }]
    }]
  },
  mode: 'production'
};

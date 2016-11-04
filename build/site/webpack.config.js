const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const basePath = path.resolve(__dirname, '../../');

module.exports = {
  entry: {
    core: [path.join(basePath, 'src'), path.join(basePath, 'libs')],
    app: path.join(basePath, 'site/pages'),
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(basePath, 'dist/site'),
    chunkFilename: '[chunkhash:12].js',
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', "vendor.js"),
  ].concat(process.env.TRAVIS_CI ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]),
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: [
          path.join(basePath, 'site/pages'),
          path.join(basePath, 'src'),
          path.join(basePath, 'libs')
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css", "sass")
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: 'file?name=[hash:12].[ext]'
      },
      {
        test: /\.(jpg|png|gif)(\?.+)?$/,
        loader: 'url?name=[hash:12].[ext]&limit=10000'
      },
      {
        test: /\.md$/,
        loader : 'raw'
      }
    ]
  }
};

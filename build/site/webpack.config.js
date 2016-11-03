const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const basePath = path.resolve(__dirname, '../../');

module.exports = {
  devtool: 'eval',
  entry: [
    '../../site/pages/index'
  ],
  output: {
    path: path.resolve(basePath, '../dist/site'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: [
          path.join(basePath, 'site/pages'),
          path.join(basePath, 'src'),
          path.join(basePath, 'libs')
        ]
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.(png|eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader : 'url'
      },
      {
        test: /\.md$/,
        loader : 'raw'
      }
    ]
  }
};

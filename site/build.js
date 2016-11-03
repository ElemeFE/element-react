const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports = {
  devtool: 'eval',
  entry: [
    './pages/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
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
          path.join(__dirname, 'pages'),
          path.join(__dirname, '../src'),
          path.join(__dirname, '../libs')
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

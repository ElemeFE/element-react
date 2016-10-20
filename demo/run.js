var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(webpack({
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: [
          path.join(__dirname, 'js'),
          path.join(__dirname, '../src'),
          path.join(__dirname, '../libs')
        ]
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader : 'url-loader'
      }
    ]
  }
}), {
  publicPath: '/',
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', (error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Listening at http://localhost:3000/');
  }
});

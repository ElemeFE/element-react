var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(webpack({
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src/index')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, '../src'),
        path.join(__dirname, '../libs')
      ]
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader']
    }]
  }
}), {
  publicPath: '/static/',
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});

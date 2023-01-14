/* eslint import/no-extraneous-dependencies: ["off"] */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    './index'
  ],
  devServer: {
    port: 3000,
    hot: 'only',
    historyApiFallback: true,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: path.join(__dirname, '/assets/favicon.ico')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.join(__dirname, '../site'),
          path.join(__dirname, '../src'),
          path.join(__dirname, '../libs')
        ],
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
          plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-transform-react-jsx"]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        use: [{ loader: 'file-loader' }]
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        use: [{ loader: 'url-loader' }]
      },
      {
        test: /\.md$/,
        use: [{ loader: 'raw-loader' }]
      }
    ]
  },
  mode: 'development'
};

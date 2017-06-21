# Element React

[![](https://travis-ci.org/eleme/element-react.svg?branch=master)](https://travis-ci.org/eleme/element-react)
[![](https://img.shields.io/npm/v/element-react.svg)](https://www.npmjs.com/package/element-react)
[![](https://img.shields.io/npm/dm/element-react.svg)](https://www.npmjs.com/package/element-react)

[Element](https://github.com/ElemeFE/element) was initially written in [Vue](https://vuejs.org/), which has many elegant UI components, but we also love [React](https://facebook.github.io/react/), so we forked it for the React community.

## Getting Started

### Install

```bash
npm install element-react --save
```

Before the building, you need a style theme, here we recommend you to pick up `element-theme-default`.

```bash
npm install element-theme-default --save
```

### Usage

We are die hard fans of ECMAScript 6, so we recommend you writing code in modern javascript.

```js
import { Button } from 'element-react';
```

Also we provide an advanced way to [tree shaking](https://blog.engineyard.com/2016/tree-shaking) the code with [Rollup.js](http://rollupjs.org/) and [Webpack 2](https://webpack.github.io/)

```js
import { Button } from 'element-react/next';
```

### Config

With webpack, you need additional loaders to build with `element-react`.

```js
const webpack = require('webpack');

module.exports = {
  entry: {
    src: 'path/to/src'
  },
  output: {
    path: 'path/to/output'
    publicPath: '/public',
    chunkFilename: '[chunkhash:12].js',
    filename: '[chunkhash:12].js'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: ['path/to/src']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: 'file-loader?name=[hash:12].[ext]'
      }
    ]
  }
}
```

## Contributing

Please make sure to read the [Contributing Guide](https://github.com/eleme/element-react/blob/master/CONTRIBUTING.md) before making a pull request.

## Acknowledgments

* [@doxiaodong](https://github.com/doxiaodong) for adding typescript ambient declarations.
* [@cuining](https://github.com/cuining) for building the live code editor.

## Credits

* [Element](https://github.com/ElemeFE/element) Desktop UI elements for Vue.js 2.0.

## License

MIT

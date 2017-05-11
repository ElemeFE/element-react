# Element React

[![](https://travis-ci.org/eleme/element-react.svg?branch=master)](https://travis-ci.org/eleme/element-react)
[![](https://img.shields.io/npm/v/element-react.svg)](https://www.npmjs.com/package/element-react)
[![](https://img.shields.io/npm/dm/element-react.svg)](https://www.npmjs.com/package/element-react)

[Element](https://github.com/ElemeFE/element) was initially written in [Vue](https://vuejs.org/), which has many elegant UI components, but we also love [React](https://facebook.github.io/react/), so we forked it for the React community.

## Getting Started

Currently we haven't finalized all of the components, community contributions are welcome.

### Install

```
npm install element-react --save
```

Before the building, you need a style theme, here we recommend you to pick up `element-theme-default`.

```
npm install element-theme-default --save
```

### Building

We are die hard fans of ECMAScript 6, so we recommend you writing code in modern javascript.

```
import { Button } from 'element-react';
```

Also we provide an advanced way to [tree shaking](https://blog.engineyard.com/2016/tree-shaking) the code with [Rollup.js](http://rollupjs.org/) and [Webpack 2](https://webpack.github.io/)

```
import { Button } from 'element-react/next';
```

## Contributing

Please make sure to read the [Contributing Guide](https://github.com/eleme/element-react/blob/master/CONTRIBUTING.md) before making a pull request.

## Credits

* [Element](https://github.com/ElemeFE/element) Desktop UI elements for Vue.js 2.0.

## License

MIT

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'core-js';

/* eslint-disable */
import 'element-theme-default';
/* eslint-enable */

import './styles/highlight.css';
import './styles/base.scss';

import App from './pages';

render(<AppContainer><App /></AppContainer>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./pages', () => {
    const App = require('./pages').default;

    render(<AppContainer><App /></AppContainer>, document.getElementById('app'));
  });
}

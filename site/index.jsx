import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'core-js';

/* eslint-disable */
import 'element-theme-default';
/* eslint-enable */

import './styles/highlight.css';
import './styles/base.scss';

import App from './page';

render(<AppContainer><App /></AppContainer>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./page', () => {
    const App = require('./page').default;

    render(<AppContainer><App /></AppContainer>, document.getElementById('app'));
  });
}

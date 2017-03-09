/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

type Context = {
  separator: string
};

export default class Breadcrumb extends Component {
  getChildContext(): Context {
    return {
      separator: this.props.separator
    };
  }

  render() {
    return (
      <div style={this.style()} className={this.className('el-breadcrumb')}>
        {this.props.children}
      </div>
    )
  }
}

Breadcrumb.childContextTypes = {
  separator: PropTypes.string
};

Breadcrumb.propTypes = {
  separator: PropTypes.string
}

Breadcrumb.defaultProps = {
  separator: '/'
}

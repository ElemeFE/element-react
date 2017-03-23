/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class BreadcrumbItem extends Component {
  render() {
    return (
      <span style={this.style()} className={this.className('el-breadcrumb__item')}>
        <span className="el-breadcrumb__item__inner" ref="link">{this.props.children}</span>
        <span className="el-breadcrumb__separator">{this.context.separator}</span>
      </span>
    )
  }
}

BreadcrumbItem.contextTypes = {
  separator: PropTypes.string
};

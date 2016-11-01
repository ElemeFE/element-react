import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class BreadcrumbItem extends Component {
  render() {
    return (
      <span className="el-breadcrumb__item">
        <a className="el-breadcrumb__item__inner" href={this.props.to} style={{
          textDecoration: 'none'
        }}>{this.props.children}</a>
        <span className="el-breadcrumb__separator">{this.context.separator}</span>
      </span>
    )
  }
}

BreadcrumbItem.contextTypes = {
  separator: PropTypes.string
};

BreadcrumbItem.propTypes = {
  to: PropTypes.string
}

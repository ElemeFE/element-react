import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Breadcrumb extends Component {
  getChildContext() {
    return {
      separator: this.props.separator
    };
  }

  render() {
    return (
      <div className="el-breadcrumb">
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

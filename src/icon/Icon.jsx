import React from 'react';
import { Component, PropTypes, View } from '../../libs';

export default class Icon extends Component {
  render() {
    return <i className={`el-icon-${this.props.name}`}></i>;
  }
}

Icon.propTypes = {
  name: PropTypes.string
}

import React, { PropTypes } from 'react';
import { Component } from '../../libs';

export default class ButtonGroup extends Component {
  render() {
    return (
      <div className="el-button-group">
        {this.props.children}
      </div>
    )
  }
}

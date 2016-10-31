import React from 'react';
import { Component } from '../../libs';

export default class DialogBody extends Component {
  render() {
    return (
      <div className="el-dialog__body">
        { this.props.children }
      </div>
    )
  }
}

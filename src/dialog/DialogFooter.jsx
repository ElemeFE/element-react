import React from 'react';
import { Component } from '../../libs';

export default class DialogFooter extends Component {
  render() {
    return (
      <div className="el-dialog__footer">
        { this.props.children }
      </div>
    )
  }
}

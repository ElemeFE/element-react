/* @flow */

import React from 'react';
import { Component } from '../../libs';

export default class DialogBody extends Component {
  render(): React.DOM {
    return (
      <div style={this.style()} className={this.className('el-dialog__body')}>
        { this.props.children }
      </div>
    )
  }
}

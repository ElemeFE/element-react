/* @flow */

import React from 'react';
import { Component } from '../../libs';

export default class DialogFooter extends Component {
  render(): React.DOM {
    return (
      <div style={this.style()} className={this.className('el-dialog__footer')}>
        { this.props.children }
      </div>
    )
  }
}

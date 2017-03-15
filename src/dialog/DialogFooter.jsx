/* @flow */

import React from 'react';
import { Component } from '../../libs';

export default class DialogFooter extends Component {
  render(): React.Element<any> {
    return (
      <div style={this.style()} className={this.className('el-dialog__footer')}>
        { this.props.children }
      </div>
    )
  }
}

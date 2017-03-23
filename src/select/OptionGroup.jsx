/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class OptionGroup extends Component {
  render() {
    return (
      <ul style={this.style()} className={this.className('el-select-group__wrap')}>
        <li className="el-select-group__title">{this.props.label}</li>
        <li>
          <ul className="el-select-group">
            {this.props.children}
          </ul>
        </li>
      </ul>
    )
  }
}

OptionGroup.propTypes = {
  label: PropTypes.string,
};

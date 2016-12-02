import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class OptionGroup extends Component {
  getChildContext() {
    return {
      disabled: this.props.disabled
    };
  }

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

OptionGroup.childContextTypes = {
  disabled: PropTypes.bool
};

OptionGroup.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool
};

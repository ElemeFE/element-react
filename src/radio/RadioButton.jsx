/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

import Radio from './Radio';

export default class RadioButton extends Radio {
  static elementType = 'RadioButton';

  parent(): Component {
    return this.context.component;
  }

  size(): string {
    return this.parent().props.size;
  }

  isDisabled(): boolean {
    return this.props.disabled || this.parent().props.disabled;
  }

  activeStyle(): { backgroundColor: string, borderColor: string, color: string } {
    return {
      backgroundColor: this.parent().props.fill || '',
      borderColor: this.parent().props.fill || '',
      color: this.parent().props.textColor || ''
    };
  }

  render(): React.Element<any> {
    const { value, children, name, size } = this.props;
    return (
      <label style={this.style()} className={this.className('el-radio-button',
        size && `el-radio-button--${this.size()}`, {
          'is-active': this.state.checked
        })
      }>
        <input
          type="radio"
          className="el-radio-button__orig-radio"
          checked={this.state.checked}
          name={name}
          disabled={this.isDisabled()}
          onChange={this.onChange.bind(this)}
        />
        <span className="el-radio-button__inner" style={this.state.checked ? this.activeStyle() : {}}>
          {children || value}
        </span>
      </label>
    )
  }
}

RadioButton.contextTypes = {
  component: PropTypes.any
};

RadioButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  name: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small'])
};

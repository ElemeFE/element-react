/* @flow */

import React from 'react';
import CheckBox from './CheckBox';

export default class CheckboxButton extends CheckBox {
  static elementType = 'CheckboxButton';

  render(): React.Element<any> {
    const group = this.context.ElCheckboxGroup;

    return (
      <label style={this.style()} className={this.className('el-checkbox-button', group.props.size ? 'el-checkbox-button--' + group.props.size : '', {
        'is-disabled': this.props.disabled,
        'is-checked': this.state.checked,
        'is-focus': this.state.focus
      })}>
        <input
          className="el-checkbox-button__original"
          type="checkbox"
          checked={this.state.checked}
          disabled={this.props.disabled}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
        />
        <span className="el-checkbox-button__inner" style={this.state.checked ? {
          boxShadow: '-1px 0 0 0 ' + group.props.fill,
          backgroundColor: group.props.fill || '',
          borderColor: group.props.fill || '',
          color: group.props.textColor || ''
        }: {}}>
          {this.state.label || this.props.children}
        </span>
      </label>
    )
  }
}

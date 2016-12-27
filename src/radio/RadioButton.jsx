import React from 'react';
import { PropTypes } from '../../libs';

import Radio from './Radio';

export default class RadioButton extends Radio {
  activeStyle() {
    return {
      backgroundColor: this.props.fill,
      borderColor: this.props.fill,
      color: this.props.textColor
    };
  }

  render() {
    return (
      <label style={this.style()} className={this.className('el-radio-button',
        this.props.size && `el-radio-button--${this.props.size}`, {
          'is-active': this.state.checked
        })
      }>
        <input
          type="radio"
          className="el-radio-button__orig-radio"
          checked={this.state.checked}
          disabled={this.props.disabled}
          onChange={this.onChange.bind(this)}
        />
        <span className="el-radio-button__inner" style={this.state.checked ? this.activeStyle() : {}}>
          {this.props.children || this.props.value}
        </span>
      </label>
    )
  }
}

RadioButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  textColor: PropTypes.string,
  fill: PropTypes.string
};

RadioButton.defaultProps = {
  textColor: '#ffffff',
  fill: '#20a0ff'
}

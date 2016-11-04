import React from 'react';
import { PropTypes } from '../../libs';

import Radio from './Radio';

export default class RadioButton extends Radio {
  render() {
    return (
      <label className={this.classNames('el-radio-button', this.props.size && `el-radio-button-${this.props.size}`, this.state.checked && 'is-active')}>
        <input type="radio" className="el-radio-button__orig-radio" checked={this.state.checked} disabled={this.props.disabled} onChange={this.onChange.bind(this)} />
        <span className="el-radio-button__inner">
          {this.props.children || this.props.value}
        </span>
      </label>
    )
  }
}

RadioButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool
};

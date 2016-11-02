import React from 'react';
import { Component, PropTypes } from '../../libs';

import Input from '../input';
import util from './util';

export default class InputNumber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  minDisabled() {
    return this.state.value - this.props.step < this.props.min;
  }

  maxDisabled() {
    return this.state.value + this.props.step > this.state.max;
  }

  increase() {
    const { step, max, disabled } = this.props;
    let { value, inputActive } = this.state;

    if (value + step > max || disabled) return;

    value = util.accAdd(step, value);

    if (this.maxDisabled()) {
      inputActive = false;
    }

    this.setState({ value, inputActive });
  }

  decrease() {
    const { step, min, disabled } = this.props;
    let { value, inputActive } = this.state;

    if (value - step < min || disabled) return;

    value = util.accSub(value, step);

    if (this.minDisabled()) {
      inputActive = false;
    }

    this.setState({ value, inputActive });
  }

  activeInput(disabled) {
    if (!this.props.disabled && !disabled) {
      this.setState({
        inputActive: true
      })
    }
  }

  inactiveInput(disabled) {
    if (!this.props.disabled && !disabled) {
      this.setState({
        inputActive: false
      })
    }
  }

  render() {
    return (
      <div className={this.classNames('el-input-number', this.props.size && `el-input-number--${this.props.size}`, {
        'is-disabled': this.props.disabled
      })}>
        <Input className={this.classNames({
          'is-active': this.state.inputActive
        })} value={this.props.value} disabled={this.props.disabled} size={this.props.size} />
        <span className={this.classNames('el-input-number__decrease el-icon-minus', {
          'is-disabled': this.minDisabled()
        })} onClick={this.decrease.bind(this)} onMouseEnter={this.activeInput.bind(this, this.minDisabled())} onMouseLeave={this.inactiveInput.bind(this, this.minDisabled())} />
        <span className={this.classNames('el-input-number__increase el-icon-plus', {
          'is-disabled': this.maxDisabled()
        })} onClick={this.increase.bind(this)} onMouseEnter={this.activeInput.bind(this, this.maxDisabled())} onMouseLeave={this.inactiveInput.bind(this, this.maxDisabled())} />
      </div>
    )
  }
}

InputNumber.propTypes = {
  value: PropTypes.number.isRequired,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  size: PropTypes.string
}

InputNumber.defaultProps = {
  step: 1,
  max: Infinity,
  min: 0
}

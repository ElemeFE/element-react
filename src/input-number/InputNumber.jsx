import React from 'react';
import { Component, PropTypes } from '../../libs';

import Input from '../input';
import { accAdd, accSub } from './util';

export default class InputNumber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  onKeyDown(e) {
    e.preventDefault();

    switch (e.keyCode) {
      case 38: // KeyUp
        this.increase();
        break;
      case 40: // KeyDown
        this.decrease();
        break;
      default:
        break;
    }
  }

  onBlur() {
    let value = Number(this.state.value);

    if (isNaN(value) || value > this.props.max || value < this.props.min) {
      value = this.state.value;
    }

    this.setState({ value });
  }

  onInput(value) {
    this.setState({ value }, this.onChange);
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange({
        target: {
          value: this.state.value
        }
      });
    }
  }

  minDisabled() {
    return this.state.value - this.props.step < this.props.min;
  }

  maxDisabled() {
    return this.state.value + this.props.step > this.props.max;
  }

  increase() {
    const { step, max, disabled } = this.props;
    let { value, inputActive } = this.state;

    if (value + step > max || disabled) return;

    value = accAdd(step, value);

    if (this.maxDisabled()) {
      inputActive = false;
    }

    this.setState({ value, inputActive }, () => {
      this.onChange()
    });
  }

  decrease() {
    const { step, min, disabled } = this.props;
    let { value, inputActive } = this.state;

    if (value - step < min || disabled) return;

    value = accSub(value, step);

    if (this.minDisabled()) {
      inputActive = false;
    }

    this.setState({ value, inputActive }, () => {
      this.onChange()
    });
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
        <Input
          ref="input"
          className={this.classNames({
            'is-active': this.state.inputActive
          })}
          value={this.state.value}
          disabled={this.props.disabled}
          size={this.props.size}
          onKeyDown={this.onKeyDown.bind(this)}
          onBlur={this.onBlur.bind(this)} />
        <span className={this.classNames('el-input-number__decrease el-icon-minus', {
          'is-disabled': this.minDisabled()
        })}
          onClick={this.decrease.bind(this)}
          onMouseEnter={this.activeInput.bind(this, this.minDisabled())}
          onMouseLeave={this.inactiveInput.bind(this, this.minDisabled())} />
        <span className={this.classNames('el-input-number__increase el-icon-plus', {
          'is-disabled': this.maxDisabled()
        })}
          onClick={this.increase.bind(this)}
          onMouseEnter={this.activeInput.bind(this, this.maxDisabled())}
          onMouseLeave={this.inactiveInput.bind(this, this.maxDisabled())} />
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
  size: PropTypes.string,
  onChange: PropTypes.func
}

InputNumber.defaultProps = {
  step: 1,
  max: Infinity,
  min: 0
}

/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

import Input from '../input';
import { accAdd, accSub } from './util';

type State = {
  value: number,
  inputActive: boolean
};

export default class InputNumber extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      value: props.defaultValue,
      inputActive: false
    };
  }

  componentWillReceiveProps(props: Object) {
    if (props.value != this.props.value) {
      this.setState({ value: props.value });
    }
  }

  onKeyDown(e: SyntheticKeyboardEvent): void {
    switch (e.keyCode) {
      case 38: // KeyUp
        e.preventDefault();
        this.increase();
        break;
      case 40: // KeyDown
        e.preventDefault();
        this.decrease();
        break;
      default:
        break;
    }
  }

  onBlur(): void {
    let value = parseFloat(this.state.value);

    if (isNaN(value)) {
      value = ''
    } else if (value > this.props.max) {
      value = this.props.max;
    } else if (value < this.props.min) {
      value = this.props.min;
    }

    this.setState({ value }, this.onChange);
  }

  onInput(value: mixed): void {
    this.setState({ value });
  }

  onChange(): void {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  minDisabled(): boolean {
    return this.state.value - this.props.step < this.props.min;
  }

  maxDisabled(): boolean {
    return this.state.value + this.props.step > this.props.max;
  }

  increase(): void {
    const { step, max, disabled } = this.props;
    let { value, inputActive } = this.state;

    if (value + step > max || disabled) return;

    value = accAdd(step, value);

    if (this.maxDisabled()) {
      inputActive = false;
    }

    this.setState({ value, inputActive }, this.onChange);
  }

  decrease(): void {
    const { step, min, disabled } = this.props;
    let { value, inputActive } = this.state;

    if (value - step < min || disabled) return;

    value = accSub(value, step);

    if (this.minDisabled()) {
      inputActive = false;
    }

    this.setState({ value, inputActive }, this.onChange);
  }

  activeInput(disabled: boolean): void {
    if (!this.props.disabled && !disabled) {
      this.setState({
        inputActive: true
      })
    }
  }

  inactiveInput(disabled: boolean): void {
    if (!this.props.disabled && !disabled) {
      this.setState({
        inputActive: false
      })
    }
  }

  render(): React.Element<any> {
    const { controls, disabled } = this.props;

    return (
      <div style={this.style()} className={this.className('el-input-number', this.props.size && `el-input-number--${this.props.size}`, {
        'is-disabled': disabled,
        'is-without-controls': !controls
      })}>
        {
          controls && (
            <span
              className={this.classNames("el-input-number__decrease", {
                'is-disabled': this.minDisabled()
              })}
              onClick={this.decrease.bind(this)}
            >
              <i className="el-icon-minus"></i>
            </span>
          )
        }
        {
          controls && (
            <span
              className={this.classNames("el-input-number__increase", {
                'is-disabled': this.maxDisabled()
              })}
              onClick={this.increase.bind(this)}
            >
              <i className="el-icon-plus"></i>
            </span>
          )
        }
        <Input
          ref="input"
          className={this.classNames({
            'is-active': this.state.inputActive
          })}
          value={this.state.value}
          disabled={this.props.disabled}
          size={this.props.size}
          onChange={this.onInput.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          onBlur={this.onBlur.bind(this)} />
      </div>
    )
  }
}

InputNumber.propTypes = {
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  controls: PropTypes.bool,
  size: PropTypes.string,
  onChange: PropTypes.func
}

InputNumber.defaultProps = {
  step: 1,
  controls: true,
  max: Infinity,
  min: 0
}

/* @flow */

import React from 'react'
import {Component, PropTypes, View, Transition} from '../../libs'

type State = {
  value: boolean | number | string,
  coreWidth: number,
  buttonStyle: Object
};

export default class Switch extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      value: props.value,
      coreWidth: props.width,
      buttonStyle: {
        transform: ''
      }
    };
  }

  componentDidMount() {
    if (this.props.width === 0) {
      this.state.coreWidth = this.hasText() ? 58 : 46;
    }

    this.updateSwitch();
  }

  componentWillReceiveProps(props: Object) {
    this.setState({ value: props.value }, () => {
      this.updateSwitch();
    });

    if (props.width) {
      this.setState({ coreWidth: props.width });
    }
  }

  updateSwitch() {
    this.handleButtonTransform();

    if (this.props.onColor || this.props.offColor) {
      this.setBackgroundColor();
    }
  }

  hasText() {
    return this.props.onText || this.props.offText;
  }

  setBackgroundColor() {
    let newColor = this.state.value === this.props.onValue ? this.props.onColor : this.props.offColor;

    this.refs.core.style.borderColor = newColor;
    this.refs.core.style.backgroundColor = newColor;
  }

  setFocus() {
    if (this.props.allowFocus) {
      this.refs.input.focus();
    }
  }

  handleFocus(e: Object) {
    if (this.props.allowFocus) {
      this.props.onFocus(e);
    }
  }

  handleBlur(e: Object) {
    if (this.props.allowFocus) {
      this.props.onBlur(e);
    }
  }

  handleChange(e: Object) {
    this.setState({
      value: e.target.checked ? this.props.onValue : this.props.offValue
    }, () => {
      this.updateSwitch();

      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    });
  }

  handleButtonTransform() {
    const { value, coreWidth, buttonStyle } = this.state;
    buttonStyle.transform = value === this.props.onValue ? `translate(${ coreWidth - 20 }px, 2px)` : 'translate(2px, 2px)';

    this.setState({ buttonStyle });
  }

  render() {
    const { name, disabled, onText, offText, onValue, onIconClass, offIconClass, allowFocus } = this.props;
    const { value, coreWidth, buttonStyle } = this.state;

    return (
      <label
        style={this.style()}
        className={this.className('el-switch', {
          'is-disabled' : disabled,
          'el-switch--wide' : this.hasText(),
          'is-checked' : value === onValue
        })}>

        <View show={disabled}>
          <div className="el-switch__mask"></div>
        </View>

        <input
          className={this.className('el-switch__input', {
            'allow-focus' : allowFocus
          })}
          type="checkbox"
          checked={value === onValue}
          name={name}
          ref="input"
          disabled={disabled}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        />

        <span className="el-switch__core" ref="core" style={{ 'width': coreWidth + 'px' }}>
          <span className="el-switch__button" style={Object.assign({}, buttonStyle)} onClick={this.setFocus.bind(this)}/>
        </span>

        <Transition name="label-fade">
          <View show={value === onValue}>
            <div
              className="el-switch__label el-switch__label--left"
              style={{ 'width': coreWidth + 'px' }}
            >
              { onIconClass && <i className={onIconClass} /> }
              { !onIconClass && onText && <span>{onText}</span> }
            </div>
          </View>
        </Transition>

        <Transition name="label-fade">
          <View show={value !== onValue}>
            <div
              className="el-switch__label el-switch__label--right"
              style={{ 'width': coreWidth + 'px' }}
            >
              { offIconClass && <i className={offIconClass} /> }
              { !offIconClass && offText && <span>{offText}</span> }
            </div>
          </View>
        </Transition>
      </label>
    )
  }
}

Switch.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  width: PropTypes.number,
  onIconClass: PropTypes.string,
  offIconClass: PropTypes.string,
  onText: PropTypes.string,
  offText: PropTypes.string,
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  onValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  offValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  allowFocus: PropTypes.bool
};

Switch.defaultProps = {
  value: true,
  disabled: false,
  width: 0,
  onIconClass: '',
  offIconClass: '',
  onText: 'ON',
  offText: 'OFF',
  onValue: true,
  offValue: false,
  onColor: '',
  offColor: '',
  name: '',
  allowFocus: false
};

import React from 'react'
import {Component, PropTypes, View, Transition} from '../../libs'

export default class Switch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: Boolean(props.value),
      disabled: Boolean(props.disabled),
      width: props.width === 0 ? this.hasText() ? 58 : 46 : props.width
    };
  }

  componentDidMount() {
    this.updateSwitch();
  }

  componentDidUpdate() {
    this.updateSwitch();
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  updateSwitch() {
    if (!this.state.disabled) {
      if ((this.props.onColor || this.props.offColor)) {
        this.handleCoreColor();
      }
    }
    this.handleButtonTransform();
  }

  hasText() {
    return this.props.onText || this.props.offText;
  }

  handleMiscClick() {
    if (!this.state.disabled) {
      this.setState({
        value: !this.state.value
      });
    }
  }

  handleCoreColor() {
    this.refs.core.style.borderColor = this.state.value ? this.props.onColor : this.props.offColor;
    this.refs.core.style.backgroundColor = this.state.value ? this.props.onColor : this.props.offColor;
  }

  handleButtonTransform() {
    this.refs.button.style.transform = this.state.value ? `translate3d(${ this.state.width - 20 }px, 2px, 0)` : 'translate3d(2px, 2px, 0)';
  }

  render() {
    const {name, onText, offText, onIconClass, offIconClass} = this.props;
    const {value, disabled, width} = this.state;
    return (
      <div
        style={this.style()}
        className={this.className('el-switch', {
          'is-disabled' : disabled,
          'el-switch--wide' : this.hasText()
        })}>

        <View show={disabled}>
          <div className="el-switch__mask"></div>
        </View>

        <input className="el-switch__input" type="checkbox" checked={value} name={name}
          disabled={disabled} style={{display: 'none'}} onChange={()=>{}} />

        <span className="el-switch__core" ref="core" onClick={this.handleMiscClick.bind(this)} style={{ 'width': width + 'px' }}>
          <span className="el-switch__button" ref="button" />
        </span>

        <Transition name="label-fade">
          <View show={value}>
            <div className="el-switch__label el-switch__label--left" onClick={this.handleMiscClick.bind(this)}
              style={{ 'width': width + 'px' }}>
              {onIconClass && <i className="onIconClass" />}
              {!onIconClass && onText && <span>{onText}</span>}
            </div>
          </View>
        </Transition>

        <Transition name="label-fade">
          <View show={!this.state.value}>
            <div className="el-switch__label el-switch__label--right" onClick={this.handleMiscClick.bind(this)}
              style={{ 'width': this.state.width + 'px' }}>
              {offIconClass && <i className="offIconClass" />}
              {!offIconClass && offText && <span>{offText}</span>}
            </div>
          </View>
        </Transition>
      </div>

    )
  }
}

Switch.propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  width: PropTypes.number,
  onIconClass: PropTypes.string,
  offIconClass: PropTypes.string,
  onText: PropTypes.string,
  offText: PropTypes.string,
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};

Switch.defaultProps = {
  value: true,
  disabled: false,
  width: 0,
  onIconClass: '',
  offIconClass: '',
  onText: 'ON',
  offText: 'OFF',
  onColor: '',
  offColor: '',
  name: '',
  onChange: undefined
};

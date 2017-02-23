import React from 'react'
import {Component, PropTypes, View, Transition} from '../../libs'

export default class Switch extends Component {

  constructor(props) {
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

  componentWillReceiveProps(props) {
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
    let newColor = this.state.value ? this.props.onColor : this.props.offColor;

    this.refs.core.style.borderColor = newColor;
    this.refs.core.style.backgroundColor = newColor;
  }

  handleChange(e) {
    this.setState({
      value: e.target.checked
    }, () => {
      this.updateSwitch();

      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    });
  }

  handleButtonTransform() {
    const { value, coreWidth, buttonStyle } = this.state;

    buttonStyle.transform = value ? `translate(${ coreWidth - 20 }px, 2px)` : 'translate(2px, 2px)';

    this.setState({ buttonStyle });
  }

  render() {
    const { name, disabled, onText, offText, onIconClass, offIconClass } = this.props;
    const { value, coreWidth, buttonStyle } = this.state;

    return (
      <label
        style={this.style()}
        className={this.className('el-switch', {
          'is-disabled' : disabled,
          'el-switch--wide' : this.hasText()
        })}>

        <View show={disabled}>
          <div className="el-switch__mask"></div>
        </View>

        <input
          className="el-switch__input"
          type="checkbox"
          checked={value}
          name={name}
          disabled={disabled}
          onChange={this.handleChange.bind(this)}
        />

        <span className="el-switch__core" ref="core" style={{ 'width': coreWidth + 'px' }}>
          <span className="el-switch__button" style={Object.assign({}, buttonStyle)} />
        </span>

        <Transition name="label-fade">
          <View show={value}>
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
          <View show={!value}>
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
  name: ''
};

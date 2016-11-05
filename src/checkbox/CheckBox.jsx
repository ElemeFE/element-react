import React from 'react'
import { Component, PropTypes } from '../../libs'

export default class Checkbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: Boolean(props.checked),
      focus: Boolean(props.focus),
      label: this.getLabel(),
    };
  }

  getLabel() {
    let label;
    if (this.props.trueLabel || this.props.falseLabel) {
      label = this.props.checked ? this.props.trueLabel : this.props.falseLabel;
    }else {
      label = this.props.label;
    }
    return label;
  }

  onFocus() {
    this.setState({
      focus: true
    });
  }

  onBlur() {
    this.setState({
      focus: false
    });
  }

  onChange(e) {
    const { label } = this.state;
    const { trueLabel, falseLabel} = this.props;
    const checked = e.target.checked;
    let newLabel = label;

    if (this.props.trueLabel || this.props.falseLabel) {
      newLabel = checked ? trueLabel : falseLabel;
    }

    if (this.props.onChange) {
      if (this.context.isWrap) {
        this.props.onChange(e, label);
      } else {
        this.props.onChange(e);
      }
    }

    this.setState({
      checked: checked,
      label: newLabel,
    });
  }

  render() {
    return (
      <label className="el-checkbox">
        <span className="el-checkbox__input">
          <span
            className={
            this.classNames("el-checkbox__inner",
            {'is-disabled': this.props.disabled},
            {'is-checked': this.state.checked},
            {'is-indeterminate': this.props.indeterminate},
            {'is-focus': this.state.focus})}>
          </span>
          <input
            className="el-checkbox__original"
            type="checkbox"
            checked={this.state.checked}
            disabled={this.props.disabled}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange.bind(this)}
          />
        </span>
        <span className="el-checkbox__label">
          {this.state.label || this.props.children}
        </span>
      </label>
    )
  }
}

Checkbox.defaultProps = {
  checked: false,
  focus: false,
  trueLabel: '',
  falseLabel: '',
}

Checkbox.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  focus: PropTypes.bool,
  trueLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  falseLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
}

Checkbox.contextTypes = {
  isWrap: PropTypes.bool
};
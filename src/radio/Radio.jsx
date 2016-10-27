import React, { PropTypes } from 'react';
import { Component } from '../../libs';

export default class Radio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.getChecked(props)
    };
  }

  componentWillReceiveProps(props) {
    const checked = this.getChecked(props);

    if (this.state.checked != checked) {
      this.setState({ checked });
    }
  }

  onChange(e) {
    const checked = e.target.checked;

    if (checked) {
      if (this.props.onChange) {
        if (this.props.hasOwnProperty('model')) {
          this.props.onChange(this.props.value);
        } else {
          this.props.onChange(e);
        }
      }
    }

    this.setState({ checked });
  }

  onFocus() {
    this.setState({
      focus: true
    })
  }

  onBlur() {
    this.setState({
      focus: false
    })
  }

  getChecked(props) {
    return props.model == props.value || Boolean(props.checked)
  }

  render() {
    return (
      <label className="el-radio">
        <span className="el-radio__input">
          <span className={this.classNames('el-radio__inner', {'is-checked': this.state.checked}, {'is-disabled': this.props.disabled}, {'is-focus': this.props.focus})}></span>
          <input type="radio" className="el-radio__original" checked={this.state.checked} disabled={this.props.disabled} onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
        </span>
        <span className="el-radio__label">
          {this.props.children || this.props.value}
        </span>
      </label>
    )
  }
}

Radio.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  focus: PropTypes.bool,
/* eslint-disable */
  checked: PropTypes.bool
/* eslint-enable */
}

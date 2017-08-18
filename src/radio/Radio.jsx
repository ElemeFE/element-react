/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

type State = {
  checked: boolean,
  focus?: boolean
};

export default class Radio extends Component {
  static elementType = 'Radio';

  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      checked: this.getChecked(props)
    };
  }

  componentWillReceiveProps(props: Object) {
    const checked = this.getChecked(props);

    if (this.state.checked != checked) {
      this.setState({ checked });
    }
  }

  onChange(e: SyntheticInputEvent) {
    const checked = e.target.checked;

    if (checked) {
      if (this.props.onChange) {
        this.props.onChange(this.props.value);
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

  getChecked(props: Object): boolean {
    return props.model == props.value || Boolean(props.checked)
  }

  render(): React.Element<any> {
    const { checked, focus } = this.state;
    const { disabled, value, children } = this.props;

    return (
      <label style={this.style()} className={this.className('el-radio')}>
        <span className={this.classNames({
          'el-radio__input': true,
          'is-checked': checked,
          'is-disabled': disabled,
          'is-focus': focus
        })}>
          <span className="el-radio__inner"></span>
          <input
            type="radio"
            className="el-radio__original"
            checked={checked}
            disabled={disabled}
            onChange={this.onChange.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
          />
        </span>
        <span className="el-radio__label">
          {children || value}
        </span>
      </label>
    )
  }
}

Radio.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool
}

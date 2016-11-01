import React from 'react';
import { Component, PropTypes, View } from '../../libs';

import calcTextareaHeight from './calcTextareaHeight'

export default class Input extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      textareaStyle: {}
    }
  }

  componentDidMount() {
    this.resizeTextarea()
  }

  handleIconClick() {
    // TODO
  }

  handleInput(e) {
    this.resizeTextarea()
    this.setState({
      value: e.target.value
    })
  }

  handleFocus(e) {
    // TODO
  }

  handleBlur(e) {
    // TODO
  }

  resizeTextarea() {
    const { autosize, type } = this.props;
    if (!autosize || type !== 'textarea') {
      return;
    }
    const minRows = autosize.minRows;
    const maxRows = autosize.maxRows;
    this.setState({
      textareaStyle: calcTextareaHeight(this.refs.textarea, minRows, maxRows)
    })
  }

  render() {
    const {
      type,
      name,
      size,
      disabled,
      prepend,
      append,
      icon,
      placeholder,
      readonly,
      maxlength,
      minlength,
      autoComplete,
      autofocus,
      form,
      value,
      validating,
      rows
    } = this.props;

    const classname = this.classNames(
      type === 'textarea' ? 'el-textarea' : 'el-input',
      size ? 'el-input--' + size : '',
      {
        'is-disabled': disabled,
        'el-input-group': prepend || append
      }
    )

    // 前置元素
    const prependDOM = prepend ? <div className="el-input-group__prepend">{prepend}</div> : null
    // 后置元素
    const appendDOM = append ? <div className="el-input-group__append">{append}</div> : null
    // input图标
    const iconDOM = icon ? <i className={`el-input__icon el-icon-${icon}`} onClick={() => this.handleIconClick()}></i> : null
    // validating状态
    const validatingDOM =validating ? <i className="el-input__icon el-icon-loading"></i> : null

    return type !== 'textarea' ?
      <div className={classname}>
        { prependDOM }
        { iconDOM }
        <input
          className="el-input__inner"
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          maxLength={maxlength}
          minLength={minlength}
          autoComplete={autoComplete}
          autoFocus={autofocus}
          form={form}
          value={value}
          ref="input"
          onChange={e => this.handleInput(e)}
          onFocus={e => this.handleFocus(e) }
          onBlur={e => this.handleBlur(e) }
        />
        { validatingDOM }
        { appendDOM }
      </div>
      :
      <div className={classname}>
        <textarea
          className="el-textarea__inner"
          value={value}
          ref="textarea"
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          style={this.state.textareaStyle}
          readOnly={readonly}
          rows={rows}
          form={form}
          autoFocus={autofocus}
          maxLength={maxlength}
          minLength={minlength}
          onChange={e => this.handleInput(e)}
          onFocus={e => this.handleFocus(e)}
          onBlur={e => this.handleBlur(e)}
        >
        </textarea>
      </div>
  }
}

Input.propTypes = {
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  placeholder: PropTypes.string,
  size: PropTypes.string,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  autosize: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object ]),
  rows: PropTypes.number,
  autoComplete: PropTypes.string,
  form: PropTypes.string,
  maxlength: PropTypes.number,
  minlength: PropTypes.number,
  handleBlur: PropTypes.func,
  inputSelect: PropTypes.func,
  resizeTextarea: PropTypes.func,
  handleFocus: PropTypes.func,
  handleInput: PropTypes.func,
  handleIconClick: PropTypes.func,
  textareaStyle: PropTypes.object,
  prepend: PropTypes.string,
  append: PropTypes.string
}

Input.defaultProps = {
  type: 'text',
  autosize: false,
  rows: 2,
  autoComplete: 'off'
}

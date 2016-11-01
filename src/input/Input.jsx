import React from 'react';
import { Component, PropTypes, View } from '../../libs';

import calcTextareaHeight from './calcTextareaHeight'

import assign from 'object-assign';

export default class Input extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textareaStyle: null
    }
  }

  componentDidMount() {
    this.resizeTextarea();
  }

  handleChange(e) {
    this.resizeTextarea();
    const { handleInput, handlePressEnter } = this.props;
    if (e.keyCode === 13 && handlePressEnter) {
      handlePressEnter(e);
    }
    if (handleInput) {
      handleInput(e);
    }
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
    });
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
      readOnly,
      maxlength,
      minlength,
      autoComplete,
      autoFocus,
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
    const iconDOM = icon ? <i className={`el-input__icon el-icon-${icon}`} onClick={e => this.props.handleIconClick(e)}></i> : null
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
          readOnly={readOnly}
          maxLength={maxlength}
          minLength={minlength}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          form={form}
          value={value}
          ref="input"
          onChange={e => this.handleChange(e)}
          onFocus={e => this.props.handleFocus(e) }
          onBlur={e => this.props.handleBlur(e) }
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
          style={assign({}, this.props.style, this.state.textareaStyle)}
          readOnly={readOnly}
          rows={rows}
          form={form}
          autoFocus={autoFocus}
          maxLength={maxlength}
          minLength={minlength}
          onChange={e => this.handleChange(e)}
          onFocus={e => this.props.handleFocus(e)}
          onBlur={e => this.props.handleBlur(e)}
        >
        </textarea>
      </div>
  }
}

Input.propTypes = {
  // base
  type: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxlength: PropTypes.number,
  minlength: PropTypes.number,

  // type !== 'textarea'
  size: PropTypes.oneOf(['large', 'small', 'mini']),
  prepend: PropTypes.node,
  append: PropTypes.node,

  // type === 'textarea'
  autosize: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object ]),
  rows: PropTypes.number,

  // event
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func,
  handleInput: PropTypes.func,
  handlePressEnter: PropTypes.func,
  handleIconClick: PropTypes.func,

  // autoComplete
  autoComplete: PropTypes.string,
  inputSelect: PropTypes.func,

  // form related
  form: PropTypes.string
}

Input.defaultProps = {
  type: 'text',
  autosize: false,
  rows: 2,
  autoComplete: 'off'
}

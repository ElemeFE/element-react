import React from 'react';
import { Component, PropTypes } from '../../libs';

import calcTextareaHeight from './calcTextareaHeight'

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

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
    const { onChange } = this.props;

    if (onChange) {
      onChange(e);
    }

    this.resizeTextarea();
  }

  handleFocus(e) {
    const { onFocus } = this.props;
    if (onFocus) onFocus(e)
  }

  handleBlur(e) {
    const { onBlur } = this.props;
    if (onBlur) onBlur(e)
  }

  handleIconClick(e) {
    const { onIconClick } = this.props;
    if (onIconClick) onIconClick(e)
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
      size,
      disabled,
      prepend,
      append,
      icon,
      className,
      autoComplete,
      validating,
      rows,
      autosize,
      onMouseEnter,
      onMouseLeave,
      ...otherProps
    } = this.props;

    const classname = this.classNames(
      type === 'textarea' ? 'el-textarea' : 'el-input',
      size ? 'el-input--' + size : '',
      {
        'is-disabled': disabled,
        'el-input-group': prepend || append
      }
    )

    if ('value' in this.props) {
      otherProps.value = fixControlledValue(this.props.value);
      delete otherProps.defaultValue;
    }
    if ('style' in this.props) {
      delete otherProps.style;
    }

    // 前置元素
    const prependDOM = prepend ? <div className="el-input-group__prepend">{prepend}</div> : null
    // 后置元素
    const appendDOM = append ? <div className="el-input-group__append">{append}</div> : null
    // input图标
    const iconDOM = icon ? <i className={`el-input__icon el-icon-${icon}`} onClick={e => this.handleIconClick(e)}></i> : null
    // validating状态
    const validatingDOM = validating ? <i className="el-input__icon el-icon-loading"></i> : null

    delete otherProps.onIconClick;

    return type !== 'textarea' ?
      <div className={classname} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        { prependDOM }
        { iconDOM }
        <input
          { ...otherProps }
          ref="input"
          className={this.classNames("el-input__inner", className)}
          autoComplete={autoComplete}
          onChange={e => this.handleChange(e)}
          onFocus={e => this.handleFocus(e) }
          onBlur={e => this.handleBlur(e) }
        />
        { validatingDOM }
        { appendDOM }
      </div>
      :
      <div className={classname}>
        <textarea
          { ...otherProps }
          ref="textarea"
          className={this.classNames("el-textarea__inner", className)}
          style={this.state.textareaStyle}
          rows={rows}
          onChange={e => this.handleChange(e)}
          onFocus={e => this.handleFocus(e)}
          onBlur={e => this.handleBlur(e)}
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
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  defaultValue: PropTypes.any,
  value: PropTypes.any,

  // type !== 'textarea'
  size: PropTypes.oneOf(['large', 'small', 'mini']),
  prepend: PropTypes.node,
  append: PropTypes.node,

  // type === 'textarea'
  autosize: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object ]),
  rows: PropTypes.number,

  // event
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onIconClick: PropTypes.func,

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

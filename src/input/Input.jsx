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
    this.resizeTextarea();
    const { handleInput, handlePressEnter } = this.props;
    if (e.keyCode === 13 && handlePressEnter) {
      handlePressEnter(e);
    }
    if (handleInput) {
      handleInput(e);
    }
  }

  handleFocus(e) {
    const { handleFocus } = this.props;
    if (handleFocus) handleFocus(e)
  }

  handleBlur(e) {
    const { handleBlur } = this.props;
    if (handleBlur) handleBlur(e)
  }

  handleIconClick(e) {
    const { handleIconClick } = this.props;
    if (handleIconClick) handleIconClick(e)
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
      autoComplete,
      validating,
      rows,
      autosize,
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

    // 前置元素
    const prependDOM = prepend ? <div className="el-input-group__prepend">{prepend}</div> : null
    // 后置元素
    const appendDOM = append ? <div className="el-input-group__append">{append}</div> : null
    // input图标
    const iconDOM = icon ? <i className={`el-input__icon el-icon-${icon}`} onClick={e => this.handleIconClick(e)}></i> : null
    // validating状态
    const validatingDOM =validating ? <i className="el-input__icon el-icon-loading"></i> : null

    return type !== 'textarea' ?
      <div className={classname}>
        { prependDOM }
        { iconDOM }
        <input
          { ...otherProps }
          ref="input"
          className="el-input__inner"
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
          className="el-textarea__inner"
          style={Object.assign({}, this.props.style, this.state.textareaStyle)}
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

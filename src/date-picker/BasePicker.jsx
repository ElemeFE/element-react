import React from 'react';

import { PropTypes, Component } from '../../libs';
import { EventRegister } from '../../libs/internal'

import { HAVE_TRIGGER_TYPES, TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants'
import { Errors, require_condition, IDGenerator } from '../../libs/utils';

/*
todo: 
  handle animation popup
*/

const idGen = new IDGenerator()
const haveTriggerType = (type) => {
  return HAVE_TRIGGER_TYPES.indexOf(type) !== -1
}

const isDate = (date) => date instanceof Date

export default class BasePicker extends Component {
  static get propTypes() {
    return {
      align: PropTypes.oneOf(['left', 'center', 'right']),
      format: PropTypes.string,
      isShowTrigger: PropTypes.bool,
      isReadOnly: PropTypes.bool,
      placeholder: PropTypes.string,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
      // (date)=>()
      onChange: PropTypes.func,
      // time select pannel:
      value: PropTypes.instanceOf(Date),
    }
  }

  static get defaultProps() {
    return {
      value: '',
      // (thisReactElement)=>Unit
      onFocus() { },
      onBlur() { },
    }
  }

  constructor(props, type, state = {}) {
    require_condition(typeof type === 'string')
    super(props);

    this.type = type// type need to be set first
    this.state = Object.assign({}, state, {
      pickerVisible: false,
    }, this.propsToState(props))

    this.clickOutsideId = 'clickOutsideId_' + idGen.next()
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.propsToState(nextProps))
  }

  /**
   * onPicked should only be called from picker pannel instance
   * and should never return a null date instance
   * 
   * @param value: Date
   * @param isKeepPannel: boolean = false
   */
  onPicked(value, isKeepPannel = false) {//only change input value on picked triggered
    require_condition(isDate(value))
    this.setState({
      pickerVisible: isKeepPannel,
      value,
      text: this.dateToStr(value)
    })
    this.props.onChange(value)
  }

  // (date: Date|null)=>string
  dateToStr(date) {
    if (!date) return ''

    require_condition(isDate(date))

    const tdate = date
    const formatter = (
      TYPE_VALUE_RESOLVER_MAP[this.type] ||
      TYPE_VALUE_RESOLVER_MAP['default']
    ).formatter;
    const format = DEFAULT_FORMATS[this.type];

    const result = formatter(tdate, this.props.format || format);
    // if (typeof result !== 'string') {
    //   console.warn('dateToStr return a non string result')
    // }
    return result;
  }

  // (string) => Date | null
  parseDate(dateStr) {
    if (!dateStr) return null
    const type = this.type;
    const parser = (
      TYPE_VALUE_RESOLVER_MAP[type] ||
      TYPE_VALUE_RESOLVER_MAP['default']
    ).parser;
    return parser(dateStr, this.props.format || DEFAULT_FORMATS[type]);
  }

  propsToState(props) {
    const state = {}
    if (this.isDateValid(props.value)) {
      state.text = this.dateToStr(props.value)
      state.value = props.value
    } else {
      state.text = ''
      state.value = null
    }
    return state
  }

  triggerClass() {
    return this.type.includes('time') ? 'el-icon-time' : 'el-icon-date';
  }

  calcIsShowTrigger() {
    if (this.props.isShowTrigger != null) {
      return !!this.props.isShowTrigger;
    } else {
      return haveTriggerType(this.type);
    }
  }

  handleFocus() {
    this.isInputFocus = true
    if (haveTriggerType(this.type) && !this.state.pickerVisible) {
      this.setState({ pickerVisible: true }, () => {
        this.props.onFocus(this);
      })
    }
  }


  handleBlur() {
    this.isInputFocus = false
    this.props.onBlur(this);
  }

  handleKeydown(evt) {
    const keyCode = evt.keyCode;
    const target = evt.target;
    let selectionStart = target.selectionStart;
    let selectionEnd = target.selectionEnd;
    let length = target.value.length;

    const hidePicker = () => {
      this.setState({ pickerVisible: false })
    }

    // tab
    if (keyCode === 9) {
      hidePicker()

      // enter
    } else if (keyCode === 13) {
      hidePicker()
      evt.target.blur()//this trigger's handleBlur func
      // left
    } else if (keyCode === 37) {
      evt.preventDefault();

      if (selectionEnd === length && selectionStart === length) {
        target.selectionStart = length - 2;
      } else if (selectionStart >= 3) {
        target.selectionStart -= 3;
      } else {
        target.selectionStart = 0;
      }
      target.selectionEnd = target.selectionStart + 2;
      // right
    } else if (keyCode === 39) {
      evt.preventDefault();
      if (selectionEnd === 0 && selectionStart === 0) {
        target.selectionEnd = 2;
      } else if (selectionEnd <= length - 3) {
        target.selectionEnd += 3;
      } else {
        target.selectionEnd = length;
      }
      target.selectionStart = target.selectionEnd - 2;
    }
  }

  togglePickerVisible() {
    this.setState({
      pickerVisible: !this.state.pickerVisible
    })
  }

  // (state, props)=>ReactElement
  pickerPannel() {
    throw new Errors.MethodImplementationRequiredError()
  }

  // (Date|null)=>bool
  isDateValid(date) {
    return date == null || isDate(date)
  }

  // return true on condition
  //  * input is parsable to date
  //  * also meet your other condition 
  isInputValid(value) {
    const parseable = this.parseDate(value)
    if (!parseable) {
      return false
    }

    const isdatevalid = this.isDateValid(parseable)
    if (!isdatevalid) {
      return false
    }
    return true
    // return this.parseDate(value) && this.isDateValid(this.parseDate(value)) 
  }

  handleClickOutside() {
    const {value, pickerVisible} = this.state
    if (!this.isInputFocus && !pickerVisible) {
      return
    }

    if (this.isDateValid(value)) {
      this.setState({ pickerVisible: false })
      this.props.onChange(value)
    } else {
      this.setState({ pickerVisible: false, text: this.dateToStr(value) })
    }
  }

  render() {
    const {isReadOnly, placeholder} = this.props;
    const {pickerVisible, value, text} = this.state;

    return (
      <span
        className={this.classNames('el-date-editor', {
          'is-have-trigger': this.calcIsShowTrigger(),
          'is-active': pickerVisible,
          'is-filled': !!value
        })}
        onClick={(evt) => {
          evt.stopPropagation()
          evt.nativeEvent.stopImmediatePropagation();
          return false
        } }
        >

        <EventRegister
          id={this.clickOutsideId}
          target={document}
          eventName="click"
          func={this.handleClickOutside.bind(this)} />

        <input
          className="el-date-editor__editor"
          readOnly={isReadOnly}
          type="text"
          placeholder={placeholder}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onKeyDown={this.handleKeydown.bind(this)}
          onChange={(evt) => {
            const iptxt = evt.target.value
            const nstate = { text: iptxt }
            if (iptxt.trim() === '') {
              nstate.value = null
            } else if (this.isInputValid(iptxt)) {//only set value on a valid date input
              nstate.value = this.parseDate(iptxt)
            }
            this.setState(nstate)
          } }
          ref="reference"
          value={text}
          />

        {
          this.calcIsShowTrigger() && <span
            onClick={this.togglePickerVisible.bind(this)}
            className={this.classNames('el-date-editor__trigger', 'el-icon', this.triggerClass())}
            />
        }

        {
          pickerVisible && this.pickerPannel(this.state, this.props)
        }
      </span>
    )
  }
}


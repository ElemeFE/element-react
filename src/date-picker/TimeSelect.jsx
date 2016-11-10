import React from 'react';

import { PropTypes, Component } from '../../libs';
import { EventRegister } from '../../libs/internal'

import TimeSelectPanel from './panel/TimeSelectPanel'
import { HAVE_TRIGGER_TYPES, PLACEMENT_MAP } from './constants'

/*
todo: 
  handle animation popup
*/

const haveTriggerType = (type) => {
  return HAVE_TRIGGER_TYPES.indexOf(type) !== -1
}


export default class TimeSelect extends Component {
  constructor(props) {
    super(props);
    this.type = 'time-select';
    this.state = {
      pickerVisible: false,
      value: props.value // skip validate initial value?
    }
  }

  onPicked(value) {
    this.setState({
      pickerVisible: false,
      value
    })
    this.lastPickedValue = value
    this.props.onChange(value)
  }

  triggerClass() {
    return this.type.indexOf('time') !== -1 ? 'el-icon-time' : 'el-icon-date';//todo: this.type?
  }

  calcIsShowTrigger() {
    if (this.props.isShowTrigger != null) {
      return !!this.props.isShowTrigger;
    } else {
      return haveTriggerType(this.type);
    }
  }

  handleFocus() {
    if (haveTriggerType(this.type) && !this.state.pickerVisible) {
      this.setState({ pickerVisible: true }, () => {
        this.props.onFocus(this);
      })
    }
  }

  isValid(value) {
    return TimeSelectPanel.isValid(value, this.props)
  }

  handleBlur() {
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

  handleTriggerClick() {
    this.setState({
      pickerVisible: !this.state.pickerVisible
    })
  }

  render() {
    const {isReadOnly, placeholder, align, ...others} = this.props;
    const {pickerVisible, value} = this.state;

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
          id="handle_click_outside"
          target={document}
          eventName="click"
          func={() => {
            const {value} = this.state
            if (this.isValid(value)) {
              this.setState({ pickerVisible: false })
              this.props.onChange(value)
            } else {
              this.setState({ pickerVisible: false, value: this.lastPickedValue })
            }
          } } />

        <input
          className="el-date-editor__editor"
          readOnly={isReadOnly}
          type="text"
          placeholder={placeholder}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onKeyDown={this.handleKeydown.bind(this)}
          onChange={(evt) => { this.setState({ value: evt.target.value }) } }
          ref="reference"
          value={value}
          />

        {
          this.calcIsShowTrigger() && <span
            onClick={this.handleTriggerClick.bind(this)}
            className={this.classNames('el-date-editor__trigger', 'el-icon', this.triggerClass())}
            />
        }

        {
          pickerVisible && <TimeSelectPanel
            {...others}
            key="time-select-panel"
            value={value}
            onPicked={this.onPicked.bind(this)}
            getPopperRefElement={() => this.refs.reference}
            popperMixinOption={
              {
                placement: PLACEMENT_MAP[align] || PLACEMENT_MAP.left
              }
            } />
        }
      </span>
    )
  }
}

TimeSelect.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  isShowTrigger: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  // time select pannel:
  start: PropTypes.string,
  end: PropTypes.string,
  step: PropTypes.string,
  minTime: PropTypes.string,
  value: PropTypes.string,
}

TimeSelect.defaultProps = {
  value: '',
  // (thisReactElement)=>Unit
  onFocus() { },
  onBlur() { },
}
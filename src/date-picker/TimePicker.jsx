//@flow
import React from 'react';
import debounce from 'throttle-debounce/debounce';

import { PropTypes } from '../../libs';

import BasePicker from './BasePicker'
import TimePanel from './panel/TimePanel'

import { TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants'
import type { TimePickerProps } from './Types';

function converSelectRange(props) {
  let selectableRange = []
  if (props.selectableRange) {
    let ranges = props.selectableRange;
    const parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
    const format = DEFAULT_FORMATS.timerange;

    ranges = Array.isArray(ranges) ? ranges : [ranges];
    selectableRange = ranges.map(range => parser(range, format));
  }
  return selectableRange
}

export default class TimePicker extends BasePicker {
  // why this is used, goto: http://exploringjs.com/es6/ch_classes.html
  static get propTypes() {
    let result: any = Object.assign({}, {
      // '18:30:00 - 20:30:00'
      // or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
      selectableRange: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ])
    }, BasePicker.propTypes)

    return result;
  }

  static get defaultProps() {
    let result: any =  Object.assign({}, BasePicker.defaultProps)
    return result;
  }

  constructor(props: TimePickerProps) {
    super(props, 'time', {})
    this._onSelectionChange = debounce(200, this.onSelectionChange.bind(this))
  }

  onSelectionChange(start: number, end: number) {
    this.refs.inputRoot.refs.input.setSelectionRange(start, end);
    this.refs.inputRoot.refs.input.focus();
  }

  pickerPanel(state: any, props: TimePickerProps) {
    return (
      <TimePanel
        {...props}
        currentDate={state.value}
        onCancel={()=>this.setState({pickerVisible: false})}
        onPicked={this.onPicked.bind(this)}
        onSelectRangeChange={this._onSelectionChange}
        selectableRange={converSelectRange(props)}
        />
    )
  }
}

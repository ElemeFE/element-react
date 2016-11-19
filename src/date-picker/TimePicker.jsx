import React from 'react';

import { PropTypes } from '../../libs';
import { debounce } from '../../libs/utils'

import BasePicker from './BasePicker'
import TimePanel from './panel/TimePanel'

import { PLACEMENT_MAP, TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants'

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
    return Object.assign({
      // '18:30:00 - 20:30:00'
      // or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
      selectableRange: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ])
    }, BasePicker.propTypes)
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps)
  }

  constructor(props) {
    super(props, 'time', {})
    this._onSelectionChange = debounce(this.onSelectionChange.bind(this), 200)
  }

  onSelectionChange(start, end) {
    this.refs.reference.setSelectionRange(start, end);
    this.refs.reference.focus();
  }

  pickerPannel(state, props) {
    return (
      <TimePanel
        {...props}
        key="time-picker-panel"
        currentDate={state.value}
        onCancel={()=>this.setState({pickerVisible: false})}
        onPicked={this.onPicked.bind(this)}
        onSelectRangeChange={this._onSelectionChange}
        selectableRange={converSelectRange(props)}
        getPopperRefElement={() => this.refs.reference}
        popperMixinOption={
          {
            placement: PLACEMENT_MAP[props.align] || PLACEMENT_MAP.left
          }
        } />
    )
  }
}

//@flow
import React from 'react';
import debounce from 'throttle-debounce/debounce';
import { PropTypes } from '../../libs';

import BasePicker from './BasePicker'
import TimeRangePanel from './panel/TimeRangePanel'
import type { TimeRangePickerProps } from './Types';


export default class TimeRangePicker extends BasePicker {
  static get propTypes() {
    let result: any = Object.assign({}, { rangeSeparator: PropTypes.string },
      BasePicker.propTypes)
    return result;
  }

  static get defaultProps() {
    let result: any = Object.assign({}, BasePicker.defaultProps)
    return result;
  }

  constructor(props: TimeRangePickerProps) {
    super(props, 'timerange', {})
    this._onSelectionChange = debounce(200, this.onSelectionChange.bind(this))
  }

  onSelectionChange(start: number, end: number) {
    this.refs.inputRoot.refs.input.setSelectionRange(start, end);
    this.refs.inputRoot.refs.input.focus();
  }

  getFormatSeparator() {
    return this.props.rangeSeparator
  }

  pickerPanel(state: any, props: TimeRangePickerProps) {
    return (
      <TimeRangePanel
        {...props}
        currentDates={state.value}
        onCancel={() => this.setState({ pickerVisible: false })}
        onPicked={this.onPicked.bind(this)}
        onSelectRangeChange={this._onSelectionChange}
      />
    )
  }
}

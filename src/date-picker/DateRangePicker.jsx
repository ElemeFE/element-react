//@flow
import React from 'react';

import { pick } from '../../libs/utils'

import BasePicker from './BasePicker'
import DateRangePanel from './panel/DateRangePanel'
import type { DateRangePickerProps } from './Types';

export default class DateRangePicker extends BasePicker {
  static get propTypes() {
    return Object.assign(
      {},
      BasePicker.propTypes,
      pick(DateRangePanel.propTypes,
        ['value', 'showTime', 'shortcuts']))
  }

  static get defaultProps() {
    let result: any = Object.assign({}, BasePicker.defaultProps)
    return result;
  }

  constructor(props: DateRangePickerProps) {
    super(props, 'daterange', {})
  }

  pickerPanel(state: any, props: DateRangePickerProps) {
    let value = state.value
    if (value instanceof Date){
      value = [value, null]
    }
    return (
      <DateRangePanel
        {...props}
        value={value}
        onPick={this.onPicked.bind(this)}
        />
    )
  }
}

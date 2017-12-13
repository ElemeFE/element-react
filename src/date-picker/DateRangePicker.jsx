//@flow
import React from 'react';

import { pick } from '../../libs/utils'
import { PropTypes } from '../../libs';

import BasePicker from './BasePicker'
import DateRangePanel from './panel/DateRangePanel'
import type { DateRangePickerProps } from './Types';

export default class DateRangePicker extends BasePicker {
  static get propTypes() {
    return Object.assign(
      {},
      {rangeSeparator: PropTypes.string},
      BasePicker.propTypes,
      // default value is been defined in ./constants file
      pick(DateRangePanel.propTypes,
        ['value', 'isShowTime', 'shortcuts', 'firstDayOfWeek']))
  }

  static get defaultProps() {
    let result: any = Object.assign({}, BasePicker.defaultProps)
    return result;
  }

  constructor(props: DateRangePickerProps) {
    super(props, 'daterange', {})
  }

  getFormatSeparator(){
    return this.props.rangeSeparator
  }
  
  pickerPanel(state: any, props: DateRangePickerProps) {
    let value = state.value
    if (value instanceof Date) {
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

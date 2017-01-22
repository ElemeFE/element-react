import React from 'react';

import { pick } from '../../libs/utils'

import BasePicker from './BasePicker'
import DateRangePanel from './panel/DateRangePanel'


export default class DateRangePicker extends BasePicker {
  static get propTypes() {
    return Object.assign(
      {},
      BasePicker.propTypes,
      pick(DateRangePanel.propTypes,
        ['value', 'showTime', 'shortcuts']))
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps)
  }

  constructor(props) {
    super(props, 'daterange', {})
  }

  pickerPanel(state, props) {
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

import React from 'react';

import { pick } from '../../libs/utils'
import { SELECTION_MODES } from './utils'

import BasePicker from './BasePicker'
import DatePanel from './panel/DatePanel'


export default class DatePicker extends BasePicker {
  // why this is used, goto: http://exploringjs.com/es6/ch_classes.html
  static get propTypes() {
    return Object.assign(
      {},
      BasePicker.propTypes,
      pick(DatePanel.propTypes,
        ['value', 'showTime', 'shortcuts', 'selectionMode', 'disabledDate', 'showWeekNumber']))
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps)
  }

  constructor(props) {
    let type = 'date'
    switch (props.selectionMode) {
      case SELECTION_MODES.YEAR:
        type = 'year'; break;
      case SELECTION_MODES.MONTH:
        type = 'month'; break;
      case SELECTION_MODES.WEEK:
        type = 'week'; break;
    }
    super(props, type, {})
  }

  pickerPanel(state, props) {
    return (
      <DatePanel
        {...props}
        value={state.value}
        onPick={this.onPicked.bind(this)}
        />
    )
  }
}

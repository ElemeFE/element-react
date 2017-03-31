//@flow
import React from 'react';

import { PropTypes } from '../../libs';
import BasePicker from './BasePicker'

import TimeSelectPanel from './panel/TimeSelectPanel'
import type { TimeSelectProps, ValidDateType } from './Types';

export default class TimeSelect extends BasePicker {
  static get propTypes() {
    let result: any = Object.assign({}, {
      start: PropTypes.string,
      end: PropTypes.string,
      step: PropTypes.string,
      minTime: PropTypes.instanceOf(Date),
    },
      BasePicker.propTypes)

    return result;
  }

  static get defaultProps() {
    let result: any = Object.assign({}, BasePicker.defaultProps)
    return result;
  }


  constructor(props: TimeSelectProps) {
    // props, type, state
    super(props, 'timeselect', {});
  }

  isDateValid(value: ValidDateType) {
    return super.isDateValid(value) && TimeSelectPanel.isValid(this.dateToStr(value), this.panelProps())
  }

  panelProps(props: ?TimeSelectProps){
    const ps = props || this.props
    const minTime = this.dateToStr(this.props.minTime)
    return {...ps, minTime}
  }

  pickerPanel(state: any, props: TimeSelectProps) {
    const value = this.dateToStr(state.value)
    return (
      <TimeSelectPanel
        {...this.panelProps(props)}
        value={value}
        onPicked={this.onPicked.bind(this)}
        dateParser={(str) => {
          const r = this.parseDate(str)
          return r
        } }
        />
    )
  }
}

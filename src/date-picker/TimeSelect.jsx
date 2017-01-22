import React from 'react';

import { PropTypes } from '../../libs';
import BasePicker from './BasePicker'

import TimeSelectPanel from './panel/TimeSelectPanel'

export default class TimeSelect extends BasePicker {
  static get propTypes() {
    return Object.assign({
      start: PropTypes.string,
      end: PropTypes.string,
      step: PropTypes.string,
      minTime: PropTypes.instanceOf(Date),
    },
      BasePicker.propTypes)
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps)
  }


  constructor(props) {
    // props, type, state
    super(props, 'timeselect', {});
  }

  isDateValid(value) {
    return super.isDateValid(value) && TimeSelectPanel.isValid(this.dateToStr(value), this.panelProps())
  }

  panelProps(props){
    const ps = props || this.props
    const minTime = this.dateToStr(this.props.minTime)
    return {...ps, minTime}
  }

  pickerPanel(state, props) {
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

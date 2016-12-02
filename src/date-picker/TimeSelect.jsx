import React from 'react';

import { PropTypes } from '../../libs';
import { PLACEMENT_MAP } from './constants'
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

  panelProps(){
    const minTime = this.dateToStr(this.props.minTime)
    return {...this.props, minTime}
  }

  pickerPannel(state, props) {
    const value = this.dateToStr(state.value)

    return (
      <TimeSelectPanel
        {...this.panelProps()}
        value={value}
        onPicked={this.onPicked.bind(this)}
        getPopperRefElement={() => this.refs.reference}
        dateParser={(str) => {
          const r = this.parseDate(str)
          return r
        } }
        popperMixinOption={
          {
            placement: PLACEMENT_MAP[props.align] || PLACEMENT_MAP.left
          }
        } />
    )
  }
}

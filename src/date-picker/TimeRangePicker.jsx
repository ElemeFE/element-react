import React from 'react';

import { debounce } from '../../libs/utils'

import BasePicker from './BasePicker'
import TimeRangePanel from './panel/TimeRangePanel'

import { PLACEMENT_MAP} from './constants'


export default class TimeRangePicker extends BasePicker {
  static get propTypes() {
    return Object.assign({ }, BasePicker.propTypes)
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps)
  }

  constructor(props) {
    super(props, 'timerange', {})
    this._onSelectionChange = debounce(this.onSelectionChange.bind(this), 200)
  }

  onSelectionChange(start, end) {
    this.refs.reference.setSelectionRange(start, end);
    this.refs.reference.focus();
  }

  pickerPannel(state, props) {
    return (
      <TimeRangePanel
        {...props}
        key="time-range-picker-panel"
        currentDates={state.value}
        onCancel={()=>this.setState({pickerVisible: false})}
        onPicked={this.onPicked.bind(this)}
        onSelectRangeChange={this._onSelectionChange}
        getPopperRefElement={() => this.refs.reference}
        popperMixinOption={
          {
            placement: PLACEMENT_MAP[props.align] || PLACEMENT_MAP.left
          }
        } />
    )
  }
}

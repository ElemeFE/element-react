import React from 'react';
import debounce from 'throttle-debounce/debounce';

import BasePicker from './BasePicker'
import TimeRangePanel from './panel/TimeRangePanel'


export default class TimeRangePicker extends BasePicker {
  static get propTypes() {
    return Object.assign({ }, BasePicker.propTypes)
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps)
  }

  constructor(props) {
    super(props, 'timerange', {})
    this._onSelectionChange = debounce(200, this.onSelectionChange.bind(this))
  }

  onSelectionChange(start, end) {
    this.refs.inputRoot.refs.input.setSelectionRange(start, end);
    this.refs.inputRoot.refs.input.focus();
  }

  pickerPanel(state, props) {
    return (
      <TimeRangePanel
        {...props}
        currentDates={state.value}
        onCancel={()=>this.setState({pickerVisible: false})}
        onPicked={this.onPicked.bind(this)}
        onSelectRangeChange={this._onSelectionChange}
        />
    )
  }
}

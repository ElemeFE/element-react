import React from 'react';

import { PropTypes, Component } from '../../../libs';
import { limitRange } from '../utils'
import TimeSpinner from '../basic/TimeSpinner'
import { PopperReactMixin } from '../../../libs/utils'
import Locale from '../../locale'

export default class TimePanel extends Component {

  static get propTypes() {
    return Object.assign({},
      {
        selectableRange: TimeSpinner.propTypes.selectableRange,
        onSelectRangeChange: TimeSpinner.propTypes.onSelectRangeChange
      }, {
        pickerWidth: PropTypes.number,
        currentDate: PropTypes.instanceOf(Date),
        /*
        onPicked: (value, isKeepPannelOpen)=>()
      
        @param value: Date|null
        @param isKeepPannelOpen:boolean, should parent close the pannel
        */
        onPicked: PropTypes.func.isRequired,
        // cancel btn is clicked
        //()=>()
        onCancel: PropTypes.func.isRequired,
        //()=>HtmlElement
        getPopperRefElement: PropTypes.func,//todo: make this dry
        popperMixinOption: PropTypes.object
      })
  }

  static get defaultProps() {
    return {
      popperMixinOption: {}
    }
  }

  constructor(props) {
    super(props)

    const state = {
      format: 'HH:mm:ss',
      currentDate: props.currentDate || Date()//todo: handle update.
    };

    state.hours = state.currentDate.getHours();
    state.minutes = state.currentDate.getMinutes();
    state.seconds = state.currentDate.getSeconds();
    state.isShowSeconds = (state.format || '').indexOf('ss') !== -1

    this.state = state

    //todo: make this dry
    PopperReactMixin.call(this, () => this.refs.root, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));

  }

  // type: string,  one of [hours, minutes, seconds]
  // date: {type: number}
  handleChange(date) {
    const {currentDate} = this.state

    if (date.hours !== undefined) {
      currentDate.setHours(date.hours);
      this.state.hours = currentDate.getHours();
    }

    if (date.minutes !== undefined) {
      currentDate.setMinutes(date.minutes);
      this.state.minutes = currentDate.getMinutes();
    }

    if (date.seconds !== undefined) {
      currentDate.setSeconds(date.seconds);
      this.state.seconds = currentDate.getSeconds();
    }
    this.setState({})
    this.handleConfirm(true);
  }


  handleConfirm(isKeepPannelOpen = false) {
    const {currentDate} = this.state
    const {onPicked, selectableRange} = this.props

    const date = new Date(limitRange(currentDate, selectableRange));
    onPicked(date, isKeepPannelOpen)
  }

  render() {
    const {isShowSeconds, hours, minutes, seconds } = this.state
    const {pickerWidth, onSelectRangeChange, selectableRange} = this.props
    const style = {}
    if (pickerWidth) {
      style.width = `${pickerWidth}px`
    }
    const $t = Locale.t

    return (
      <div
        ref="root"
        style={style}
        className="el-time-panel">
        <div className="el-time-panel__content">
          <TimeSpinner
            ref="spinner"
            onChange={this.handleChange.bind(this)}
            isShowSeconds={isShowSeconds}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            selectableRange={selectableRange}
            onSelectRangeChange={onSelectRangeChange}
            />
        </div>
        <div className="el-time-panel__footer">
          <button
            type="button"
            className="el-time-panel__btn cancel"
            onClick={() => this.props.onCancel()}>{$t('el.datepicker.cancel')}</button>
          <button
            type="button"
            className="el-time-panel__btn confirm"
            onClick={() => this.handleConfirm()}>{$t('el.datepicker.confirm')}</button>
        </div>
      </div>
    );
  }
}
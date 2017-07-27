//@flow
import React from 'react';

import { PropTypes, Component } from '../../../libs';
import { limitRange } from '../utils'
import TimeSpinner from '../basic/TimeSpinner'
import { PopperReactMixin } from '../../../libs/utils'
import Locale from '../../locale'
import type {TimePanelProps} from '../Types';

const mapPropsToState = (props) => {
  const state: any = {
    format: props.format || 'HH:mm:ss',
    currentDate: props.currentDate || Date()
  };
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1
  return state
}

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

  constructor(props: TimePanelProps) {
    super(props)

    this.state = mapPropsToState(props)
    //todo: make this dry
    PopperReactMixin.call(this, () => this.refs.root, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));

  }

  componentWillReceiveProps(nextProps: any) {
    this.setState(mapPropsToState(nextProps))
  }

  // type: string,  one of [hours, minutes, seconds]
  // date: {type: number}
  handleChange(date: {string: number}) {
    const {currentDate} = this.state

    if (date.hours !== undefined) {
      currentDate.setHours(date.hours);
    }

    if (date.minutes !== undefined) {
      currentDate.setMinutes(date.minutes);
    }

    if (date.seconds !== undefined) {
      currentDate.setSeconds(date.seconds);
    }
    this.setState({})
    this.handleConfirm(true);
  }


  handleConfirm(isKeepPannelOpen: boolean = false) {
    const {currentDate} = this.state
    const {onPicked, selectableRange} = this.props

    const date = new Date(limitRange(currentDate, selectableRange, 'HH:mm:ss'));
    onPicked(date, isKeepPannelOpen)
  }

  render() {
    const {isShowSeconds, currentDate } = this.state
    const {onSelectRangeChange, selectableRange} = this.props

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const $t = Locale.t

    return (
      <div
        ref="root"
        className="el-time-panel">
        <div className={this.classNames('el-time-panel__content', { 'has-seconds': isShowSeconds })}>
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

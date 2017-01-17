import React from 'react'

import { PropTypes, Component } from '../../../libs';
import Locale from '../../locale'

import { SELECTION_MODES, toDate, prevMonth, nextMonth } from '../utils'
import { DateTable } from '../basic'
import { PopperReactMixin } from '../../../libs/utils'

const prevYear = (date) => {
  var d = toDate(date)
  d.setFullYear(date.getFullYear() - 1)
  return d
}

const nextYear = (date) => {
  var d = toDate(date)
  d.setFullYear(date.getFullYear() + 1)
  return d
}

const mapPropsToState = (props) => {
  const {value} = props
  let state = {
    rangeState: {
      endDate: null,
      selecting: false,
    }
  }
  if (!value) {
    state = {
      minDate: null,
      maxDate: null,
      date: new Date()
    }
  } else {
    if (value[0] && value[1]) {
      state.minDate = toDate(value[0]);
      state.maxDate = toDate(value[1])
    }
    if (value[0]) {
      state.date = toDate(value[0])
    } else {
      state.date = new Date()
    }
  }

  return state
}

export default class DateRangePanel extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.state = Object.assign(this.state, mapPropsToState(props))
    PopperReactMixin.call(this, () => this.refs.root, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(mapPropsToState(nextProps))
  }

  handleRangePick({minDate, maxDate}, isClose) {
    const {showTime, onPick} = this.props
    this.setState({ minDate, maxDate })
    if (!isClose) return;
    if (!showTime) {
      onPick([minDate, maxDate], false)
    }
  }

  prevYear() {
    const {date} = this.state
    this.setState({
      date: prevYear(date),
    })
  }

  nextYear() {
    const {date} = this.state
    this.setState({
      date: nextYear(date),
    })
  }

  prevMonth() {
    this.setState({
      date: prevMonth(this.state.date)
    })
  }

  nextMonth() {
    this.setState({
      date: nextMonth(this.state.date)
    })
  }

  get rightDate() {
    const newDate = new Date(this.state.date);
    const month = newDate.getMonth();
    newDate.setDate(1);

    if (month === 11) {
      newDate.setFullYear(newDate.getFullYear() + 1);
      newDate.setMonth(0);
    } else {
      newDate.setMonth(month + 1);
    }
    return newDate;
  }

  //todo: wired way to do sth like this? try to come up with a better option
  handleChangeRange({endDate}) {
    const {rangeState, minDate} = this.state
    if (endDate <= minDate) endDate = null

    rangeState.endDate = endDate
    this.setState({
      maxDate: endDate,
    })
  }

  handleShortcutClick(shortcut) {
    shortcut.onClick();
  }

  render() {
    const {shortcuts, showTime, disabledDate} = this.props
    const {date, rangeState, minDate, maxDate} = this.state
    const rightDate = this.rightDate


    const t = Locale.t
    const leftLabel = `${date.getFullYear()} ${t('el.datepicker.year')} ` + t(`el.datepicker.month${date.getMonth() + 1}`)
    const rightLabel = `${date.getFullYear()} ${t('el.datepicker.year')} ` + t(`el.datepicker.month${rightDate.getMonth() + 1}`);


    return (
      <div
        ref="root"
        className={this.classNames('el-picker-panel el-date-range-picker', {
          'has-sidebar': shortcuts,
          'has-time': showTime
        })}
        >
        <div className="el-picker-panel__body-wrapper">
          {
            Array.isArray(shortcuts) && (
              <div className="el-picker-panel__sidebar">
                {
                  shortcuts.map((e, idx) => {
                    return (
                      <button
                        key={idx}
                        type="button"
                        className="el-picker-panel__shortcut"
                        onClick={() => this.handleShortcutClick(e)}>{e.text}</button>
                    )
                  })
                }
              </div>
            )
          }
          <div className="el-picker-panel__body">
            {/* todo: add timer here */}
            <div className="el-picker-panel__content el-date-range-picker__content is-left">
              <div className="el-date-range-picker__header">
                <button
                  type="button"
                  onClick={this.prevYear.bind(this)}
                  className="el-picker-panel__icon-btn el-icon-d-arrow-left"></button>
                <button
                  type="button"
                  onClick={this.prevMonth.bind(this)}
                  className="el-picker-panel__icon-btn el-icon-arrow-left"></button>
                <div>{leftLabel}</div>
              </div>
              <DateTable
                selectionMode={SELECTION_MODES.RANGE}
                date={date}
                value={minDate}
                minDate={minDate}
                maxDate={maxDate}
                rangeState={rangeState}
                disabledDate={disabledDate}
                onChangeRange={this.handleChangeRange.bind(this)}
                onPick={this.handleRangePick.bind(this)}
                />
            </div>
            <div className="el-picker-panel__content el-date-range-picker__content is-right">
              <div className="el-date-range-picker__header">
                <button
                  type="button"
                  onClick={this.nextYear.bind(this)}
                  className="el-picker-panel__icon-btn el-icon-d-arrow-right"></button>
                <button
                  type="button"
                  onClick={this.nextMonth.bind(this)}
                  className="el-picker-panel__icon-btn el-icon-arrow-right"></button>
                <div>{rightLabel}</div>
              </div>
              <DateTable
                selectionMode={SELECTION_MODES.RANGE}
                date={rightDate}
                value={maxDate}
                minDate={minDate}
                maxDate={maxDate}
                rangeState={rangeState}
                disabledDate={disabledDate}
                onChangeRange={this.handleChangeRange.bind(this)}
                onPick={this.handleRangePick.bind(this)}
                />
            </div>
          </div>
        </div>
        {/* todo: add timer footer here */}
      </div>
    )
  }
}


DateRangePanel.propTypes = {
  // user picked date value
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  // ([value1, value2]|null, isKeepPanel)=>()
  onPick: PropTypes.func.isRequired,
  showTime: PropTypes.bool,
  // Array[{text: String, onClick: (picker)=>()}]
  shortcuts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      // ()=>()
      onClick: PropTypes.func.isRequired
    })
  ),
  // (Date)=>bool, if true, disabled
  disabledDate: PropTypes.func,
  //()=>HtmlElement
  getPopperRefElement: PropTypes.func,
  popperMixinOption: PropTypes.object
}

DateRangePanel.defaultProps = {

}
//@flow
import React from 'react'

import { PropTypes } from '../../../libs';
import Locale from '../../locale'

import { SELECTION_MODES, toDate, prevMonth, nextMonth } from '../utils'
import { DateTable } from '../basic'
import type {DateRangePanelProps, Shortcut } from '../Types';
import { PopperBase } from './PopperBase'

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
  const { value } = props
  let state: any = {
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

export default class DateRangePanel extends PopperBase {
  static get propTypes() {
    return Object.assign({
      // user picked date value
      /*
      value: null | [Date, null | false]
      */
      value: PropTypes.any,
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
      firstDayOfWeek: PropTypes.range(0, 6),
      //()=>HtmlElement
      getPopperRefElement: PropTypes.func,
      popperMixinOption: PropTypes.object
    }, PopperBase.propTypes)
  }

  constructor(props: DateRangePanelProps) {
    super(props)

    this.state = {}
    this.state = Object.assign(this.state, mapPropsToState(props))
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState(mapPropsToState(nextProps))
  }

  handleRangePick({ minDate, maxDate }: { minDate: Date, maxDate: Date }, isClose: boolean) {
    const { showTime, onPick } = this.props
    this.setState({ minDate, maxDate })
    if (!isClose) return;
    if (!showTime) {
      onPick([minDate, maxDate], false)
    }
  }

  prevYear() {
    const { date } = this.state
    this.setState({
      date: prevYear(date),
    })
  }

  nextYear() {
    const { date } = this.state
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

  get rightDate(): Date {
    return nextMonth(this.state.date)
  }

  //todo: wired way to do sth like this? try to come up with a better option
  handleChangeRange({ endDate }: { endDate: ?Date }) {
    const { rangeState, minDate } = this.state
    if (endDate <= minDate) endDate = null

    rangeState.endDate = endDate
    this.setState({
      maxDate: endDate,
    })
  }

  handleShortcutClick(shortcut: Shortcut) {
    shortcut.onClick();
  }

  render() {
    const { shortcuts, showTime, disabledDate, firstDayOfWeek } = this.props
    const { date, rangeState, minDate, maxDate } = this.state
    const rightDate = this.rightDate


    const t = Locale.t
    const leftLabel = `${date.getFullYear()} ${t('el.datepicker.year')} ` + t(`el.datepicker.month${date.getMonth() + 1}`)
    const rightLabel = `${rightDate.getFullYear()} ${t('el.datepicker.year')} ` + t(`el.datepicker.month${rightDate.getMonth() + 1}`);


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
                firstDayOfWeek={firstDayOfWeek}
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
                firstDayOfWeek={firstDayOfWeek}
              />
            </div>
          </div>
        </div>
        {/* todo: add timer footer here */}
      </div>
    )
  }
}



DateRangePanel.defaultProps = {

}

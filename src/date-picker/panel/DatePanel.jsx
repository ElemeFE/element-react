import React from 'react'

import { PropTypes, Component } from '../../../libs';
import Locale from '../../locale'

import { SELECTION_MODES, deconstructDate } from '../utils'
import { DateTable, MonthTable, YearTable } from '../basic'
import { PopperReactMixin } from '../../../libs/utils'

const PICKER_VIEWS = {
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date',
}

/*
handle todos:
  handle timepicker inside this picker
*/
export default class DatePanel extends Component {
  constructor(props) {
    super(props)

    let currentView = PICKER_VIEWS.DATE
    switch (props.selectionMode) {
      case SELECTION_MODES.MONTH:
        currentView = PICKER_VIEWS.MONTH; break;
      case SELECTION_MODES.YEAR:
        currentView = PICKER_VIEWS.YEAR; break;
    }

    this.state = {
      currentView,
      date: new Date() // current view's date
    }

    if (props.value) {
      this.state.date = new Date(props.value)
    }

    PopperReactMixin.call(this, () => this.refs.root, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ date: nextProps.value })
  }

  /*
  selectionMode(newVal) {
    if (newVal === 'month') {
      if (this.currentView !== 'year' || this.currentView !== 'month') {
        this.currentView = 'month';
      }
    }
  },
  */
  // start: ------ public methods

  // handleClear() {
  //   this.setState({ date: new Date() })
  //   this.props.onPick(null)//todo: Panel onPick doesnt accept null
  // }

  resetDate() {
    this.date = new Date(this.date);
  }

  showMonthPicker() {
    this.setState({ currentView: PICKER_VIEWS.MONTH })
  }

  showYearPicker() {
    this.setState({ currentView: PICKER_VIEWS.YEAR })
  }

  prevMonth() {
    this.updateState(() => {
      const {date} = this.state
      const {month, year} = deconstructDate(date)

      if (month == 0) {
        date.setFullYear(year - 1)
        date.setMonth(11)
      } else {
        date.setMonth(month - 1)
      }
    })
  }

  nextMonth() {
    this.updateState(() => {
      const {date} = this.state
      const {month, year} = deconstructDate(date)

      if (month == 11) {
        date.setFullYear(year + 1)
        date.setMonth(0)
      } else {
        date.setMonth(month + 1)
      }
    })
  }

  nextYear() {
    this.updateState(() => {
      const {date, currentView} = this.state
      const {year} = deconstructDate(date)

      if (currentView === 'year') {
        date.setFullYear(year + 10)
      } else {
        date.setFullYear(year + 1)
      }
    })
  }

  updateState(cb) {
    cb(this.state)
    this.setState({})
  }

  prevYear() {
    this.updateState(() => {
      const {date, currentView} = this.state
      const {year} = deconstructDate(date)

      if (currentView === 'year') {
        date.setFullYear(year - 10)
      } else {
        date.setFullYear(year - 1)
      }
    })
  }

  handleShortcutClick(shortcut) {
    shortcut.onClick();
  }

  //todo:
  handleTimePick(picker, visible, first) {
    // if (picker) {
    //   let oldDate = new Date(this.date.getTime());
    //   let hour = picker.getHours();
    //   let minute = picker.getMinutes();
    //   let second = picker.getSeconds();
    //   oldDate.setHours(hour);
    //   oldDate.setMinutes(minute);
    //   oldDate.setSeconds(second);
    //   this.date = new Date(oldDate.getTime());
    // }

    // if (!first) {
    //   this.timePickerVisible = visible;
    // }
  }

  handleMonthPick(month) {
    this.updateState(state => {
      const {date} = state
      const {selectionMode} = this.props
      const {year} = deconstructDate(date)

      if (selectionMode !== SELECTION_MODES.MONTH) {
        date.setMonth(month);
        state.currentView = PICKER_VIEWS.DATE
      } else {
        date.setMonth(month)
        date.setFullYear(year)
        this.props.onPick(new Date(year, month, 1))
      }
    })
  }


  handleDatePick(value) {
    this.updateState(state => {
      const {date} = state
      const {selectionMode, showTime, onPick} = this.props
      const pdate = value.date
      if (selectionMode === SELECTION_MODES.DAY) {
        if (!showTime) {
          onPick(new Date(pdate.getTime()))
        }
        date.setTime(pdate.getTime());
      } else if (selectionMode === SELECTION_MODES.WEEK) {
        onPick(pdate)
      }
    })
  }


  handleYearPick(year, close = true) {
    this.updateState(state => {
      const {onPick, selectionMode} = this.props
      const {date} = state

      if (!close) {
        date.setFullYear(year)
      } else {
        date.setFullYear(year)
        if (selectionMode === SELECTION_MODES.YEAR) {
          onPick(new Date(year, 0))
        } else {
          state.currentView = PICKER_VIEWS.MONTH
        }
      }
    })
  }

  changeToNow() {
    const now = new Date()
    this.props.onPick(now)
    this.setState({ date: now })
  }

  confirm() {
    this.props.onPick(new Date(this.state.date))
  }

  yearLabel() {
    const {currentView, date} = this.state
    const {year} = deconstructDate(date)
    const yearTranslation = Locale.t('el.datepicker.year');
    if (currentView === 'year') {
      const startYear = Math.floor(year / 10) * 10;
      if (yearTranslation){
        return startYear + ' ' + yearTranslation + '-' + (startYear + 9) + ' ' + yearTranslation;
      }
      return startYear + ' - ' + (startYear + 9);
    }
    return year + ' ' + yearTranslation;
  }

  // end: ------ public methods
  _pickerContent() {
    const {value, selectionMode, disabledDate, showWeekNumber} = this.props
    const {date} = this.state
    const {currentView} = this.state
    let result = null

    switch (currentView) {
      case PICKER_VIEWS.DATE:
        result = (<DateTable
          onPick={this.handleDatePick.bind(this)}
          date={date}
          value={value}
          selectionMode={selectionMode}
          disabledDate={disabledDate}
          showWeekNumber={showWeekNumber}
          />)

        break;
      case PICKER_VIEWS.YEAR:
        result = (<YearTable
          ref="yearTable"
          value={value}
          date={date}
          onPick={this.handleYearPick.bind(this)}
          disabledDate={disabledDate}
          />)
        break;
      case PICKER_VIEWS.MONTH:
        result = (<MonthTable
          value={value}
          date={date}
          onPick={this.handleMonthPick.bind(this)}
          disabledDate={disabledDate}
          />)
        break;
      default:
        throw new Error('invalid currentView value')
    }

    return result
  }

  render() {
    const {showTime, shortcuts} = this.props
    const {currentView, date} = this.state
    const {month} = deconstructDate(date)
    const t = Locale.t

    //todo: handle v-*
    return (
      <div
        ref="root"
        className={this.classNames('el-picker-panel el-date-picker', {
          'has-sidebar': shortcuts,
          'has-time': showTime
        })}>

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
            {
              showTime && (
                <div className="el-date-picker__time-header">
                  <span className="el-date-picker__editor-wrap">
                    {/*todo: v-model.lazy="visibleDate", this related to showTime, has method(which not implemented yet) linked to it*/}
                    <input
                      placehoder={t('el.datepicker.selectDate')}
                      type="text"
                      className="el-date-picker__editor" />
                  </span>
                  <span className="el-date-picker__editor-wrap">
                    {/*v-model.lazy="visibleTime"*/}
                    <input
                      ref="input"
                      onFocus={() => {
                        //todo:
                        // timePickerVisible = !timePickerVisible
                      } }
                      placeholder={t('el.datepicker.selectTime')}
                      type="text"
                      className="el-date-picker__editor" />

                    {
                      /*
                        <time-picker
                          ref="timepicker"
                          :date="date"
                          :picker-width="pickerWidth"
                          @pick="handleTimePick"
                          :visible="timePickerVisible">
                        </time-picker>
                      */
                    }
                  </span>
                </div>
              )
            }

            {
              currentView !== 'time' && (
                <div className="el-date-picker__header">
                  <button
                    type="button"
                    onClick={this.prevYear.bind(this)}
                    className="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left">
                  </button>
                  {
                    currentView === PICKER_VIEWS.DATE && (
                      <button
                        type="button"
                        onClick={this.prevMonth.bind(this)}
                        className="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left">
                      </button>)
                  }
                  <span
                    onClick={this.showYearPicker.bind(this)}
                    className="el-date-picker__header-label">{this.yearLabel()}</span>
                  {
                    currentView === PICKER_VIEWS.DATE && (
                      <span
                        onClick={this.showMonthPicker.bind(this)}
                        className={
                          this.classNames('el-date-picker__header-label', {
                            active: currentView === 'month'
                          })
                        }
                        >{t(`el.datepicker.month${month + 1}`)}</span>
                    )
                  }
                  <button
                    type="button"
                    onClick={this.nextYear.bind(this)}
                    className="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right">
                  </button>
                  {
                    currentView === PICKER_VIEWS.DATE && (
                      <button
                        type="button"
                        onClick={this.nextMonth.bind(this)}
                        className="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right">
                      </button>
                    )
                  }
                </div>
              )
            }
            <div className="el-picker-panel__content">
              {this._pickerContent()}
            </div>
          </div>
        </div>

        {
          showTime && currentView === PICKER_VIEWS.DATE && (
            <div
              className="el-picker-panel__footer">
              <a
                href="JavaScript:"
                className="el-picker-panel__link-btn"
                onClick={this.changeToNow.bind(this)}>{t('el.datepicker.now')}</a>
              <button
                type="button"
                className="el-picker-panel__btn"
                onClick={() => this.confirm()}>{t('el.datepicker.confirm')}</button>
            </div>
          )
        }
      </div>
    );
  }
}

DatePanel.propTypes = {
  // user picked date value
  value: PropTypes.instanceOf(Date),
  // todo:
  onPick: PropTypes.func.isRequired,
  showTime: PropTypes.bool,
  showWeekNumber: PropTypes.bool,
  format: PropTypes.string,
  // Array[{text: String, onClick: (picker)=>()}]
  shortcuts: PropTypes.arrayOf(
    React.PropTypes.shape({
      text: PropTypes.string.isRequired,
      // ()=>()
      onClick: PropTypes.func.isRequired
    })
  ),
  selectionMode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(e => SELECTION_MODES[e])),
  // (Date)=>bool, if true, disabled
  disabledDate: PropTypes.func,

  //()=>HtmlElement
  getPopperRefElement: PropTypes.func,
  popperMixinOption: PropTypes.object
}

DatePanel.defaultProps = {
  showTime: false,
  timePickerVisible: false,
  selectionMode: SELECTION_MODES.DAY,
}
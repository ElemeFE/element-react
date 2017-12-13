import React from 'react'
import ReactDOM from 'react-dom'

import { PropTypes } from '../../../libs'
import Locale from '../../locale'
import Input from '../../input'
import TimePanel from './TimePanel'
import {MountBody} from '../MountBody'

import { SELECTION_MODES, deconstructDate, formatDate, parseDate, toDate } from '../utils'
import { DateTable, MonthTable, YearTable } from '../basic'
import { PopperBase } from './PopperBase'
import {PLACEMENT_MAP} from '../constants'


const PICKER_VIEWS = {
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date',
}

export default class DatePanel extends PopperBase {

  static get propTypes() {

    return Object.assign({
      // user picked date value
      // value: Date | null
      value: PropTypes.instanceOf(Date),
      // (Date)=>void
      onPick: PropTypes.func.isRequired,
      isShowTime: PropTypes.bool,
      showWeekNumber: PropTypes.bool,
      format: PropTypes.string,
      // Array[{text: String, onClick: (picker)=>()}]
      shortcuts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          // ()=>()
          onClick: PropTypes.func.isRequired
        })
      ),
      selectionMode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(e => SELECTION_MODES[e])),
      // (Date)=>bool, if true, disabled
      disabledDate: PropTypes.func,
      firstDayOfWeek: PropTypes.range(0, 6),

    }, PopperBase.propTypes)
  }

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
      timePickerVisible: false,
      pickerWidth: 0,
      date: new Date() // current view's date
    }

    if (props.value) {
      this.state.date = new Date(props.value)
    }
  }

  componentWillReceiveProps(nextProps) {
    let date = new Date()
    if (nextProps.value){
      date = toDate(nextProps.value)
    }
    
    this.setState({ date })
  }

  resetDate() {
    this.date = new Date(this.date)
  }

  showMonthPicker() {
    this.setState({ currentView: PICKER_VIEWS.MONTH })
  }

  showYearPicker() {
    this.setState({ currentView: PICKER_VIEWS.YEAR })
  }

  prevMonth() {
    this.updateState(() => {
      const { date } = this.state
      const { month, year } = deconstructDate(date)

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
      const { date } = this.state
      const { month, year } = deconstructDate(date)

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
      const { date, currentView } = this.state
      const { year } = deconstructDate(date)

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
      const { date, currentView } = this.state
      const { year } = deconstructDate(date)

      if (currentView === 'year') {
        date.setFullYear(year - 10)
      } else {
        date.setFullYear(year - 1)
      }
    })
  }

  handleShortcutClick(shortcut) {
    shortcut.onClick()
  }

  handleTimePick(pickedDate, isKeepPanel) {
    this.updateState(state=>{
      if (pickedDate) {
        let oldDate = state.date
        oldDate.setHours(pickedDate.getHours())
        oldDate.setMinutes(pickedDate.getMinutes())
        oldDate.setSeconds(pickedDate.getSeconds())
      }
      state.timePickerVisible = isKeepPanel
    })
  }

  handleMonthPick(month) {
    this.updateState(state => {
      const { date } = state
      const { selectionMode } = this.props
      const { year } = deconstructDate(date)

      if (selectionMode !== SELECTION_MODES.MONTH) {
        date.setMonth(month)
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
      const { date } = state
      const { selectionMode, isShowTime, onPick } = this.props
      const pdate = value.date
      if (selectionMode === SELECTION_MODES.DAY) {
        if (!isShowTime) {
          onPick(new Date(pdate.getTime()))
        }
        date.setTime(pdate.getTime())
      } else if (selectionMode === SELECTION_MODES.WEEK) {
        onPick(pdate)
      }
    })
  }


  handleYearPick(year) {
    this.updateState(state => {
      const { onPick, selectionMode } = this.props
      const { date } = state
      date.setFullYear(year)
      if (selectionMode === SELECTION_MODES.YEAR) {
        onPick(new Date(year, 0))
      } else {
        state.currentView = PICKER_VIEWS.MONTH
      }
    })
  }

  changeToNow() {
    const now = new Date()
    this.props.onPick(now)
    this.setState({ date: now })
  }

  confirm() {
    this.props.onPick(new Date(this.state.date.getTime()))
  }

  resetView() {
    let {selectionMode} = this.props

    this.updateState(state=>{
      if (selectionMode === SELECTION_MODES.MONTH) {
        state.currentView = PICKER_VIEWS.MONTH
      } else if (selectionMode === SELECTION_MODES.YEAR) {
        state.currentView = PICKER_VIEWS.YEAR
      } else {
        state.currentView = PICKER_VIEWS.DATE
      }
    })
  }

  yearLabel() {
    const { currentView, date } = this.state
    const { year } = deconstructDate(date)
    const yearTranslation = Locale.t('el.datepicker.year')
    if (currentView === 'year') {
      const startYear = Math.floor(year / 10) * 10
      if (yearTranslation) {
        return startYear + ' ' + yearTranslation + '-' + (startYear + 9) + ' ' + yearTranslation
      }
      return startYear + ' - ' + (startYear + 9)
    }
    return year + ' ' + yearTranslation
  }

  get visibleTime(){
    return formatDate(this.state.date, this.timeFormat)
  }

  set visibleTime(val){
    if (val) {
      const ndate = parseDate(val, this.timeFormat)
      let {date} = this.state
      if (ndate) {
        ndate.setFullYear(date.getFullYear())
        ndate.setMonth(date.getMonth())
        ndate.setDate(date.getDate())
        this.setState({date: ndate, timePickerVisible: false})
      }
    }
  }


  get visibleDate(){
    return formatDate(this.state.date, this.dateFormat)
  }
  
  set visibleDate(val){
    const ndate = parseDate(val, this.dateFormat)
    if (!ndate) {
      return
    }
    let {disabledDate } = this.props
    let {date} = this.state
    if (typeof disabledDate === 'function' && disabledDate(ndate)) {
      return
    }
    ndate.setHours(date.getHours())
    ndate.setMinutes(date.getMinutes())
    ndate.setSeconds(date.getSeconds())
    this.setState({date: ndate})
    this.resetView()
  }

  get timeFormat() {
    let {format} = this.props
    if (format && format.indexOf('ss') === -1) {
      return 'HH:mm'
    } else {
      return 'HH:mm:ss'
    }
  }

  get dateFormat(){
    if (this.props.format) return this.props.format.replace('HH:mm', '').replace(':ss', '').trim()
    else return 'yyyy-MM-dd'
  }


  // end: ------ public methods
  _pickerContent() {
    const { value, selectionMode, disabledDate, showWeekNumber } = this.props
    const { date } = this.state
    const { currentView } = this.state
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

        break
      case PICKER_VIEWS.YEAR:
        result = (<YearTable
          ref="yearTable"
          value={value}
          date={date}
          onPick={this.handleYearPick.bind(this)}
          disabledDate={disabledDate}
        />)
        break
      case PICKER_VIEWS.MONTH:
        result = (<MonthTable
          value={value}
          date={date}
          onPick={this.handleMonthPick.bind(this)}
          disabledDate={disabledDate}
        />)
        break
      default:
        throw new Error('invalid currentView value')
    }

    return result
  }

  render() {
    const { isShowTime, shortcuts } = this.props
    const { currentView, date, pickerWidth, timePickerVisible } = this.state
    const { month } = deconstructDate(date)
    const t = Locale.t

    return (
      <div
        ref="root"
        className={this.classNames('el-picker-panel el-date-picker', {
          'has-sidebar': shortcuts,
          'has-time': isShowTime
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
            {
              isShowTime && (
                <div className="el-date-picker__time-header">
                  <span className="el-date-picker__editor-wrap">
                    <Input 
                      placehoder={t('el.datepicker.selectDate')}
                      value={this.visibleDate}
                      size="small"
                      onChange={date=>this.visibleDate=date}
                      />
                  </span>
                  <span className="el-date-picker__editor-wrap">
                    <Input 
                      ref="input"
                      onFocus={()=> this.setState({timePickerVisible: !this.state.timePickerVisible})}
                      placehoder={t('el.datepicker.selectTime')}
                      value={this.visibleTime}
                      size="small"
                      onChange={date=>this.visibleDate=date}
                      />
                    {
                      timePickerVisible && (
                        <MountBody>
                          <TimePanel
                            ref="timepicker"
                            currentDate={new Date(date.getTime()) /* should i dont mutate date directly here ? */}
                            pickerWidth={pickerWidth 
                              /* 
                              todo: pickerWidth? in original elmenent repo, this width is set by getting input with using getClientRect() method  
                              but it seems work even though I purposely leave this logic unimplemented. To be honest it would require some hack to get 
                              this actually done, since I can't do any setState method on componentDidUpdate method. 
                              DateRangePicker has same issue
                              */
                            }
                            onPicked={this.handleTimePick.bind(this)}
                            format={this.timeFormat}
                            getPopperRefElement={() => ReactDOM.findDOMNode(this.refs.input)}
                            popperMixinOption={
                              {
                                placement: PLACEMENT_MAP[this.props.align] || PLACEMENT_MAP.left
                              }
                            }
                            onCancel={()=> this.setState({timePickerVisible: false})}
                            />
                        </MountBody>
                      )
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
          isShowTime && currentView === PICKER_VIEWS.DATE && (
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
    )
  }
}

DatePanel.defaultProps = {
  isShowTime: false,
  selectionMode: SELECTION_MODES.DAY,
}

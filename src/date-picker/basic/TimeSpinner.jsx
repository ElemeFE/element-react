import React from 'react';

import { PropTypes, Component } from '../../../libs';
import { debounce } from '../../../libs/utils';
import { getRangeHours } from '../utils'

function withIndex(arr) {
  return arr.map((e, i) => (e, i))
}

function range(end) {
  let r = []
  for (let i = 0; i < end; i++) {
    r.push(i)
  }
  return r
}

const isNumber = (value) => (typeof value === 'number')
const validateHour = (value) => (isNumber(value) && value >= 0 && value <= 23)
const validateMinOrSec = (value) => (isNumber(value) && value >= 0 && value <= 59)

function propsToState(props) {
  const {hours, minutes, seconds, selectableRange} = props
  const state = {}
  const setOnValid = (isValid, cb) => isValid && cb(state)
  setOnValid(validateHour(hours), (state) => state.hours = hours)
  setOnValid(validateMinOrSec(minutes), (state) => state.minutes = minutes)
  setOnValid(validateMinOrSec(seconds), (state) => state.seconds = seconds)
  state.hoursList = getRangeHours(selectableRange)
  state.minutesLisit = withIndex(range(60))
  state.secondsList = withIndex(range(60))
  return state
}

export default class TimeSpinner extends Component {
  static get propTypes() {
    return {
      hours: PropTypes.number,
      minutes: PropTypes.number,
      seconds: PropTypes.number,
      isShowSeconds: PropTypes.bool,
      //[[datefrom, dateend]...]
      selectableRange: PropTypes.arrayOf(PropTypes.arrayOf(React.PropTypes.instanceOf(Date))).isRequired,
      /*
      type: one of [hours, minutes, seconds]
    
      onChange: ({type})=>()
      */
      onChange: PropTypes.func.isRequired,
      onSelectRangeChange: PropTypes.func.isRequired
    }

  }

  static get defaultProps() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isShowSeconds: true
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    Object.assign(this.state, propsToState(props))
    this.ajustScrollTop = this._ajustScrollTop.bind(this)
    this.handleScroll = debounce(this._handleScroll.bind(this), 20)
  }

  componentDidMount() {
    this.ajustScrollTop(this.state)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(propsToState(nextProps), () => {
      this.ajustScrollTop(this.state)
    })
  }

  emitSelectRange(type) {
    const {onSelectRangeChange} = this.props
    if (type === 'hours') {
      onSelectRangeChange(0, 3)
    } else if (type === 'minutes') {
      onSelectRangeChange(3, 5)
    } else if (type === 'seconds') {
      onSelectRangeChange(6, 9)
    }
  }

  _handleScroll(type) {
    const value = Math.min(Math.floor((this.refs[type].scrollTop - 80) / 32 + 3), 59);
    this.handleChange(type, value)
  }

  // type: hours, minutes, seconds
  handleChange(type, value, disabled) {
    if (disabled) return
    this.state[type] = value
    const changed = {}
    changed[type] = value
    this.setState({}, () => {
      this.ajustScrollTop(this.state)
    })
    this.props.onChange(changed)
  }

  _ajustScrollTop({hours, minutes, seconds}) {
    if (hours != null) {
      this.refs.hours.scrollTop = Math.max(0, (hours - 2.5) * 32 + 80);
    }
    if (minutes != null) {
      this.refs.minutes.scrollTop = Math.max(0, (minutes - 2.5) * 32 + 80);
    }
    if (seconds != null) {
      this.refs.seconds.scrollTop = Math.max(0, (seconds - 2.5) * 32 + 80);
    }
  }

  render() {
    const {hoursList, minutesLisit, secondsList, hours, minutes, seconds} = this.state
    const {isShowSeconds} = this.props

    return (
      <div className={this.classNames('el-time-spinner', {'has-seconds': isShowSeconds})}>
        <div
          onMouseEnter={() => this.emitSelectRange('hours')}
          onWheel={() => this.handleScroll('hours')}
          className="el-time-spinner__wrapper"
          ref="hours">
          <ul className="el-time-spinner__list">
            {
              hoursList.map((disabled, idx) => {

                return (
                  <li
                    key={idx}
                    onClick={() => this.handleChange('hours', idx, disabled)}
                    className={this.classNames('el-time-spinner__item', {
                      'active': idx === hours,
                      'disabled': disabled
                    })}
                    >{idx}</li>)
              })
            }
          </ul>
        </div>
        <div
          onMouseEnter={() => this.emitSelectRange('minutes')}
          onWheel={() => this.handleScroll('minutes')}
          className="el-time-spinner__wrapper"
          ref="minutes">
          <ul className="el-time-spinner__list">
            {
              minutesLisit.map((disabled, idx) => {
                return (
                  <li
                    key={idx}
                    onClick={() => this.handleChange('minutes', idx)}
                    className={this.classNames('el-time-spinner__item', {
                      'active': idx === minutes,
                    })}
                    >{idx}</li>
                )
              })
            }
          </ul>
        </div>
        {
          isShowSeconds && (
            <div
              onMouseEnter={() => this.emitSelectRange('seconds')}
              onWheel={() => this.handleScroll('seconds')}
              className="el-time-spinner__wrapper"
              ref="seconds">
              <ul className="el-time-spinner__list">
                {
                  secondsList.map((disabled, idx) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => this.handleChange('seconds', idx)}
                        className={this.classNames('el-time-spinner__item', {
                          'active': idx === seconds,
                        })}
                        >{idx}</li>
                    )
                  })
                }
              </ul>
            </div>
          )
        }
      </div>
    );
  }
}
//@flow
import React from 'react';

import { PropTypes } from '../../../libs';
import { scrollIntoView } from '../../../libs/utils/dom';

import { Scrollbar } from '../../scrollbar'
import type {TimeSelectPanelProps } from '../Types';
import { PopperBase } from './PopperBase'

export default class TimeSelectPanel extends PopperBase {

  static get propTypes() {
    return Object.assign({
      start: PropTypes.string,
      end: PropTypes.string,
      step: PropTypes.string,
      minTime: PropTypes.string,
      maxTime: PropTypes.string,
      value: PropTypes.string,
      onPicked: PropTypes.func,
      //(string)=>date
      dateParser: PropTypes.func.isRequired,
      //()=>HtmlElement
      getPopperRefElement: PropTypes.func,
      popperMixinOption: PropTypes.object
    }, PopperBase.propTypes)
  }

  constructor(props: TimeSelectPanelProps) {
    super(props);
  }

  handleClick(item: any) {
    const { onPicked, dateParser } = this.props
    if (!item.disabled) {
      onPicked(dateParser(item.value));
    }
  }

  items() {
    return TimeSelectPanel.items(this.props)
  }

  scrollToOption(className: string = 'selected') {
    const menu = this.refs.root.querySelector('.el-picker-panel__content');
    scrollIntoView(menu, menu.getElementsByClassName(className)[0]);
  }

  componentDidMount() {
    this.scrollToOption()
  }

  componentWillReceiveProps(nextProps: any) {
    clearTimeout(this._timer)
    if (nextProps.value !== this.props.value) {
      this._timer = setTimeout(() => this.scrollToOption(), 0)
    }
  }

  render() {
    const { value } = this.props

    return (
      <div
        ref="root"
        className="el-picker-panel time-select">
        <Scrollbar wrapClass="el-picker-panel__content" noresize={true}>
          {
            this.items().map((item, idx) => {
              return (
                <div key={idx}
                  className={this.classNames('time-select-item',
                    { selected: value === item.value, disabled: item.disabled }
                  )}
                  disabled={item.disabled}
                  onClick={() => this.handleClick(item)}>{item.value}</div>)
            })
          }
        </Scrollbar>
      </div>
    )
  }
}

TimeSelectPanel.isValid = (value, { start, end, step, minTime, maxTime }) => {
  const items = TimeSelectPanel.items({ start, end, step, minTime, maxTime })
  return !!items.filter(e => !e.disabled).find(e => e.value === value)
}

TimeSelectPanel.items = ({ start, end, step, minTime, maxTime }) => {
  const result = [];

  if (start && end && step) {
    let current = start;
    while (compareTime(current, end) <= 0) {
      result.push({
        value: current,
        disabled: compareTime(current, minTime || '-1:-1') <= 0 || compareTime(current, maxTime || '100:100') >= 0
      });
      current = nextTime(current, step);
    }
  }
  return result;
}

TimeSelectPanel.defaultProps = {
  start: '09:00',
  end: '18:00',
  step: '00:30',
  minTime: '',
  onPicked() { },
  popperMixinOption: {},
};


const parseTime = function (time) {
  const values = (time || '').split(':');
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10);
    const minutes = parseInt(values[1], 10);

    return {
      hours,
      minutes
    };
  }
  /* istanbul ignore next */
  return null;
};

const compareTime = function (time1, time2) {
  const value1: any = parseTime(time1);
  const value2: any = parseTime(time2);

  const minutes1 = value1.minutes + value1.hours * 60;
  const minutes2 = value2.minutes + value2.hours * 60;

  if (minutes1 === minutes2) {
    return 0;
  }

  return minutes1 > minutes2 ? 1 : -1;
};


const formatTime = function (time) {
  return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes);
};

const nextTime = function (time, step) {
  const timeValue: any = parseTime(time);
  const stepValue: any = parseTime(step);

  const next: any = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };

  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;

  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;

  return formatTime(next);
};

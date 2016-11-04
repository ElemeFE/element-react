import React from 'react';

import { PropTypes, Component } from '../../../libs';
import {PopperReactMixin} from '../../../libs/utils'

class TimeSelectPanel extends Component {
  constructor(props) {
    super(props);
    //todo: fix me
    PopperReactMixin.call(this, ()=>this.refs.root, this.props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
  }

  handleClick(item) {
    if (!item.disabled) {
      this.props.onPicked(item.value);
    }
  }

  items() {
    const {start, end, step, minTime} = this.props
    const result = [];

    if (start && end && step) {
      let current = start;
      while (compareTime(current, end) <= 0) {
        result.push({
          value: current,
          disabled: compareTime(current, minTime || '00:00') <= 0

        });
        current = nextTime(current, step);
      }
    }

    return result;
  }

  render() {
    const {value} = this.props
    
    return (
      <div
        ref="root"
        className="el-picker-panel time-select">
        <div className="el-picker-panel__content">
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
        </div>
      </div>
    )
  }
}

TimeSelectPanel.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  step: PropTypes.string,
  minTime: PropTypes.string,
  value: PropTypes.string,
  onPicked: PropTypes.func,
  //()=>HtmlElement
  getPopperRefElement: PropTypes.func,
  popperMixinOption: PropTypes.object
};

TimeSelectPanel.defaultProps = {
  start: '09:00',
  end: '18:00',
  step: '00:30',
  minTime: '',
  onPicked() { },
  popperMixinOption: {},
};


const parseTime = function (time) {
  const values = ('' || time).split(':');
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
  const value1 = parseTime(time1);
  const value2 = parseTime(time2);

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
  const timeValue = parseTime(time);
  const stepValue = parseTime(step);

  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };

  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;

  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;

  return formatTime(next);
};

export default TimeSelectPanel;



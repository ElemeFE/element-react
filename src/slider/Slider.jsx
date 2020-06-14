/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

import InputNumber from '../input-number';
import SliderButton from './Button';

type Value = number | Array<number>;

type State = {
  firstValue: number,
  secondValue: number,
  draggingValue: Value,
  precision: number,
  inputValue: number
}

export default class Slider extends Component {
  static getDerivedStateFromProps(props: Object, state: State): State {
    const { range, value, min, max, step } = props;

    const nextValue = state.draggingValue;

    if (range) {
      if (Array.isArray(nextValue)) {
        state.firstValue = Math.max(min, nextValue[0]);
        state.secondValue = Math.min(max, nextValue[1]);
      } else {
        state.firstValue = min;
        state.secondValue = max;
      }

      state.draggingValue = [state.firstValue, state.secondValue];
    } else {
      state.firstValue = Slider.getInitValue(nextValue, props);
      state.draggingValue = state.firstValue;
    }

    const precisions = [min, max, step].map(item => {
      const decimal = ('' + item).split('.')[1];
      return decimal ? decimal.length : 0;
    });

    state.precision = Math.max.apply(null, precisions);
    state.inputValue = state.inputValue || state.firstValue;

    return state;
  }

  static getInitValue(value: Value, { min, max }: Object): number {
    let initValue = value;
    if (typeof value !== 'number' || isNaN(value)) {
      initValue = min;
    } else {
      initValue = Math.min(max, Math.max(min, value));
    }
    return initValue;
  }

  state: State = {
    firstValue: 0,
    secondValue: 0,
    draggingValue: this.props.value,
    precision: 0,
    inputValue: 0
  };

  slider: Function = React.createRef();
  button1: Function = React.createRef();
  button2: Function = React.createRef();

  get dragging(): boolean {
    return this.button1.current && this.button1.current.state.dragging
      || this.button2.current && this.button2.current.state.dragging;
  }

  getChildContext(): Object {
    return {
      component: this
    };
  }

  setValues(state: Object): void {
    const { range, min, max, triggerOnDragging = false, onChange } = this.props;
    const states = { ...this.state, ...state };
    const { firstValue, secondValue } = states;
    let { inputValue } = states;
    let changes;

    if (range) {
      if (secondValue < min) {
        changes = [min, min];
      } else if (firstValue > max) {
        changes = [max, max];
      } else if (firstValue < min) {
        changes = [min, secondValue];
      } else if (secondValue > max) {
        changes = [firstValue, max];
      } else {
        changes = [Math.min(firstValue, secondValue), Math.max(firstValue, secondValue)];
      }
    } else if (typeof firstValue === 'number' && !isNaN(firstValue)) {
      const initValue = Slider.getInitValue(firstValue, this.props);
      if (initValue < min) {
        changes = min;
      } else if (initValue > max) {
        changes = max;
      } else {
        changes = firstValue;
        inputValue = changes;
      }
    }

    this.setState({ firstValue, secondValue, inputValue, draggingValue: changes });

    if (typeof changes !== 'undefined' && onChange && !(Number(triggerOnDragging) ^ Number(this.dragging))) {
      onChange(changes);
    }
  }

  setPosition(percent: number): void {
    const { range, min, max } = this.props;
    const { firstValue, secondValue } = this.state;

    const targetValue = min + percent * (max - min) / 100;

    if (!range) {
      this.button1 && this.button1.current.setPosition(percent);
      return;
    }

    let button;

    if (Math.abs(Math.min(firstValue, secondValue) - targetValue) < Math.abs(Math.max(firstValue, secondValue) - targetValue)) {
      button = firstValue < secondValue ? 'button1' : 'button2';
    } else {
      button = firstValue > secondValue ? 'button1' : 'button2';
    }

    this[button] && this[button].current.setPosition(percent);
  }

  onSliderClick(event: SyntheticMouseEvent<HTMLDivElement>): void {
    const { disabled, vertical } = this.props;
    if (disabled || this.dragging || !this.slider.current) return;

    if (vertical) {
      const sliderOffsetBottom = this.slider.current.getBoundingClientRect().bottom;
      this.setPosition((sliderOffsetBottom - event.clientY) / this.sliderSize() * 100);
    } else {
      const sliderOffsetLeft = this.slider.current.getBoundingClientRect().left;
      this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderSize() * 100);
    }

    this.setValues(this.state);
  }

  onInputValueChanged(value: number): void {
    this.setValues({
      inputValue: value || 0,
      firstValue: value || 0
    });
  }

  /* Computed Methods */

  sliderSize(): number {
    const {vertical} = this.props;
    if (!this.slider.current) return 0;
    return parseInt(vertical ? this.slider.current.offsetHeight : this.slider.current.offsetWidth, 10);
  }

  stops(): Array<number> {
    const { range, min, max, step } = this.props;
    const { firstValue, secondValue } = this.state;

    const stopCount = (max - min) / step;
    const stepWidth = 100 * step / (max - min);
    const result = [];

    for (let i = 1; i < stopCount; i++) {
      result.push(i * stepWidth);
    }

    if (range) {
      return result.filter(step => {
        return step < 100 * (Math.min(firstValue, secondValue) - min) / (max - min) ||
          step > 100 * (Math.max(firstValue, secondValue) - min) / (max - min);
      });
    } else {
      return result.filter(step => step > 100 * (firstValue - min) / (max - min));
    }
  }

  runwayStyle(): Object {
    const { vertical, height } = this.props;
    return vertical ? { height } : {};
  }

  barStyle(): Object {
    const { vertical } = this.props;
    return vertical
      ? {
        height: this.barSize(),
        bottom: this.barStart()
      }
      : {
        width: this.barSize(),
        left: this.barStart()
      };
  }

  barSize(): string {
    const { firstValue, secondValue} = this.state;
    const { range, max, min } = this.props;
    return range
      ? `${100 * (Math.max(firstValue, secondValue) - Math.min(firstValue, secondValue)) / (max - min)}%`
      : `${100 * (firstValue - min) / (max - min)}%`;
  }

  barStart(): string {
    const { firstValue, secondValue} = this.state;
    const { range, max, min } = this.props;
    return range
      ? `${100 * (Math.min(firstValue, secondValue) - min) / (max - min)}%`
      : '0%';
  }

  render(): React.DOM {
    const { vertical, showInput, showStops, showInputControls, range, step, disabled, min, max } = this.props;
    const { inputValue, firstValue, secondValue } = this.state;

    return (
      <div className={this.className('el-slider', {
        'is-vertical': vertical,
        'el-slider--with-input': showInput
      })}>
        {
          showInput && !range && (
            <InputNumber
              ref="input"
              className="el-slider__input"
              defaultValue={inputValue}
              value={firstValue}
              step={step}
              disabled={disabled}
              controls={showInputControls}
              min={min}
              max={max}
              size="small"
              onChange={this.onInputValueChanged.bind(this)}
            />
          )
        }
        <div
          ref={this.slider}
          style={this.runwayStyle()}
          className={this.classNames('el-slider__runway', {
            'show-input': showInput,
            'disabled': disabled
          })}
          onClick={this.onSliderClick.bind(this)}
        >
          <div
            className="el-slider__bar"
            style={this.barStyle()}>
          </div>
          <SliderButton
            ref={this.button1}
            vertical={vertical} value={firstValue}
            onChange={(v) => this.setValues({ firstValue: v })}
          />
          {
            range && (
              <SliderButton
                ref={this.button2}
                vertical={vertical} value={secondValue}
                onChange={(v) => this.setValues({ secondValue: v })}
              />
            )
          }
          {
            showStops && this.stops().map((item, index) => (
              <div
                key={index}
                className="el-slider__stop"
                style={vertical ? { 'bottom': item + '%' } : { 'left': item + '%' }}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

Slider.childContextTypes = {
  component: PropTypes.any
};

Slider.propTypes = {
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  showInput: PropTypes.bool,
  showInputControls: PropTypes.bool,
  showTooltip: PropTypes.bool,
  showStops: PropTypes.bool,
  disabled: PropTypes.bool,
  range: PropTypes.bool,
  vertical: PropTypes.bool,
  height: PropTypes.string,
  formatTooltip: PropTypes.func,
  onChange: PropTypes.func,
  triggerOnDragging: PropTypes.bool
};

Slider.defaultProps = {
  showTooltip: true,
  showInputControls: true,
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  triggerOnDragging: false
};

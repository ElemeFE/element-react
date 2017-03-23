/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

import InputNumber from '../input-number';
import SliderButton from './Button';

type State = {
  firstValue: number,
  secondValue: number,
  oldValue: number | Array<number>,
  precision: number,
  inputValue: number,
  dragging: boolean,
}

export default class Slider extends Component {
  state: State;

  static defaultProps = {
    showInputControls: true,
    min: 0,
    max: 100,
    step: 1,
    value: 0
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      precision: 0,
      inputValue: 0,
      dragging: false
    }
  }

  getChildContext(): Object {
    return {
      component: this
    };
  }

  componentWillMount(): void {
    const { range, value, min, max, step } = this.props;
    let { firstValue, secondValue, oldValue, inputValue, precision } = this.state;

    if (range) {
      if (Array.isArray(value)) {
        firstValue = Math.max(min, value[0]);
        secondValue = Math.min(max, value[1]);
      } else {
        firstValue = min;
        secondValue = max;
      }

      oldValue = [firstValue, secondValue];
    } else {
      if (typeof value !== 'number' || isNaN(value)) {
        firstValue = min;
      } else {
        firstValue = Math.min(max, Math.max(min, value));
      }

      oldValue = firstValue;
    }

    let precisions = [min, max, step].map(item => {
      let decimal = ('' + item).split('.')[1];
      return decimal ? decimal.length : 0;
    });

    precision = Math.max.apply(null, precisions);
    inputValue = inputValue || firstValue;

    this.setState({ firstValue, secondValue, oldValue, inputValue, precision });
  }

  componentWillUpdate(props: Object, state: State): void {
    if (props.min != this.props.min || props.max != this.props.max) {
      this.setValues();
    }

    if (props.value != this.props.value) {
      const { oldValue } = this.state;
      if (this.state.dragging || Array.isArray(this.props.value) && Array.isArray(props.value) && Array.isArray(oldValue) && this.props.value.every((item, index) => item === oldValue[index])) {
        return;
      }

      this.setValues();
    }

    if (state.firstValue != this.state.firstValue) {
      if (this.props.range) {
        this.setState({
          inputValue: [this.minValue(), this.maxValue()]
        });
      } else {
        this.setState({
          inputValue: this.state.firstValue
        });
      }
    }

    if (state.secondValue != this.state.secondValue) {
      if (this.props.range) {
        this.setState({
          inputValue: [this.minValue(), this.maxValue()]
        });
      }
    }
  }

  valueChanged(): boolean {
    const { range, value } = this.props;
    const { oldValue } = this.state;

    if (range && Array.isArray(oldValue)) {
      return ![this.minValue(), this.maxValue()]
        .every((item, index) => item === oldValue[index]);
    } else {
      return value !== oldValue;
    }
  }

  setValues(): void {
    const { range, value, min, max } = this.props;
    let { firstValue, secondValue, oldValue, inputValue } = this.state;

    if (range && Array.isArray(value)) {
      if (value[1] < min) {
        inputValue = [min, min];
      } else if (value[0] > max) {
        inputValue = [max, max];
      } else if (value[0] < min) {
        inputValue = [min, value[1]];
      } else if (value[1] > max) {
        inputValue = [value[0], max];
      } else {
        firstValue = value[0];
        secondValue = value[1];

        if (this.valueChanged()) {
          this.onValueChanged([this.minValue(), this.maxValue()]);

          oldValue = value.slice();
        }
      }
    } else if (!range && typeof value === 'number' && !isNaN(value)) {
      if (value < min) {
        inputValue = min;
      } else if (value > max) {
        inputValue = max;
      } else {
        firstValue = value;

        if (this.valueChanged()) {
          this.onValueChanged(value);

          oldValue = value;
        }
      }
    }

    this.forceUpdate();
  }

  setPosition(percent: number): void {
    const { range, min, max } = this.props;
    const { firstValue, secondValue } = this.state;

    const targetValue = min + percent * (max - min) / 100;

    if (!range) {
      this.refs.button1.setPosition(percent); return;
    }

    let button;

    if (Math.abs(this.minValue() - targetValue) < Math.abs(this.maxValue() - targetValue)) {
      button = firstValue < secondValue ? 'button1' : 'button2';
    } else {
      button = firstValue > secondValue ? 'button1' : 'button2';
    }

    this.refs[button].setPosition(percent);
  }

  onSliderClick(event: SyntheticMouseEvent): void {
    if (this.props.disabled || this.state.dragging) return;

    const sliderOffsetLeft = this.refs.slider.getBoundingClientRect().left;

    this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderWidth() * 100);
  }

  /* Watched Methods */
  onValueChanged(val: number | Array<number>): void {
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  }

  onInputValueChanged(e: number): void {
    this.setState({
      inputValue: e,
      firstValue: e
    });
  }

  onFirstValueChange(e: number): void {
    this.setState({
      firstValue: e
    });
  }

  onSecondValueChange(e: number): void {
    this.setState({
      secondValue: e
    });
  }

  onDraggingChanged(val: boolean): void {
    if (!val) {
      this.setValues();
    }
  }

  /* Computed Methods */

  sliderWidth(): number {
    return parseInt(this.refs.slider.offsetWidth, 10);
  }

  stops(): Array<number> {
    const { range, min, max, step } = this.props;
    const { firstValue } = this.state;

    const stopCount = (max - min) / step;
    const stepWidth = 100 * step / (max - min);
    const result = [];

    for (let i = 1; i < stopCount; i++) {
      result.push(i * stepWidth);
    }

    if (range) {
      return result.filter(step => {
        return step < 100 * (this.minValue() - min) / (max - min) ||
          step > 100 * (this.maxValue() - min) / (max - min);
      });
    } else {
      return result.filter(step => step > 100 * (firstValue - min) / (max - min));
    }
  }

  minValue(): number {
    return Math.min(this.state.firstValue, this.state.secondValue);
  }

  maxValue() {
    return Math.max(this.state.firstValue, this.state.secondValue);
  }

  barWidth(): string {
    return this.props.range
      ? `${ 100 * (this.maxValue() - this.minValue()) / (this.props.max - this.props.min) }%`
      : `${ 100 * (this.state.firstValue - this.props.min) / (this.props.max - this.props.min) }%`;
  }

  barLeft(): string {
    return this.props.range
      ? `${ 100 * (this.minValue() - this.props.min) / (this.props.max - this.props.min) }%`
      : '0%';
  }

  render(): React.Element<any> {
    const { showInput, showStops, showInputControls, range, step, disabled, min, max } = this.props;
    const { inputValue, firstValue, secondValue } = this.state;

    return (
      <div className="el-slider">
        {
          showInput && !range && (
            <InputNumber
              value={inputValue}
              className="el-slider__input"
              ref="input"
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
        <div ref="slider" className={this.classNames('el-slider__runway', {
          'show-input': showInput,
          'disabled': disabled
        })} onClick={this.onSliderClick.bind(this)}>
          <div
            className="el-slider__bar"
            style={{
              width: this.barWidth(),
              left: this.barLeft()
            }}>
          </div>
          <SliderButton ref="button1" value={firstValue} onChange={this.onFirstValueChange.bind(this)} />
          {
            range && <SliderButton ref="button2" value={secondValue} onChange={this.onSecondValueChange.bind(this)} />
          }
          {
            showStops && this.stops().map((item, index) => {
              return (
                <div key={index} className="el-slider__stop" style={{ 'left': item + '%' }}></div>
              )
            })
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
  showStops: PropTypes.bool,
  disabled: PropTypes.bool,
  range: PropTypes.bool,
  onChange: PropTypes.func
}

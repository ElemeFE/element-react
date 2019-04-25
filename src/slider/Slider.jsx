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

  constructor(props: Object) {
    super(props);
    this.slider = React.createRef();
    this.button1 = React.createRef();
    this.button2 = React.createRef();
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

  get initValue() {
    const { value, min, max } = this.props;
    let initValue = value;
    if (typeof value !== 'number' || isNaN(value)) {
      initValue = min;
    } else {
      initValue = Math.min(max, Math.max(min, value));
    }
    return initValue;
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
      firstValue = this.initValue;
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

  componentWillUpdate(props: Object): void {
    const { min, max, value, range } = this.props;
    const { dragging } = this.state;
    if (props.min != min || props.max != max) {
      this.setValues();
    }

    if (props.value != value) {
      const { oldValue } = this.state;

      if (dragging || Array.isArray(value) && Array.isArray(props.value) && Array.isArray(oldValue) && value.every((item, index) => item === oldValue[index])) {
        return;
      } else if (!range && typeof props.value === 'number' && !isNaN(props.value)) {
        this.setState({ firstValue: props.value })
      }
      this.setValues();
    }
  }

  valueChanged(): boolean {
    const { range } = this.props;
    const { firstValue, oldValue } = this.state;
    if (range && Array.isArray(oldValue)) {
      return ![this.minValue(), this.maxValue()].every((item, index) => item === oldValue[index]);
    } else {
      return firstValue !== oldValue;
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
      if (this.initValue < min) {
        inputValue = min;
      } else if (this.initValue > max) {
        inputValue = max;
      } else {
        inputValue = firstValue;

        this.setState({ firstValue }, () => {
          if (this.valueChanged()) {
            this.onValueChanged(firstValue);
            this.setState({ oldValue: firstValue });
          }
        });
      }
    }

    this.setState({ firstValue, secondValue, inputValue });
  }

  setPosition(percent: number): void {
    const { range, min, max } = this.props;
    const { firstValue, secondValue } = this.state;

    const targetValue = min + percent * (max - min) / 100;

    if (!range) {
      this.button1.current.setPosition(percent);
      return;
    }

    let button;

    if (Math.abs(this.minValue() - targetValue) < Math.abs(this.maxValue() - targetValue)) {
      button = firstValue < secondValue ? 'button1' : 'button2';
    } else {
      button = firstValue > secondValue ? 'button1' : 'button2';
    }

    this[button].current.setPosition(percent);
  }

  onSliderClick(event: SyntheticMouseEvent<HTMLDivElement>): void {
    const { disabled, dragging, vertical } = this.props;
    if (disabled || dragging) return;

    if (vertical) {
      const sliderOffsetBottom = this.slider.current.getBoundingClientRect().bottom;
      this.setPosition((sliderOffsetBottom - event.clientY) / this.sliderSize() * 100);
    } else {
      const sliderOffsetLeft = this.slider.current.getBoundingClientRect().left;
      this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderSize() * 100);
    }

    this.setValues();
  }

  /* Watched Methods */
  onValueChanged(val: number | Array<number>): void {
    const { onChange } = this.props;
    if (onChange) onChange(val);
  }

  onInputValueChanged(e: number): void {
    this.setState({
      inputValue: e || 0,
      firstValue: e || 0
    }, () => {
      this.setValues();
    });
  }

  onFirstValueChange(value: number): void {
    const { firstValue } = this.state;
    if (firstValue !== value) {
      this.setState({ firstValue: value }, () => this.setValues());
    }
  }

  onSecondValueChange(value: number): void {
    const { secondValue } = this.state;
    if (secondValue !== value) {
      this.setState({ secondValue: value }, () => this.setValues());
    }
  }

  /* Computed Methods */

  sliderSize(): number {
    const {vertical} = this.props;
    return parseInt(vertical ? this.slider.current.offsetHeight : this.slider.current.offsetWidth, 10);
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
    const { firstValue, secondValue } = this.state;
    return Math.min(firstValue, secondValue);
  }

  maxValue(): number {
    const { firstValue, secondValue } = this.state;
    return Math.max(firstValue, secondValue);
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
    const { firstValue } = this.state;
    const { range, max, min } = this.props;
    return range
      ? `${100 * (this.maxValue() - this.minValue()) / (max - min)}%`
      : `${100 * (firstValue - min) / (max - min)}%`;
  }

  barStart(): string {
    const { range, max, min } = this.props;
    return range
      ? `${100 * (this.minValue() - min) / (max - min)}%`
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
            onChange={this.onFirstValueChange.bind(this)}
          />
          {
            range && (
              <SliderButton
                ref={this.button2}
                vertical={vertical} value={secondValue}
                onChange={this.onSecondValueChange.bind(this)}
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
  onChange: PropTypes.func
}

Slider.defaultProps = {
  showTooltip: true,
  showInputControls: true,
  min: 0,
  max: 100,
  step: 1,
  value: 0
}

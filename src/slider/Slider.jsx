import React from 'react';
import { Component, PropTypes } from '../../libs';

import InputNumber from '../input-number';
import Tooltip from '../tooltip';

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldValue: props.value,
      inputValue: props.value,
      currentPosition: (props.value - props.min) / (props.max - props.min) * 100 + '%'
    }
  }

  onSliderClick(event) {
    if (this.props.disabled) return;

    const currentX = event.clientX;
    const sliderOffsetLeft = this.refs.slider.getBoundingClientRect().left;
    const newPos = (currentX - sliderOffsetLeft) / this.sliderWidth() * 100;

    this.setPosition(newPos);
  }

  onInputChange(event) {
    const { max, min } = this.props;
    const { value } = event.target;

    if (value === '') {
      return;
    }

    if (!isNaN(value)) {
      this.setPosition((value - min) * 100 / (max - min));
    }
  }

  onDragStart(event) {
    this.startX = event.clientX;
    this.startPos = parseInt(this.state.currentPosition, 10);

    this.setState({
      dragging: true
    });
  }

  onDragging(event) {
    if (this.state.dragging) {
      // this.refs.tooltip.showPopper = true;
      this.currentX = event.clientX;

      const diff = (this.currentX - this.startX) / this.sliderWidth() * 100;

      this.newPos = this.startPos + diff;
      this.setPosition(this.newPos);
    }
  }

  onDragEnd() {
    if (this.state.dragging) {
      this.setState({
        dragging: false
      });

      // this.refs.tooltip.showPopper = false;
      this.setPosition(this.newPos);

      window.removeEventListener('mousemove', this.onDragging.bind(this));
      window.removeEventListener('mouseup', this.onDragEnd.bind(this));
    }
  }

  onButtonDown(event) {
    if (this.props.disabled) return;

    this.onDragStart(event);

    window.addEventListener('mousemove', this.onDragging.bind(this));
    window.addEventListener('mouseup', this.onDragEnd.bind(this));
  }

  setPosition(newPos) {
    if (newPos >= 0 && (newPos <= 100)) {
      const { max, min, step } = this.props;

      const lengthPerStep = 100 / ((max - min) / step);
      const steps = Math.round(newPos / lengthPerStep);

      const value = Math.round(steps * lengthPerStep * (max - min) * 0.01 + min);

      this.setState({
        inputValue: value,
        currentPosition: (value - min) / (max - min) * 100 + '%'
      })

      if (!this.state.dragging) {
        if (value !== this.state.oldValue) {
          this.state.oldValue = value;

          if (this.props.onChange) {
            this.props.onChange({
              target: {
                value
              }
            })
          }
        }
      }
    }
  }

  sliderWidth() {
    return parseInt(this.refs.slider.offsetWidth, 10);
  }

  stops() {
    const { max, min, step, value } = this.props;

    const stopCount = (max - value) / step;
    const currentLeft = parseFloat(this.state.currentPosition);
    const stepWidth = 100 * step / (max - min);

    let result = [];

    for (let i = 1; i < stopCount; i++) {
      result.push(currentLeft + i * stepWidth);
    }

    return result;
  }

  handleMouseEnter() {
    this.setState({
      hovering: true
    });

    // this.$refs.tooltip.showPopper = true;
  }

  handleMouseLeave() {
    this.setState({
      hovering: false
    });

    // this.$refs.tooltip.showPopper = false;
  }

  render() {
    return (
      <div style={this.style()} className={this.className('el-slider')}>
        {
          this.props.showInput && (
            <InputNumber
              ref="input"
              className="el-slider__input"
              defaultValue={this.state.inputValue}
              value={this.state.inputValue}
              onChange={this.onInputChange.bind(this)}
              step={this.props.step}
              disabled={this.props.disabled}
              min={this.props.min}
              max={this.props.max}
              size="small">
            </InputNumber>
          )
        }
        <div ref="slider" className={this.classNames('el-slider__runway', {
          'show-input': this.props.showInput,
          'disabled': this.props.disabled
        })} onClick={this.onSliderClick.bind(this)} >
          <div className="el-slider__bar" style={{
              width: this.state.currentPosition
          }}></div>
          <div
            ref="button"
            className={this.classNames('el-slider__button-wrapper', {
              'hover': this.state.hovering,
              'dragging': this.state.dragging
            })}
            style={{
              left: this.state.currentPosition
            }}
            onMouseEnter={this.handleMouseEnter.bind(this)}
            onMouseLeave={this.handleMouseLeave.bind(this)}
            onMouseDown={this.onButtonDown.bind(this)} >
            <Tooltip ref="tooltip" placement="top" content={<span>{this.state.inputValue}</span>}>
              <div className={this.classNames('el-slider__button', {
                'hover': this.state.hovering,
                'dragging': this.state.dragging
              })}></div>
            </Tooltip>
          </div>
          {
            this.props.showStops && this.stops().map((item, index) => {
              return <div key={index} className="el-slider__stop" style={{ 'left': item + '%' }}></div>
            })
          }
        </div>
      </div>
    )
  }
}

Slider.propTypes = {
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.number,
  showInput: PropTypes.bool,
  showStops: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
}

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0
}

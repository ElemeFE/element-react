/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

import Tooltip from '../tooltip';

type State = {
  hovering: boolean,
  dragging: boolean,
  startX: number,
  startY: number,
  startPosition: number,
  newPosition: number
}

export default class SliderButton extends Component {
  state: State;

  static defaultProps = {
    value: 0
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      hovering: false,
      dragging: false,
      startX: 0,
      startY: 0,
      startPosition: 0,
      newPosition: 0
    }
  }

  parent(): Component {
    return this.context.component;
  }

  handleMouseEnter = (): void => {
    this.setState({
      hovering: true
    });
  }

  handleMouseLeave = (): void => {
    this.setState({
      hovering: false
    });
  }

  onDragStart = (event: SyntheticMouseEvent<any>) => {
    if (this.disabled()) return;

    const position = parseInt(this.currentPosition(), 10);

    this.setState({
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      startPosition: position,
      newPosition: position
    });

    window.addEventListener('mousemove', this.onDragging);
    window.addEventListener('mouseup', this.onDragEnd);
    window.addEventListener('contextmenu', this.onDragEnd);
  };

  onDragging = (event: SyntheticMouseEvent<any>) => {
    const { dragging, startY, startX, startPosition } = this.state;
    const { vertical } = this.props;
    if (!dragging) {
      return;
    }
    const diff = vertical
      ? (startY - event.clientY)
      : (event.clientX - startX);

    if (!diff) {
      return;
    }

    const newPosition = startPosition + diff / this.parent().sliderSize() * 100;
    this.setState({
      newPosition
    });

    this.setPosition(newPosition);
  };

  onDragEnd = () => {
    const { dragging, newPosition } = this.state;
    if (dragging) {
      /*
       * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
       * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
       */
      setTimeout(() => {
        this.setState({
          dragging: false
        }, () => {
          this.setPosition(newPosition);
        });
      }, 0);

      window.removeEventListener('mousemove', this.onDragging);
      window.removeEventListener('mouseup', this.onDragEnd);
      window.removeEventListener('contextmenu', this.onDragEnd);
    }
  };

  setPosition(newPosition: number) {
    const { onChange } = this.props;
    if (newPosition < 0) {
      newPosition = 0;
    } else if (newPosition > 100) {
      newPosition = 100;
    }

    const lengthPerStep = 100 / ((this.max() - this.min()) / this.step());
    const steps = Math.round(newPosition / lengthPerStep);
    const value = steps * lengthPerStep * (this.max() - this.min()) * 0.01 + this.min();

    onChange(parseFloat(value.toFixed(this.precision())));
  }

  /* Computed Methods */

  formatValue() {
    const { formatTooltip } = this.parent().props;

    if (formatTooltip instanceof Function) {
      return formatTooltip(this.props.value);
    }

    return this.props.value;
  }

  disabled(): boolean {
    return this.parent().props.disabled;
  }

  max(): number {
    return this.parent().props.max;
  }

  min(): number {
    return this.parent().props.min;
  }

  step(): number {
    return this.parent().props.step;
  }

  precision(): number {
    return this.parent().state.precision;
  }

  currentPosition(): string {
    return `${(this.props.value - this.min()) / (this.max() - this.min()) * 100}%`;
  }

  wrapperStyle(): Object {
    return this.props.vertical ? { bottom: this.currentPosition() } : { left: this.currentPosition() };
  }

  render(): React.DOM {
    const { hovering, dragging } = this.state;

    return (
      <div
        className={this.classNames('el-slider__button-wrapper', {
          'hover': hovering,
          'dragging': dragging
        })}
        style={this.wrapperStyle()}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.onDragStart}>
        <Tooltip
          placement="top"
          content={<span>{this.formatValue()}</span>}
          disabled={!this.parent().props.showTooltip}
        >
          <div
            className={this.classNames('el-slider__button', {
              'hover': hovering,
              'dragging': dragging
            })}
          />
        </Tooltip>
      </div>
    )
  }
}

SliderButton.contextTypes = {
  component: PropTypes.any
};

SliderButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  vertical: PropTypes.bool
};

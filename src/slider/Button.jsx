/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

import Tooltip from '../tooltip';

type State = {
  hovering: boolean,
  dragging: boolean,
  startX: number,
  currentX: number,
  startPosition: number,
  newPosition: number,
  oldValue: number
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
      currentX: 0,
      startPosition: 0,
      newPosition: 0,
      oldValue: props.value
    }
  }

  parent(): Component {
    return this.context.component;
  }

  showTooltip() {
    // this.$refs.tooltip && (this.$refs.tooltip.showPopper = true);
  }

  hideTooltip() {
    // this.$refs.tooltip && (this.$refs.tooltip.showPopper = false);
  }

  handleMouseEnter(): void {
    this.showTooltip();
    this.setState({
      hovering: true
    });
  }

  handleMouseLeave(): void {
    this.hideTooltip();
    this.setState({
      hovering: false
    });
  }

  onButtonDown(event: SyntheticMouseEvent) {
    if (this.disabled()) return;

    this.onDragStart(event);

    window.addEventListener('mousemove', this.onDragging.bind(this));
    window.addEventListener('mouseup', this.onDragEnd.bind(this));
    window.addEventListener('contextmenu', this.onDragEnd.bind(this));
  }

  onDragStart(event: SyntheticMouseEvent) {
    this.setState({
      dragging: true,
      startX: event.clientX,
      startPosition: parseInt(this.currentPosition(), 10)
    }, () => {
      this.parent().onDraggingChanged(this.state.dragging);
    });
  }

  onDragging(event: SyntheticMouseEvent) {
    if (this.state.dragging) {
      this.showTooltip();

      this.state.currentX = event.clientX;

      const diff = (this.state.currentX - this.state.startX) / this.parent().sliderWidth() * 100;

      this.state.newPosition = this.state.startPosition + diff;

      this.setPosition(this.state.newPosition);
      this.forceUpdate();
    }
  }

  onDragEnd() {
    if (this.state.dragging) {
      /*
       * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
       * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
       */
      setTimeout(() => {
        this.setState({
          dragging: false
        }, () => {
          this.hideTooltip();
          this.setPosition(this.state.newPosition);
          this.parent().onDraggingChanged(this.state.dragging);
        });
      }, 0);

      window.removeEventListener('mousemove', this.onDragging.bind(this));
      window.removeEventListener('mouseup', this.onDragEnd.bind(this));
      window.removeEventListener('contextmenu', this.onDragEnd.bind(this));
    }
  }

  setPosition(newPosition: number) {
    if (newPosition < 0) {
      newPosition = 0;
    } else if (newPosition > 100) {
      newPosition = 100;
    }

    const lengthPerStep = 100 / ((this.max() - this.min()) / this.step());
    const steps = Math.round(newPosition / lengthPerStep);
    let value = steps * lengthPerStep * (this.max() - this.min()) * 0.01 + this.min();

    value = parseFloat(value.toFixed(this.precision()));

    this.props.onChange(value);
    // this.refs.tooltip && this.refs.tooltip.updatePopper();

    if (!this.state.dragging && this.props.value !== this.state.oldValue) {
      this.setState({
        oldValue: this.props.value
      })
    }
  }

  /* Computed Methods */

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
    return `${ (this.props.value - this.min()) / (this.max() - this.min()) * 100 }%`;
  }

  render(): React.Element<any> {
    const { hovering, dragging } = this.state;

    return (
      <div
        ref="button"
        className={this.classNames('el-slider__button-wrapper', {
          'hover': hovering,
          'dragging': dragging
        })}
        style={{ left: this.currentPosition() }}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onMouseDown={this.onButtonDown.bind(this)}>
        <Tooltip ref="tooltip" placement="top" content={<span>{this.props.value}</span>}>
          <div className={this.classNames('el-slider__button', {
            'hover': this.state.hovering,
            'dragging': this.state.dragging
          })}></div>
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
  value: PropTypes.number
};

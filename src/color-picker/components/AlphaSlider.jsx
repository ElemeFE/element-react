/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../../libs';
import draggable from '../draggable';
import type { AlphaSliderState, DragOptions } from '../Types';

export default class AlphaSlider extends Component {
  state: AlphaSliderState;

  constructor(props: Object) {
    super(props);
    this.state = {
      thumbLeft: 0,
      thumbTop: 0,
      background: null
    };
  }

  componentDidMount() {
    const { bar, thumb } = this.refs;
    const dragConfig: DragOptions = {
      drag: event => {
        this.handleDrag(event);
      },
      end: event => {
        this.handleDrag(event);
      }
    };
    draggable(bar, dragConfig);
    draggable(thumb, dragConfig);
    this.update();
  }

  handleClick(event: SyntheticMouseEvent): void {
    const thumb = this.refs.thumb;
    const target = event.target;
    if (target !== thumb) {
      this.handleDrag(event);
    }
  }

  handleDrag(event: SyntheticMouseEvent): void {
    const { vertical, color } = this.props;
    const { onChange } = this.context;
    const rect = this.$el.getBoundingClientRect();
    const { thumb } = this.refs;
    if (!vertical) {
      let left = event.clientX - rect.left;
      left = Math.max(thumb.offsetWidth / 2, left);
      left = Math.min(left, rect.width - thumb.offsetWidth / 2);
      color.set(
        'alpha',
        Math.round(
          (left - thumb.offsetWidth / 2) /
            (rect.width - thumb.offsetWidth) *
            100
        )
      );
    } else {
      let top = event.clientY - rect.top;
      top = Math.max(thumb.offsetHeight / 2, top);
      top = Math.min(top, rect.height - thumb.offsetHeight / 2);
      color.set(
        'alpha',
        Math.round(
          (top - thumb.offsetHeight / 2) /
            (rect.height - thumb.offsetHeight) *
            100
        )
      );
    }
    this.update();
    onChange(color);
  }

  getThumbLeft(): number {
    const { vertical, color } = this.props;
    if (vertical) return 0;
    const el = this.$el;
    const alpha = color._alpha;
    if (!el) return 0;
    const thumb = this.refs.thumb;
    return Math.round(alpha * (el.offsetWidth - thumb.offsetWidth / 2) / 100);
  }

  getThumbTop(): number {
    const { vertical, color } = this.props;
    if (!vertical) return 0;
    const el = this.$el;
    const alpha = color._alpha;
    if (!el) return 0;
    const thumb = this.refs.thumb;
    return Math.round(alpha * (el.offsetHeight - thumb.offsetHeight / 2) / 100);
  }

  getBackground(): ?string {
    const { color } = this.props;
    if (color && color.value) {
      const { r, g, b } = color.toRgb();
      return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
    }
    return null;
  }

  update(): void {
    this.setState({
      thumbLeft: this.getThumbLeft(),
      thumbTop: this.getThumbTop(),
      background: this.getBackground()
    });
  }

  render(): React.Element<any> {
    const { vertical } = this.props;
    const { thumbLeft, thumbTop, background } = this.state;
    return (
      <div
        ref={el => this.$el = el}
        className={this.classNames({
          'el-color-alpha-slider': true,
          'is-vertical': vertical
        })}
      >
        <div
          className="el-color-alpha-slider__bar"
          onClick={e => this.handleClick(e)}
          ref="bar"
          style={{ background: background }}
        />
        <div
          className="el-color-alpha-slider__thumb"
          ref="thumb"
          style={{
            left: thumbLeft + 'px',
            top: thumbTop + 'px'
          }}
        />
      </div>
    );
  }
}

AlphaSlider.contextTypes = {
  onChange: PropTypes.func
};

AlphaSlider.propTypes = {
  color: PropTypes.object.isRequired,
  vertical: PropTypes.bool
};

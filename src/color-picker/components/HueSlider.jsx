/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../../libs';
import draggable from '../draggable';
import type { HueSliderState, DragOptions } from '../Types';

export default class HueSlider extends Component {
  state: HueSliderState;

  constructor(props: Object) {
    super(props);
    this.state = {
      thumbLeft: 0,
      thumbTop: 0
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
    const rect = this.$el.getBoundingClientRect();
    const { thumb } = this.refs;
    const { vertical, color } = this.props;
    const { onChange } = this.context;
    let hue;
    if (!vertical) {
      let left = event.clientX - rect.left;
      left = Math.min(left, rect.width - thumb.offsetWidth / 2);
      left = Math.max(thumb.offsetWidth / 2, left);
      hue = Math.round(
        (left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 360
      );
    } else {
      let top = event.clientY - rect.top;
      top = Math.min(top, rect.height - thumb.offsetHeight / 2);
      top = Math.max(thumb.offsetHeight / 2, top);
      hue = Math.round(
        (top - thumb.offsetHeight / 2) /
          (rect.height - thumb.offsetHeight) *
          360
      );
    }
    color.set('hue', hue);
    this.update();
    onChange(color);
  }

  getThumbLeft(): number {
    const { vertical, color } = this.props;
    if (vertical) return 0;
    const el = this.$el;
    const hue = color.get('hue');
    if (!el) return 0;
    const thumb = this.refs.thumb;
    return Math.round(hue * (el.offsetWidth - thumb.offsetWidth / 2) / 360);
  }

  getThumbTop(): number {
    const { vertical, color } = this.props;
    if (!vertical) return 0;
    const el = this.$el;
    const hue = color.get('hue');
    if (!el) return 0;
    const thumb = this.refs.thumb;
    return Math.round(hue * (el.offsetHeight - thumb.offsetHeight / 2) / 360);
  }

  update(): void {
    this.setState({
      thumbLeft: this.getThumbLeft(),
      thumbTop: this.getThumbTop()
    });
  }

  render(): React.Element<any> {
    const { vertical } = this.props;
    const { thumbLeft, thumbTop } = this.state;
    return (
      <div
        ref={el => this.$el = el}
        className={this.classNames({
          'el-color-hue-slider': true,
          'is-vertical': vertical
        })}
        style={{ float: 'right' }}
      >
        <div
          className="el-color-hue-slider__bar"
          onClick={e => this.handleClick(e)}
          ref="bar"
        />
        <div
          className="el-color-hue-slider__thumb"
          style={{
            left: thumbLeft + 'px',
            top: thumbTop + 'px'
          }}
          ref="thumb"
        />
      </div>
    );
  }
}

HueSlider.contextTypes = {
  onChange: PropTypes.func
};

HueSlider.propTypes = {
  vertical: PropTypes.bool,
  color: PropTypes.object.isRequired
};

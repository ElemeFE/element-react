/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../../libs';
import draggable from '../draggable';
import type { SvPanelState, DragOptions } from '../Types';

export default class SvPanel extends Component {
  state: SvPanelState;

  constructor(props: Object) {
    super(props);
    this.state = {
      cursorTop: 0,
      cursorLeft: 0,
      background: 'hsl(0, 100%, 50%)'
    };
  }

  componentDidMount() {
    const dragConfig: DragOptions = {
      drag: event => {
        this.handleDrag(event);
      },
      end: event => {
        this.handleDrag(event);
      }
    };
    draggable(this.$el, dragConfig);
    this.update();
  }

  componentWillReceiveProps(nextProps: Object): void {
    const { background } = this.state;
    const newBackground = 'hsl(' + nextProps.color.get('hue') + ', 100%, 50%)';
    if (newBackground !== background) {
      this.update(nextProps);
    }
  }

  update(props: ?Object): void {
    const { color } = props || this.props;
    const saturation = color.get('saturation');
    const value = color.get('value');
    const el = this.$el;
    let { width, height } = el.getBoundingClientRect();
    if (!height) height = width * 3 / 4;
    this.setState({
      cursorLeft: saturation * width / 100,
      cursorTop: (100 - value) * height / 100,
      background: 'hsl(' + color.get('hue') + ', 100%, 50%)'
    });
  }

  handleDrag(event: SyntheticMouseEvent): void {
    const { color } = this.props;
    const { onChange } = this.context;
    const el = this.$el;
    const rect = el.getBoundingClientRect();
    let left = event.clientX - rect.left;
    let top = event.clientY - rect.top;
    left = Math.max(0, left);
    left = Math.min(left, rect.width);
    top = Math.max(0, top);
    top = Math.min(top, rect.height);
    this.setState(
      {
        cursorLeft: left,
        cursorTop: top,
        background: 'hsl(' + color.get('hue') + ', 100%, 50%)'
      },
      () => {
        color.set({
          saturation: left / rect.width * 100,
          value: 100 - top / rect.height * 100
        });
        onChange(color);
      }
    );
  }

  render(): React.Element<any> {
    const { cursorTop, cursorLeft, background } = this.state;
    return (
      <div
        className="el-color-svpanel"
        style={{ backgroundColor: background }}
        ref={el => this.$el = el}
      >
        <div className="el-color-svpanel__white" />
        <div className="el-color-svpanel__black" />
        <div
          className="el-color-svpanel__cursor"
          style={{
            top: cursorTop + 'px',
            left: cursorLeft + 'px'
          }}
        >
          <div />
        </div>
      </div>
    );
  }
}

SvPanel.contextTypes = {
  onChange: PropTypes.func
};

SvPanel.propTypes = {
  color: PropTypes.object.isRequired
};

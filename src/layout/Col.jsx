/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Col extends Component {
  getStyle(): { paddingLeft: string, paddingRight: string } {
    const style = {};

    if (this.context.gutter) {
      style.paddingLeft = `${this.context.gutter / 2}px`;
      style.paddingRight = style.paddingLeft;
    }

    return style;
  }

  render(): React.Element<any> {
    let classList = [];

    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this.props[prop] >= 0) {
        classList.push(
          prop !== 'span'
          ? `el-col-${prop}-${this.props[prop]}`
          : `el-col-${this.props[prop]}`
        );
      }
    });

    ['xs', 'sm', 'md', 'lg'].forEach(size => {
      if (typeof this.props[size] === 'object') {
        let props = this.props[size];
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
            ? `el-col-${size}-${prop}-${props[prop]}`
            : `el-col-${size}-${props[prop]}`
          );
        });
      } else if (this.props[size] >= 0) {
        classList.push(`el-col-${size}-${Number(this.props[size])}`);
      }
    });

    return React.createElement(this.props.tag, {
      className: this.className('el-col', classList),
      style: this.style(this.getStyle())
    }, this.props.children);
  }
}

Col.contextTypes = {
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Col.propTypes = {
  span: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pull: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  push: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  tag: PropTypes.string
}

Col.defaultProps = {
  span: 24,
  tag: 'div'
}

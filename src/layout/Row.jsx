/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Row extends Component {
  getChildContext(): { gutter: number | string } {
    return {
      gutter: this.props.gutter
    };
  }

  getStyle(): { marginLeft: string, marginRight: string } {
    const style = {};

    if (this.props.gutter) {
      style.marginLeft = `-${this.props.gutter / 2}px`;
      style.marginRight = style.marginLeft;
    }

    return style;
  }

  render(): React.Element<any> {
    return React.createElement(this.props.tag, {
      className: this.className('el-row',
        this.props.justify !== 'start' && `is-justify-${this.props.justify}`,
        this.props.align !== 'top' && `is-align-${this.props.align}`, {
          'el-row--flex': this.props.type === 'flex'
        }
      ),
      style: this.style(this.getStyle())
    }, this.props.children);
  }
}

Row.childContextTypes = {
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Row.propTypes = {
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  tag: PropTypes.string
}

Row.defaultProps = {
  justify: 'start',
  align: 'top',
  tag: 'div'
};

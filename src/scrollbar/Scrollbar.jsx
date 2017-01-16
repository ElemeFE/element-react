import React from 'react';

import { PropTypes, Component } from '../../libs';
import { getScrollBarWidth } from './scrollbar-width'

export class Scrollbar extends Component {
  static get propTypes() {
    return {
      wrapStyle: PropTypes.object,
      viewClass: PropTypes.object,
      wrapClass: PropTypes.oneOfType([
        PropTypes.string, PropTypes.object
      ]),
      className: PropTypes.string,
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    let {wrapStyle, viewClass, children} = this.props;
    const gutter = getScrollBarWidth();

    if (gutter) {
      const gutterWith = `-${gutter}px`;
      wrapStyle = Object.assign({}, wrapStyle, {
        marginRight: gutterWith,
        marginBottom: gutterWith
      });
    }

    viewClass = this.classNames('el-scrollbar__view', viewClass);

    const wrapView = React.createElement('div', {
      className: viewClass,
      style: wrapStyle,
      ref: 'resize'
    }, children);

    return (
      <div className={this.classNames('el-scrollbar', this.props.className)}>
        <div
          ref="wrap"
          className={this.classNames(this.props.wrapClass, 'el-scrollbar__wrap el-scrollbar__wrap--hidden-default')}>
          { wrapView }
        </div>
      </div>
    )
  }
}
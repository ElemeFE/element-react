
import React from 'react';

import { PropTypes, Component } from '../../libs';
import { getScrollBarWidth } from './scrollbar-width'

export class Scrollbar extends Component {
  static get propTypes() {
    return {
      wrapStyle: PropTypes.object,
      viewClass: PropTypes.oneOfType([
        PropTypes.string, PropTypes.object
      ]),
      wrapClass: PropTypes.oneOfType([
        PropTypes.string, PropTypes.object
      ]),
      className: PropTypes.string,
      viewComponent: PropTypes.oneOfType([
        PropTypes.string, PropTypes.element
      ]),
      noresize: PropTypes.bool
    }
  }

  static get defaultProps() {
    return {viewComponent: 'div'}
  }

  constructor(props) {
    super(props);
  }

  render() {
    
    /* eslint-disable */
    let {wrapStyle, viewClass, children, viewComponent, wrapClass, noresize, ...others} = this.props;
    /* eslint-enable */
    
    const gutter = getScrollBarWidth();
    if (gutter) {
      const gutterWith = `-${gutter}px`;
      wrapStyle = Object.assign({}, wrapStyle, {
        marginRight: gutterWith,
        marginBottom: gutterWith
      });
    }

    viewClass = this.classNames('el-scrollbar__view', viewClass);

    const wrapView = React.createElement(viewComponent, {
      className: viewClass,
      ref: 'resize'
    }, children);

    return (
      <div className={this.classNames('el-scrollbar', this.props.className)}>
        <div
          {...others}
          ref="wrap"
          style={wrapStyle}
          className={this.classNames(this.props.wrapClass, 'el-scrollbar__wrap el-scrollbar__wrap--hidden-default')}>
          { wrapView }
        </div>
      </div>
    )
  }
}
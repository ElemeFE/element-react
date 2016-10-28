import React, { PropTypes } from 'react';
import { Component } from '../../libs';

export default class Badge extends Component {
  render() {
    const { children, value, max, isDot } = this.props;
    const className = this.classNames({
      'el-badge__content': true,
      'is-fixed': !!children,
      'is-dot': !!isDot,
    });
    let content;

    if (isDot) {
      content = null;
    } else {
      if (typeof value === 'number' && typeof max === 'number') {
        content = max < value ? `${max}+` : value;
      } else {
        content = value;
      }
    }

    return (
      <div className="el-badge">
        { children }
        <sup className={ className }>{ content }</sup>
      </div>
    )
  }
}

Badge.PropTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.number,
  isDot: PropTypes.bool,
}

Badge.defaultProps = {
  isDot: false,
}

/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Step extends Component {
  static defaultProps = {
    status: 'wait'
  };

  constructor(props: Object) {
    super(props);
  }

  render(): React.Element<any> {
    const {
      title,
      icon,
      description,
      status,
      direction,
      style,
      lineStyle,
      stepNumber
    } = this.props;
    const directionClass = `is-${direction}`;
    const statusClass = `is-${status}`;
    const iconNode = icon
      ? <i className={`el-icon-${icon}`} />
      : <div>{stepNumber}</div>;

    return (
      <div
        style={this.style(style)}
        className={this.className('el-step', directionClass)}
      >
        <div
          className={this.classNames('el-step__head', statusClass, {
            'is-text': !icon
          })}
        >
          <div
            className={this.classNames('el-step__line', directionClass, {
              'is-icon': icon
            })}
          >
            <i className="el-step__line-inner" style={lineStyle} />
          </div>
          <span className="el-step__icon">
            {status !== 'success' && status !== 'error'
              ? iconNode
              : <i
                  className={
                    'el-icon-' + (status === 'success' ? 'check' : 'close')
                  }
                />}
          </span>
        </div>
        <div className="el-step__main">
          <div
            ref="title"
            className={this.classNames('el-step__title', statusClass)}
          >
            {title}
          </div>
          <div className={this.classNames('el-step__description', statusClass)}>
            {description}
          </div>
        </div>
      </div>
    );
  }
}

Step.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  status: PropTypes.string,
  direction: PropTypes.string,
  style: PropTypes.object,
  lineStyle: PropTypes.object,
  stepNumber: PropTypes.number
};

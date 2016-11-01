import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Step extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, icon, description, direction, style, lineStyle, status, index } = this.props;
    const directionClass = `is-${direction}`;
    const statusClass = `is-${status}`;
    const iconNode = icon ? <i className={`el-icon-${icon}`}></i> : <div>{ index }</div>

    return (
      <div
        style={style}
        className={this.classNames({
          [directionClass]: true,
          'el-step': true,
        })}>
        <div
          className={this.classNames({
            'el-step__head': true,
            [statusClass]: true,
            'is-text': !icon,
          })}>
          <div
            className={this.classNames({
              'el-step__line': true,
              [directionClass]: true,
              'is-icon': icon,
            })}>
            <i className="el-step__line-inner" style={lineStyle}></i>
          </div>
          <span className="el-step__icon">
            {
              (status !== 'success' && status !== 'error') ? iconNode :
                <i
                  className={'el-icon-' + (status === 'success' ? 'check' : 'close')}>
                </i>
            }
          </span>
        </div>
        <div
          className="el-step__main"
        >
          <div
            ref="title"
            className={this.classNames({
              'el-step__title': true,
              [statusClass]: true,
            })}>
            <slot name="title">{title}</slot>
          </div>
          <div
            className={this.classNames({
              'el-step__description': true,
              [statusClass]: true,
            })}>
            { description }
          </div>
        </div>
      </div>
    )
  }
}

Step.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
  direction: PropTypes.string,
  style: PropTypes.object,
  index: PropTypes.number,
}

Step.defaultProps = {
  status: 'wait',
}

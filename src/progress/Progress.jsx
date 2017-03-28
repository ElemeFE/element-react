/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

type PathStyle = {
  strokeDasharray: string,
  strokeDashoffset: string,
  transition: string
};

export default class Progress extends Component {
  static defaultProps = {
    type: 'line',
    percentage: 0,
    strokeWidth: 6,
    width: 126,
    showText: true,
    textInside: false
  };

  constructor(props: Object) {
    super(props);
  }

  relativeStrokeWidth(): string {
    const { strokeWidth, width } = this.props;
    return (strokeWidth / width * 100).toFixed(1);
  }

  trackPath(): string {
    const radius = parseInt(
      50 - parseFloat(this.relativeStrokeWidth()) / 2,
      10
    );
    return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
  }

  perimeter(): number {
    const radius = 50 - parseFloat(this.relativeStrokeWidth()) / 2;
    return 2 * Math.PI * radius;
  }

  circlePathStyle(): PathStyle {
    const perimeter = this.perimeter();
    return {
      strokeDasharray: `${perimeter}px,${perimeter}px`,
      strokeDashoffset: (1 - this.props.percentage / 100) * perimeter + 'px',
      transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
    };
  }

  stroke(): string {
    let ret;
    switch (this.props.status) {
      case 'success':
        ret = '#13ce66';
        break;
      case 'exception':
        ret = '#ff4949';
        break;
      default:
        ret = '#20a0ff';
    }
    return ret;
  }

  iconClass(): string {
    const { type, status } = this.props;
    return type === 'line'
      ? status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-cross'
      : status === 'success' ? 'el-icon-check' : 'el-icon-close';
  }

  progressTextSize(): number {
    const { type, strokeWidth, width } = this.props;
    return type === 'line' ? 12 + strokeWidth * 0.4 : width * 0.111111 + 2;
  }

  render(): React.Element<any> {
    const {
      type,
      percentage,
      status,
      strokeWidth,
      textInside,
      width,
      showText
    } = this.props;
    let progress;
    if (type === 'line') {
      progress = (
        <div className="el-progress-bar">
          <div
            className="el-progress-bar__outer"
            style={{ height: `${strokeWidth}px` }}
          >
            <div
              className="el-progress-bar__inner"
              style={{ width: `${percentage}%` }}
            >
              {showText &&
                textInside &&
                <div className="el-progress-bar__innerText">
                  {`${percentage}%`}
                </div>}
            </div>
          </div>
        </div>
      );
    } else {
      progress = (
        <div
          className="el-progress-circle"
          style={{ height: `${width}px`, width: `${width}px` }}
        >
          <svg viewBox="0 0 100 100">
            <path
              className="el-progress-circle__track"
              d={this.trackPath()}
              stroke="#e5e9f2"
              strokeWidth={this.relativeStrokeWidth()}
              fill="none"
            />
            <path
              className="el-progress-circle__path"
              d={this.trackPath()}
              strokeLinecap="round"
              stroke={this.stroke()}
              strokeWidth={this.relativeStrokeWidth()}
              fill="none"
              style={this.circlePathStyle()}
            />
          </svg>
        </div>
      );
    }
    const progressInfo = showText &&
      !textInside &&
      <div
        className="el-progress__text"
        style={{ fontSize: `${this.progressTextSize()}px` }}
      >
        {status ? <i className={this.iconClass()} /> : `${percentage}%`}
      </div>;

    return (
      <div
        style={this.style()}
        className={this.className('el-progress', `el-progress--${type}`, {
          [`is-${status}`]: !!status,
          'el-progress--without-text': !showText,
          'el-progress--text-inside': textInside
        })}
      >
        {progress}
        {progressInfo}
      </div>
    );
  }
}

Progress.propTypes = {
  type: PropTypes.oneOf(['line', 'circle']),
  percentage: PropTypes.range(0, 100).isRequired,
  status: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
  textInside: PropTypes.bool,
  showText: PropTypes.bool
};

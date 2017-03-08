/* @flow */

import React from 'react';
import { Component } from '../../libs';

type Props = {
  title: string,
  icon: string,
  description: string,
  status: string,
  direction: string,
  style: Object,
  lineStyle: Object,
  stepNumber: number,
}

type StepDefaultProps = {
  status: string,
}

export default class Step extends Component {
  props: Props;

  static defaultProps: StepDefaultProps = {
    status: 'wait'
  }

  constructor(props: Props) {
    super(props);
  }

  render(): React.Element<any> {
    const { title, icon, description, status, direction, style, lineStyle, stepNumber } = this.props;
    const directionClass = `is-${direction}`;
    const statusClass = `is-${status}`;
    const iconNode = icon ? <i className={`el-icon-${icon}`}></i> : <div>{ stepNumber }</div>

    return (
      <div
        style={this.style(style)}
        className={this.className('el-step', directionClass)}>
        <div
          className={this.classNames('el-step__head', statusClass, {
            'is-text': !icon
          })}>
          <div
            className={this.classNames('el-step__line', directionClass, {
              'is-icon': icon
            })}>
            <i className="el-step__line-inner" style={lineStyle}></i>
          </div>
          <span className="el-step__icon">
            {(status !== 'success' && status !== 'error') ? iconNode : <i className={'el-icon-' + (status === 'success' ? 'check' : 'close')}></i>}
          </span>
        </div>
        <div className="el-step__main">
          <div
            ref="title"
            className={this.classNames('el-step__title', statusClass)}>
            {title}
          </div>
          <div
            className={this.classNames('el-step__description', statusClass)}>
            { description }
          </div>
        </div>
      </div>
    )
  }
}

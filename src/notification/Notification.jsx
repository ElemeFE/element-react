/* @flow */

import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

const typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

type State = {
  visible: boolean
};

export default class Notification extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.setState({ visible: true });
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  onClose() {
    this.stopTimer();

    this.setState({
      visible: false
    });
  }

  startTimer() {
    if (this.props.duration) {
      this.timeout = setTimeout(() => {
        this.onClose();
      }, this.props.duration)
    }
  }

  stopTimer() {
    clearTimeout(this.timeout);
  }

  typeClass(): string {
    return this.props.type && typeMap[this.props.type] ? `el-icon-${ typeMap[this.props.type] }` : '';
  }

  render() {
    return (
      <Transition
        name="el-notification-fade"
        onAfterEnter={() => { this.offsetHeight = this.rootDOM.offsetHeight; }}
        onLeave={() => { this.props.onClose && this.props.onClose() }}
        onAfterLeave={() => { this.props.willUnmount(this.offsetHeight, parseInt(this.rootDOM.style.top)) }}
      >
        <View show={this.state.visible}>
          <div
            ref={(ele) => { this.rootDOM = ele; }}
            className="el-notification"
            style={{
                top: this.props.top,
                zIndex: 9999
            }}
            onMouseEnter={this.stopTimer.bind(this)}
            onMouseLeave={this.startTimer.bind(this)}
            onClick={this.onClick.bind(this)}
          >
            {
              this.props.type && <i className={this.classNames('el-notification__icon', this.typeClass(), this.props.iconClass)} />
            }
            <div className={this.classNames('el-notification__group', {
              'is-with-icon': this.typeClass() || this.props.iconClass
            })}>
              <h2 className="el-notification__title">{this.props.title}</h2>
              <div className="el-notification__content">{this.props.message}</div>
              <div className="el-notification__closeBtn el-icon-close" onClick={this.onClose.bind(this)}></div>
            </div>
          </div>
        </View>
      </Transition>
    )
  }
}

Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  duration: PropTypes.number,
  iconClass: PropTypes.string,
  onClick: PropTypes.func,
  top: PropTypes.number
}

Notification.defaultProps = {
  duration: 4500,
  top: 16
}

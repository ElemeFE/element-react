/* @flow */

import * as React from 'react';
import { Component, PropTypes, Animate, View } from '../../libs';

const { Transition } = Animate

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
    this.state = { visible: true };
  }

  componentDidMount() {
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
    this.setState({ visible: false }, () => this.stopTimer());
  }

  startTimer() {
    const { duration } = this.props
    if (duration) {
      this.timeout = setTimeout(() => this.onClose(), duration)
    }
  }

  stopTimer() {
    clearTimeout(this.timeout);
  }

  typeClass(): string {
    const { type } = this.props
    return type && typeMap[type] ? `el-icon-${ typeMap[type] }` : '';
  }

  render() {
    const { visible } = this.state
    const { onClose = () => false, willUnmount, duration, top, type, iconClass, title, message } = this.props
    return (
      <Transition
        unmountOnExit
        transitionClass={{
          exiting: 'el-notification-fade-leave-active',
          exited: 'el-notification-fade-enter'
        }}
        in={visible}
        onEnter={() => {
          this.offsetHeight = this.rootDOM.offsetHeight;
        }}
        onExit={() => willUnmount(this.offsetHeight, parseInt(this.rootDOM.style.top))}
        onExited={() => onClose()}
      >
        <View show={visible}>
          <div
            ref={(ele) => { this.rootDOM = ele; }}
            className="el-notification"
            style={{
              top,
              zIndex: 9999
            }}
            onMouseEnter={this.stopTimer.bind(this)}
            onMouseLeave={this.startTimer.bind(this)}
            onClick={this.onClick.bind(this)}
          >
            {
              type && (
                <i className={this.classNames('el-notification__icon', this.typeClass(), iconClass)} />
              )
            }
            <div
              className={
                this.classNames('el-notification__group', {
                  'is-with-icon': this.typeClass() || iconClass
                })
              }
            >
              <h2 className="el-notification__title">{title}</h2>
              <div className="el-notification__content">{message}</div>
              <div className="el-notification__closeBtn el-icon-close" onClick={this.onClose.bind(this)} />
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

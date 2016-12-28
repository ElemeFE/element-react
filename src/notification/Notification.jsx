import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

const typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

export default class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.setState({
      visible: true
    })

    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  onClose() {
    this.stopTimer();

    this.setState({
      visible: false
    }, () => {
      this.props.willUnmount();
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

  typeClass() {
    return this.props.type && typeMap[this.props.type] ? `el-icon-${ typeMap[this.props.type] }` : '';
  }

  render() {
    return (
      <Transition name="el-notification-fade" duration="300">
        <View key={this.state.visible} show={this.state.visible}>
          <div className="el-notification" style={{
              top: this.props.top,
              zIndex: 9999
          }} onMouseEnter={this.stopTimer.bind(this)} onMouseLeave={this.startTimer.bind(this)}>
            {
              this.props.type && <i className={this.classNames('el-notification__icon', this.typeClass())} />
            }
            <div className="el-notification__group" style={{
              marginLeft: this.typeClass() ? '55px' : '0'
            }}>
              <span>{this.props.title}</span>
              <p>{this.props.message}</p>
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
  message: PropTypes.string,
  duration: PropTypes.number,
  top: PropTypes.number
}

Notification.defaultProps = {
  duration: 4500,
  top: 16
}

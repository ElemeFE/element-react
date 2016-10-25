import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

const icons = {
  error: require('./assets/error.svg'),
  info: require('./assets/info.svg'),
  success: require('./assets/success.svg'),
  warning: require('./assets/warning.svg')
}

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

  render() {
    return (
      <View show={this.state.visible} transition="el-message-fade">
        <div className="el-message" onMouseEnter={this.stopTimer.bind(this)} onMouseLeave={this.startTimer.bind(this)}>
          <img className="el-message__icon" src={icons[this.props.type]} />
          <div className="el-message__group">
            <p>{this.props.message}</p>
            <View if={this.props.showClose}>
              <div className="el-message__closeBtn el-icon-close" onClick={this.onClose.bind(this)}></div>
            </View>
          </div>
        </div>
      </View>
    )
  }

  startTimer() {
    this.timeout = setTimeout(() => {
      this.onClose();
    }, this.props.duration)
  }

  stopTimer() {
    clearTimeout(this.timeout);
  }

  onClose() {
    this.stopTimer();

    this.setState({
      visible: false
    });
  }
}

Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  showClose: PropTypes.bool,
  onClose: PropTypes.func
}

Notification.defaultProps = {
  type: 'info',
  duration: 3000,
  showClose: false
}

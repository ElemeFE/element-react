import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

const icons = {
  error: require('./assets/error.svg'),
  info: require('./assets/info.svg'),
  success: require('./assets/success.svg'),
  warning: require('./assets/warning.svg')
}

export default class Toast extends Component {
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
    this.timeout = setTimeout(() => {
      this.onClose();
    }, this.props.duration)
  }

  stopTimer() {
    clearTimeout(this.timeout);
  }

  render() {
    const { iconClass, customClass } = this.props;

    return (
      <Transition name="el-message-fade" duration="300">
        <View key={this.state.visible} show={this.state.visible}>
          <div className={this.classNames('el-message', customClass)} onMouseEnter={this.stopTimer.bind(this)} onMouseLeave={this.startTimer.bind(this)}>
            { !iconClass && <img className="el-message__img" src={icons[this.props.type]} /> }
            <div className={this.classNames('el-message__group', { 'is-with-icon': iconClass })}>
              { iconClass && <i className={this.classNames('el-message__icon', iconClass)}></i> }
              <p>{this.props.message}</p>
              { this.props.showClose && <div className="el-message__closeBtn el-icon-close" onClick={this.onClose.bind(this)}></div> }
            </div>
          </div>
        </View>
      </Transition>
    )
  }
}

Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  showClose: PropTypes.bool,
  customClass: PropTypes.string,
  iconClass: PropTypes.string
}

Toast.defaultProps = {
  type: 'info',
  duration: 3000,
  showClose: false
}

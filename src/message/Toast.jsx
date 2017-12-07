/* @flow */

import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';
import icons from './assets';

type State = {
  visible: boolean
};

export default class Toast extends Component {
  state: State;

  constructor(props: Object) {
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
    });
  }

  startTimer() {
		if (this.props.duration > 0) {
			this.timeout = setTimeout(() => {
				this.onClose();
			}, this.props.duration)
		}
  }

  stopTimer() {
    clearTimeout(this.timeout);
  }

  render() {
    const { iconClass, customClass } = this.props;

    return (
      <Transition name="el-message-fade" onAfterLeave={() => { this.props.willUnmount(); }}>
        <View show={this.state.visible}>
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
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
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

/* @flow */

import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

type State = {
  visible: boolean
};

const TYPE_CLASSES_MAP: {[type: string]: string} = {
  'success': 'el-icon-circle-check',
  'warning': 'el-icon-warning',
  'error': 'el-icon-circle-cross'
};

export default class Alert extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      visible: true
    };
  }

  close() {
    this.setState({
      visible: false
    });
  }

  onAfterLeave() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <Transition name="el-alert-fade" onAfterLeave={this.onAfterLeave.bind(this)}>
        <View show={this.state.visible}>
          <div style={this.style()} className={this.className('el-alert', `el-alert--${ this.props.type }`)}>
            {
              this.props.showIcon && <i className={this.classNames('el-alert__icon', TYPE_CLASSES_MAP[this.props.type] || 'el-icon-information', {
                'is-big': this.props.description
              })} />
            }
            <div className="el-alert__content">
              {
                this.props.title && (
                  <span className={this.classNames('el-alert__title', {
                    'is-bold': this.props.description
                  })}>{this.props.title}</span>
                )
              }
              {
                this.props.description && <p className="el-alert__description">{this.props.description}</p>
              }
              <View show={this.props.closable}>
                <i className={this.classNames('el-alert__closebtn', this.props.closeText ? 'is-customed' : 'el-icon-close')} onClick={this.close.bind(this)}>{this.props.closeText}</i>
              </View>
            </div>
          </div>
        </View>
      </Transition>
    )
  }
}

Alert.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string,
  closable: PropTypes.bool,
  closeText: PropTypes.string,
  showIcon: PropTypes.bool
}

Alert.defaultProps = {
  type: 'info',
  closable: true
};

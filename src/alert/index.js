import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

const TYPE_CLASSES_MAP = {
  'success': 'el-icon-circle-check',
  'warning': 'el-icon-warning',
  'error': 'el-icon-circle-cross'
};

export default class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };
  }

  render() {
    return (
      <View show={this.state.visible}>
        <div className={this.computedClassName('el-alert', `el-alert--${ this.props.type }`)}>
          <View if={this.props.showIcon}>
            <i className={this.computedClassName('el-alert__icon', TYPE_CLASSES_MAP[this.props.type] || 'el-icon-information', this.props.description && 'is-big')}></i>
          </View>
          <div className="el-alert__content">
            <View if={this.props.title}>
              <span className={this.computedClassName('el-alert__title', this.props.description && 'is-bold')}>{this.props.title}</span>
            </View>
            <View if={this.props.description}>
              <p className="el-alert__description">{this.props.description}</p>
            </View>
            <View show={this.props.closable}>
              <i className={this.computedClassName('el-alert__closebtn', this.props.closeText ? 'is-customed' : 'el-icon-close')} onClick={this.close.bind(this)}>{this.props.closeText}</i>
            </View>
          </div>
        </div>
      </View>
    )
  }

  close() {
    this.setState({
      visible: false
    });

    if (this.props.onClose) {
      this.props.onClose();
    }
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

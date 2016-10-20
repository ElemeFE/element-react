import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

class Group extends Component {
  render() {
    return (
      <div className="el-button-group">
        {this.props.children}
      </div>
    )
  }
}

export default class Button extends Component {
  render() {
    return (
      <button className={this.computedClassName('el-button', this.props.type && `el-button-${this.props.type}`, this.props.size && `el-button-${this.props.size}`, this.props.disabled && 'is-disabled', this.props.loading && 'is-loading', this.props.plain && 'is-plain')} disabled={this.props.disabled} type={this.props.nativeType}>
        <View if={this.props.loading}>
          <i className="el-icon-loading"></i>
        </View>
        <View if={this.props.icon && !this.props.loading}>
          <i className={`el-icon-${this.props.icon}`}></i>
        </View>
        {this.props.children}
      </button>
    )
  }
}

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
  nativeType: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  plain: PropTypes.bool
}

Button.defaultProps = {
  type: 'default',
  nativeType: 'button',
  loading: false,
  disabled: false,
  plain: false
};

Button.Group = Group;

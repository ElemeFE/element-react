import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

import Group from './group';

export default class Button extends Component {
  render() {
    return (
      <button className={this.classNames('el-button', this.props.type && `el-button-${this.props.type}`, this.props.size && `el-button-${this.props.size}`, {'is-disabled': this.props.disabled}, {'is-loading': this.props.loading}, {'is-plain': this.props.plain})} disabled={this.props.disabled} type={this.props.nativeType} onClick={this.onClick.bind(this)}>
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

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
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

/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Button extends Component {
  onClick(e: SyntheticEvent): void {
    if (!this.props.loading) {
      this.props.onClick && this.props.onClick(e);
    }
  }

  render(): React.Element<any> {
    return (
      <button style={this.style()} className={this.className('el-button', this.props.type && `el-button--${this.props.type}`, this.props.size && `el-button--${this.props.size}`, {
          'is-disabled': this.props.disabled,
          'is-loading': this.props.loading,
          'is-plain': this.props.plain
      })} disabled={this.props.disabled} type={this.props.nativeType} onClick={this.onClick.bind(this)}>
        { this.props.loading && <i className="el-icon-loading" /> }
        { this.props.icon && !this.props.loading && <i className={`el-icon-${this.props.icon}`} /> }
        <span>{this.props.children}</span>
      </button>
    )
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

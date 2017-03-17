/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class DropdownItem extends Component {
  handleClick(): void {
    this.context.component.handleMenuItemClick(this.props.command, this);
  }

  render(): React.Element<any> {
    const { disabled, divided } = this.props;

    return (
      <li
        style={this.style()}
        className={this.className('el-dropdown-menu__item', {
          'is-disabled': disabled,
          'el-dropdown-menu__item--divided': divided
        })} onClick={this.handleClick.bind(this)}
      >
        { this.props.children }
      </li>
    )
  }
}

DropdownItem.contextTypes = {
  component: PropTypes.any
};

DropdownItem.propTypes = {
  command: PropTypes.string,
  disabled: PropTypes.bool,
  divided: PropTypes.bool,
};

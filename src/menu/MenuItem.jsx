/* @flow */

import React from 'react';
import { PropTypes } from '../../libs';

import MixinComponent from './MixinComponent';

export default class MenuItem extends MixinComponent {
  instanceType: string;

  constructor(props: Object) {
    super(props);

    this.instanceType = 'MenuItem';
  }

  componentDidMount() {
    this.rootMenu().state.menuItems[this.props.index] = this;
  }

  handleClick(): void {
    this.rootMenu().handleSelect(
      this.props.index,
      this.indexPath(),
      this
    );
  }

  active(): boolean {
    return this.props.index === this.rootMenu().state.activeIndex;
  }

  render(): React.Element<any> {
    return (
      <li
        style={this.style()}
        className={this.className("el-menu-item", {
          'is-active': this.active(),
          'is-disabled': this.props.disabled
        })}
        onClick={this.handleClick.bind(this)}
      >
        {this.props.children}
      </li>
    )
  }
}

MenuItem.propTypes = {
  index: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

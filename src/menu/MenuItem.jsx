import React from 'react';
import { PropTypes } from '../../libs';

import MixinComponent from './MixinComponent';

export default class MenuItem extends MixinComponent {
  constructor(props) {
    super(props);

    this.instanceType = 'MenuItem';
  }

  componentDidMount() {
    this.rootMenu().state.menuItems[this.props.index] = this;
  }

  handleClick() {
    this.rootMenu().handleSelect(
      this.props.index,
      this.indexPath(),
      this.props.route || this.props.index,
      this
    );
  }

  active() {
    return this.props.index === this.rootMenu().state.activeIndex;
  }

  render() {
    return (
      <li
        className={this.classNames("el-menu-item", {
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
  route: PropTypes.object,
  disabled: PropTypes.bool
};

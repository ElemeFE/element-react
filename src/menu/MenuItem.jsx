import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class MenuItem extends Component {
  handleClick() {
    this.context.onSelect(
      this.props.index,
      this.indexPath,
      this.props.route || this.props.index,
      this
    );
  }

  active() {
    return this.props.index === this.context.activeIndex;
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

MenuItem.defaultProps = {

}

MenuItem.contextTypes = {
  activeIndex: PropTypes.string,
  onSelect: PropTypes.func
};

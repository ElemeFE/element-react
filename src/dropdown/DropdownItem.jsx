import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class DropdownItem extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {

  }

  render() {
    const { disabled, divided } = this.props;
    return (
      <li
        className={this.classNames({
          'el-dropdown-menu__item': true,
          'is-disabled': disabled,
          'el-dropdown-menu__item--divided': divided
        })}
        onClick={() => this.handleClick()}
      >
        { this.props.children }
      </li>
    )
  }
}

DropdownItem.propTypes = {
  disabled: PropTypes.bool,
  divided: PropTypes.bool,
}

DropdownItem.defaultProps = {

}

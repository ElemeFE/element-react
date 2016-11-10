import React, { PropTypes } from 'react';
import { Component, Transition, View } from '../../libs';

export default class DropdownMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Transition name="md-fade-bottom">
        {/* <View show={}>
          <ul className="el-dropdown-menu">
          {this.props.children}
          </ul>
        </View> */}
      </Transition>
    )
  }
}

DropdownMenu.propTypes = {

}

DropdownMenu.defaultProps = {

}

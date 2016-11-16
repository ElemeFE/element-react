import React, { PropTypes } from 'react';
import { Component, Transition, View } from '../../libs';

export default class DropdownMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { visible } = this.props;
    return (
      <Transition name="md-fade-bottom">
        <View className="el-dropdown-menu" show={visible}>
          {this.props.children}
        </View>
      </Transition>
    )
  }
}

DropdownMenu.propTypes = {
  visible: PropTypes.bool,
}

DropdownMenu.defaultProps = {
}

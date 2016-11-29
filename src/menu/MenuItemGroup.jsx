import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class MenuItemGroup extends Component {
  constructor(props) {
    super(props);

    this.instanceType = 'MenuItemGroup';

    this.state = {
      paddingLeft: 20
    }
  }

  componentDidMount() {
    this.initPadding();
  }

  initPadding() {
    let level = 0, parent = this.parent(), component = parent.instanceType;

    while (component !== 'Menu') {
      if (component === 'SubMenu') {
        level++;
      }

      parent = parent.parent();
      component = parent.instanceType;
    }

    this.setState({
      paddingLeft: this.state.paddingLeft + level * 10
    });
  }

  parent() {
    return this.context.component;
  }

  render() {
    return (
      <li className="el-menu-item-group">
        <div className="el-menu-item-group__title" style={{
            paddingLeft: this.state.paddingLeft
        }}>{this.props.title}</div>
        <ul>
          {this.props.children}
        </ul>
      </li>
    )
  }
}

MenuItemGroup.contextTypes = {
  component: PropTypes.any
};

MenuItemGroup.propTypes = {
  title: PropTypes.string.isRequired
};

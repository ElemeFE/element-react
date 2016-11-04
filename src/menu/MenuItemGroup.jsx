import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class MenuItemGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paddingLeft: 20
    }
  }

  componentDidMount() {
    this.initPadding();
  }

  initPadding() {
    // var parent = this.$parent;
    // var level = 0;
    // var component = parent.$options.componentName;
    // while (component !== 'ElMenu') {
    //   if (component === 'ElSubmenu') {
    //     level++;
    //   }
    //   parent = parent.$parent;
    //   component = parent.$options.componentName;
    // }
    // this.paddingLeft += level * 10;
  }

  render() {
    return (
      <li className="el-menu-item-group">
        <div className="el-menu-item-group__title" style={{
            paddingLeft: this.state.paddingLeft + 'px'
        }}>{this.props.title}</div>
        <ul>
          {this.props.children}
        </ul>
      </li>
    )
  }
}

MenuItemGroup.propTypes = {
  title: PropTypes.string.isRequired
};

MenuItemGroup.defaultProps = {

}

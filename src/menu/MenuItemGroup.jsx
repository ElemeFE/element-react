/* @flow */

import React from 'react';
import { PropTypes } from '../../libs';

import MixinComponent from './MixinComponent';

type State = {
  paddingLeft: number
};

export default class MenuItemGroup extends MixinComponent {
  state: State;
  instanceType: string;

  constructor(props: Object) {
    super(props);

    this.instanceType = 'MenuItemGroup';

    this.state = {
      paddingLeft: 20
    }
  }

  componentDidMount() {
    this.initPadding();
  }

  initPadding(): void {
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

  render(): React.Element<any> {
    return (
      <li style={this.style()} className={this.className('el-menu-item-group')}>
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

MenuItemGroup.propTypes = {
  title: PropTypes.string.isRequired
};

/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes, View } from '../../libs';

import MixinComponent from './MixinComponent';

type State = {
  active: boolean
};

export default class SubMenu extends MixinComponent {
  state: State;
  instanceType: string;

  constructor(props: Object) {
    super(props);

    this.instanceType = 'SubMenu';

    this.state = {
      active: false
    };
  }

  getChildContext(): Object {
    return {
      component: this
    };
  }

  componentDidMount() {
    this.rootMenu().state.submenus[this.props.index] = this;
    this.initEvents();
  }

  onItemSelect(index: number, indexPath: Array<number>) {
    this.setState({
      active: indexPath.indexOf(this.props.index) !== -1
    });
  }

  handleClick() {
    this.rootMenu().handleSubmenuClick(this.props.index, this.indexPath());
  }

  handleMouseenter() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.rootMenu().openMenu(this.props.index, this.indexPath());
    }, 300);
  }

  handleMouseleave() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.rootMenu().closeMenu(this.props.index, this.indexPath());
    }, 300);
  }

  initEvents() {
    if (this.rootMenu().props.mode === 'horizontal' && this.rootMenu().props.menuTrigger === 'hover') {
      const triggerElm: any = ReactDOM.findDOMNode(this);

      triggerElm.addEventListener('mouseenter', this.handleMouseenter.bind(this));
      triggerElm.addEventListener('mouseleave', this.handleMouseleave.bind(this));
    } else {
      const triggerElm = this.refs['submenu-title'];

      triggerElm.addEventListener('click', this.handleClick.bind(this));
    }
  }

  opened(): boolean {
    return this.rootMenu().state.openedMenus.indexOf(this.props.index) !== -1;
  }

  render() {
    return (
      <li style={this.style()} className={this.className('el-submenu', {
        'is-active': this.state.active,
        'is-opened': this.opened()
      })}>
        <div ref="submenu-title" className="el-submenu__title">
          {this.props.title}
          <i className={this.classNames('el-submenu__icon-arrow', {
              'el-icon-arrow-down': this.rootMenu().props.mode === 'vertical',
              'el-icon-caret-bottom': this.rootMenu().props.mode === 'horizontal'
            })}>
          </i>
        </div>
        <View show={this.opened()}>
          <ul className="el-menu">{this.props.children}</ul>
        </View>
      </li>
    )
  }
}

SubMenu.childContextTypes = {
  component: PropTypes.any
};

SubMenu.propTypes = {
  index: PropTypes.string.isRequired
};

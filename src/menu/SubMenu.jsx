import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes, View } from '../../libs';

import MixinComponent from './MixinComponent';

export default class SubMenu extends MixinComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  getChildContext() {
    return {
      component: this
    };
  }

  componentDidMount() {
    this.rootMenu().state.submenus[this.props.index] = this;
    this.initEvents();
  }

  onItemSelect(index, indexPath) {
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
      const triggerElm = ReactDOM.findDOMNode(this);

      triggerElm.addEventListener('mouseenter', this.handleMouseenter.bind(this));
      triggerElm.addEventListener('mouseleave', this.handleMouseleave.bind(this));
    } else {
      const triggerElm = this.refs['submenu-title'];

      triggerElm.addEventListener('click', this.handleClick.bind(this));
    }
  }

  opened() {
    return this.rootMenu().state.openedMenus.indexOf(this.props.index) !== -1;
  }

  parent() {
    return this.context.component;
  }

  render() {
    return (
      <li className={this.classNames('el-submenu', {
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

SubMenu.contextTypes = {
  component: PropTypes.any
};

SubMenu.propTypes = {
  index: PropTypes.string.isRequired
};

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: props.defaultActive,
      openedMenus: props.defaultOpeneds ? props.defaultOpeneds.slice(0) : [],
      menuItems: {},
      submenus: {}
    }
  }

  getChildContext() {
    return {
      mode: this.props.mode,
      menuTrigger: this.props.menuTrigger,
      activeIndex: this.state.activeIndex,
      openedMenus: this.state.openedMenus,
      openMenu: this.openMenu.bind(this),
      closeMenu: this.closeMenu.bind(this),
      onSubMenuClick: this.onSubMenuClick.bind(this),
      onSelect: this.onSelect.bind(this)
    };
  }

  onSubMenuClick(index, indexPath) {
    let isOpened = this.state.openedMenus.indexOf(index) !== -1;

    if (isOpened) {
      this.closeMenu(index, indexPath);
      // this.$emit('close', index, indexPath);
    } else {
      this.openMenu(index, indexPath);
      // this.$emit('open', index, indexPath);
    }
  }

  onSelect(index, indexPath, route, instance) {
    let { activeIndex, openedMenus } = this.state;

    activeIndex = index;

    // this.$emit('select', index, indexPath, instance);

    if (this.props.mode === 'horizontal') {
      // this.broadcast('ElSubmenu', 'item-select', [index, indexPath]);
      openedMenus = [];
    } else {
      this.openActiveItemMenus();
    }

    // if (this.router && route) {
    //   try {
    //     this.$router.push(route);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }

    this.setState({ activeIndex, openedMenus });
  }

  openMenu(index, indexPath) {
    const { openedMenus } = this.state;

    if (openedMenus.indexOf(index) === -1) {
      // if (this.props.uniqueOpened) {
      //   this.state.openedMenus = this.state.openedMenus.filter(index => {
      //     return indexPath.indexOf(index) !== -1;
      //   });
      // }

      this.setState({
        openedMenus: openedMenus.concat(index)
      })
    }
  }

  closeMenu(index, indexPath) {
    const { openedMenus } = this.state;

    openedMenus.splice(openedMenus.indexOf(index), 1);

    this.setState({ openedMenus });
  }

  openActiveItemMenus() {
    let index = this.state.activeIndex;

    if (!this.state.menuItems[index]) return;
    if (index && this.props.mode === 'vertical') {
      let indexPath = this.sttae.menuItems[index].indexPath;
      // 展开该菜单项的路径上所有子菜单
      indexPath.forEach(index => {
        let submenu = this.state.submenus[index];
        submenu && this.openMenu(index, submenu.indexPath);
      });
    }
  }

  render() {
    return (
      <ul
        className={this.classNames("el-menu", {
          'el-menu--horizontal': this.props.mode === 'horizontal',
          'el-menu--dark': this.props.theme === 'dark'
        })}
      >
        {this.props.children}
      </ul>
    )
  }
}

Menu.childContextTypes = {
  mode: PropTypes.string,
  activeIndex: PropTypes.string,
  menuTrigger: PropTypes.string,
  openedMenus: PropTypes.array,
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func,
  onSubMenuClick: PropTypes.func,
  onSelect: PropTypes.func
};

Menu.propTypes = {
  mode: PropTypes.string,
  defaultActive: PropTypes.string,
  defaultOpeneds: PropTypes.array,
  theme: PropTypes.string,
  uniqueOpened: PropTypes.bool,
  router: PropTypes.bool,
  menuTrigger: PropTypes.string
};

Menu.defaultProps = {
  mode: 'vertical',
  theme: 'light',
  menuTrigger: 'hover'
}

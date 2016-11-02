import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

export default class SubMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.updateActive(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateActive(props);
  }

  onClick() {
    if (!this.mouseEvent()) {
      this.context.onSubMenuClick(this.props.index, this.indexPath);
    }
  }

  onMouseEnter() {
    if (this.mouseEvent()) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.context.openMenu(this.props.index, this.indexPath);
      }, 300);
    }
  }

  onMouseLeave() {
    if (this.mouseEvent()) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.context.closeMenu(this.props.index, this.indexPath);
      }, 300);
    }
  }

  mouseEvent() {
    return this.context.mode === 'horizontal' && this.context.menuTrigger === 'hover';
  }

  updateActive(props) {
    this.setState({
      active: props.index === this.context.activeIndex
    })
  }

  opened() {
    return this.context.openedMenus.indexOf(this.props.index) !== -1;
  }

  render() {
    return (
      <li className={this.classNames({
        'el-submenu': true,
        'is-active': this.state.active,
        'is-opened': this.opened()
      })} onClick={this.onClick.bind(this)} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
        <div className="el-submenu__title">
          {this.props.title}
          <i className={this.classNames({
              'el-submenu__icon-arrow': true,
              'el-icon-arrow-down': this.context.mode === 'vertical',
              'el-icon-caret-bottom': this.context.mode === 'horizontal'
            })}>
          </i>
        </div>
        <Transition component="span" className="el-menu" style={{
            display: this.opened() ? 'block' : 'none'
          }} name={this.context.mode === 'horizontal' ? 'md-fade-bottom' : ''}>
          <ul>{this.props.children}</ul>
        </Transition>
      </li>
    )
  }
}

SubMenu.propTypes = {
  index: PropTypes.string.isRequired,
  title: PropTypes.any
};

SubMenu.defaultProps = {

}

SubMenu.contextTypes = {
  mode: PropTypes.string,
  menuTrigger: PropTypes.string,
  openedMenus: PropTypes.array,
  onSubMenuClick: PropTypes.func,
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func
};

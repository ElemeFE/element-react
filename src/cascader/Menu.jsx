/* @flow */

import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

type State = {
  inputWidth: number,
  options: [],
  props: {},
  visible: boolean,
  activeValue: any,
  value: [],
  expandTrigger: string,
  changeOnSelect: boolean,
  popperClass: string
};

export default class CascaderMenu extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      inputWidth: 0,
      options: [],
      props: {},
      visible: false,
      activeValue: [],
      value: [],
      expandTrigger: 'click',
      changeOnSelect: false,
      popperClass: ''
    }
  }

  parent() {
    return this.context.component;
  }

  componentDidMount() {
    this.parent().initMenu(this);
  }

  componentDidUpdate(props: Object, state: State) {
    if (state.value !== this.state.value || state.visible !== this.state.visible) {
      this.setState({ activeValue: this.state.value });
    }
  }

  select(item: any, menuIndex: number) {
    let {activeValue} = this.state
    if (item.__IS__FLAT__OPTIONS) {
      activeValue = item.value;
    } else {
      if (!menuIndex) {
        activeValue = [item.value];
      } else {
        activeValue.splice(menuIndex, activeValue.length - 1, item.value);
      }
    }

    this.forceUpdate();
    this.parent().handlePick(activeValue);
  }

  handleMenuLeave() {
  }

  activeItem(item: any, menuIndex: number) {
    const activeOptions = this.activeOptions();

    this.state.activeValue.splice(menuIndex, activeOptions.length, item.value);

    this.forceUpdate();

    if (this.parent().props.changeOnSelect) {
      this.parent().handlePick(this.state.activeValue, false);
    } else {
      this.parent().handleActiveItemChange(this.state.activeValue);
    }
  }

  /* Computed Methods */

  activeOptions(): [] {
    const activeValue = this.state.activeValue;
    const configurableProps = ['label', 'value', 'children', 'disabled'];
    const formatOptions = (options: any) => {
      options.forEach(option => {
        if (option.__IS__FLAT__OPTIONS) return;
        configurableProps.forEach(prop => {
          const value = option[this.parent().props.props[prop] || prop];
          if (value) option[prop] = value;
        });
        if (Array.isArray(option.children)) {
          formatOptions(option.children);
        }
      });
    };
    const loadActiveOptions = (options: any, activeOptions: any = []): [] => {
      const level = activeOptions.length;
      activeOptions[level] = options;
      let active = activeValue[level];
      if (active) {
        options = options.filter(option => option.value === active)[0];
        if (options && options.children) {
          loadActiveOptions(options.children, activeOptions);
        }
      }
      return activeOptions;
    };

    formatOptions(this.state.options);

    return loadActiveOptions(this.state.options);
  }

  render() {
    const { expandTrigger, popperClass } = this.parent().props;
    const { activeValue, visible } = this.state;
    const activeOptions = this.activeOptions();

    const menus = activeOptions.map((menu, menuIndex) => {
      let isFlat = false;

      const items = menu.map((item, index) => {
        const events = {};

        if (item.__IS__FLAT__OPTIONS) isFlat = true;

        if (!item.disabled) {
          if (item.children) {
            let triggerEvent = {
              click: 'onClick',
              hover: 'onMouseEnter'
            }[expandTrigger];
            events[triggerEvent] = () => { this.activeItem(item, menuIndex); };
          } else {
            events.onClick = () => { this.select(item, menuIndex); };
          }
        }

        return (
          <li key={index} className={this.classNames({
              'el-cascader-menu__item': true,
              'el-cascader-menu__item--extensible': item.children,
              'is-active': item.value === activeValue[menuIndex],
              'is-disabled': item.disabled
            })}
            {...events}
          >
            {item.label}
          </li>
        );
      });

      let menuStyle = {};

      if (isFlat) {
        menuStyle.minWidth = this.inputWidth + 'px';
      }

      return (
        <ul key={menuIndex} className={this.classNames({
          'el-cascader-menu': true,
          'el-cascader-menu--flexible': isFlat
        })} style={menuStyle}>
          {items}
        </ul>
      );
    });

    return (
      <Transition name="el-zoom-in-top">
        <View show={visible}>
          <div className={this.classNames('el-cascader-menus', popperClass)}>
            {menus}
          </div>
        </View>
      </Transition>
    );
  }
}

CascaderMenu.contextTypes = {
  component: PropTypes.any
};

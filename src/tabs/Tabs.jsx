/* @flow */

import React from 'react';
import { Component, PropTypes, View } from '../../libs';

type Props = {
  children: React.Element<any>,
  type: 'card' | 'border-card',
  activeName: string,
  value: string,
  closable: boolean,
  addable: boolean,
  editable: boolean,
  onTabClick: Function,
  onTabRemove: Function,
  onTabAdd: Function,
  onTabEdit: Function,
}

type State = {
  children: Array<any>,
  currentName: string,
  barStyle: Object,
  navStyle: Object,
  scrollable: boolean,
  scrollNext: boolean,
  scrollPrev: boolean,
}

export default class Tabs extends Component {
  props: Props;
  state: State;

  constructor(props: Props): void {
    super(props);

    let { children, activeName, value } = props;

    children = React.Children.toArray(children);

    this.state = {
      children: children,
      currentName: value || activeName || children[0].props.name,
      barStyle: {},
      navStyle: {
        transform: '',
      },
      scrollable: false,
      scrollNext: false,
      scrollPrev: false,
    };
  }

  componentDidMount(): void {
    this.calcBarStyle(true);
    this.update();
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (prevState.scrollable !== this.state.scrollable) {
      this.scrollToActiveTab();
    }
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.activeName !== this.props.activeName) {
      this.setState({
        currentName: nextProps.activeName,
      }, () => this.calcBarStyle());
    }

    if (nextProps.value !== this.props.value) {
      this.setState({
        currentName: nextProps.value,
      }, () => this.calcBarStyle());
    }

    if (nextProps.children !== this.props.children) {
      this.setState({
        children: React.Children.toArray(nextProps.children),
      }, () => this.update());
    }
  }

  handleTabAdd(): void {
    const { onTabAdd, onTabEdit } = this.props;

    onTabEdit && onTabEdit('add');
    onTabAdd && onTabAdd();
  }

  handleTabRemove(tab: React.Element<any>, index: number, e: SyntheticEvent): void {
    const { children, currentName } = this.state;
    const { onTabRemove, onTabEdit } = this.props;

    e.stopPropagation();

    if (children[index].props.name === currentName) {
      const nextChild = children[index + 1];
      const prevChild = children[index - 1];

      this.setState({
        currentName: nextChild ? nextChild.props.name : prevChild ? prevChild.props.name : '-1',
      });
    }

    children.splice(index, 1);

    this.setState({
      children
    }, () => {
      onTabEdit && onTabEdit('remove', tab);
      onTabRemove && onTabRemove(tab, e);
    });
  }

  handleTabClick(tab: React.Element<any>, e: SyntheticEvent): void | boolean {
    if (tab.props.disabled) {
      return false;
    }

    this.setState({
      currentName: tab.props.name,
    }, () => {
      const { onTabClick } = this.props;

      this.calcBarStyle();
      this.scrollToActiveTab();
      onTabClick && onTabClick(tab, e);
    });
  }

  calcBarStyle(firstRendering?: boolean): void | Object {
    if (this.props.type || !this.tabs.length ) return {};

    let style = {};
    let offset = 0;
    let tabWidth = 0;
    let children = this.state.children instanceof Array ? this.state.children : [this.state.children];

    children.every((item, index) => {
      let $el = this.tabs[index];

      if (item.props.name !== this.state.currentName) {
        offset += $el.clientWidth;
        return true;
      } else {
        tabWidth = $el.clientWidth;
        return false;
      }
    })

    style.width = tabWidth + 'px';
    style.transform = `translateX(${offset}px)`;

    if (!firstRendering) {
      style.transition = 'transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1)';
    }

    this.setState({
      barStyle: style,
    });
  }

  scrollPrev(): void {
    const containerWidth = this.refs.navScroll.offsetWidth;
    const currentOffset = this.getCurrentScrollOffset();
    if (!currentOffset) return;
    let newOffset = currentOffset > containerWidth
      ? currentOffset - containerWidth
      : 0;
    this.setOffset(newOffset);
  }

  scrollNext(): void {
    const navWidth = this.refs.nav.offsetWidth;
    const containerWidth = this.refs.navScroll.offsetWidth;
    const currentOffset = this.getCurrentScrollOffset();
    if (navWidth - currentOffset <= containerWidth) return;
    let newOffset = navWidth - currentOffset > containerWidth * 2
      ? currentOffset + containerWidth
      : (navWidth - containerWidth);
    this.setOffset(newOffset);
  }

  scrollToActiveTab(): void {
    if (!this.state.scrollable) return;

    const nav = this.refs.nav;
    const activeTab = nav.querySelector('.is-active');
    const navScroll = this.refs.navScroll;
    const activeTabBounding = activeTab.getBoundingClientRect();
    const navScrollBounding = navScroll.getBoundingClientRect();
    const navBounding = nav.getBoundingClientRect();
    const currentOffset = this.getCurrentScrollOffset();
    let newOffset = currentOffset;

    if (activeTabBounding.left < navScrollBounding.left) {
      newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
    }

    if (activeTabBounding.right > navScrollBounding.right) {
      newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
    }

    if (navBounding.right < navScrollBounding.right) {
      newOffset = nav.offsetWidth - navScrollBounding.width;
    }

    this.setOffset(Math.max(newOffset, 0));
  }

  getCurrentScrollOffset(): number {
    const { navStyle } = this.state;
    return navStyle.transform
      ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1])
      : 0;
  }

  setOffset(value: number): void {
    this.setState({
      navStyle: {
        transform: `translateX(-${value}px)`,
      }
    });
  }

  update(): void {
    const navWidth = this.refs.nav.offsetWidth;
    const containerWidth = this.refs.navScroll.offsetWidth;
    const currentOffset = this.getCurrentScrollOffset();

    if (containerWidth < navWidth) {
      const currentOffset = this.getCurrentScrollOffset();
      this.setState({
        scrollable: true,
        scrollablePrev: currentOffset,
        scrollableNext: currentOffset + containerWidth < navWidth,
      });

      if (navWidth - currentOffset < containerWidth) {
        this.setOffset(navWidth - containerWidth);
      }
    } else {
      this.setState({
        scrollable: false,
      })

      if (currentOffset > 0) {
        this.setOffset(0);
      }
    }
  }

  render(): React.Element<any> {
    const { children, currentName, barStyle, navStyle, scrollable, scrollNext, scrollPrev } = this.state;
    const { type, addable, closable, editable } = this.props;
    const tabsCls = this.classNames({
      'el-tabs': true,
      'el-tabs--card': type === 'card',
      'el-tabs--border-card': type === 'border-card',
    });
    const addButton = editable || addable
      ? (
        <span
          className="el-tabs__new-tab"
          onClick={() => this.handleTabAdd()}
        >
          <i className="el-icon-plus"></i>
        </span>
      )
      : null;
    const scrollBtn = scrollable
      ? [
        (<span key="el-tabs__nav-prev"
          className={scrollable.prev ? 'el-tabs__nav-prev' : 'el-tabs__nav-prev is-disabled'}
          onClick={() => this.scrollPrev()}
        >
          <i className="el-icon-arrow-left"></i>
        </span>),
        (<span key="el-tabs__nav-next"
          className={scrollable.next ? 'el-tabs__nav-next' : 'el-tabs__nav-next is-disabled'}
          onClick={() => this.scrollNext()}
        >
          <i className="el-icon-arrow-right"></i>
        </span>)
      ]
      : null;
    this.tabs = [];

    return (
      <div style={this.style()} className={this.className(tabsCls)}>
        <div className="el-tabs__header">
          {addButton}
          <div className={scrollable ? 'el-tabs__nav-wrap is-scrollable' : 'el-tabs__nav-wrap'}>
            {scrollBtn}
            <div className="el-tabs__nav-scroll" ref="navScroll">
              <div className="el-tabs__nav" ref="nav" style={navStyle}>
                {
                  React.Children.map(children, (item, index) => {
                    const { name, label, disabled } = item.props;
                    const tabCls = this.classNames({
                      'el-tabs__item': true,
                      'is-active': name === currentName,
                      'is-disabled': disabled,
                      'is-closable': closable || item.props.closable,
                    });

                    return (
                      <div key={ `el-tabs__item-${index}` } ref={ (tab) => tab && this.tabs.push(tab) } name={ name } className={ tabCls } onClick={ (e) => this.handleTabClick(item, e) }>
                        { label }
                        <View show={ editable || closable || item.props.closable }>
                          <span className="el-icon-close" onClick={ (e) => this.handleTabRemove(item, index, e) }></span>
                        </View>
                      </div>
                    )
                  })
                }
                <View show={ !type }>
                  <div className="el-tabs__active-bar" style={ barStyle }></div>
                </View>
              </div>
            </div>
          </div>
        </div>
        <div className="el-tabs__content">
          {
            React.Children.map(children, item => {
              const { name } = item.props;

              // let transitionName = '';
              //
              // if (name === currentName) {
              //   transitionName = 'slideInRight';
              // }

              return (
                <View show={ name === currentName }>
                  { item }
                </View>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  type: PropTypes.oneOf(['card', 'border-card']),
  activeName: PropTypes.string,
  value: PropTypes.string,
  closable: PropTypes.bool,
  addable: PropTypes.bool,
  editable: PropTypes.bool,
  onTabClick: PropTypes.func,
  onTabRemove: PropTypes.func,
  onTabAdd: PropTypes.func,
  onTabEdit: PropTypes.func,
}

Tabs.defaultProps = {
  closable: false,
  addable: false,
  edidable: false,
}

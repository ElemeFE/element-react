import React from 'react';
import { Component, PropTypes, View } from '../../libs';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    const { children, activeName } = props;

    this.state = {
      children: children instanceof Array ? children : [children],
      currentName: activeName || children[0].props.name,
      barStyle: {},
    };
  }

  componentDidMount() {
    this.calcBarStyle(true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeName !== this.props.activeName) {
      this.setState({
        currentName: nextProps.activeName,
      }, () => this.calcBarStyle());
    }
  }

  handleTabRemove(tab, index, e) {
    const { children, currentName } = this.state;
    const { tabRemove } = this.props;

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
      tabRemove && tabRemove(tab, e);
    });
  }

  handleTabClick(tab, e) {
    this.setState({
      currentName: tab.props.name,
    }, () => {
      const { tabClick } = this.props;

      this.calcBarStyle();
      tabClick && tabClick(tab, e);
    });
  }

  calcBarStyle(firstRendering) {
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

  render() {
    const { children, currentName, barStyle } = this.state;
    const { type, closable, disabled } = this.props;
    const tabsCls = this.classNames({
      'el-tabs': true,
      'el-tabs--card': type === 'card',
      'el-tabs--border-card': type === 'border-card',
    });
    this.tabs = [];

    return (
      <div className={ tabsCls }>
        <div className="el-tabs__header">
          {
            React.Children.map(children, (item, index) => {
              const { name, label } = item.props;
              const tabCls = this.classNames({
                'el-tabs__item': true,
                'is-active': name === currentName,
                'is-disabled': disabled,
                'is-closable': closable,
              });

              return (
                <div key={ `el-tabs__item-${index}` } ref={ (tab) => tab && this.tabs.push(tab) } name={ name } className={ tabCls } onClick={ (e) => this.handleTabClick(item, e) }>
                  { label }
                  <View show={ closable }>
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
        <div className="el-tabs__content">
          {
            React.Children.map(children, (item, index) => {
              const { name } = item.props;
              let transitionName = '';

              if (name === currentName) {
                transitionName = 'slideInRight';
              }

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
  closable: PropTypes.bool,
  activeName: PropTypes.string,
  tabClick: PropTypes.func,
  tabRemove: PropTypes.func,
}

Tabs.defaultProps = {
  closable: false,
}

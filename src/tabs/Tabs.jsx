import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentName: '1',
      barStyle: {},
    };
  }

  componentDidMount() {
    this.calcBarStyle(true);
  }

  shouldComponentUpdate() {

  }
  
  handleTabRemove() {
    
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
    if (this.props.type || !this.tabs.length  ) return {};

    let style = {};
    let offset = 0;
    let tabWidth = 0;

    this.props.children.every((item, index) => {
      let $el = this.tabs[index];
      console.log(item)

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
    const { barStyle } = this.state;
    const { children, type, activeName } = this.props;
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
            children.map((item, index) => {
              const tabCls = this.classNames({
                'el-tabs__item': true,
                'is-active': item.props.name === activeName,
              });

              return (
                <div key={ `el-tabs__header-${index}` } ref={ (tab) => this.tabs.push(tab) } name={ item.props.name } className={ tabCls } onClick={ (e) => this.handleTabClick(item, e) }>
                  { item.props.label }
                </div>
              )
            })
          }
          <div className="el-tabs__active-bar" style={ barStyle }></div>
        </div>
        <div className="el-tabs__content">

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

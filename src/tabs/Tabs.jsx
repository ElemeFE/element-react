import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Tabs extends Component {
  componentDidMount() {
    this.calcBarStyle(true);
  }

  calcBarStyle(firstRendering) {
    if (this.props.type || !this.tabs ) return {};

    let style = {};
    let offset = 0;
    let tabWidth = 0;

    this.tabs
  }

  render() {
    const { children, type, activeName } = this.props;
    const tabsCls = this.classNames({
      'el-tabs': true,
      'el-tabs--card': type === 'card',
      'el-tabs--border-card': type === 'border-card',
    });

    return (
      <div className={ tabsCls }>
        <div className="el-tabs__header">
          {
            children.map((item, index) => {
              const tabCls = this.classNames({
                'el-tabs__item': true,
                'is-active': item.props.name === activeName
              });

              return (
                <div key={ `el-tabs__header-${index}` } ref={ (tab) => this.tabs = tab } className={ tabCls }>{ item.props.label }</div>
              )
            })
          }
          <div className="el-tabs__active-bar"></div>
        </div>
        <div className="el-tabs__content">

        </div>
      </div>
    );
  }
}

Tabs.PropTypes = {
  type: PropTypes.oneOf(['card', 'border-card']),
  closable: PropTypes.bool,
  activeName: PropTypes.string,
}

Tabs.defaultProps = {
  closable: false,
}

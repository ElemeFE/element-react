/* @flow */

import React from 'react';
import { Component, PropTypes, Transition } from '../../libs';
import { loadStyleString } from '../../libs/utils/dom';

export default class CollapseItem extends Component {
  constructor(props: Object) {
    super(props);
  }

  componentWillMount(): void {
    loadStyleString(
      `.collapse-enter {
        max-height: 0px;
        -webkit-transition: max-height .3s ease;
        overflow: hidden;
      }
      .collapse-enter.collapse-enter-active {
        height: auto;
        max-height: 100px;
      }
      .collapse-leave {
        max-height: 100px;
        -webkit-transition: max-height .3s ease;
      }
      .collapse-leave.collapse-leave-active {
        overflow: hidden;
        max-height: 0px;
      }
      `, 'collaspe-item'
    )
  }

  render(): React.Element<any> {
    const { title, isActive, onClick, name } = this.props;

    return (
      <div className={this.classNames({'el-collapse-item': true, 'is-active': isActive})}>
        <div className="el-collapse-item__header" onClick={() => onClick(name)}>
          <i className="el-collapse-item__header__arrow el-icon-arrow-right"></i>
          {title}
        </div>
        <Transition name="collapse">
          {isActive &&
            <div className="el-collapse-item__wrap">
              <div className="el-collapse-item__content">
                {this.props.children}
              </div>
            </div>
          }
        </Transition>
      </div>
    )
  }
}

CollapseItem.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  title: PropTypes.node,
  name: PropTypes.string,
}

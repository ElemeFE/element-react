/* @flow */

import React from 'react';
import { Component, Transition } from '../../libs';
import { loadStyleString } from '../../libs/utils/dom';

type Props = {
  onClick: Function,
  isActive: boolean,
  title: Element | string,
  name: string,
  children: React.Children,
}

export default class CollapseItem extends Component {
  props: Props;

  constructor(props: Props) {
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

  render() {
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

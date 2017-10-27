/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Popper from '../../libs/utils/popper';
import { Component, PropTypes, Transition, View } from '../../libs';

type State = {
  showPopper: boolean
};

export default class DropdownMenu extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      showPopper: false
    }
  }

  onVisibleChange(visible: boolean): void {
    this.setState({
      showPopper: visible
    })
  }

  onEnter(): void {
    const parent = ReactDOM.findDOMNode(this.parent());

    this.popperJS = new Popper(parent, this.refs.popper, {
      placement: this.placement(),
      gpuAcceleration: false
    });
  }

  onAfterLeave(): void {
    this.popperJS.destroy();
  }

  parent(): Component {
    return this.context.component;
  }

  placement(): string {
    return `bottom-${this.parent().props.menuAlign}`;
  }

  render(): React.Element<any> {
    return (
      <Transition name="el-zoom-in-top" onEnter={this.onEnter.bind(this)} onAfterLeave={this.onAfterLeave.bind(this)}>
        <View show={this.state.showPopper}>
          <ul ref="popper" style={this.style()} className={this.className('el-dropdown-menu')}>
            {this.props.children}
          </ul>
        </View>
      </Transition>
    )
  }
}

DropdownMenu.contextTypes = {
  component: PropTypes.any
};

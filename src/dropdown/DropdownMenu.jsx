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

  componentDidUpdate() {
    const { showPopper } = this.state;

    if (showPopper) {
      if (this.popperJS) {
        this.popperJS.update();
      } else {
        const parent: any = ReactDOM.findDOMNode(this.parent());

        this.popperJS = new Popper(parent, this.refs.popper, {
          placement: this.placement()
        });
      }
    } else {
      if (this.popperJS) {
        this.popperJS.destroy();
      }

      delete this.popperJS;
    }
  }

  componentWillUnmount() {
    if (this.popperJS) {
      this.popperJS.destroy();
    }
  }

  onVisibleChange(visible: boolean) {
    this.setState({
      showPopper: visible
    })
  }

  parent(): Object {
    return this.context.component;
  }

  placement(): string {
    return `bottom-${this.parent().props.menuAlign}`;
  }

  render() {
    return (
      <Transition name="md-fade-bottom">
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

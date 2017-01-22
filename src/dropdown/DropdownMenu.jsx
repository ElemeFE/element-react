import React from 'react';
import ReactDOM from 'react-dom';
import Popper from 'popper.js';
import { Component, PropTypes, Transition, View } from '../../libs';

export default class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopper: false
    }
  }

  componentDidUpdate() {
    this.popperJS = new Popper(ReactDOM.findDOMNode(this.parent()), this.refs.popper, {
      placement: this.placement()
    });
  }

  onVisibleChange(visible) {
    this.setState({
      showPopper: visible
    })
  }

  parent() {
    return this.context.component;
  }

  placement() {
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

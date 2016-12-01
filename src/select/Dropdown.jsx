import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Dropdown extends Component {
  componentDidMount() {
    // this.referenceElm = this.$parent.$refs.reference.$el;
    // this.$parent.popperElm = this.popperElm = this.$el;
    // this.$on('updatePopper', this.updatePopper);
    // this.$on('destroyPopper', this.destroyPopper);
  }

  updatePopper() {

  }

  destroyPopper() {

  }

  render() {
    const parent = this.context.component;

    return (
      <div ref="popper" className={this.className('el-select-dropdown', {
          'is-multiple': parent.props.multiple
      })} style={this.style({
        width: '100%',
        // minWidth: parent.state.inputWidth
      })}>
        {this.props.children}
      </div>
    )
  }
}

Dropdown.contextTypes = {
  component: PropTypes.any
};

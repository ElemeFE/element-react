import React from 'react';
import StyleSheet from '../../libs/utils/style';
import { Component, PropTypes } from '../../libs';

StyleSheet.reset(`
  .el-select-dropdown {
    position: absolute !important;
  }
`)

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

  parent() {
    return this.context.component;
  }

  render() {
    return (
      <div ref="popper" className={this.className('el-select-dropdown', {
          'is-multiple': this.parent().props.multiple
      })} style={this.style({
        minWidth: this.parent().state.inputWidth,
      })}>
        {this.props.children}
      </div>
    )
  }
}

Dropdown.contextTypes = {
  component: PropTypes.any
};

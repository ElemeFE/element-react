import React from 'react';
import Popper from '../../vendor/popper';
import { Component, PropTypes } from '../../libs';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minWidth: props.inputWidth + 'px'
    }
  }

  componentDidMount() {
    // this.referenceElm = this.$parent.$refs.reference.$el;
    // this.$parent.popperElm = this.popperElm = this.$el;
    // this.$on('updatePopper', this.updatePopper);
    // this.$on('destroyPopper', this.destroyPopper);
  }

  render() {
    return (
      <div className={this.classNames('el-select-dropdown', {
          'is-multiple': this.context.multiple
      })} style={{
        minWidth: this.props.inputWidth
      }}>
        {this.props.children}
      </div>
    )
  }
}

Dropdown.contextTypes = {
  component: PropTypes.any,
  inputWidth: PropTypes.number,
  multiple: PropTypes.bool
};

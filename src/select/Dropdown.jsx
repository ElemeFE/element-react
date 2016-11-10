import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minWidth: ''
    }
  }

  componentWillMount() {
    // this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
  }

  componentDidMount() {
    // this.referenceElm = this.$parent.$refs.reference.$el;
    // this.$parent.popperElm = this.popperElm = this.$el;
    // this.$on('updatePopper', this.updatePopper);
    // this.$on('destroyPopper', this.destroyPopper);
  }

  render() {
    return (
      <div
        className={this.classNames('el-select-dropdown', {
          'is-multiple': this.context.multiple
        })}
        style={{
          minWidth: this.state.minWidth
        }}>
        {this.props.children}
      </div>
    )
  }
}

Dropdown.contextTypes = {
  multiple: PropTypes.bool
};

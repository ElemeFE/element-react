import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: null,
      visible: false,
    }
  }

  componentDidMount() {
    this.initEvent();
  }

  show() {

  }

  hide() {

  }

  handleClick() {

  }

  initEvent() {
    const { trigger, splitButton } = this.props;
    const triggerElm = splitButton ? this.refs.trigger : this.props.children[0];
    if (trigger === 'hover') {
      const dropdownElm = this.$slots.dropdown[0].elm;
      [triggerElm, dropdownElm].forEach(element => {
        element.addEventListener('mouseenter', this.show.bind(this));
        element.addEventListener('mouseleave', this.hide.bind(this));
      })
    } else {
      triggerElm.addEventListener('click', this.handleClick.bind(this));
    }
  }

  handleMenuItemClick(command, instance) {
    this.visible = false;
    this.$emit('command', command, instance);
  }

  render() {
    return (
      <div className="el-dropdown" v-clickoutside={hide}>
        {triggerElm}
        {this.$slots.dropdown}
      </div>
    )
  }
}

Dropdown.propTypes = {
  trigger: PropTypes.oneOf(['hover', 'click']),
  menuAlign: PropTypes.oneOf(['start', 'end']),
  type: PropTypes.string,
  size: PropTypes.string,
  splitButton: PropTypes.bool,
}

Dropdown.defaultProps = {
  trigger: 'hover',
  menuAlign: 'end'
}

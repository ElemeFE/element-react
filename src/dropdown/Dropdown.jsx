import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';
import { Button } from '../../src';

let triggerOverlay = null;
let timeout = null;
export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  componentWillMount() {
    const { splitButton, type, size } = this.props;

    triggerOverlay = splitButton ?
        (<Button.Group>
          <Button type={type} size={size} onClick={() => this.props.onClick()}>
            更多菜单
          </Button>
          this.triggerEvent(
          <Button ref="trigger" type={type} size={size} class="el-dropdown__caret-button">
            <i className="el-dropdown__icon el-icon-caret-bottom"></i>
          </Button>)
        </Button.Group>)
        : this.triggerEvent(this.props.overlay);
  }

  show() {
    clearTimeout(timeout);
    timeout = setTimeout(() => this.setState({ visible: true }), 250);
  }

  hide() {
    clearTimeout(timeout);
    timeout = setTimeout(() => this.setState({ visible: false }), 150);
  }

  handleClick() {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  }

  triggerEvent(element) {
    if (!Array.isArray(element)) {
      element = [element];
    }
    const { trigger } = this.props;
    const triggerMap = {
      'hover': {
        onMouseEnter: this.show.bind(this),
        onMouseLeave: this.hide.bind(this),
      },
      'click': {
        onClick: this.handleClick.bind(this),
      }
    }
    return element.map((ele, index) => React.cloneElement(ele, { ...triggerMap[trigger], key: index },));
  }

  render() {
    const { visible } = this.state;
    const dropdown = React.cloneElement(this.props.children, { visible });
    return (
      <div className="el-dropdown">
        { triggerOverlay }
        {
          this.props.trigger === 'hover' ?
          this.triggerEvent(dropdown)
          : dropdown
        }
      </div>
    )
  }
}

Dropdown.propTypes = {
  trigger: PropTypes.oneOf(['hover', 'click']),
  menuAlign: PropTypes.oneOf(['start', 'end']),
  type: PropTypes.string,
  size: PropTypes.string,
  overlay: PropTypes.node,
  splitButton: PropTypes.bool,
  onClick: PropTypes.func,
}

Dropdown.defaultProps = {
  trigger: 'hover',
  menuAlign: 'end',
  onClick() {},
}

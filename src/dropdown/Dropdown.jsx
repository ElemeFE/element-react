/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import { Component, PropTypes } from '../../libs';

import Button from '../button';

type State = {
  visible: boolean
};

class Dropdown extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      visible: false
    }
  }

  getChildContext(): { component: Dropdown } {
    return {
      component: this
    };
  }

  componentDidMount() {
    this.initEvent();
  }

  componentWillUpdate(props: Object, state: State): void {
    if (state.visible != this.state.visible) {
      this.refs.dropdown.onVisibleChange(state.visible);

      if (this.props.onVisibleChange) {
        this.props.onVisibleChange(state.visible);
      }
    }
  }

  handleClickOutside(): void {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  }

  show(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ visible: true }), 250);
  }

  hide(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ visible: false }), 150);
  }

  handleClick(): void {
    this.setState({ visible: !this.state.visible });
  }

  initEvent(): void {
    const { trigger, splitButton } = this.props;
    const triggerElm: any = ReactDOM.findDOMNode(splitButton ? this.refs.trigger : this.refs.default);

    if (trigger === 'hover') {
      triggerElm.addEventListener('mouseenter', this.show.bind(this));
      triggerElm.addEventListener('mouseleave', this.hide.bind(this));

      let dropdownElm: any = ReactDOM.findDOMNode(this.refs.dropdown);

      dropdownElm.addEventListener('mouseenter', this.show.bind(this));
      dropdownElm.addEventListener('mouseleave', this.hide.bind(this));
    } else if (trigger === 'click') {
      triggerElm.addEventListener('click', this.handleClick.bind(this));
    }
  }

  handleMenuItemClick(command: string, instance: Component): void {
    if (this.props.hideOnClick) {
      this.setState({
        visible: false
      });
    }

    if (this.props.onCommand) {
      setTimeout(() => {
        this.props.onCommand(command, instance);
      });
    }
  }

  render(): React.Element<any> {
    const { splitButton, type, size, menu } = this.props;

    return (
      <div style={this.style()} className={this.className('el-dropdown')}>
        {
          splitButton ?  (
            <Button.Group>
              <Button type={type} size={size} onClick={this.props.onClick.bind(this)}>
                {this.props.children}
              </Button>
              <Button ref="trigger" type={type} size={size} className="el-dropdown__caret-button">
                <i className="el-dropdown__icon el-icon-caret-bottom"></i>
              </Button>
            </Button.Group>
          ) : React.cloneElement(this.props.children, { ref: 'default' })
        }
        {
          React.cloneElement(menu, {
            ref: 'dropdown'
          })
        }
      </div>
    )
  }
}

Dropdown.childContextTypes = {
  component: PropTypes.any
};

Dropdown.propTypes = {
  menu: PropTypes.node.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  trigger: PropTypes.oneOf(['hover', 'click']),
  menuAlign: PropTypes.oneOf(['start', 'end']),
  splitButton: PropTypes.bool,
  hideOnClick: PropTypes.bool,
  onClick: PropTypes.func,
  onCommand: PropTypes.func,
  onVisibleChange: PropTypes.func
}

Dropdown.defaultProps = {
  hideOnClick: true,
  trigger: 'hover',
  menuAlign: 'end'
}

export default ClickOutside(Dropdown);

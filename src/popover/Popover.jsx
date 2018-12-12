/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Popper from 'popper.js';
import { Component, PropTypes, Transition, View } from '../../libs';

type State = {
  showPopper: boolean
};

export default class Popover extends Component {
  state: State;

  static defaultProps = {
    visibleArrow: true,
    transition: 'fade-in-linear',
    trigger: 'click',
    placement: 'bottom',
    width: 150
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      showPopper: false
    };
  }

  componentDidMount() {
    const { trigger } = this.props, popper = this.refs.popper;

    this.element = ReactDOM.findDOMNode(this);
    this.reference = ReactDOM.findDOMNode(this.refs.reference);

    if (this.reference === null) return;

    if (trigger === 'click') {
      this.reference.addEventListener('click', () => {
        this.setState({
          showPopper: !this.state.showPopper
        });
      });

      document.addEventListener('click', (e: Event): void => {
        if (!this.element || this.element.contains(e.target) ||
            !this.reference || this.reference.contains(e.target) ||
            !popper || popper.contains(e.target)) return;

        this.setState({
          showPopper: false
        });
      });
    } else if (trigger === 'hover') {
      this.reference.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      this.reference.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

      popper.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      popper.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    } else {
      if (this.reference.nodeName === 'INPUT' || this.reference.nodeName === 'TEXTAREA') {
        this.reference.addEventListener('focus', () => { this.setState({ showPopper: true })});
        this.reference.addEventListener('blur', () => { this.setState({ showPopper: false })});
      } else {
        this.reference.addEventListener('mousedown', () => { this.setState({ showPopper: true })});
        this.reference.addEventListener('mouseup', () => { this.setState({ showPopper: false })});
      }
    }
  }

  componentWillReceiveProps(props: Object) {
    if (props.visible !== this.props.visible) {
      this.setState({
        showPopper: props.visible
      });
    }
  }

  componentWillUnmount(): void {
    this.reference.parentNode.replaceChild(this.reference.cloneNode(true), this.reference);
  }

  handleMouseEnter(): void {
    clearTimeout(this.timer);

    this.setState({
      showPopper: true
    });
  }

  handleMouseLeave(): void {
    this.timer = setTimeout(() => {
      this.setState({
        showPopper: false
      });
    }, 200);
  }

  onEnter(): void {
    if (this.refs.arrow) {
      this.refs.arrow.setAttribute('x-arrow', '');
    }

    this.popperJS = new Popper(this.reference, this.refs.popper, {
      placement: this.props.placement,
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        }
      }
    });
  }

  onAfterLeave(): void {
    this.popperJS.destroy();
  }

  render(): React.Element<any> {
    const { transition, popperClass, width, title, content, visibleArrow } = this.props;

    return (
      <span>
        <Transition name={transition} onEnter={this.onEnter.bind(this)} onAfterLeave={this.onAfterLeave.bind(this)}>
          <View show={this.state.showPopper}>
            <div ref="popper" className={this.className('el-popover', popperClass)} style={this.style({ width: Number(width) })}>
              { title && <div className="el-popover__title">{title}</div> }
              { content }
              { visibleArrow && <div ref="arrow" className="popper__arrow"/>}
            </div>
          </View>
        </Transition>
        { React.cloneElement(React.Children.only(this.props.children), { ref: 'reference' }) }
      </span>
    )
  }
}

Popover.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placement: PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  trigger: PropTypes.oneOf(['click', 'focus', 'hover']),
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  popperClass: PropTypes.string,
  transition: PropTypes.string,
  visible: PropTypes.bool,
  visibleArrow: PropTypes.bool
}

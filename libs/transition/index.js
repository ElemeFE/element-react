import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class Transition extends Component {
  render() {
    return React.createElement(ReactCSSTransitionGroup, {
      transitionName: this.props.name,
      transitionEnterTimeout: Number(this.props.duration),
      transitionLeaveTimeout: Number(this.props.duration),
      component: this.props.component,
      className: this.props.className,
      style: this.props.style
    }, this.props.children);
  }
}

Transition.propTypes = {
  name: PropTypes.string.isRequired,
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  component: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

Transition.defaultProps = {
  duration: 300
}

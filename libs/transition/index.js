import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Transition extends Component {
  render() {
    return React.createElement(ReactCSSTransitionGroup, {
      transitionName: this.props.name,
      transitionEnterTimeout: Number(this.props.duration),
      transitionLeaveTimeout: Number(this.props.duration),
      component: this.props.component,
      className: this.props.className,
      style: this.props.style,
      key: this.props.key
    }, React.Children.map(this.props.children, (element, index) => {
      return React.cloneElement(element, {
        key: index
      })
    }));
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

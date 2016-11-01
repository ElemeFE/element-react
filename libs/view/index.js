import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class View extends Component {
  render() {
    const hidden = this.props.hasOwnProperty('show') && !this.props.show;
    const element = React.Children.only(this.props.children);
    const children = React.cloneElement(element, hidden && {
      key: element,
      style: Object.assign({}, element.props.style, {
        display: 'none'
      })
    });

    if (this.props.transition) {
      return (
        <ReactCSSTransitionGroup transitionName={this.props.transition} transitionEnterTimeout={500} transitionLeaveTimeout={300} key={this.props.transitionkey}>
          {children}
        </ReactCSSTransitionGroup>
      )
    } else {
      return children;
    }
  }
}

/* eslint-disable */
View.propTypes = {
  show: PropTypes.any,
  transition: PropTypes.string,
  transitionKey: PropTypes.string
};
/* eslint-enable */

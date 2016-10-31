import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Component from '../component';

export default class View extends Component {
  render() {
    let children = null;

    if (!this.props.hasOwnProperty('if') || Boolean(this.props.if)) {
      const element = React.Children.only(this.props.children);

      children = React.cloneElement(element, this.props.hasOwnProperty('show') && !this.props.show && {
        key: element,
        style: Object.assign({}, element.props.style, {
          display: 'none'
        })
      });
    }

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
  if: PropTypes.any,
  show: PropTypes.any,
  transition: PropTypes.string,
  transitionKey: PropTypes.string
};
/* eslint-enable */

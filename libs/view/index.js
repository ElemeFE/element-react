import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Component from '../component';

export default class Element extends Component {
  render() {
    let children = null;

    if (!this.props.hasOwnProperty('if') || Boolean(this.props.if)) {
      const element = React.Children.only(this.props.children);

      children = React.cloneElement(element, !this.props.show && {
        key: element,
        style: Object.assign({}, element.props.style, {
          display: 'none'
        })
      });
    }

    if (this.props.transition) {
      return (
        <ReactCSSTransitionGroup transitionName={this.props.transition} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {children}
        </ReactCSSTransitionGroup>
      )
    } else {
      return children;
    }
  }
}

Element.propTypes = {
  transition: PropTypes.string,
  show: PropTypes.bool,
  if: PropTypes.any
};

Element.defaultProps = {
  show: true
};

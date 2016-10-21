import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Component from '../component';

export default class Transition extends Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName={this.props.name} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {this.props.children}
      </ReactCSSTransitionGroup>
    )
  }
}

Transition.propTypes = {
  name: PropTypes.string.isRequired
}

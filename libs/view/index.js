import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class View extends Component {
  render() {
    const mixed = { style: {} };
    const classNames = [];
    const { show = true, className = '', children } = this.props;
    if (!show) mixed.style = { ...children.props.style, display: 'none' };
    if (children.props.className) classNames.push(children.props.className);
    if (className) classNames.push(className);
    mixed.className = classNames.join(' ');

    return React.cloneElement(React.Children.only(this.props.children), mixed);
  }
}

/* eslint-disable */
View.propTypes = {
  show: PropTypes.any,
};
/* eslint-enable */

View._typeName = 'View';

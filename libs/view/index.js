import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class View extends Component {
  render() {
    const classNames = [];
    const { show = true, className = '', children } = this.props;
    const mixed = { style: { ...children.props.style } };
    if (!show) mixed.style.display = 'none';
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

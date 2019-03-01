import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Component extends React.Component {
  classNames(...args) {
    return classnames(args);
  }

  className(...args) {
    const { className } = this.props;
    return this.classNames.apply(this, args.concat([className]));
  }

  style(args) {
    const { style } = this.props;
    return Object.assign({}, args, style)
  }
}

Component.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

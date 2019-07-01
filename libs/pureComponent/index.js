import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class PureComponent extends React.PureComponent {
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

PureComponent.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

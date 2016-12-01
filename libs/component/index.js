import React from 'react';
import classnames from 'classnames';

export default class Component extends React.Component {
  classNames(...args) {
    return classnames(args);
  }

  className(...args) {
    return this.classNames.apply(this, args.concat([this.props.className]));
  }

  style(args) {
    return Object.assign({}, args, this.props.style)
  }
}

Component.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object
};

Component.defaultProps = {
  style: {}
};

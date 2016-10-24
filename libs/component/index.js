import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

export default class Component extends React.Component {
  componentDidMount() {
    if (this.shouldApplyProps()) {
      this.element = ReactDOM.findDOMNode(this);

      this.className = this.element.className;
      this.style = this.element.style;

      this.applyProps(this.props);
    }
  }

  componentWillReceiveProps(props) {
    this.shouldApplyProps() && this.applyProps(props);
  }

  shouldApplyProps() {
    return this.props.hasOwnProperty('className') || this.props.hasOwnProperty('style');
  }

  applyProps(props) {
    if ('className' in this.props) {
      this.element.className = this.className + ' ' + props.className;
    }

    if ('style' in this.props) {
      const style = Object.assign({}, this.style, props.style);

      for (const key in style) {
        this.element.style[key] = style[key];
      }
    }
  }

  classNames(...args) {
    return classnames(args);
  }
}

Component.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object
}

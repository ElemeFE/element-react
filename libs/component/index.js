import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import equal from 'is-equal';

export default class Component extends React.Component {
  componentDidMount() {
    this.shouldApplyProps(this.props) && this.applyProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.shouldApplyProps(props, this.props) && this.applyProps(props);
  }

  shouldApplyProps(newProps, oldProps = {}) {
    const shouldApplyProps = !equal(newProps.className, oldProps.className) || !equal(newProps.style, oldProps.style);

    if (shouldApplyProps && !this.element) {
      this.element = ReactDOM.findDOMNode(this);

      if (this.element) {
        this.className = this.element.className;
        this.style = this.element.style;
      }
    }

    return shouldApplyProps;
  }

  applyProps(props) {
    if (this.element) {
      // apply new className
      this.element.className = this.classNames(this.className, props.className);

      // style reset
      for (const key in this.style) {
        this.element.style.setProperty(key, this.style.getPropertyValue(key));
      }

      // apply new style
      if (props.style) {
        for (const key in props.style) {
          this.element.style.setProperty(key, props.style[key]);
        }
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

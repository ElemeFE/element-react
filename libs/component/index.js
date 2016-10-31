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
        this.style = this.element.style.cssText;
      }
    }

    return shouldApplyProps;
  }

  applyProps(props) {
    if (this.element) {
      // apply new className
      this.element.className = this.classNames(props.className, this.className);

      // apply new style
      if (props.style) {
        const div = document.createElement('div');

        ReactDOM.render(<div style={props.style} />, div);

        this.element.style.cssText = div.style.cssText + ' ' + this.style;

        ReactDOM.unmountComponentAtNode(div);
      } else {
        this.element.style.cssText = this.style;
      }
    }
  }

  classNames(...args) {
    return classnames(args);
  }
}

/* eslint-disable */
Component.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object
}
/* eslint-enable */

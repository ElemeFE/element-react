import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import equal from 'is-equal';

export default class Component extends React.Component {
  constructor(props) {
    super(props);

    this.createMethodProxy('componentDidMount', this.componentDidMountProxy);
    this.createMethodProxy('componentWillUpdate', this.componentWillUpdateProxy);
    this.createMethodProxy('componentWillReceiveProps', this.componentWillReceivePropsProxy);
  }

  componentDidMountProxy() {
    this.updateStyles(this.props);
    this.updateClassName();
  }

  componentWillUpdateProxy(props) {
    this.updateStyles(props, this.props);
    this.updateClassName();
  }

  componentWillReceivePropsProxy(props) {
    this.className = this.props.className;
  }

  createMethodProxy(name, replace) {
    const fn = this[name];

    this[name] = (...args) => {
      if (replace instanceof Function) {
        replace.apply(this, args);
      }

      if (fn instanceof Function) {
        fn.apply(this, args);
      }
    }
  }

  updateStyles(newProps, oldProps = {}) {
    if (!equal(newProps.style, oldProps.style)) {
      const element = this.findDOMNode();

      if (element) {
        if (!this.style) {
          this.style = element.style.cssText;
        }

        if (newProps.style) {
          const div = document.createElement('div');

          ReactDOM.render(React.createElement('div', {
            style: newProps.style
          }), div);

          element.style.cssText = div.firstChild.style.cssText + ' ' + this.style;

          ReactDOM.unmountComponentAtNode(div);
        } else {
          element.style.cssText = this.style;
        }
      }
    }
  }

  updateClassName() {
    const element = this.findDOMNode();

    if (element) {
      if (this.className) {
        element.classList.remove.apply(element.classList, this.className.split(' '));
      }

      if (this.props.className) {
        element.classList.add.apply(element.classList, this.props.className.split(' '));
      }
    }
  }

  findDOMNode() {
    return ReactDOM.findDOMNode(this);
  }

  classNames(...args) {
    return classnames(args);
  }
}

Component.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object
}

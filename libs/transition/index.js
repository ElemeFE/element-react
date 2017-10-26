import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function getTransitionClass(name) {
  return {
    enter: `${name}-enter`,
    enterActive: `${name}-enter-active`,
    enterTo: `${name}-enter-to`,
    leave: `${name}-leave`,
    leaveActive: `${name}-leave-active`,
    leaveTo: `${name}-leave-to`,
  }
}

function isViewComponent(element) {
  return element && element.type._typeName === 'View';
}

export default class Transition extends Component {
  constructor(props) {
    super(props);

    const { children } = props;
    this.state = {
      children: children && this.enhanceChildren(children)
    }
  }

  componentWillReceiveProps(nextProps) {
    const children = React.isValidElement(this.props.children) && React.Children.only(this.props.children);
    const nextChildren = React.isValidElement(nextProps.children) && React.Children.only(nextProps.children);

    if (!nextProps.name) {
      this.setState({
        children: nextChildren
      });
      return;
    }

    if (isViewComponent(nextChildren)) {
      this.setState({
        children: this.enhanceChildren(nextChildren, { show: children ? children.props.show : true })
      })
    } else {
      if (nextChildren) {
        this.setState({
          children: this.enhanceChildren(nextChildren)
        })
      }
    }
  }

  componentDidUpdate(preProps) {
    if (!this.props.name) return;

    const children = React.isValidElement(this.props.children) && React.Children.only(this.props.children);
    const preChildren = React.isValidElement(preProps.children) && React.Children.only(preProps.children);

    if (isViewComponent(children)) {
      if ((!preChildren || !preChildren.props.show) && children.props.show) {
        this.toggleVisible();
      } else if (preChildren.props.show && !children.props.show) {
        this.toggleHidden();
      }
    } else {
      if (!preChildren && children) {
        this.toggleVisible();
      } else if (preChildren && !children) {
        this.toggleHidden();
      }
    }

  }

  enhanceChildren(children, props) {
    return React.cloneElement(children, Object.assign({ ref: (el) => { this.el = el } }, props))
  }

  toggleVisible() {
    const { name, onEnter, onAfterEnter,  } = this.props;
    const { enter, enterActive, enterTo, leaveActive, leaveTo } = getTransitionClass(name);
    const childDOM = ReactDOM.findDOMNode(this.el);
    this.visibleTransitionEnd = () => {
      childDOM.classList.remove(enterActive, enterTo);
      childDOM.removeEventListener('transitionend', this.visibleTransitionEnd);
      onAfterEnter && onAfterEnter();
    };
    childDOM.addEventListener('transitionend', this.visibleTransitionEnd);

    requestAnimationFrame(() => {
      // when hidden transition not end
      if (childDOM.classList.contains(leaveActive)) {
        childDOM.classList.remove(leaveActive, leaveTo);
        childDOM.removeEventListener('transitionend', this.hiddenTransitionEnd);
      }
      childDOM.classList.add(enter, enterActive);
      childDOM.style.display = '';
      onEnter && onEnter();
      requestAnimationFrame(() => {
        childDOM.classList.remove(enter);
        childDOM.classList.add(enterTo);
      })
    })
  }

  toggleHidden() {
    const { name, onAfterLeave, onLeave, children } = this.props;
    const { leave, leaveActive, leaveTo, enterActive, enterTo } = getTransitionClass(name);
    const childDOM = ReactDOM.findDOMNode(this.el);
    this.hiddenTransitionEnd = () => {
      const promise = new Promise((resolve) => {
        if (isViewComponent(children)) {
          childDOM.removeEventListener('transitionend', this.hiddenTransitionEnd);
          requestAnimationFrame(() => {
            childDOM.style.display = 'none';
            childDOM.classList.remove(leaveActive, leaveTo);
            requestAnimationFrame(resolve);
          })
        } else {
          this.setState({ children: null }, resolve);
        }
      });

      promise.then(() => { onAfterLeave && onAfterLeave() })

    };
    childDOM.addEventListener('transitionend', this.hiddenTransitionEnd);



    requestAnimationFrame(() => {
      // when enter transition not end
      if (childDOM.classList.contains(enterActive)) {
        childDOM.classList.remove(enterActive, enterTo);
        childDOM.removeEventListener('transitionend', this.visibleTransitionEnd);
      }

      childDOM.classList.add(leave, leaveActive);

      onLeave && onLeave();
      requestAnimationFrame(() => {
        childDOM.classList.remove(leave);
        childDOM.classList.add(leaveTo);
      })
    })
  }

  render() {
   return this.state.children;
  }
}

Transition.propTypes = {
  name: PropTypes.string,
  onEnter: PropTypes.func, // triggered when enter transition start
  onAfterEnter: PropTypes.func, // triggered when enter transition end
  onLeave: PropTypes.func, // triggered when leave transition start
  onAfterLeave: PropTypes.func // tiggered when leave transition end
};

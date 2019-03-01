/* @flow */

import React from 'react';
import {Component,PropTypes} from '../../libs';
import AnchorSmooth,{getScrollTop} from './AnchorSmooth';
import './style.css';

export default class GoTop extends Component {

  constructor() {
    super(...arguments);
    this.state = {show: false};
    this.$showAnchor = this.showAnchor.bind(this);
  }

  showAnchor() {
    let scrollY = getScrollTop();
    let show = scrollY >= this.props.showheight;
    if (this.state.show !== show) {
      this.setState({
        show
      });
    }
  }

  componentDidMount() {
    this.$showAnchor();
    window.addEventListener("scroll", this.$showAnchor)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.$showAnchor);
  }

  render() {
    const {children,bottom, right, top, left, ...other} = this.props;
    return (
      <div className="el-anchor__top-wrapper" style={{
        bottom,
        right,
        top,
        left,
        opacity: this.state.show ? "1" : "0",
        visibility: this.state.show ? "visible" : "hidden",
        transition: this.state.show ? "opacity 0.2s linear 0s, visibility" : ""
      }}>
        <AnchorSmooth className='el-anchor__top'
          {...other}>
          {children || <i className="el-icon-caret-top"></i>}
        </AnchorSmooth>
      </div>
    )
  }
}

GoTop.propTypes = {
  showheight:PropTypes.number,
  bottom:PropTypes.string,
  top:PropTypes.string,
  left:PropTypes.string,
  right:PropTypes.string
};

GoTop.defaultProps = {
  showheight:300
};

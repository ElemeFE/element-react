/* @flow */

import React from 'react';
import {Component, PropTypes} from '../../libs';

export function getScrollTop() {
  let html = document.documentElement || {scrollTop : 0};
  let body = document.body || {scrollTop : 0};
  return window.pageYOffset ||
    html ? html.scrollTop :
    body ? body.scrollTop : 0;
}

function goTarget(targetTop, time = 300, callback) {
  let interval = 10;
  time = Math.max(time, 100);
  let initTop = getScrollTop();
  let total = Math.ceil(time / interval);
  let speed = (targetTop - initTop) / total;

  if (speed === 0) {
    return;
  }

  let count = 1;
  let timer = setInterval(goMove, interval);

  function goMove() {
    if (count >= total) {
      window.scrollTo(0, targetTop);
      clearInterval(timer);
      callback && callback();
      return;
    }
    window.scrollTo(0, speed * count + initTop);
    count++;
  }

}

export default class AnchorSmooth extends Component {

  onClick(e: SyntheticEvent): void{
    e.preventDefault();
    let targetDom = document.getElementById(this.props.targetId);
    if (targetDom && targetDom.scrollIntoView) {
      targetDom.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      this.props.onFinish && this.props.onFinish();
    } else {
      let targetTop = targetDom ? targetDom.offsetTop : 0;
      goTarget(targetTop, this.props.time, this.props.onFinish);
    }
  }


  // shouldComponentUpdate(nextProps) {
  //   const propsKeys = Object.keys(this.props);
  //   const nextPropsKeys = Object.keys(nextProps);
  //
  //   if (propsKeys.length !== nextPropsKeys.length) {
  //     return true;
  //   }
  //   for (const key of propsKeys) {
  //     if (this.props[key] !== nextProps[key]) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  render() {
    const {targetId, children, ...other} = this.props;
    return (
      <a {...other} href={targetId ? "#" + targetId : ""} onClick={this.onClick.bind(this)}
      >{children || targetId}</a>
    )
  }
}

AnchorSmooth.propTypes = {
  targetId: PropTypes.string,
  time: PropTypes.number,
  onFinish: PropTypes.func
};

AnchorSmooth.defaultProps = {
  time: 300
};


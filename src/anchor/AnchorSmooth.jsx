/* @flow */

import React from 'react';
import {Component, PropTypes} from '../../libs';


const doNothing = () => undefined;

function goTarget(targetTop, time = 300, callback = doNothing) {
  let interval = 10;
  time = Math.max(time, 100);
  let initTop = document.documentElement.scrollTop || document.body.scrollTop;
  let total = Math.ceil(time / interval);
  let speed = (targetTop - initTop) / total;
  let timer = null;
  let count = 1;

  if (speed === 0) {
    return;
  }

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

  timer = setInterval(goMove, interval);
}

export default class AnchorSmooth extends Component {
  constructor() {
    super(...arguments);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    let targetDom = document.getElementById(this.props.targetId);
    if(targetDom && targetDom.scrollIntoView){
      targetDom.scrollIntoView({
        behavior:'smooth',
        block:'start',
        inline:'nearest'
      });
      this.props.onFinish && this.props.onFinish();
    }else{
      let targetTop = targetDom ? targetDom.offsetTop : 0;
      goTarget(targetTop, this.props.time,this.props.onFinish);
    }
  }


  shouldComponentUpdate(nextProps) {
    for (let key of Object.keys(nextProps)) {
      if (nextProps[key] !== this.props[key]) {
        return true;
      }
    }
    for (let key of Object.keys(this.props)) {
      if (this.props[key] !== nextProps[key]) {
        return true;
      }
    }
    return false;
  }

  render() {
    const {targetId, children, ...other} = this.props;
    return (
      <a {...other} href={targetId ? "#" + targetId : ""}  onClick={this.onClick}
      >{children || targetId}</a>
    )
  }
}

AnchorSmooth.propTypes = {
  targetId: PropTypes.string,
  time: PropTypes.number,
  onFinish:PropTypes.func
};

AnchorSmooth.defaultProps = {
  time: 300
};


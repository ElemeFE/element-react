import React from 'react'


const ANIMATION_DURATION = 300

export default class CollapseTransition extends React.Component {
  componentWillEnter(cb){
    const el = this.selfRef
    //prepare
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.style.height = '0';
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.dataset.oldOverflow = el.style.overflow;

    //start
    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      el.style.height = '';
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = 'hidden';

    setTimeout(cb, ANIMATION_DURATION) 
  }


  componentDidEnter() {
    const el = this.selfRef
    el.style.display = '';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  }

  componentWillLeave(cb) {
    const el = this.selfRef

    //prepare
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;
    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
    el.style.overflow = 'hidden';
    // start
    if (el.scrollHeight !== 0) {
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
      setTimeout(cb, ANIMATION_DURATION)
    } else {
      cb()
    }
  }

  componentDidLeave() {
    const el = this.selfRef
    el.style.display = el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  }

  render(){
    return (
      <div
        className="el-tree-node__children collapse-transition"
        ref={e=>this.selfRef = e}
        >
        {this.props.children}
      </div>
    )
  }
}
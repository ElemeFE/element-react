
import React from 'react';
import ReactDOM from 'react-dom'

import { PropTypes, Component } from '../../libs';
import { addResizeListener, removeResizeListener } from '../../libs/utils/resize-event';

import { getScrollBarWidth } from './scrollbar-width';
import { Bar } from './Bar'

export class Scrollbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    };

    this.update = this._update.bind(this)
  }

  get wrap(){
    return this.refs.wrap;
  }

  componentDidMount(){
    if (this.native) return;
    let rafId = requestAnimationFrame(this.update)
    this.cleanRAF = ()=>{
      cancelAnimationFrame(rafId)
    }
  }

  componentDidUpdate() {
    this.resizeDom = ReactDOM.findDOMNode(this.refs.resize)
    if (!this.props.noresize){
      addResizeListener(this.resizeDom, this.update)
      this.cleanResize = ()=>{
        removeResizeListener(this.resizeDom, this.update);
      }
    }
  }
  

  componentWillUnmount(){
    this.cleanRAF();
    this.cleanResize && this.cleanResize();
  }

  handleScroll() {
    const wrap = this.wrap;
    this.setState({
      moveY: ((wrap.scrollTop * 100) / wrap.clientHeight),
      moveX: ((wrap.scrollLeft * 100) / wrap.clientWidth)
    })
  }

  _update() {
    let heightPercentage, widthPercentage;
    const wrap = this.wrap;
    if (!wrap) return;

    heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
    widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);

    let sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
    let sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';

    this.setState({sizeHeight, sizeWidth})
  }

  render() {

    /* eslint-disable */
    let {
      native, viewStyle, wrapStyle, viewClass, children, viewComponent, wrapClass, noresize,
      className, ...others} = this.props;
    let {moveX, moveY, sizeWidth, sizeHeight} = this.state;
    /* eslint-enable */

    let style = wrapStyle;
    const gutter = getScrollBarWidth();
    if (gutter) {
      const gutterWith = `-${gutter}px`;
      if (Array.isArray(wrapStyle)){
        style = Object.assign.apply(null, [...wrapStyle, {marginRight: gutterWith, marginBottom: gutterWith}])
      } else {
        style = Object.assign({}, wrapStyle, {marginRight: gutterWith, marginBottom: gutterWith})
      }
    }

    const view = React.createElement(viewComponent, {
      className: this.classNames('el-scrollbar__view', viewClass),
      style: viewStyle,
      ref: 'resize'
    }, children);

    let nodes;
    if (!native){
      const wrap = (
        <div 
          {...others}
          ref="wrap"
          key={0}
          style={style}
          onScroll={this.handleScroll.bind(this)}
          className={this.classNames(wrapClass, 'el-scrollbar__wrap', gutter ? '' : 'el-scrollbar__wrap--hidden-default')}
          >
          {view}
        </div>
      )
      nodes = [
        wrap,
        <Bar key={1} move={moveX} size={sizeWidth} getParentWrap={()=>this.wrap}></Bar>,
        <Bar key={2} move={moveY} size={sizeHeight} getParentWrap={()=>this.wrap} vertical={true}></Bar>,
      ]
    }else {
      nodes = [
        (
          <div 
            {...others}
            key={0} 
            ref="wrap" 
            className={this.classNames(wrapClass, 'el-scrollbar__wrap')} 
            style={style}>
            {view}
          </div>
        )
      ]
    }

    return React.createElement('div', {className: this.classNames('el-scrollbar', className)}, nodes)
  }
}

Scrollbar.propTypes = {
  native: PropTypes.bool,
  wrapStyle: PropTypes.object,
  wrapClass: PropTypes.oneOfType([
    PropTypes.string, PropTypes.object
  ]),
  viewClass: PropTypes.oneOfType([
    PropTypes.string, PropTypes.object
  ]),
  viewStyle: PropTypes.object,
  className: PropTypes.string,
  viewComponent: PropTypes.oneOfType([
    PropTypes.string, PropTypes.element
  ]),
  noresize: PropTypes.bool
}

Scrollbar.defaultProps = {
  viewComponent: 'div'
}

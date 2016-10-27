import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

export default class Loading extends Component {
  render() {
    return (
      <div style={this.style()}>
        <div 
          style={{
            position: 'absolute',
            zIndex: 10001,
            backgroundColor: 'rgba(0, 0, 0, 0.65098)',
            margin: 0,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'block'
          }}>
          <div 
            className="el-loading-spinner" 
            style={{
              display: 'inline-block',
              position: 'absolute'
            }}>
            <div className="el-loading-bubble bubble1"></div>
            <div className="el-loading-bubble bubble2"></div>
            <div className="el-loading-bubble bubble3"></div>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }

  style() {
    if (this.props.fullscreen) {
      document.body.style.setProperty('overflow', 'hidden');

      return {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10002
      }
    } else {
      document.body.style.removeProperty('overflow');

      return {
        position: 'relative'
      }
    }
  }
}

Loading.propTypes = {
  fullscreen: PropTypes.bool
}

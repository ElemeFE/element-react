import React, { PropTypes } from 'react';
import { Component, View } from '../../libs';

export default class Loading extends Component {
  render() {
    return (
      <div style={{
        position: 'absolute',
        zIndex: 10000,
        backgroundColor: 'rgba(0, 0, 0, 0.65098)',
        margin: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'block'
      }}>
        <div className="el-loading-spinner" style={{
          display: 'inline-block',
          position: 'absolute'
        }}>
          <div className="el-loading-bubble bubble1"></div>
          <div className="el-loading-bubble bubble2"></div>
          <div className="el-loading-bubble bubble3"></div>
        </div>
      </div>
    )
  }
}

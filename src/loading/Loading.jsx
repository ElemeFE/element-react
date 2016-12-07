import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Loading extends Component {
  getStyle() {
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

  render() {
    const { loading, fullscreen, text } = this.props;

    return (
      <div style={this.style(this.getStyle())} className={this.className()}>
        { loading && (
          <div
            style={{
              display: 'block',
              position: 'absolute',
              zIndex: 10001,
              backgroundColor: 'rgba(255, 255, 255, 0.901961)',
              margin: 0,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }}>
            <div className={this.classNames('el-loading-spinner', {
              'is-full-screen': fullscreen
            })} style={{
              position: 'absolute',
              display: 'inline-block'
            }}>
              <svg className="circular" viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" />
              </svg>
              {
                text && <p className="el-loading-text">{text}</p>
              }
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    )
  }
}

Loading.propTypes = {
  loading: PropTypes.bool,
  fullscreen: PropTypes.bool,
  text: PropTypes.string
};

Loading.defaultProps = {
  loading: true
};

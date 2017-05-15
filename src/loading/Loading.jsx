/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Loading extends Component {
  componentWillUnmount(): void {
    this.enableScroll();
  }

  getStyle(): {
    position: string,
    top?: number,
    right?: number,
    bottom?: number,
    left?: number,
    zIndex?: number
  } {
    if (this.props.fullscreen) {
      this.disableScroll();

      return {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 99999
      }
    } else {
      this.enableScroll();

      return {
        position: 'relative'
      }
    }
  }

  documentBody(): HTMLElement | null {
    return document.body;
  }

  disableScroll(): void {
    const documentBody = this.documentBody();
    if (documentBody) {
      documentBody.style.setProperty('overflow', 'hidden');
    }
  }

  enableScroll(): void {
    const documentBody = this.documentBody();
    if (documentBody) {
      documentBody.style.removeProperty('overflow');
    }
  }

  render(): React.Element<any> {
    const { loading, fullscreen, text } = this.props;

    return (
      <div style={this.style(this.getStyle())} className={this.className()}>
        { loading && (
          <div
            style={{
              display: 'block',
              position: 'absolute',
              zIndex: 657,
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
              display: 'inline-block',
              left: 0
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

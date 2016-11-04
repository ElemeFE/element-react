import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Col extends Component {
  getStyle() {
    const style = {};

    if (this.props.gutter) {
      style.paddingLeft = `${this.props.gutter / 2}px`;
      style.paddingRight = style.paddingLeft;
    }

    return style;
  }

  render() {
    return (
      <div className={this.classNames('el-col', `el-col-${this.props.span}`, this.props.offset && `el-col-offset-${this.props.offset}`, this.props.pull && `el-col-pull-${this.props.pull}`, this.props.push && `el-col-push-${this.props.push}`)} style={this.getStyle()}>
        {this.props.children}
      </div>
    )
  }
}

Col.propTypes = {
  gutter: PropTypes.number,
  span: PropTypes.number.isRequired,
  offset: PropTypes.number,
  pull: PropTypes.number,
  push: PropTypes.number
}

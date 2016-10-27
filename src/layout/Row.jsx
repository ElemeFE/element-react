import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Row extends Component {
  getStyle() {
    const style = {};

    if (this.props.gutter) {
      style.marginLeft = `-${this.props.gutter / 2}px`;
      style.marginRight = style.marginLeft;
    }

    return style;
  }

  render() {
    return (
      <div className={this.classNames('el-row', this.props.justify !== 'start' && `is-justify-${this.props.justify}`, this.props.align !== 'top' && `is-align-${this.props.align}`, {'el-row--flex': this.props.type === 'flex'})} style={this.getStyle()}>
        {
          React.Children.map(this.props.children, element => {
            return React.cloneElement(element, {
              gutter: this.props.gutter
            })
          })
        }
      </div>
    )
  }
}

Row.propTypes = {
  gutter: PropTypes.number,
  type: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string
}

Row.defaultProps = {
  justify: 'start',
  align: 'top'
};
